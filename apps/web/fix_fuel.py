import re

path = 'apps/web/src/pages/FuelEuScore.tsx'
with open(path, 'r', encoding='utf-8') as f:
    c = f.read()

idx = c.find('            <thead>')
if idx != -1:
    c = c[:idx] + '''
            <thead>
              <tr className="border-b border-border-subtle">
                <th className="text-left py-3 px-4 text-xs font-medium text-text-muted uppercase tracking-wider">Fuel Mix</th>
                <th className="text-right py-3 px-4 text-xs font-medium text-text-muted uppercase tracking-wider">GHG Intensity</th>
                <th className="text-right py-3 px-4 text-xs font-medium text-text-muted uppercase tracking-wider">Penalty</th>
                <th className="text-center py-3 px-4 text-xs font-medium text-text-muted uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border-subtle">
                <td className="py-3 px-4 text-sm text-text-base">100% VLSFO</td>
                <td className="text-right py-3 px-4 text-sm font-mono text-text-muted">92.1</td>
                <td className="text-right py-3 px-4 text-sm font-mono text-amber-500">€145,200</td>
                <td className="text-center py-3 px-4"><span className="text-xs text-amber-500">DEFICIT</span></td>
              </tr>
              <tr className="border-b border-border-subtle">
                <td className="py-3 px-4 text-sm text-text-base">85% VLSFO + 15% Bio-Methanol</td>
                <td className="text-right py-3 px-4 text-sm font-mono text-text-muted">88.5</td>
                <td className="text-right py-3 px-4 text-sm font-mono text-brand-primary">€0</td>
                <td className="text-center py-3 px-4"><span className="text-xs text-brand-primary">COMPLIANT</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
'''
with open(path, 'w', encoding='utf-8') as f:
    f.write(c)

