import json
import os

locales_dir = 'apps/web/src/i18n/locales'
os.makedirs(locales_dir, exist_ok=True)

en = {
    "nav": {
        "portals": "Portals",
        "data": "Data",
        "evidence": "Evidence",
        "access": "Access Platform"
    },
    "hero": {
        "badge": "GREEN CORRIDOR INTELLIGENCE · SANTOS → ROTTERDAM",
        "title1": "Maritime intelligence that ",
        "titleProve": "proves",
        "title2": ", not just ",
        "titleDeclare": "declares",
        "title3": ".",
        "subtitle": "Maritime MRV platform with satellite AIS tracking, independent SAR validation, EU ETS/FuelEU calculation, and immutable SHA-256 chain of custody.",
        "btnAccess": "Access Platform",
        "btnVerify": "View Verified Voyage"
    },
    "stats": {
        "route": "Santos → Rotterdam",
        "routeSub": "Monitored pilot corridor",
        "models": "AI Models",
        "modelsSub": "via Blink AI Gateway",
        "trust": "SHA-256 Trust",
        "trustSub": "Evidence logged and verified",
        "portals": "Dedicated Portals",
        "portalsSub": "Per maritime stakeholder"
    },
    "problem": {
        "label": "The Problem",
        "title1": "Declaring emissions without ",
        "titleHighlight": "verifiable evidence",
        "title2": " is greenwashing.",
        "lead": "European regulators demand auditable MRV. Shippers demand traceable Scope 3. Ports need data for green corridor access. The market no longer accepts PDFs.",
        "p1_title": "Manipulated or lost AIS data",
        "p1_sub": "Unverifiable position",
        "p2_title": "Manual and unaudited EU ETS calculation",
        "p2_sub": "€65/tCO₂ · growing exposure",
        "p3_title": "FuelEU — €2,400/t penalty",
        "p3_sub": "Regulatory risk 2025+",
        "p4_title": "Green certificate without hash",
        "p4_sub": "Invalidates ESG chain",
        "high": "HIGH",
        "critical": "CRITICAL",
        "medium": "MEDIUM"
    },
    "cycle": {
        "label": "How It Works",
        "title": "The complete maritime intelligence cycle",
        "c1": "MEASURE",
        "c2": "CALCULATE",
        "c3": "OFFSET",
        "c4": "PROVE",
        "c5": "PUBLISH"
    },
    "portals": {
        "label": "5 Dedicated Portals",
        "title": "One system, five business perspectives",
        "lead": "Each stakeholder sees exactly what they need. The same traceable evidence, presented in the correct context.",
        "access": "Access",
        "p1_role": "Operator / Shipowner",
        "p1_title": "Control Tower",
        "p1_desc": "Fleet, EU ETS emissions, FuelEU compliance, Green Corridors, and Evidence Vault in a unified interface.",
        "p2_role": "Shipper",
        "p2_title": "Cargo Intelligence",
        "p2_desc": "CO₂ per booking, Scope 3 Cat. 4 attribution, ISO 14083 Green Certificate, and booking traceability.",
        "p3_role": "Port / Authority",
        "p3_title": "Port Intelligence",
        "p3_desc": "Real-time traffic monitor, active geofence, vessel ranking by EEOI, and declared emissions.",
        "p4_role": "Regulator / EMSA",
        "p4_title": "Audit Trail",
        "p4_desc": "Read-only Evidence Vault with SHA-256 logs, audit trail, and EU MRV export.",
        "p5_role": "Public / ESG Auditors",
        "p5_title": "Transparency Portal",
        "p5_desc": "Verified, public voyage page without login. Anti-greenwashing. QR code for supply chains."
    },
    "data": {
        "label": "Data Sources",
        "title": "Hierarchy of evidence, not inference",
        "lead": "Official API first. Observed data before declared data. AI model as interpreter, never as a source.",
        "disclaimer": "The architecture explicitly distinguishes: LIVE · DEMO · STALE · UNAVAILABLE. No LLM inference replaces verified data.",
        "s1_type": "Satellite AIS",
        "s1_desc": "Position, speed, identity — global coverage",
        "s2_type": "SAR Radar",
        "s2_desc": "Independent position validation via orbital radar",
        "s3_type": "Oceanography",
        "s3_desc": "Currents, waves, temperature — performance context",
        "s4_type": "Official Declarations",
        "s4_desc": "Reported fuel consumption — regulatory baseline",
        "s5_type": "AI — 200+ Models",
        "s5_desc": "Interpretation, summarization, and analysis — server-side only"
    },
    "ai": {
        "badge": "BLINK AI GATEWAY · 200+ MODELS",
        "title1": "AI that interprets evidence. ",
        "titleHighlight": "Never fabricates.",
        "lead": "The Blink AI Gateway connects the backend to over 200 language models. All calls are server-side. The API key never reaches the browser. Outputs are always marked as MODEL_OPINION.",
        "f1_title": "Regulatory Interpretation",
        "f1_desc": "EU MRV / FuelEU / EU ETS in operational language",
        "f2_title": "AIS Anomaly Analysis",
        "f2_desc": "Explanation for position or emission deviations",
        "f3_title": "Green Corridor Summary",
        "f3_desc": "Santos → Rotterdam route performance",
        "f4_title": "Evidence Classification",
        "f4_desc": "FACT · INFERENCE · CALCULATION · ESTIMATE"
    },
    "evidence": {
        "label": "Evidence Vault",
        "title": "Every declaration has a proof.",
        "lead": "Immutable SHA-256. Registered parser version. AIS observations counted. SAR validations documented. No blank fields."
    },
    "compliance": {
        "label": "Compliance",
        "title": "Built on real regulatory frameworks",
        "lead": "No invented regulatory references. All standards are traceable to the official text published by the European Commission, IMO, and ISO.",
        "disclaimer": "Meridian Intelligence is isolated from the MeridianMRV Core. Data is promoted via human review flow. The system never writes directly to the core."
    },
    "cta": {
        "badge": "DEMO AVAILABLE — SANTOS → ROTTERDAM",
        "title": "Prove what you declare.",
        "lead": "Access the five portals, explore the Evidence Vault, and see the complete maritime intelligence chain in action.",
        "btnAccess": "Enter Platform",
        "btnVerify": "View Public Evidence"
    },
    "footer": {
        "sub": "Green Corridor Intelligence Programme",
        "power": "Powered by Spire S-AIS · Copernicus · Blink AI Gateway",
        "isolated": "Isolated from MeridianMRV Core",
        "demo": "DEMO Data — not regulatory authority"
    }
}

