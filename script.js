var char_tag = document.getElementById("chars");
var result_element = document.getElementById("result");
var chars = "";



function predict(base64) {

  Swal.showLoading()
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = () => {
    if (xmlhttp.readyState == 4) {
      Swal.close();
      result = JSON.parse(xmlhttp.responseText); 
      x=0;
      var result_char="";
      result.forEach((element) => {
        
        
        if(x>0){
          result_char += " and "+element ;
        }
        else{
          result_char += element + "";
        }
        x=x+1;
      });

      if(result_char==""){
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Cannot find any clear face!',
          footer: '<a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">Please try with another image.</a>'
        })
      }
      else
      Swal.fire({
        text: 'I think this is '+result_char,
        imageUrl: base64,
        imageHeight: 200,
        imageAlt: 'Custom image',
      })
    }
  };
  xmlhttp.open("POST", `https://celebrityapi.herokuapp.com/predict`, true);
  xmlhttp.setRequestHeader("Content-type", "application/json");
  xmlhttp.send(`{"img":"${base64}"}`);
}

function getCelebrities() {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", `https://celebrityapi.herokuapp.com/getCelebrities`, true);
  xmlhttp.send();
  xmlhttp.onreadystatechange = () => {
    if (xmlhttp.readyState == 4) {
      celebrities = JSON.parse(xmlhttp.responseText);
      celebrities.forEach((element) => {
        chars += element + " ";
      });
      char_tag.innerHTML = chars;
    }
  };
}
getCelebrities(); 



Dropzone.autoDiscover = false;


    let dz = new Dropzone("#my-awesome-dropzone", {
        maxFiles: 1,
        addRemoveLinks: true,
        dictDefaultMessage: "<img src='images/dragan.png' style='height:100px;'>",
        thumbnailWidth: 1140,//the "size of image" width at px
        thumbnailHeight: 380,
    });
    
    dz.on("addedfile", function() {
        if (dz.files[1]!=null) {
            dz.removeFile(dz.files[0]);        
        }
    });

    dz.on("complete", function (file) {
        let imageData = file.dataURL;
        var url = "http://127.0.0.1:8000/predict";
        predict(imageData);
    });


    