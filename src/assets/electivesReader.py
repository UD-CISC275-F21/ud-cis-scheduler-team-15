import json
import re
from urllib.request import urlopen
 

#Run this script to retreive data on approved breadth electives
#Goes in the following order:
#Arts and Humanities, History and Cultural Change, Social and Behvioral Science, Math Nat Sci and Tech, COE upper
urls = ["https://catalog.udel.edu/preview_program.php?catoid=47&poid=34821", "https://catalog.udel.edu/preview_program.php?catoid=47&poid=34822", "https://catalog.udel.edu/preview_program.php?catoid=47&poid=34825", "https://catalog.udel.edu/preview_program.php?catoid=47&poid=34826", "https://catalog.udel.edu/preview_program.php?catoid=47&poid=34806"]
fs = ["./src/assets/ArtsHumanities.json", "./src/assets/HistoryCultural.json", "./src/assets/SocialBehavioral.json", "./src/assets/Tech.json", "./src/assets/COEupper.json"] 

for i in range(5): 
    url = urls[i]
    f = fs[i]

    page = urlopen(url)
    html_bytes = page.read()
    html = html_bytes.decode("utf-8")
    courses = re.findall("\w\w\w\w? \d\d\d", html)
    data = json.dumps(courses)
    file = open(f,"w")
    file.write(data)
    file.close()



