function loadFile(filePath) {
  var result = null;
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", filePath, false);
  xmlhttp.send();
  if (xmlhttp.status==200) {
    result = xmlhttp.responseText;
  }
  return result;
}


function changeContent(filePath) {
  var file = loadFile(filePath);
  document.getElementById("content").innerHTML = file;
}

//filePath example: "/posts/hello.txt"