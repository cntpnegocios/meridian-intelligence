import os

def update_landing_page():
    path = 'apps/web/src/pages/LandingPage.tsx'
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    # We need to add the import: import { useTranslation } from 'react-i18next';
    if 'useTranslation' not in content:
        content = content.replace("import { Link } from 'react-router-dom';", "import { Link } from 'react-router-dom';\nimport { useTranslation } from 'react-i18next';")

    nav_old = '''<div className="flex items-center gap-6">
          <a href="#portais" className="text-xs font-medium tracking-wide transition-colors hover:text-white" style={{ color: T.muted }}>Portais</a>
          <a href="#dados" className="text-xs font-medium tracking-wide transition-colors hover:text-white" style={{ color: T.muted }}>Dados</a>
          <a href="#evidencia" className="text-xs font-medium tracking-wide transition-colors hover:text-white" style={{ color: T.muted }}>Evidências</a>
          <Link
            to="/"
            className="text-xs font-semibold px-4 py-2 rounded-lg transition-all"
            style={{
              background: T.brand,
              color: T.bg,
            }}
          >
            Acessar Plataforma
          </Link>'''
          
    nav_new = '''<div className="flex items-center gap-6">
          <select 
            onChange={(e) => {
              i18n.changeLanguage(e.target.value);
              document.documentElement.dir = e.target.value === 'ar' ? 'rtl' : 'ltr';
            }}
            value={i18n.language}
            className="text-xs bg-transparent outline-none cursor-pointer"
            style={{ color: T.muted }}
          >
            <option value="en" className="bg-bg-panel">EN</option>
            <option value="pt" className="bg-bg-panel">PT</option>
            <option value="zh" className="bg-bg-panel">ZH</option>
            <option value="ar" className="bg-bg-panel">AR</option>
          </select>
          <a href="#portais" className="text-xs font-medium tracking-wide transition-colors hover:text-white" style={{ color: T.muted }}>{t('nav.portals')}</a>
          <a href="#dados" className="text-xs font-medium tracking-wide transition-colors hover:text-white" style={{ color: T.muted }}>{t('nav.data')}</a>
          <a href="#evidencia" className="text-xs font-medium tracking-wide transition-colors hover:text-white" style={{ color: T.muted }}>{t('nav.evidence')}</a>
          <Link
            to="/"
            className="text-xs font-semibold px-4 py-2 rounded-lg transition-all"
            style={{
              background: T.brand,
              color: T.bg,
            }}
          >
            {t('nav.access')}
          </Link>'''
          
    if 'function NavBar() {' in content:
        content = content.replace('function NavBar() {', 'function NavBar() {\n  const { t, i18n } = useTranslation();')

    if 'export function LandingPage() {' in content:
        content = content.replace('export function LandingPage() {', 'export function LandingPage() {\n  const { t } = useTranslation();')
        
    content = content.replace(nav_old, nav_new)
    
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)
        
update_landing_page()
