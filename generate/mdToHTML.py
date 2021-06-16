def convert(md):
    
    lineArray = md.split('\n')
    html = ''
    inCodeBlock = False
    inBold = False
    inInlineCode = False

    for line in lineArray:
        html_line = ""

        # put most common ones at the top so they get executed first
        if inCodeBlock == True:
            if line.startswith('```'):
                html_line += '</code></pre>\n'
                inCodeBlock = False
            else:
                html_line += line + '\n'

        else:

            # line-based formatting

            if line == '':
                html_line += '<br>\n'

            elif line.startswith('# '):
                html_line += f'<h1>{line[2:]}</h1>\n'

            elif line.startswith('## '):
                html_line += f'<h2>{line[3:]}</h2>\n'

            elif line.startswith('### '):
                html_line += f'<h3>{line[4:]}</h3>\n'

            elif line.startswith('- '):
                html_line += f'<li>{line[2:]}</li>\n'

            elif line.startswith('```'):
                if len(line) == 3:
                    html_line += '<pre><code class="language-none">'
                else:
                    html_line += f'<pre><code class="language-{line[3:]}">'

                inCodeBlock = True

            elif line == '---':
                html_line += '<hr noshade>\n'

            elif line.startswith('![[https://'):
                URLandwidth = line[3:-2]
                URLandwidth = URLandwidth.split('|')
                URL = URLandwidth[0]
                if len(URLandwidth) > 1:
                    width = URLandwidth[1]
                    html_line = f'<img src="{URL}" width="{width}px" alt="" />\n'
                else:
                    html_line = f'<img src="{URL}" alt="" />\n'
                
            else:
                html_line += '<div>' + line + '</div>\n'


            # word/character-based formatting
            if inCodeBlock == False:
                
                if html_line.startswith('<div>https://'):
                    if ' ' in html_line:
                        index = html_line.find(' ')
                        html_line = f'<div><a href="{html_line[5:index]}">'\
                            f'{html_line[5:index]}</a>{html_line[index:]}'
                    else:
                        html_line = f'<div><a href="{html_line[5:-7]}">{html_line[5:-7]}</a></div>\n'

                # convert to link so removes space at front, then loop to find
                # another link until no links left
                while ' https://' in html_line:
                    index = html_line.find(' https://')
                    tempstr = html_line[index+1:]
                    linkEnd = tempstr.find(' ')
                    link = html_line[index+1:index+1+linkEnd]
                    html_line = html_line.replace(link, f'<a href="{link}">{link}</a>')

                # [link](https://)
                while '](https://' in html_line:
                    index = html_line.find('](https://')
                    start = html_line[:index].rfind('[')
                    end = index + html_line[index:].find(')')
                    text = html_line[start+1:index]
                    link = html_line[index+2:end];print(html_line[start:end+1])
                    html_line = html_line.replace(html_line[start:end+1],
                        f'<a href="{link}">{text}</a>')

                while '**' in html_line:
                    if inBold == False:
                        html_line = html_line.replace('**', '<b>', 1)
                        inBold = True
                    else:
                        html_line = html_line.replace('**', '</b>', 1)
                        inBold = False

                while '`' in html_line:
                    if inInlineCode == False:
                        html_line = html_line.replace('`', '<code class="language-none">', 1)
                        inInlineCode = True
                    else:
                        html_line = html_line.replace('`', '</code>', 1)
                        inInlineCode = False
                


        html += html_line

    return html