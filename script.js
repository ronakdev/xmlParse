

function readSingleFile(evt) {
    //Retrieve the first (and only!) File from the FileList object
    var f = evt.target.files[0]; 

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
        
        console.log(dom)
        console.log("Report Name" + dom.getElementsByTagName("reportPropertyList")[0].getElementsByTagName("reportName")[0].innerHTML)
        document.getElementById("data").innerHTML = 
          contents//.getElementsByTagName("reportPropertyList")[0].innerHTML
        console.log('wow')
      }
      r.readAsText(f);
    } else { 
      alert("Failed to load file");
    }
  }
           
document.getElementById('file').addEventListener('change', readSingleFile, false);
