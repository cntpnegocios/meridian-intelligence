import json
import os

locales = {
    'en': {
        'isolated': 'Fully integrated with MeridianMRV Core',
        'demo': 'Copyright © 2026 Meridian Intelligence. All rights reserved.',
        'power': 'Powered by Spire S-AIS · Copernicus · Blink AI Gateway'
    },
    'pt': {
        'isolated': 'Totalmente integrado ao MeridianMRV Core',
        'demo': 'Copyright © 2026 Meridian Intelligence. Todos os direitos reservados.',
        'power': 'Desenvolvido com Spire S-AIS · Copernicus · Blink AI Gateway'
    },
    'zh': {
        'isolated': '与 MeridianMRV Core 完全集成',
        'demo': '版权所有 © 2026 Meridian Intelligence. 保留所有权利。',
        'power': '由 Spire S-AIS · Copernicus · Blink AI Gateway 提供支持'
    },
    'ar': {
        'isolated': 'متكامل تمامًا مع MeridianMRV Core',
        'demo': 'حقوق الطبع والنشر © 2026 Meridian Intelligence. جميع الحقوق محفوظة.',
        'power': 'بدعم من Spire S-AIS · Copernicus · Blink AI Gateway'
    }
}

for lang, data in locales.items():
    path = f'apps/web/src/i18n/locales/{lang}.json'
    with open(path, 'r', encoding='utf-8') as f:
        j = json.load(f)
    
    j['footer']['isolated'] = data['isolated']
    j['footer']['demo'] = data['demo']
    j['footer']['power'] = data['power']
    
    with open(path, 'w', encoding='utf-8') as f:
        json.dump(j, f, ensure_ascii=False, indent=2)

