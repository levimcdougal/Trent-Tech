import re,json,urllib.request,urllib.parse,concurrent.futures,pathlib,subprocess
from html.parser import HTMLParser
ROOT=pathlib.Path(__file__).resolve().parents[1]
BASE='https://trenttech.com'
class Node:
 def __init__(self,tag='',attrs=[],parent=None): self.tag=tag;self.attrs=dict(attrs);self.parent=parent;self.children=[]
class Parser(HTMLParser):
 def __init__(self): super().__init__(convert_charrefs=False);self.root=Node();self.cur=self.root
 def handle_starttag(self,tag,attrs):
  n=Node(tag,attrs,self.cur);self.cur.children.append(n)
  if tag not in ['img','br','hr','input','meta','link','source','wbr','area','embed']: self.cur=n
 def handle_endtag(self,tag):
  n=self.cur
  while n.parent:
   if n.tag==tag:self.cur=n.parent;break
   n=n.parent
 def handle_data(self,data):self.cur.children.append(data)
 def handle_entityref(self,name):self.cur.children.append('&'+name+';')
 def handle_charref(self,name):self.cur.children.append('&#'+name+';')
def walk(n):
 if isinstance(n,str):return
 yield n
 for c in n.children:yield from walk(c)
def fetch(url):
 return subprocess.check_output(['curl','-L','--fail','--retry','3','--silent','--max-time','60',url])
home=pathlib.Path('/tmp/trent-home.html').read_text(); p=Parser();p.feed(home)
nav=[n for n in walk(p.root) if n.attrs.get('class') in ['nav-1','nav-2']]
links=[]
for n in nav:
 for a in walk(n):
  if a.tag=='a' and a.attrs.get('href','') not in ['#','/']:
   url=urllib.parse.urljoin(BASE,a.attrs['href']);path=urllib.parse.urlparse(url).path
   if urllib.parse.urlparse(url).hostname in ['trenttech.com','www.trenttech.com'] and not path.lower().endswith('.pdf') and path not in links:links.append(path)
links += ['/clients','/routine-preventive-maintenance-program','/ashrae6298r']
def getpage(path):
 raw=fetch(BASE+path).decode();pa=Parser();pa.feed(raw);body=next(n for n in walk(pa.root) if n.tag=='body')
 content=[n for n in body.children if isinstance(n,Node) and n.tag not in ['script','nav'] and n.attrs.get('class') not in ['nav-1','nav-2','footer','start-saving section']]
 return path,content
pages=list(concurrent.futures.ThreadPoolExecutor(3).map(getpage,links))
images=set(re.findall(r'<img[^>]+src="([^"]+)"',home))
for _,nodes in pages:
 for n in nodes:
  for a in walk(n):
   if a.tag=='img' and a.attrs.get('src'):images.add(a.attrs['src'])
assets={}; errors=[]
(ROOT/'public/legacy').mkdir(parents=True,exist_ok=True)
def imageget(src):
 url=urllib.parse.urljoin(BASE,src);name=urllib.parse.unquote(urllib.parse.urlparse(url).path).replace('/','_').replace(' ','_')
 try:
  raw=fetch(url)
  if not pathlib.Path(name).suffix:
   name += '.png' if raw.startswith(b'\x89PNG') else '.jpg' if raw.startswith(b'\xff\xd8') else '.gif' if raw.startswith(b'GIF') else '.webp' if raw.startswith(b'RIFF') else ''
  (ROOT/'public/legacy'/name).write_bytes(raw);return src,'/legacy/'+name
 except Exception as e:return src,None
for src,dst in concurrent.futures.ThreadPoolExecutor(3).map(imageget,images):
 if dst:assets[src]=dst
 else:errors.append(src)
import html
void=['img','br','hr','source','wbr']
def render(n):
 if isinstance(n,str):return n
 if n.tag in ['script','style','form','input','button']:return ''
 attrs={}
 for k,v in n.attrs.items():
  if k in ['href','src','alt','title','colspan','rowspan','allowfullscreen']:attrs[k]=v or ''
 if n.tag=='iframe':attrs.update({'loading':'lazy','title':'Trent Technologies video presentation'})
 if 'src' in attrs:attrs['src']=assets.get(attrs['src'],urllib.parse.urljoin(BASE,attrs['src']))
 if 'href' in attrs:
  url=urllib.parse.urljoin(BASE,attrs['href']);up=urllib.parse.urlparse(url)
  if up.hostname in ['trenttech.com','www.trenttech.com'] and not re.search(r'\.(pdf|doc|docx|png|jpg|jpeg|gif)$',up.path.lower()):attrs['href']=up.path+ ('#'+up.fragment if up.fragment else '')
  else:attrs['href']=url
  if attrs['href'].startswith('http'):attrs.update({'target':'_blank','rel':'noopener noreferrer'})
 return '<'+n.tag+''.join(' '+k+'="'+html.escape(v,quote=True)+'"' for k,v in attrs.items())+'>'+''.join(render(c) for c in n.children)+('' if n.tag in void else '</'+n.tag+'>')
data=[]
for path,nodes in pages:
 title=next((''.join(c for c in n.children if isinstance(c,str)) for root in nodes for n in walk(root) if n.tag=='h1'),path.strip('/').replace('-',' ').title())
 data.append({'path':path.rstrip('/'),'title':html.unescape(title),'html':''.join(render(n) for n in nodes)})
(ROOT/'src/legacy.json').write_text(json.dumps(data,indent=2))
(ROOT/'src/legacy-assets.json').write_text(json.dumps(assets,indent=2))
print('Imported',len(data),'pages and',len(assets),'images. Missing images:',errors)