pt = {
    "nav": {
        "portals": "Portais",
        "data": "Dados",
        "evidence": "Evidências",
        "access": "Acessar Plataforma"
    },
    "hero": {
        "badge": "GREEN CORRIDOR INTELLIGENCE · SANTOS → ROTTERDAM",
        "title1": "Inteligência marítima que ",
        "titleProve": "prova",
        "title2": ", não apenas ",
        "titleDeclare": "declara",
        "title3": ".",
        "subtitle": "Plataforma de MRV marítimo com rastreamento AIS satélite, validação SAR independente, cálculo EU ETS/FuelEU e cadeia de custódia imutável por SHA-256.",
        "btnAccess": "Acessar Plataforma",
        "btnVerify": "Ver Viagem Verificada"
    },
    "stats": {
        "route": "Santos → Rotterdam",
        "routeSub": "Corredor piloto monitorado",
        "models": "Modelos de IA",
        "modelsSub": "via Blink AI Gateway",
        "trust": "Confiança SHA-256",
        "trustSub": "Evidence registrada e verificada",
        "portals": "Portais dedicados",
        "portalsSub": "Por stakeholder maritimo"
    },
    "problem": {
        "label": "O Problema",
        "title1": "Declaração de emissões sem ",
        "titleHighlight": "evidência verificável",
        "title2": " é greenwashing.",
        "lead": "Reguladores europeus exigem MRV auditável. Embarcadores exigem Scope 3 rastreável. Portos precisam de dados para acesso a corredores verdes. O mercado não aceita mais PDF.",
        "p1_title": "Dados AIS manipulados ou perdidos",
        "p1_sub": "Posição não verificável",
        "p2_title": "Cálculo EU ETS manual e não auditado",
        "p2_sub": "€65/tCO₂ · exposição crescente",
        "p3_title": "FuelEU — penalidade €2.400/t",
        "p3_sub": "Risco regulatório 2025+",
        "p4_title": "Certificado verde sem hash",
        "p4_sub": "Invalida cadeia ESG",
        "high": "ALTO",
        "critical": "CRÍTICO",
        "medium": "MÉDIO"
    },
    "cycle": {
        "label": "Como Funciona",
        "title": "O ciclo completo de inteligência marítima",
        "c1": "MEDIR",
        "c2": "CALCULAR",
        "c3": "COMPENSAR",
        "c4": "PROVAR",
        "c5": "PUBLICAR"
    },
    "portals": {
        "label": "5 Portais Dedicados",
        "title": "Um sistema, cinco perspectivas de negócio",
        "lead": "Cada stakeholder vê exatamente o que precisa. A mesma evidência rastreável, apresentada no contexto correto.",
        "access": "Acessar",
        "p1_role": "Operador / Armador",
        "p1_title": "Control Tower",
        "p1_desc": "Frota, emissões EU ETS, FuelEU compliance, Green Corridors e Evidence Vault em uma interface unificada.",
        "p2_role": "Embarcador / Shipper",
        "p2_title": "Cargo Intelligence",
        "p2_desc": "CO₂ por carregamento, atribuição Scope 3 Cat. 4, Certificado Verde ISO 14083 e rastreabilidade de booking.",
        "p3_role": "Porto / Autoridade",
        "p3_title": "Port Intelligence",
        "p3_desc": "Monitor de tráfego em tempo real, geofence ativo, ranking de navios por EEOI e emissões declaradas.",
        "p4_role": "Regulador / EMSA",
        "p4_title": "Audit Trail",
        "p4_desc": "Evidence Vault somente-leitura com registros SHA-256, trilha de auditoria e exportação EU MRV.",
        "p5_role": "Público / Auditores ESG",
        "p5_title": "Transparency Portal",
        "p5_desc": "Página de viagem verificada, pública, sem login. Anti-greenwashing. QR code para supply chains."
    },
    "data": {
        "label": "Fontes de Dados",
        "title": "Hierarquia de evidência, não inferência",
        "lead": "API oficial primeiro. Dados observados antes de declarados. Modelo de IA como intérprete, nunca como fonte.",
        "disclaimer": "A arquitetura distingue explicitamente: LIVE · DEMO · STALE · UNAVAILABLE. Nenhuma inferência de LLM substitui dado verificado.",
        "s1_type": "Satellite AIS",
        "s1_desc": "Posição, velocidade, identidade — cobertura global",
        "s2_type": "SAR Radar",
        "s2_desc": "Validação independente de posição via radar orbital",
        "s3_type": "Oceanografia",
        "s3_desc": "Correntes, ondas, temperatura — contexto de performance",
        "s4_type": "Declarações Oficiais",
        "s4_desc": "Consumo de combustível reportado — base regulatória",
        "s5_type": "IA — 200+ Modelos",
        "s5_desc": "Interpretação, sumarização e análise — server-side only"
    },
    "ai": {
        "badge": "BLINK AI GATEWAY · 200+ MODELOS",
        "title1": "IA que interpreta evidência. ",
        "titleHighlight": "Nunca inventa.",
        "lead": "O Blink AI Gateway conecta o backend a mais de 200 modelos de linguagem. Todas as chamadas são server-side. A chave de API nunca chega ao navegador. Outputs são sempre marcados como MODEL_OPINION.",
        "f1_title": "Interpretação Regulatória",
        "f1_desc": "EU MRV / FuelEU / EU ETS em linguagem operacional",
        "f2_title": "Análise de Anomalia AIS",
        "f2_desc": "Explicação de desvio de posição ou emissão",
        "f3_title": "Resumo de Corredor Verde",
        "f3_desc": "Performance de rota Santos → Rotterdam",
        "f4_title": "Classificação de Evidência",
        "f4_desc": "FATO · INFERÊNCIA · CÁLCULO · ESTIMATIVA"
    },
    "evidence": {
        "label": "Evidence Vault",
        "title": "Cada declaração tem uma prova.",
        "lead": "SHA-256 imutável. Parser version registrado. AIS observations contadas. SAR validations documentadas. Nenhum campo em branco."
    },
    "compliance": {
        "label": "Conformidade",
        "title": "Construído sobre frameworks regulatórios reais",
        "lead": "Nenhuma referência regulatória inventada. Todas as normas são rastreáveis ao texto oficial publicado pela Comissão Europeia, IMO e ISO.",
        "disclaimer": "O Meridian Intelligence é isolado do MeridianMRV Core. Dados são promovidos via fluxo de revisão humana. O sistema nunca grava diretamente no core."
    },
    "cta": {
        "badge": "DEMO DISPONÍVEL — SANTOS → ROTTERDAM",
        "title": "Prove o que você declara.",
        "lead": "Acesse os cinco portais, explore o Evidence Vault e veja a cadeia completa de inteligência marítima funcionando.",
        "btnAccess": "Entrar na Plataforma",
        "btnVerify": "Ver Evidência Pública"
    },
    "footer": {
        "sub": "Green Corridor Intelligence Programme",
        "power": "Powered by Spire S-AIS · Copernicus · Blink AI Gateway",
        "isolated": "Isolado do MeridianMRV Core",
        "demo": "Dados DEMO — não autoridade regulatória"
    }
}

