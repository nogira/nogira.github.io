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
  var html = '';
  html +='';

  // replace text
  document.getElementById("content").innerHTML = content;

  // load prism script
  var script = document.createElement("script");
  script.src = 'prism/prism.js';
  document.body.appendChild(script);
}

//filePath example: "/posts/hello.txt"