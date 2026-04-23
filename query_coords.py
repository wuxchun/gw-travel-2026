import urllib.request
import json

# 尾白川的查询（用更精确的方式）
overpass_query3 = """
[out:json];
(
  node["name"~"竹宇駒ヶ岳神社|千ヶ淵|神蛇滝"](35.7,138.2,35.9,138.4);
  way["name"~"竹宇駒ヶ岳神社|千ヶ淵|神蛇滝"](35.7,138.2,35.9,138.4);
);
out center;
"""
url = 'https://overpass-api.de/api/interpreter'
data3 = urllib.parse.urlencode({'data': overpass_query3}).encode()
req3 = urllib.request.Request(url, data=data3, headers={'User-Agent': 'gw-travel-research/1.0'})
try:
    response3 = urllib.request.urlopen(req3, timeout=30)
    result3 = json.loads(response3.read().decode('utf-8'))
    print('Overpass3 (尾白川) result elements:', len(result3.get('elements', [])))
    for elem in result3.get('elements', []):
        tags = elem.get('tags', {})
        name = tags.get('name', 'unknown')
        if elem['type'] == 'node':
            lat, lon = elem['lat'], elem['lon']
        else:
            lat, lon = elem['center']['lat'], elem['center']['lon']
        print(f'  {name}: {lat}, {lon}')
except Exception as e:
    print('Overpass3 Error:', e)

# 也查一下尾白川溪谷的其他POI
overpass_query4 = """
[out:json];
(
  node["name"~"尾白川|駒ヶ岳神社"](35.7,138.2,35.9,138.4);
  way["name"~"尾白川|駒ヶ岳神社"](35.7,138.2,35.9,138.4);
);
out center;
"""
data4 = urllib.parse.urlencode({'data': overpass_query4}).encode()
req4 = urllib.request.Request(url, data=data4, headers={'User-Agent': 'gw-travel-research/1.0'})
try:
    response4 = urllib.request.urlopen(req4, timeout=30)
    result4 = json.loads(response4.read().decode('utf-8'))
    print('\nOverpass4 (尾白川広域) result elements:', len(result4.get('elements', [])))
    for elem in result4.get('elements', []):
        tags = elem.get('tags', {})
        name = tags.get('name', 'unknown')
        if elem['type'] == 'node':
            lat, lon = elem['lat'], elem['lon']
        else:
            lat, lon = elem['center']['lat'], elem['center']['lon']
        print(f'  {name}: {lat}, {lon}')
except Exception as e:
    print('Overpass4 Error:', e)