zh = {
    "nav": {
        "portals": "门户",
        "data": "数据",
        "evidence": "证据",
        "access": "访问平台"
    },
    "hero": {
        "badge": "绿色走廊情报 · 桑托斯 → 鹿特丹",
        "title1": "海事智能不仅仅是",
        "titleDeclare": "声明",
        "title2": "，更是",
        "titleProve": "证明",
        "title3": "。",
        "subtitle": "基于卫星AIS跟踪、独立的SAR验证、EU ETS/FuelEU计算和不可篡改的SHA-256监管链的海事MRV平台。",
        "btnAccess": "访问平台",
        "btnVerify": "查看已验证航次"
    },
    "stats": {
        "route": "桑托斯 → 鹿特丹",
        "routeSub": "受监控的试点走廊",
        "models": "AI 模型",
        "modelsSub": "通过 Blink AI Gateway",
        "trust": "SHA-256 信任",
        "trustSub": "记录并验证的证据",
        "portals": "专属门户",
        "portalsSub": "按海事利益相关方"
    },
    "problem": {
        "label": "面临的问题",
        "title1": "缺乏",
        "titleHighlight": "可验证证据",
        "title2": "的排放声明属于“漂绿”行为。",
        "lead": "欧洲监管机构要求可审计的MRV。托运人需要可追溯的范围3。港口需要获取绿色走廊数据。市场不再接受PDF文件。",
        "p1_title": "被篡改或丢失的AIS数据",
        "p1_sub": "位置无法验证",
        "p2_title": "手动且未经审计的EU ETS计算",
        "p2_sub": "65欧元/吨CO₂ · 风险不断增加",
        "p3_title": "FuelEU — 2,400欧元/吨罚款",
        "p3_sub": "2025年后的监管风险",
        "p4_title": "无哈希值的绿色证书",
        "p4_sub": "使ESG链无效",
        "high": "高风险",
        "critical": "严重",
        "medium": "中等"
    },
    "cycle": {
        "label": "工作原理",
        "title": "完整的海事智能周期",
        "c1": "测量",
        "c2": "计算",
        "c3": "抵消",
        "c4": "证明",
        "c5": "发布"
    },
    "portals": {
        "label": "5 个专属门户",
        "title": "一个系统，五种业务视角",
        "lead": "每个利益相关方都能看到他们需要的内容。在正确的上下文中呈现相同的可追溯证据。",
        "access": "访问",
        "p1_role": "运营商 / 船东",
        "p1_title": "控制塔",
        "p1_desc": "在统一界面中查看船队、EU ETS排放、FuelEU合规性、绿色走廊和证据库。",
        "p2_role": "托运人",
        "p2_title": "货物情报",
        "p2_desc": "按订单统计的CO₂、范围3类别4归属、ISO 14083绿色证书和订单可追溯性。",
        "p3_role": "港口 / 当局",
        "p3_title": "港口情报",
        "p3_desc": "实时交通监控、活动地理围栏、基于EEOI的船舶排名和声明的排放量。",
        "p4_role": "监管机构 / EMSA",
        "p4_title": "审计跟踪",
        "p4_desc": "带有SHA-256日志、审计跟踪和EU MRV导出的只读证据库。",
        "p5_role": "公众 / ESG审计员",
        "p5_title": "透明度门户",
        "p5_desc": "无需登录的公开且已验证的航次页面。反“漂绿”。用于供应链的二维码。"
    },
    "data": {
        "label": "数据源",
        "title": "证据优先，而非推断",
        "lead": "官方API优先。观测数据优于声明数据。AI模型作为解释器，绝不作为数据源。",
        "disclaimer": "该架构明确区分：实时 (LIVE) · 演示 (DEMO) · 过期 (STALE) · 不可用 (UNAVAILABLE)。任何LLM推断都不能取代已验证的数据。",
        "s1_type": "卫星 AIS",
        "s1_desc": "位置、速度、身份 — 全球覆盖",
        "s2_type": "SAR 雷达",
        "s2_desc": "通过轨道雷达进行独立的位置验证",
        "s3_type": "海洋学",
        "s3_desc": "洋流、海浪、温度 — 性能环境",
        "s4_type": "官方声明",
        "s4_desc": "报告的燃油消耗 — 监管基准",
        "s5_type": "AI — 200+ 模型",
        "s5_desc": "解释、摘要和分析 — 仅限服务器端"
    },
    "ai": {
        "badge": "BLINK AI GATEWAY · 200+ 模型",
        "title1": "解释证据的AI。",
        "titleHighlight": "绝不捏造。",
        "lead": "Blink AI Gateway 将后端连接到 200 多个语言模型。所有调用都在服务器端进行。API 密钥绝不会到达浏览器。输出结果始终标记为 MODEL_OPINION。",
        "f1_title": "监管解释",
        "f1_desc": "以操作语言解释 EU MRV / FuelEU / EU ETS",
        "f2_title": "AIS 异常分析",
        "f2_desc": "解释位置或排放的偏差",
        "f3_title": "绿色走廊摘要",
        "f3_desc": "桑托斯 → 鹿特丹 航线性能",
        "f4_title": "证据分类",
        "f4_desc": "事实 · 推断 · 计算 · 估计"
    },
    "evidence": {
        "label": "证据库",
        "title": "每项声明都有证据。",
        "lead": "不可篡改的 SHA-256。已注册的解析器版本。AIS 观测计数。SAR 验证记录。没有空白字段。"
    },
    "compliance": {
        "label": "合规性",
        "title": "建立在真实的监管框架之上",
        "lead": "没有捏造的监管参考。所有标准均可追溯到欧盟委员会、IMO 和 ISO 发布的官方文本。",
        "disclaimer": "Meridian Intelligence 与 MeridianMRV Core 隔离。数据通过人工审查流程进行推广。系统绝不直接写入 Core。"
    },
    "cta": {
        "badge": "提供演示 — 桑托斯 → 鹿特丹",
        "title": "证明您的声明。",
        "lead": "访问五个门户，探索证据库，并了解完整的海事智能链的运作。",
        "btnAccess": "进入平台",
        "btnVerify": "查看公开证据"
    },
    "footer": {
        "sub": "绿色走廊情报计划",
        "power": "由 Spire S-AIS · Copernicus · Blink AI Gateway 提供支持",
        "isolated": "与 MeridianMRV Core 隔离",
        "demo": "演示数据 — 非监管机构"
    }
}

