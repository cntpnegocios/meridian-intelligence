import re

path = 'apps/web/src/pages/FuelEuScore.tsx'
with open(path, 'r', encoding='utf-8') as f:
    c = f.read()

# Fix the trend issue
c = c.replace("trend={{ value: 3.1, direction: 'up', label: 'vs target' }}", "trend={{ value: '3.1', direction: 'up' }}")

# Fix unused imports
c = c.replace("import { Zap, AlertCircle, CheckCircle, TrendingDown, Fuel, DollarSign, Leaf } from 'lucide-react';", "import { Zap, AlertCircle, CheckCircle, TrendingDown, DollarSign, Leaf } from 'lucide-react';")

# Fix unused deficit
c = c.replace("const deficit = 2.8;", "")

with open(path, 'w', encoding='utf-8') as f:
    f.write(c)

