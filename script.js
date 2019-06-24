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
            let result = {};

            // Storing all of the contents in elements in an array called allElements
            let allElements = dom.getElementsByTagName("element")

            // The for loop places elements from allElements into questionElements based on if the attribute "masterType" is "SIMPLE_TEXT"
            // This is the attribute tag that contains the questions we are trying to access
            let questionElements = []
            for (let j = 0; j < allElements.length; j++) {
                if (allElements[j].getAttribute("masterType") == "SIMPLE_TEXT") {
                    questionElements.push(allElements[j])
                }
            }

            // The for loop grabs the questions and answers from questionElements and places them into a string that will be converted into a csv file
            let csvString = "Question,Answer"
            for (let i = 0; i < questionElements.length; i++) {
                let ques = questionElements[i].getElementsByTagName("questionText")[0].textContent.trim().replace(/(\r\n|\n|\r)/gm, "")
                let ans = questionElements[i].getElementsByTagName("data")[0].textContent.trim().replace(/(\r\n|\n|\r)/gm, "");
                csvString += `\n${ques.replace(/,/g, ' ')},${ans == "" ? "No Answer Given" : ans.replace(/,/g, ' ')}`
            }

            // This will convert the string into a csv file
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