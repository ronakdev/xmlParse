document.getElementById('xmlFile').addEventListener('change', readSingleFile, false);

function readSingleFile(evt) {
    //Retrieve the first (and only!) File from the FileList object
    var f = evt.target.files[0]; 
    console.group("Questions and Answers")
    if (f) {
      var r = new FileReader();
      r.onload = function(e) { 
	    let contents = e.target.result;
        // console.log(contents)
        // contents = contents.replace(/<!\[CDATA\[/g, '')
        // contents = contents.replace(/]]/g, "")
        let parser = new DOMParser();
        let dom = parser.parseFromString(contents,"text/xml");
        let result = {};
        
        //console.log(dom)
       // console.log("Report Name" + dom.getElementsByTagName("reportPropertyList")[0].getElementsByTagName("reportName")[0].innerHTML)
       // document.getElementById("data").innerHTML = 
          contents//.getElementsByTagName("reportPropertyList")[0].innerHTML
        //console.log('wow')
        let allElements = dom.getElementsByTagName("element")
        //allElements.getElementsByTagName("")
        let questionElements = []
        for (let j = 0; j < allElements.length; j++) {
          if(allElements[j].getAttribute("masterType") == "SIMPLE_TEXT") {
            questionElements.push(allElements[j])
          }
        }
        //console.log(questionElements)
        let csvString = "Question,Answer"
        for(let i = 0; i < questionElements.length; i++){
          let ques = questionElements[i].getElementsByTagName("questionText")[0].textContent.trim().replace(/(\r\n|\n|\r)/gm, "")
          let ans = questionElements[i].getElementsByTagName("data")[0].textContent.trim().replace(/(\r\n|\n|\r)/gm, "");
          csvString += `\n${ques.replace(/,/g, ' ')},${ans == "" ? "No Answer Given" : ans.replace(/,/g, ' ')}`
          
          //console.count("Counting...")
        }
        let csvContent = "data:text/csv;charset=utf-8," + csvString
        var encodedUri = encodeURI(csvContent);
var link = document.createElement("a");
link.setAttribute("href", encodedUri);
link.setAttribute("download", "parsed.csv");
document.body.appendChild(link); // Required for FF

link.click();

      }
      r.readAsText(f);
    } else { 
      alert("Failed to load file");
    }
  }