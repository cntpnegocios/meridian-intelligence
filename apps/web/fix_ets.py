import re

path = 'apps/web/src/pages/EuEtsCalculator.tsx'
with open(path, 'r', encoding='utf-8') as f:
    c = f.read()

# Find the start of the uncompleted block
idx = c.find('                {parseFloat(euScope) > 75 && (')
if idx != -1:
    c = c[:idx] + '''
              </div>
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

