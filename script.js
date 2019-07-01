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
                  let name = allElements[j].getElementsByTagName("name")[0].textContent.trim().replace(/(\r\n|\n|\r)/gm, "")
                  let physicalAddress = {
                    line1: allElements[j].getElementsByTagName("physicalAddress.line1")[0].textContent.trim().replace(/(\r\n|\n|\r)/gm, ""),
                    line2: allElements[j].getElementsByTagName("physicalAddress.line2")[0].textContent.trim().replace(/(\r\n|\n|\r)/gm, ""),
                    country: allElements[j].getElementsByTagName("physicalAddress.country")[0].textContent.trim().replace(/(\r\n|\n|\r)/gm, ""),
                    city: allElements[j].getElementsByTagName("physicalAddress.city")[0].textContent.trim().replace(/(\r\n|\n|\r)/gm, ""),
                    state: allElements[j].getElementsByTagName("physicalAddress.state")[0].textContent.trim().replace(/(\r\n|\n|\r)/gm, ""),
                    zipCode: allElements[j].getElementsByTagName("physicalAddress.zipCode")[0].textContent.trim().replace(/(\r\n|\n|\r)/gm, ""),
                    telephone: allElements[j].getElementsByTagName("physicalAddress.telephone")[0].textContent.trim().replace(/(\r\n|\n|\r)/gm, ""),
                    fax: allElements[j].getElementsByTagName("physicalAddress.fax")[0].textContent.trim().replace(/(\r\n|\n|\r)/gm, "")
                  }
                  let mailingAddress = {
                    line1: allElements[j].getElementsByTagName("mailingAddress.line1")[0].textContent.trim().replace(/(\r\n|\n|\r)/gm, ""),
                    line2: allElements[j].getElementsByTagName("mailingAddress.line2")[0].textContent.trim().replace(/(\r\n|\n|\r)/gm, ""),
                    country: allElements[j].getElementsByTagName("mailingAddress.country")[0].textContent.trim().replace(/(\r\n|\n|\r)/gm, ""),
                    city: allElements[j].getElementsByTagName("mailingAddress.city")[0].textContent.trim().replace(/(\r\n|\n|\r)/gm, ""),
                    state: allElements[j].getElementsByTagName("mailingAddress.state")[0].textContent.trim().replace(/(\r\n|\n|\r)/gm, ""),
                  }
                  manString += "\nManufacturer Responsible," +name
                  manString += "\nPhysical Address Line 1," +physicalAddress.line1
                  manString += "\nPhysical Address Line 1," +physicalAddress.line2
                  manString += "\nPhysical Address Country," +physicalAddress.country
                  manString += "\nPhysical Address City," +physicalAddress.city
                  manString += "\nPhysical Address State," +physicalAddress.state
                  manString += "\nPhysical Address Zipcode," +physicalAddress.zipCode
                  manString += "\nPhysical Address Telephone," +physicalAddress.telephone
                  manString += "\nPhysical Address Fax," +physicalAddress.fax
                  
                  manString += "\nMailing Address Line 1," +mailingAddress.line1
                  manString += "\nMailing Address Line 1," +mailingAddress.line2
                  manString += "\nMailing Address Country," +mailingAddress.country
                  manString += "\nMailing Address City," +mailingAddress.city
                  manString += "\nMailing Address State," +mailingAddress.state
                }
                else if(allElements[j].getAttribute("masterType")=="CONTACT_COMPLEX" && allElements[j].getAttribute("key")!=(("GENERAL_682")||("GENERAL_84"))){
                  if(allElements[j].getAttribute("key")=="GENERAL_4"){
                    manString +="\nResponsible Individual,"+allElements[j].getElementsByTagName("titleName")[0].textContent.trim().replace(/(\r\n|\n|\r)/gm, "")
                      +allElements[j].getElementsByTagName("firstName")[0].textContent.trim().replace(/(\r\n|\n|\r)/gm, "")
                      +allElements[j].getElementsByTagName("middleName")[0].textContent.trim().replace(/(\r\n|\n|\r)/gm, "")
                      +allElements[j].getElementsByTagName("lastName")[0].textContent.trim().replace(/(\r\n|\n|\r)/gm, "")

                    manString +="\nIndividual Occupation,"+allElements[j].getElementsByTagName("occupation")[0].textContent.trim().replace(/(\r\n|\n|\r)/gm, "")
                    manString +="\nIndividual Email,"+allElements[j].getElementsByTagName("email")[0].textContent.trim().replace(/(\r\n|\n|\r)/gm, "")
                    manString +="\nIndividual (Company) Name,"+allElements[j].getElementsByTagName("name")[0].textContent.trim().replace(/(\r\n|\n|\r)/gm, "")
                    manString +="\nIndividual Division,"+allElements[j].getElementsByTagName("division")[0].textContent.trim().replace(/(\r\n|\n|\r)/gm, "")

                    let physicalAddress = {
                      line1: allElements[j].getElementsByTagName("physicalAddress.line1")[0].textContent.trim().replace(/(\r\n|\n|\r)/gm, ""),
                      line2: allElements[j].getElementsByTagName("physicalAddress.line2")[0].textContent.trim().replace(/(\r\n|\n|\r)/gm, ""),
                      country: allElements[j].getElementsByTagName("physicalAddress.country")[0].textContent.trim().replace(/(\r\n|\n|\r)/gm, ""),
                      city: allElements[j].getElementsByTagName("physicalAddress.city")[0].textContent.trim().replace(/(\r\n|\n|\r)/gm, ""),
                      state: allElements[j].getElementsByTagName("physicalAddress.state")[0].textContent.trim().replace(/(\r\n|\n|\r)/gm, ""),
                      zipCode: allElements[j].getElementsByTagName("physicalAddress.zipCode")[0].textContent.trim().replace(/(\r\n|\n|\r)/gm, ""),
                      telephone: allElements[j].getElementsByTagName("physicalAddress.telephone")[0].textContent.trim().replace(/(\r\n|\n|\r)/gm, ""),
                      fax: allElements[j].getElementsByTagName("physicalAddress.fax")[0].textContent.trim().replace(/(\r\n|\n|\r)/gm, "")
                    }

                    let mailingAddress = {
                      line1: allElements[j].getElementsByTagName("mailingAddress.line1")[0].textContent.trim().replace(/(\r\n|\n|\r)/gm, ""),
                      line2: allElements[j].getElementsByTagName("mailingAddress.line2")[0].textContent.trim().replace(/(\r\n|\n|\r)/gm, ""),
                      country: allElements[j].getElementsByTagName("mailingAddress.country")[0].textContent.trim().replace(/(\r\n|\n|\r)/gm, ""),
                      city: allElements[j].getElementsByTagName("mailingAddress.city")[0].textContent.trim().replace(/(\r\n|\n|\r)/gm, ""),
                      state: allElements[j].getElementsByTagName("mailingAddress.state")[0].textContent.trim().replace(/(\r\n|\n|\r)/gm, ""),
                    }

                    manString += "\nPhysical Address Line 1," +physicalAddress.line1
                    manString += "\nPhysical Address Line 1," +physicalAddress.line2
                    manString += "\nPhysical Address Country," +physicalAddress.country
                    manString += "\nPhysical Address City," +physicalAddress.city
                    manString += "\nPhysical Address State," +physicalAddress.state
                    manString += "\nPhysical Address Zipcode," +physicalAddress.zipCode
                    manString += "\nPhysical Address Telephone," +physicalAddress.telephone
                    manString += "\nPhysical Address Fax," +physicalAddress.fax
                    manString += "\nMailing Address Line 1," +mailingAddress.line1
                    manString += "\nMailing Address Line 1," +mailingAddress.line2
                    manString += "\nMailing Address Country," +mailingAddress.country
                    manString += "\nMailing Address City," +mailingAddress.city
                    manString += "\nMailing Address State," +mailingAddress.state
                  }
                  if(allElements[j].getAttribute("key")=="GENERAL_5"){
                    manString +="\nManufacturer's Reporting Official,"+allElements[j].getElementsByTagName("titleName")[0].textContent.trim().replace(/(\r\n|\n|\r)/gm, "")
                      +allElements[j].getElementsByTagName("firstName")[0].textContent.trim().replace(/(\r\n|\n|\r)/gm, "")
                      +allElements[j].getElementsByTagName("middleName")[0].textContent.trim().replace(/(\r\n|\n|\r)/gm, "")
                      +allElements[j].getElementsByTagName("lastName")[0].textContent.trim().replace(/(\r\n|\n|\r)/gm, "")
                      
                    manString +="\nManufacturer's Reporting Official Occupation,"+allElements[j].getElementsByTagName("occupation")[0].textContent.trim().replace(/(\r\n|\n|\r)/gm, "")
                    manString +="\nManufacturer's Reporting Official Email,"+allElements[j].getElementsByTagName("email")[0].textContent.trim().replace(/(\r\n|\n|\r)/gm, "")
                    manString +="\nManufacturer's Reporting Official (Company) Name,"+allElements[j].getElementsByTagName("name")[0].textContent.trim().replace(/(\r\n|\n|\r)/gm, "")
                    manString +="\nManufacturer's Reporting Division,"+allElements[j].getElementsByTagName("division")[0].textContent.trim().replace(/(\r\n|\n|\r)/gm, "")
                    

                    let physicalAddress = {
                      line1: allElements[j].getElementsByTagName("physicalAddress.line1")[0].textContent.trim().replace(/(\r\n|\n|\r)/gm, ""),
                      line2: allElements[j].getElementsByTagName("physicalAddress.line2")[0].textContent.trim().replace(/(\r\n|\n|\r)/gm, ""),
                      country: allElements[j].getElementsByTagName("physicalAddress.country")[0].textContent.trim().replace(/(\r\n|\n|\r)/gm, ""),
                      city: allElements[j].getElementsByTagName("physicalAddress.city")[0].textContent.trim().replace(/(\r\n|\n|\r)/gm, ""),
                      state: allElements[j].getElementsByTagName("physicalAddress.state")[0].textContent.trim().replace(/(\r\n|\n|\r)/gm, ""),
                      zipCode: allElements[j].getElementsByTagName("physicalAddress.zipCode")[0].textContent.trim().replace(/(\r\n|\n|\r)/gm, ""),
                      telephone: allElements[j].getElementsByTagName("physicalAddress.telephone")[0].textContent.trim().replace(/(\r\n|\n|\r)/gm, ""),
                      fax: allElements[j].getElementsByTagName("physicalAddress.fax")[0].textContent.trim().replace(/(\r\n|\n|\r)/gm, "")
                    }

                    let mailingAddress = {
                      line1: allElements[j].getElementsByTagName("mailingAddress.line1")[0].textContent.trim().replace(/(\r\n|\n|\r)/gm, ""),
                      line2: allElements[j].getElementsByTagName("mailingAddress.line2")[0].textContent.trim().replace(/(\r\n|\n|\r)/gm, ""),
                      country: allElements[j].getElementsByTagName("mailingAddress.country")[0].textContent.trim().replace(/(\r\n|\n|\r)/gm, ""),
                      city: allElements[j].getElementsByTagName("mailingAddress.city")[0].textContent.trim().replace(/(\r\n|\n|\r)/gm, ""),
                      state: allElements[j].getElementsByTagName("mailingAddress.state")[0].textContent.trim().replace(/(\r\n|\n|\r)/gm, ""),
                    }

                    manString += "\nPhysical Address Line 1," +physicalAddress.line1
                    manString += "\nPhysical Address Line 1," +physicalAddress.line2
                    manString += "\nPhysical Address Country," +physicalAddress.country
                    manString += "\nPhysical Address City," +physicalAddress.city
                    manString += "\nPhysical Address State," +physicalAddress.state
                    manString += "\nPhysical Address Zipcode," +physicalAddress.zipCode
                    manString += "\nPhysical Address Telephone," +physicalAddress.telephone
                    manString += "\nPhysical Address Fax," +physicalAddress.fax
                    manString += "\nMailing Address Line 1," +mailingAddress.line1
                    manString += "\nMailing Address Line 1," +mailingAddress.line2
                    manString += "\nMailing Address Country," +mailingAddress.country
                    manString += "\nMailing Address City," +mailingAddress.city
                    manString += "\nMailing Address State," +mailingAddress.state
                  }
                  if(allElements[j].getAttribute("key")=="GENERAL_81"){
                    manString +="\nReport Submitter,"+allElements[j].getElementsByTagName("titleName")[0].textContent.trim().replace(/(\r\n|\n|\r)/gm, "")
                      +allElements[j].getElementsByTagName("firstName")[0].textContent.trim().replace(/(\r\n|\n|\r)/gm, "")
                      +allElements[j].getElementsByTagName("middleName")[0].textContent.trim().replace(/(\r\n|\n|\r)/gm, "")
                      +allElements[j].getElementsByTagName("lastName")[0].textContent.trim().replace(/(\r\n|\n|\r)/gm, "")
                      
                    manString +="\nReport Submitter Occupation,"+allElements[j].getElementsByTagName("occupation")[0].textContent.trim().replace(/(\r\n|\n|\r)/gm, "")
                    manString +="\nReport Submitter Email,"+allElements[j].getElementsByTagName("email")[0].textContent.trim().replace(/(\r\n|\n|\r)/gm, "")
                    manString +="\nReport Submitter (Company) Name,"+allElements[j].getElementsByTagName("name")[0].textContent.trim().replace(/(\r\n|\n|\r)/gm, "")
                    manString +="\nReport Submitter Division,"+allElements[j].getElementsByTagName("division")[0].textContent.trim().replace(/(\r\n|\n|\r)/gm, "")
                    

                    let physicalAddress = {
                      line1: allElements[j].getElementsByTagName("physicalAddress.line1")[0].textContent.trim().replace(/(\r\n|\n|\r)/gm, ""),
                      line2: allElements[j].getElementsByTagName("physicalAddress.line2")[0].textContent.trim().replace(/(\r\n|\n|\r)/gm, ""),
                      country: allElements[j].getElementsByTagName("physicalAddress.country")[0].textContent.trim().replace(/(\r\n|\n|\r)/gm, ""),
                      city: allElements[j].getElementsByTagName("physicalAddress.city")[0].textContent.trim().replace(/(\r\n|\n|\r)/gm, ""),
                      state: allElements[j].getElementsByTagName("physicalAddress.state")[0].textContent.trim().replace(/(\r\n|\n|\r)/gm, ""),
                      zipCode: allElements[j].getElementsByTagName("physicalAddress.zipCode")[0].textContent.trim().replace(/(\r\n|\n|\r)/gm, ""),
                      telephone: allElements[j].getElementsByTagName("physicalAddress.telephone")[0].textContent.trim().replace(/(\r\n|\n|\r)/gm, ""),
                      fax: allElements[j].getElementsByTagName("physicalAddress.fax")[0].textContent.trim().replace(/(\r\n|\n|\r)/gm, "")
                    }

                    let mailingAddress = {
                      line1: allElements[j].getElementsByTagName("mailingAddress.line1")[0].textContent.trim().replace(/(\r\n|\n|\r)/gm, ""),
                      line2: allElements[j].getElementsByTagName("mailingAddress.line2")[0].textContent.trim().replace(/(\r\n|\n|\r)/gm, ""),
                      country: allElements[j].getElementsByTagName("mailingAddress.country")[0].textContent.trim().replace(/(\r\n|\n|\r)/gm, ""),
                      city: allElements[j].getElementsByTagName("mailingAddress.city")[0].textContent.trim().replace(/(\r\n|\n|\r)/gm, ""),
                      state: allElements[j].getElementsByTagName("mailingAddress.state")[0].textContent.trim().replace(/(\r\n|\n|\r)/gm, ""),
                    }

                    manString += "\nPhysical Address Line 1," +physicalAddress.line1
                    manString += "\nPhysical Address Line 1," +physicalAddress.line2
                    manString += "\nPhysical Address Country," +physicalAddress.country
                    manString += "\nPhysical Address City," +physicalAddress.city
                    manString += "\nPhysical Address State," +physicalAddress.state
                    manString += "\nPhysical Address Zipcode," +physicalAddress.zipCode
                    manString += "\nPhysical Address Telephone," +physicalAddress.telephone
                    manString += "\nPhysical Address Fax," +physicalAddress.fax
                    manString += "\nMailing Address Line 1," +mailingAddress.line1
                    manString += "\nMailing Address Line 1," +mailingAddress.line2
                    manString += "\nMailing Address Country," +mailingAddress.country
                    manString += "\nMailing Address City," +mailingAddress.city
                    manString += "\nMailing Address State," +mailingAddress.state
                  } 
                }
            }
            let laserString = ""
            let fileString = ""
            let laserElements = []
            for(let i = 0; i < allElements.length; i++){
              let key = allElements[i].getAttribute("key")
              if (key.length > 7 && key.substr(0, 7) == "IMNRSLP") {
                let vNum = parseInt(key.substr(8, key.length))
                let targets = [252,621,255,256,257,258,259,260,261,262,263,264,265,266,267,268,269,270,272,273,275,102]
                if (targets.indexOf(vNum) != -1) {
                  laserString+="\n"+allElements[i].getElementsByTagName("questionText")[0].textContent.trim().replace(/(\r\n|\n|\r)/gm, "")+"," +allElements[i].getElementsByTagName("data")[0].textContent.trim().replace(/(\r\n|\n|\r)/gm, "")
                }
              }
              
              if(allElements[i].getAttribute("key")==("IMNRSLP_201")){
                Array.from(allElements[i].getElementsByTagName("item")).forEach(item => {
                  let file = {
                    fileID: allElements[i].getElementsByTagName("fileID")[0].textContent.trim().replace(/(\r\n|\n|\r)/gm, ""),
                    fileTitle: allElements[i].getElementsByTagName("fileTitle")[0].textContent.trim().replace(/(\r\n|\n|\r)/gm, ""),
                    fileName: allElements[i].getElementsByTagName("fileName")[0].textContent.trim().replace(/(\r\n|\n|\r)/gm, ""),
                    fileDescription: allElements[i].getElementsByTagName("fileDescription")[0].textContent.trim().replace(/(\r\n|\n|\r)/gm, ""),
                    fileLanguage: allElements[i].getElementsByTagName("fileLanguage")[0].textContent.trim().replace(/(\r\n|\n|\r)/gm, ""),
                    r_object_id: allElements[i].getElementsByTagName("r_object_id")[0].textContent.trim().replace(/(\r\n|\n|\r)/gm, "")
                  }
                  fileString += "\nQuestion Text," + allElements[i].getElementsByTagName("questionText")[0].textContent.trim().replace(/(\r\n|\n|\r)/gm, "")
                  fileString += "\nfileID," + file.fileID
                  fileString += "\nfileTitle," + file.fileTitle
                  fileString += "\nfileName," + file.fileName
                  fileString += "\nfileDescription," + file.fileDescription
                  fileString += "\nfileLanguage," + file.fileLanguage
                  fileString += "\nr_object_id," + file.r_object_id
                })
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

            downloadCSV(csvString + manString + laserString + fileString)
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