path = 'apps/web/src/pages/EvidenceVault.tsx'
with open(path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Drop the last 9 lines and add my own
keep = lines[:-9]

tail = '''                    <span className="text-sm font-semibold text-[#eaf1f6]">
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
    f.writelines(keep)
    f.write(tail)
