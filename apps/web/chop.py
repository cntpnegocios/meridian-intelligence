import os

def chop(path, line_num, tail):
    with open(path, 'r', encoding='utf-8') as f:
        lines = f.readlines()
    
    # Keep lines up to line_num - 2 (since index is 0-based and we want to drop the error line and below)
    keep = lines[:line_num - 1]
    
    with open(path, 'w', encoding='utf-8') as f:
        f.writelines(keep)
        f.write(tail)

tail = '''
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
'''

chop('apps/web/src/pages/EvidenceVault.tsx', 301, tail)
chop('apps/web/src/pages/ShipperPortal.tsx', 319, tail)

