import re

path = 'apps/web/src/main.tsx'
with open(path, 'r', encoding='utf-8') as f:
    c = f.read()

c = c.replace("import { EuEts }  from './pages/EuEtsPage';", "import { EuEtsCalculator }  from './pages/EuEtsCalculator';")
c = c.replace("import { FuelEuPage } from './pages/FuelEuPage';", "import { FuelEuScore } from './pages/FuelEuScore';")

c = c.replace("<Route path=\"eu-ets\" element={<EuEts />} />", "<Route path=\"eu-ets\" element={<EuEtsCalculator />} />")
c = c.replace("<Route path=\"fueleu\" element={<FuelEuPage />} />", "<Route path=\"fueleu\" element={<FuelEuScore />} />")

with open(path, 'w', encoding='utf-8') as f:
    f.write(c)

