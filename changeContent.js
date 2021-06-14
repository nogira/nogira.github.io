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
    var line = content_array[i]

    if (line.startsWith('# ')) {
      html += '<h1>' + line.substring(2) + '</h1>';
    }
    else if (line.startsWith('## ')) {
      html += '<h2>' + line.substring(3) + '</h2>';
    }
    else if (line.startsWith('### ')) {
      html += '<h3>' + line.substring(4) + '</h3>';
    }
    else if (line.startsWith('- ')) {
      html += '<li>' + line.substring(2) + '</li>';
    }

    else if (line.startsWith('\`\`\`')) {
      if (line.length == 3) {
        html += '<pre><code class="language-none">';
      } else {
        html += '<pre><code class="language-' + line.substring(3) + '">';
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