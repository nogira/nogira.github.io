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
  var content_array = content.split('\n');
  var html = '';
  var inCodeBlock = false;

  for (i=0; i < content_array.length; i++) {
    if (startsWith('\`\`\`')) {
      if (content_array[i].length == 3) {
        html += '<pre><code class="language-none">';
      } else {
        html += '<pre><code class="language-' + content_array[i].substring(3) + '">';
      }
    }
  }



//  for (i=0; i < content.length; i++) {
    // grab first 4 characters at position i
//    if (content.substr(i, 4) == '\n```'){
      
      // find space after
//      for (j=0; j < content.length; j++) {
//        if (content[i+j] = ' ') {
        
//        }
//      }
//html += '\n<code>'
//    } else {
//      html += content[i]
//    }
//  }
  

  // replace text
  document.getElementById("content").innerHTML = content;

  // load prism script
  var script = document.createElement("script");
  script.src = 'prism/prism.js';
  document.body.appendChild(script);
}

//filePath example: "/posts/hello.txt"