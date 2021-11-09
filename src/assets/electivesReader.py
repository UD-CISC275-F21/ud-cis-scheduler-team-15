import json
import re
from urllib.request import urlopen
 

#Run this script to retreive data on approved breadth electives

url = "https://catalog.udel.edu/preview_program.php?catoid=47&poid=34821"
page = urlopen(url)
html_bytes = page.read()
html = html_bytes.decode("utf-8")
courses = re.findall("\w\w\w\w? \d\d\d", html)
data = json.dumps(courses)
f = "./src/assets/ArtsHumanities.json"
file = open(f,"w")
file.write(data)
file.close()
file = open(f,"r")
print(file.read())



