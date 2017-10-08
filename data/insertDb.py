import os
import requests, sys
import MySQLdb
from bs4 import BeautifulSoup
import unicodedata
try:
    import urllib.request as urllib2
except ImportError:
    import urllib2
import re
from os.path import dirname
from time import sleep


db = MySQLdb.connect(host="localhost",    # your host, usually localhost
                     user="root",         # your username
                     passwd="",  # your password
                     db="smartnet",
                     charset='utf8')        # name of the data base
cur = db.cursor()
db.set_character_set('utf8')
cur.execute('SET NAMES utf8;')
cur.execute('SET CHARACTER SET utf8;')
cur.execute('SET character_set_connection=utf8;')

def find_files(directory): #Function to recursivly loop through all files and minify.
    for filename in os.listdir(directory):
        if (os.path.isdir(os.path.join(directory, filename))): #Checks if the file is directory
            find_files(os.path.join(directory, filename))
        if filename.endswith(".html"): # Checks for css files
                print(dirname(dirname(__file__)))

                path = os.path.join(directory, filename) # Creates path
                month = str((('\\'.join(path.split('\\')[7:])).split('\\')[:1])) ##
                month = month.replace('[', '')
                month = str(month.replace(']', '').replace("'", ""))
                if not "may" in month:
                    continue
                month = "may"
                title = filename
                title = str(title).replace("'","")
                #print(title , " catagory: " , os.path.basename(directory))
                category = os.path.basename(directory) ###
                #body = open(path, 'r').read()
                url = "https://www.google.com/search?q=" + title.replace(".html","").replace(" ","+") + "+Wikipedia"
                temp = ""
                for char in url:
                    if ord(char) <= 127:
                        temp += char
                url = temp
                opener = urllib2.build_opener()
                opener.addheaders = [('User-agent', 'Mozilla/5.0')]
                print(url)
                content = opener.open(url).read()
                soup = BeautifulSoup(content, "html.parser")
                desc = soup.findAll("span", { "class" : "st" })[0].text
                desc = unicodedata.normalize('NFD', desc).encode('ascii', 'ignore')
                desc = desc.strip()
                desc = str(desc).replace("'", "")
                desc = desc[1:]

                #sql = "INSERT INTO home_articles (title, location, category, month, description) VALUES ('%s', '%s', '%s', '%s', '%s')"
                #cur.execute(sql, (title, '1738.69.911', str(category), str(month), desc))

                #    cur.execute("SELECT title FROM home_articles")
                #    for t in cur:
                #        print(t)
                try:
                    cur.execute("INSERT INTO home_articles (title, location, category, month, description) VALUES ('%s', '%s', '%s', '%s', '%s') " % (title, '1738.69.911', str(category), str(month), desc))
                except (MySQLdb.Error, MySQLdb.Warning) as e:
                    cur.execute("INSERT INTO home_articles (title, location, category, month) VALUES ('%s', '%s', '%s', '%s') " % (title, '1738.69.911', str(category), str(month)))
                except Error as e:
                    print('well too bad')
                db.commit()
                sleep(0.2)


                #response = compress(data)

                #wr = open(path, 'w') # Opens current local file.
                #wr.write(response) # Overwrites the local file.
                continue
        else:
            continue

find_files(os.getcwd()) #Calls the function with the current directory
#cur.execute("INSERT INTO home_articles (title, location, category, month, description) VALUES ('hi', 'hi', 'hi', 'hi', 'hi') ")
'''
url = "https://www.google.com/search?q=2017+Jerusalem+Light+Rail+stabbing+wikipedia";
opener = urllib2.build_opener()
opener.addheaders = [('User-agent', 'Mozilla/5.0')]
content = opener.open(url).read()
soup = BeautifulSoup(content, "html.parser")
found = soup.findAll("span", { "class" : "st" })[0].text
print(found)
'''
db.commit()
cur.close()
