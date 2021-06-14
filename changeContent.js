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

// markdown -> html

function mdToHTML(text) {
    var text_array = text.split('\n');
    var html = '';
    var inCodeBlock = false;

    for (i=0; i < text_array.length; i++) {
        var line = text_array[i]

        // put most common ones at the top so they get executed first
        if (inCodeBlock == true) {
            if (line.startsWith('\`\`\`')) {
                html += '</code></pre>\n';
                inCodeBlock = false;
            } else {
                html += line + '\n';
            }
        } else {

            // line-based formatting

            if (line.startsWith('\n')) {
                html += '<br>\n';
            }
            else if (line.startsWith('\w')) {
                html += '<p>' + line + '</p>\n';
            }
            else if (line.startsWith('# ')) {
                html += '<h1>' + line.substring(2) + '</h1>\n';
            }
            else if (line.startsWith('## ')) {
                html += '<h2>' + line.substring(3) + '</h2>\n';
            }
            else if (line.startsWith('### ')) {
                html += '<h3>' + line.substring(4) + '</h3>\n';
            }
            else if (line.startsWith('- ')) {
                html += '<li>' + line.substring(2) + '</li>\n';
            }
            else if (line.startsWith('\`\`\`')) {
                if (line.length == 3) {
                    html += '<pre><code class="language-none">';
                } else {
                    html += '<pre><code class="language-' + line.substring(3) + '">';
                }
                inCodeBlock = true;
            }
            else {
                html += line + '\n';
            }

            // word/character-based formatting
            if (inCodeBlock == false) {
                //change all 'html =' to 'temphtml =' so able to parse the current file

                // or tbh maybe i do it when the whole html file is done   <----
            }

        }    
    }

    return html

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

};


function changeContent(filePath) {
  //var content = loadFile(filePath);
  var content = "";
  fetch(filePath).then(x => x.text()).then(data => {content = data})

  html = mdToHTML(content);
  
  // replace text
  document.getElementById("content").innerHTML = html;

  // load prism script
  var script = document.createElement("script");
  script.src = 'prism/prism.js';
  document.body.appendChild(script);
}

//filePath example: "/posts/hello.txt"