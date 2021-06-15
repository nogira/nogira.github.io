import os
posts = os.listdir('../md_posts')
# print(posts)

# sort posts by date ---------------------------------------

# convert dates to days
def convertDateToDays(post):
    date = post[:post.find(' ')]
    DMY = date.split('-')
    day = int(DMY[0])
    month = int(DMY[1])
    year = int(DMY[2])
    return day + (month * 30) + (year * 365)  # note: will need to change the year
                                              #       from 2 digits to 4 in 2100

# create dict & list to allow sorting
posts_dict = {convertDateToDays(post): post for post in posts}
# largest first (the most recent post should be at top of page)
sorted_posts = sorted(posts_dict, reverse=True)

# create new sorted list of posts
posts = []
for days in sorted_posts:
    posts.append(posts_dict[days])
# ----------------------------------------------------------

htmlForIndex = ""
for post in posts:
    title = post[(post.find(' ') + 1):-4]
    date = post[:post.find(' ')].replace('-', '/')
    # print(title, ", ", date)

    # create html file per post -------------------------------------------------------
    filename = post[:-4].replace(' ', '_')

    


    with open('template.html', 'r') as template, \
         open(f'../md_posts/{post}', 'r') as content, \
         open(f'../html_posts/{filename}.html', 'w') as newfile:

        # add content
        html = template.read()
        import mdToHTML
        content = mdToHTML.convert(content.read())
        html = html.replace('<div id="content">', '<div id="content">\n' + content)

        # modify css/js/homr filepaths since the template is designed to be called from root
        html = html.replace('prism/', '../prism/').replace('main.css', '../main.css')\
            .replace('index.html', '../index.html')

        # write file
        newfile.write(html)

    
    # create html content for index.html ----------------------------------------------
    htmlForIndex += f'<li><a href="html_posts/{filename}.html">{title} - {date}</a></li>'
    if posts.index(post) + 1 < len(posts):
        htmlForIndex += '\n<br>\n'

    
with open('template.html', 'r') as template, \
     open('../index.html', 'w') as index:

    html = template.read()
    html = html.replace('<div id="content">', '<div id="content">\n' + htmlForIndex)
    index.write(html)


