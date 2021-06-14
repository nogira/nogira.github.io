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
  var content = loadFile(filePath);

  // markdown -> html

  // load prism
  content +='';

  // replace text
  document.getElementById("content").innerHTML = content;

  fetchInject(['prism/prism.js']);
}

//filePath example: "/posts/hello.txt"