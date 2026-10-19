"""Check actual initial HTML, not only metadata helper functions."""
from html.parser import HTMLParser
from pathlib import Path
import xml.etree.ElementTree as ET
import json
class Page(HTMLParser):
    def __init__(self):
        super().__init__(); self.h1=0; self.title=''; self.in_title=False; self.canonicals=[]; self.descriptions=[]; self.links=[]; self.noindex=False; self.script_type=None; self.structured=[]
    def handle_starttag(self, tag, attrs):
        a=dict(attrs)
        if tag=='h1': self.h1+=1
        if tag=='title': self.in_title=True
        if tag=='link' and a.get('rel')=='canonical': self.canonicals.append(a['href'])
        if tag=='meta' and a.get('name')=='description': self.descriptions.append(a.get('content',''))
        if tag=='meta' and a.get('name') in ['robots','googlebot'] and 'noindex' in a.get('content',''): self.noindex=True
        if tag=='a': self.links.append(a.get('href',''))
        if tag=='script': self.script_type=a.get('type')
    def handle_endtag(self,tag):
        if tag=='title': self.in_title=False
        if tag=='script': self.script_type=None
    def handle_data(self,data):
        if self.in_title: self.title+=data
        if self.script_type=='application/ld+json': self.structured.append(json.loads(data))
root=Path('out'); ns={'s':'http://www.sitemaps.org/schemas/sitemap/0.9'}
urls=[e.text for e in ET.parse(root/'sitemap.xml').findall('s:url/s:loc',ns)]
assert len(urls)==22 and len(set(urls))==22, urls
pages={}; titles=set(); descriptions=set()
for url in urls:
    path=url.removeprefix('https://puredevutils.com') or '/'
    filename=root/('index.html' if path=='/' else path.lstrip('/')+'.html')
    html=filename.read_text(); page=Page(); page.feed(html)
    assert page.h1==1,(path,'h1',page.h1)
    assert page.canonicals==[url],(path,'canonical',page.canonicals)
    assert page.title and page.title not in titles,(path,'title')
    assert len(page.descriptions)==1 and page.descriptions[0] not in descriptions,(path,'description')
    assert not page.noindex,(path,'noindex')
    assert 'googletagmanager.com' not in html and 'cloudflareinsights.com' not in html,path
    assert all(d.get('@type')!='SearchAction' and 'potentialAction' not in d for d in page.structured)
    if path.startswith('/tools/'):
        assert 'Limitations and details' in html and 'How to use' in html,path
    for href in page.links:
        if href.startswith('/') and not href.startswith('//'):
            target=href.split('#')[0] or '/'
            assert target in ['/', '/favicon.ico'] or (root/(target.lstrip('/')+'.html')).exists(),(path,'broken link',href)
    titles.add(page.title); descriptions.add(page.descriptions[0]); pages[path]=page
for path in pages:
    if path.startswith('/tutorials/'):
        assert any(path in p.links for route,p in pages.items() if route.startswith('/tools/')),(path,'orphan tutorial')
assert sum(d.get('@type')=='WebSite' for d in pages['/'].structured)==1
assert (root/'404.html').exists()
print(f'PASS: {len(pages)} public pages, unique titles/descriptions, one H1, self canonicals, initial HTML guides, structured data, internal links, and no application analytics scripts.')
