document.getElementById('xmlFile').addEventListener('change', readSingleFile, false);

function readSingleFile(evt) {
    // Retrieve the first file from the FileList object
    var f = evt.target.files[0];
    if (f) {
        var r = new FileReader();
        r.onload = function(e) {
            let contents = e.target.result;
            let parser = new DOMParser();
            let dom = parser.parseFromString(contents, "text/xml");
            console.log(dom);
            let result = {};

            // Storing all of the contents in elements in an array called allElements
            let allElements = dom.getElementsByTagName("element")

            // The for loop places elements from allElements into questionElements based on if the attribute "masterType" is "SIMPLE_TEXT"
            // This is the attribute tag that contains the questions we are trying to access
            let questionElements = []
            let manElements = []
            let manString = ""
            let count =0

            for (let j = 0; j < allElements.length; j++) {
                if (allElements[j].getAttribute("masterType") == "SIMPLE_TEXT") {
                    questionElements.push(allElements[j])
                }
                if(allElements[j].getAttribute("masterType")=="ESTABLISHMENT_COMPLEX"&&count==0){
                  count++
                  manString +="\nManufacturer Responsible,"+allElements[j].getElementsByTagName("data")[0].textContent.trim().replace(/(\r\n|\n|\r)/gm, "")
                }
                else if(allElements[j].getAttribute("masterType")=="CONTACT_COMPLEX" && allElements[j].getAttribute("key")!=(("GENERAL_682")||("GENERAL_84"))){
                  if(allElements[j].getAttribute("key")=="GENERAL_4"){
                    manString +="\nResponsible Individual,"+allElements[j].getElementsByTagName("data")[0].textContent.trim().replace(/(\r\n|\n|\r)/gm, "")
                  }
                  if(allElements[j].getAttribute("key")=="GENERAL_5"){
                    manString +="\nManufacturer's Reporting Official,"+allElements[j].getElementsByTagName("data")[0].textContent.trim().replace(/(\r\n|\n|\r)/gm, "")
                  }
                  if(allElements[j].getAttribute("key")=="GENERAL_81"){
                    manString +="\nReport Submitter,"+allElements[j].getElementsByTagName("data")[0].textContent.trim().replace(/(\r\n|\n|\r)/gm, "")
                  } 
                }
            }
            let laserString = ""
            let fileString = ""
            let laserElements = []
            for(let i = 0; i < allElements.length; i++){
              let key = allElements[i].getAttribute("key")
              console.log(key)
              if (key.length > 7 && key.substr(0, 7) == "IMNRSLP") {
                let vNum = parseInt(key.substr(8, key.length))
                let targets = [252,621,255,256,257,258,259,260,261,262,263,264,265,266,267,268,269,270,272,273,275,102]
                if (targets.indexOf(vNum) != -1) {
                  console.log(key)
                  laserString+="\n"+allElements[i].getElementsByTagName("questionText")[0].textContent.trim().replace(/(\r\n|\n|\r)/gm, "")+"," +allElements[i].getElementsByTagName("data")[0].textContent.trim().replace(/(\r\n|\n|\r)/gm, "")
                }
              }
              
              if(allElements[i].getAttribute("key")==("IMNRSLP_201")){
                fileString+="\n"+allElements[i].getElementsByTagName("questionText")[0].textContent.trim().replace(/(\r\n|\n|\r)/gm, "")+"," +allElements[i].getElementsByTagName("data")[0].textContent.trim().replace(/(\r\n|\n|\r)/gm, "")
              }
              
            }
            allElements
            // The for loop grabs the questions and answers from questionElements and places them into a string that will be converted into a csv file
            let csvString = "Question,Answer"
           
            for (let i = 0; i < questionElements.length; i++) {
                let ques = questionElements[i].getElementsByTagName("questionText")[0].textContent.trim().replace(/(\r\n|\n|\r)/gm, "")
                 let ans =  questionElements[i].getElementsByTagName("data")[0].textContent.trim().replace(/(\r\n|\n|\r)/gm, "")
                 let num = i+1
                csvString += `\n${num+". "}${ques.replace(/,/g, ' ')},${ans == "" ? "No Answer Given" : ans.replace(/,/g, ' ')}`
             }

            // This will convert the string into a csv file
            downloadCSV(csvString + manString + laserString + fileString)
            // // let csvContent = "data:text/csv;charset=utf-8," + csvString+ manString + laserString + fileString
            // var encodedUri = encodeURI(csvContent);
            // var link = document.createElement("a");
            // link.setAttribute("href", encodedUri);
            // link.setAttribute("download", "parsed.csv");
            // document.body.appendChild(link); // Required for FF

            // link.click();

        }
        r.readAsText(f);
    } else {
        alert("Failed to load file");
    }
}

function downloadCSV(csvString) {
  let csvContent = `${csvString}`
  let csvData = new Blob([csvContent], { type: 'text/csv' })
  let csvUrl = URL.createObjectURL(csvData)
  
  let a = document.createElement('a')
  a.href = csvUrl
  a.target = "_blank"
  a.download = 'export.csv'

  document.body.appendChild(a)
  a.click();
}