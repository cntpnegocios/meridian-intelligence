path = 'apps/web/src/pages/ShipperPortal.tsx'
with open(path, 'r', encoding='utf-8') as f:
    c = f.read()

idx = c.find('                <div className="mt-\\n')
if idx != -1:
    c = c[:idx] + '''              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
'''
with open(path, 'w', encoding='utf-8') as f:
    f.write(c)
