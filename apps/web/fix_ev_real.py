path = 'apps/web/src/pages/EvidenceVault.tsx'
with open(path, 'r', encoding='utf-8') as f:
    c = f.read()

# We need to close the following:
# <div space-y-6>
# <div p-6>
# <div bg-[#091923]>
# <div lg:col-span-1>
# <div grid grid-cols-1>
# <div min-h-screen>

idx = c.find('                  <div className="flex items-center justify-between">\\n                    <span className="text-sm text-[#8da2b1]">SAR Validations</span>')
if idx != -1:
    c = c[:idx] + '''                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#8da2b1]">SAR Validations</span>
                    <span className="text-sm font-semibold text-[#eaf1f6]">
                      {selectedRecord.sarValidationCount}
                    </span>
                  </div>
                </div>
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

