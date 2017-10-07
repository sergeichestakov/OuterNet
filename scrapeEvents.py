import os
import urllib.request
from bs4 import BeautifulSoup

wiki = 'https://en.wikipedia.org'
file_path = os.getcwd() + '\data'
months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September']

def scrapeMonth(month):
    currEvents = wiki + '/wiki/Portal:Current_events/' + month + '_2017'
    page = urllib.request.urlopen(currEvents)
    soup = BeautifulSoup(page, "html.parser")

    content = soup.find("div", {"id": "mw-content-text"})
    days = content.find_all('table', attrs={'role': 'presentation', 'class': 'vevent'})
    print(month)

    for day in days:
        scrapeDay(day, month)

def getArticle(article, directory):
    link = article.find('a')
    if not link:
        return
    title = link.string
    url = wiki + link.get('href')

    try: newpage = urllib.request.urlopen(url)
    except urllib.error.URLError as e:
        newpage = None

    if newpage and title:
        html = BeautifulSoup(newpage, "html.parser")
        file_name = directory + "\\" + title + ".html"
        print(file_name)
        try:
            with open(file_name, "w", encoding='utf-8') as file:
                file.write(html.prettify())
        except:
            pass



def scrapeDay(day, month):
    description = day.find('td', attrs={'class': 'description'})

    categories = description.find_all('dt')
    eventList = description.find_all('ul', recursive=False)

    index = 0
    for event in eventList:
        articles = event.find_all('li', recursive=False)
        try: category = categories[index].get_text()
        except IndexError: continue
        directory = file_path + '\\' + month + '\\' + category
        if not os.path.exists(directory):
            os.makedirs(directory)
        for article in articles:
            getArticle(article, directory)
        index+=1

for month in months:
    scrapeMonth(month)