ar = {
    "nav": {
        "portals": "البوابات",
        "data": "البيانات",
        "evidence": "الأدلة",
        "access": "الوصول للمنصة"
    },
    "hero": {
        "badge": "استخبارات الممر الأخضر · سانتوس → روتردام",
        "title1": "الاستخبارات البحرية التي ",
        "titleProve": "تُثبت",
        "title2": "، وليس فقط ",
        "titleDeclare": "تُصرح",
        "title3": ".",
        "subtitle": "منصة القياس والإبلاغ والتحقق البحرية مع تتبع AIS عبر الأقمار الصناعية، والتحقق المستقل من SAR، وحساب EU ETS/FuelEU، وسلسلة عهدة ثابتة بنظام SHA-256.",
        "btnAccess": "الوصول للمنصة",
        "btnVerify": "عرض الرحلة الموثقة"
    },
    "stats": {
        "route": "سانتوس → روتردام",
        "routeSub": "ممر تجريبي مراقب",
        "models": "نماذج ذكاء اصطناعي",
        "modelsSub": "عبر Blink AI Gateway",
        "trust": "موثوقية SHA-256",
        "trustSub": "أدلة مسجلة وموثقة",
        "portals": "بوابات مخصصة",
        "portalsSub": "لكل شريك بحري"
    },
    "problem": {
        "label": "المشكلة",
        "title1": "الإعلان عن الانبعاثات بدون ",
        "titleHighlight": "أدلة قابلة للتحقق",
        "title2": " هو غسيل أخضر.",
        "lead": "المنظمون الأوروبيون يطالبون بنظام MRV قابل للتدقيق. الشاحنون يطلبون تتبع النطاق 3. الموانئ تحتاج بيانات للوصول للممرات الخضراء. السوق لم يعد يقبل ملفات PDF.",
        "p1_title": "بيانات AIS متلاعب بها أو مفقودة",
        "p1_sub": "موقع غير قابل للتحقق",
        "p2_title": "حساب EU ETS يدوي وغير مدقق",
        "p2_sub": "65 يورو/طن CO₂ · تعرض متزايد",
        "p3_title": "FuelEU — غرامة 2,400 يورو/طن",
        "p3_sub": "مخاطر تنظيمية ما بعد 2025",
        "p4_title": "شهادة خضراء بدون بصمة تشفير (Hash)",
        "p4_sub": "يُبطل سلسلة ESG",
        "high": "عالي",
        "critical": "حرج",
        "medium": "متوسط"
    },
    "cycle": {
        "label": "كيف تعمل",
        "title": "دورة الاستخبارات البحرية الكاملة",
        "c1": "قياس",
        "c2": "حساب",
        "c3": "تعويض",
        "c4": "إثبات",
        "c5": "نشر"
    },
    "portals": {
        "label": "5 بوابات مخصصة",
        "title": "نظام واحد، خمس وجهات نظر للأعمال",
        "lead": "يرى كل صاحب مصلحة ما يحتاجه بالضبط. نفس الأدلة القابلة للتتبع، تُقدم في السياق الصحيح.",
        "access": "وصول",
        "p1_role": "المشغل / مالك السفينة",
        "p1_title": "برج المراقبة",
        "p1_desc": "الأسطول، انبعاثات EU ETS، امتثال FuelEU، الممرات الخضراء، وقبو الأدلة في واجهة موحدة.",
        "p2_role": "الشاحن",
        "p2_title": "استخبارات البضائع",
        "p2_desc": "CO₂ لكل حجز، تخصيص النطاق 3 الفئة 4، الشهادة الخضراء ISO 14083، وتتبع الحجوزات.",
        "p3_role": "الميناء / السلطة",
        "p3_title": "استخبارات الموانئ",
        "p3_desc": "مراقب حركة المرور الفوري، السياج الجغرافي النشط، تصنيف السفن حسب EEOI، والانبعاثات المصرح بها.",
        "p4_role": "المنظم / EMSA",
        "p4_title": "مسار التدقيق",
        "p4_desc": "قبو أدلة للقراءة فقط بسجلات SHA-256، ومسار تدقيق، وتصدير EU MRV.",
        "p5_role": "الجمهور / مدققو ESG",
        "p5_title": "بوابة الشفافية",
        "p5_desc": "صفحة رحلة عامة موثقة بدون تسجيل دخول. ضد الغسيل الأخضر. رمز استجابة سريعة لسلاسل التوريد."
    },
    "data": {
        "label": "مصادر البيانات",
        "title": "تسلسل الأدلة، وليس الاستنتاج",
        "lead": "API رسمي أولاً. البيانات المرصودة قبل البيانات المصرح بها. نموذج الذكاء الاصطناعي كمترجم، وليس كمصدر.",
        "disclaimer": "تميز البنية بوضوح بين: مباشر · تجريبي · قديم · غير متاح. لا يوجد استنتاج LLM يحل محل البيانات الموثقة.",
        "s1_type": "AIS عبر الأقمار الصناعية",
        "s1_desc": "الموقع، السرعة، الهوية — تغطية عالمية",
        "s2_type": "رادار SAR",
        "s2_desc": "تحقق مستقل من الموقع عبر الرادار المداري",
        "s3_type": "علم المحيطات",
        "s3_desc": "التيارات، الأمواج، الحرارة — سياق الأداء",
        "s4_type": "الإعلانات الرسمية",
        "s4_desc": "استهلاك الوقود المُبلغ عنه — الأساس التنظيمي",
        "s5_type": "الذكاء الاصطناعي — +200 نموذج",
        "s5_desc": "تفسير، تلخيص، وتحليل — من جانب الخادم فقط"
    },
    "ai": {
        "badge": "BLINK AI GATEWAY · +200 نموذج",
        "title1": "ذكاء اصطناعي يفسر الأدلة. ",
        "titleHighlight": "لا يختلق أبدًا.",
        "lead": "تربط Blink AI Gateway النهاية الخلفية بأكثر من 200 نموذج لغوي. جميع الاستدعاءات تتم من جانب الخادم. لا يصل مفتاح API للمتصفح مطلقًا. تُوسم المخرجات دائمًا بـ MODEL_OPINION.",
        "f1_title": "التفسير التنظيمي",
        "f1_desc": "EU MRV / FuelEU / EU ETS بلغة تشغيلية",
        "f2_title": "تحليل شذوذ AIS",
        "f2_desc": "تفسير انحرافات الموقع أو الانبعاثات",
        "f3_title": "ملخص الممر الأخضر",
        "f3_desc": "أداء مسار سانتوس → روتردام",
        "f4_title": "تصنيف الأدلة",
        "f4_desc": "حقيقة · استنتاج · حساب · تقدير"
    },
    "evidence": {
        "label": "قبو الأدلة",
        "title": "لكل إعلان إثبات.",
        "lead": "SHA-256 ثابت. نسخة المُحلل مسجلة. رصد AIS محسوب. تحقق SAR موثق. لا توجد حقول فارغة."
    },
    "compliance": {
        "label": "الامتثال",
        "title": "مبني على أطر تنظيمية حقيقية",
        "lead": "لا توجد مراجع تنظيمية مُختلقة. جميع المعايير قابلة للتتبع إلى النص الرسمي الصادر عن المفوضية الأوروبية، IMO، و ISO.",
        "disclaimer": "نظام Meridian Intelligence معزول عن MeridianMRV Core. يتم ترقية البيانات عبر مسار المراجعة البشرية. لا يكتب النظام مباشرة في النواة أبدًا."
    },
    "cta": {
        "badge": "العرض التجريبي متاح — سانتوس → روتردام",
        "title": "أثبت ما تصرح به.",
        "lead": "قم بالوصول إلى البوابات الخمس، واستكشف قبو الأدلة، وشاهد سلسلة الاستخبارات البحرية الكاملة أثناء العمل.",
        "btnAccess": "دخول المنصة",
        "btnVerify": "عرض الأدلة العامة"
    },
    "footer": {
        "sub": "برنامج استخبارات الممر الأخضر",
        "power": "بدعم من Spire S-AIS · Copernicus · Blink AI Gateway",
        "isolated": "معزول عن MeridianMRV Core",
        "demo": "بيانات تجريبية — ليس سلطة تنظيمية"
    }
}

for lang, data in [("en", en), ("pt", pt), ("zh", zh), ("ar", ar)]:
    with open(f"{locales_dir}/{lang}.json", "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

print("JSON locales generated.")
