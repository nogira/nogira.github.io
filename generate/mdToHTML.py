def convert(md):
    
    lineArray = md.split('\n')
    html = ''
    inCodeBlock = False

    for line in lineArray:

        # put most common ones at the top so they get executed first
        if inCodeBlock == True:
            if line.startswith('```'):
                html += '</code></pre>\n'
                inCodeBlock = False
            else:
                html += line + '\n'

        else:

            # line-based formatting

            if line == '':
                html += '<br>\n'

            elif line.startswith('# '):
                html += f'<h1>{line[2:]}</h1>\n'

            elif line.startswith('## '):
                html += f'<h2>{line[3:]}</h2>\n'

            elif line.startswith('### '):
                html += f'<h3>{line[4:]}</h3>\n'

            elif line.startswith('- '):
                html += f'<li>{line[2:]}</li>\n'

            elif line.startswith('```'):
                if len(line) == 3:
                    html += '<pre><code class="language-none">'
                else:
                    html += f'<pre><code class="language-{line[3:]}">'

                inCodeBlock = True

            else:
                html += '<div>' + line + '</div>\n'


            # word/character-based formatting
            # if inCodeBlock == False:
                # change all 'html =' to 'temphtml =' so able to parse the current file

                # or tbh maybe i do it when the whole html file is done   <----

    return html