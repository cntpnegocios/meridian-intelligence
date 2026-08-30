import re

path = 'apps/web/src/components/ui/MapCockpit.tsx'
with open(path, 'r', encoding='utf-8') as f:
    c = f.read()

satellite_style = '''{
            version: 8,
            sources: {
              'satellite': {
                type: 'raster',
                tiles: [
                  'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
                ],
                tileSize: 256,
                attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
              }
            },
            layers: [
              {
                id: 'satellite-layer',
                type: 'raster',
                source: 'satellite',
                minzoom: 0,
                maxzoom: 22
              }
            ]
          }'''

c = c.replace('mapStyle="https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json"', f'mapStyle={{{satellite_style}}}')

with open(path, 'w', encoding='utf-8') as f:
    f.write(c)

