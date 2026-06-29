import { AppProduct, Review, ReviewReply, Category, AppType, Framework, Industry, Sense, AppStatus, Pricing } from "@/types/app";
import { mockLPCTemplates } from "@/lib/mock-templates";
import { adaptLPCTemplates } from "@/lib/template-adapter";
import { getApps as getDataApps } from "@/lib/apps-data";

const developer = "NEXO Digital S.L.";

const CATEGORY_PRICING = {
  site: { pricing: "fixed" as const, price: 299, currency: "EUR" as const },
  saas: { pricing: "subscription" as const, price: 49, currency: "EUR" as const },
  tpv: { pricing: "subscription" as const, price: 79, currency: "EUR" as const },
  app: { pricing: "free" as const, price: undefined as number | undefined, currency: "EUR" as const },
  program: { pricing: "subscription" as const, price: 59, currency: "EUR" as const },
  custom: { pricing: "quote" as const, price: undefined as number | undefined, currency: "EUR" as const },
};

function makeApp(
  id: string,
  slug: string,
  name: string,
  subtitle: string,
  description: string,
  shortDesc: string,
  type: AppType,
  framework: Framework,
  industry: Industry,
  sense: Sense,
  status: AppStatus,
  version: string,
  pricing: Pricing,
  price: number | undefined,
  currency: "EUR" | "USD" | "BRL",
  rating: number,
  downloads: number,
  features: string[],
  techStack: string[],
  requirements: string[],
  demoUrl?: string,
  repoUrl?: string,
  screenshots?: string[],
  tags?: string[]
): AppProduct {
  return {
    id,
    slug,
    name,
    subtitle,
    description,
    shortDescription: shortDesc,
    icon: `/icons/${slug}.svg`,
    thumbnail: `/thumbnails/${slug}.jpg`,
    screenshots: screenshots || ["/screenshot-placeholder.jpg", "/screenshot-placeholder.jpg", "/screenshot-placeholder.jpg"],
    type,
    framework,
    industry,
    sense,
    status,
    version,
    releaseDate: "2025-01-15",
    lastUpdate: "2026-06-12",
    hasDemo: true,
    demoUrl: demoUrl || `/demo/${slug}`,
    repoUrl,
    requestUrl: `/request?app=${slug}`,
    pricing,
    price,
    currency,
    rating,
    reviewCount: Math.floor(downloads * 0.08),
    downloadCount: downloads,
    developer,
    techStack,
    features,
    requirements,
    metaTitle: `${name} — ${subtitle} | NEXO Digital Store`,
    metaDescription: description.slice(0, 160),
    keywords: [name, subtitle, type, industry, sense, "NEXO", "app", "negocio"],
    tags: tags ?? [name, subtitle, type, industry, sense, framework],
  };
}

// ===== TPVs =====
const tpvs: AppProduct[] = [
  makeApp(
    "tpv-001", "tpv-sorveteria", "TPV Sorveteria Sabadell Nord", "Pack completo para sorveterias",
    "Sistema completo para sorveterias artesanais. Inclui 4 apps: Cliente PWA para pedir pelo celular, Kiosk de autoatendimento na mesa, KDS (Cozinha) com fila de pedidos em tempo real e Admin Dashboard para gestão, estoque e analytics. 58 produtos no cardápio, 15 sabores artesanais com fotos reais, sincronização via Supabase Realtime ou fallback local.",
    "Pack TPV: Cliente, Kiosk, Cozinha KDS e Admin para sorveterias.",
    "tpv", "react", "food", "sorveteria", "available", "4.0.0",
    "subscription", 79, "EUR", 4.9, 1250,
    [
      "Cliente PWA para pedidos pelo celular",
      "Kiosk touch de autoatendimento na mesa",
      "KDS Cozinha com fila em tempo real",
      "Admin Dashboard com gestão e analytics",
      "58 produtos e 15 sabores artesanais",
      "Sincronização Supabase Realtime",
      "Modo standalone com localStorage",
      "Multi-idioma: ES, CA, PT, EN",
      "PWA instalável"
    ],
    ["React 19", "TypeScript", "Vite", "Tailwind CSS", "Zustand", "Supabase", "Framer Motion"],
    ["Navegador moderno", "Touchscreen para Kiosk", "Conexão internet"],
    "https://tpv-sorveteria-demo.vercel.app",
    "https://github.com/Jhin1v9/TPV-SORVETERIA-DEMO",
    [
      "/screenshots/tpv-sorveteria-1.jpg",
      "/screenshots/tpv-sorveteria-2.jpg",
      "/screenshots/tpv-sorveteria-3.jpg"
    ],
    ["tpv", "sorveteria", "gelataria", "ice cream", "kiosk", "autoatendimento", "kds", "cozinha", "cliente", "admin", "pwa", "supabase", "pedidos", "cardapio", "sabores", "food", "restaurante", "varejo", "touch", "caixa", "vendas"]
  ),
];

// ===== SaaS =====
const saasApps: AppProduct[] = [
  makeApp(
    "saas-001", "nexo-dashboard-pro", "NEXO Dashboard Pro", "Dashboard operacional da NEXO",
    "Dashboard profissional para gestão de clientes, projetos, tarefas, mensagens WhatsApp, repositórios GitHub e deploys Vercel. Ideal para agências e equipes técnicas que precisam de visão centralizada dos projetos.",
    "Gestão de clientes, projetos, tarefas, WhatsApp, GitHub e Vercel.",
    "saas", "react", "finance", "escritorio", "available", "2.0.0",
    "subscription", 49, "EUR", 4.7, 890,
    ["Gestão de clientes", "Projetos e health score", "Tarefas com auto-save", "WhatsApp Production", "Integração GitHub", "Deploys Vercel", "Analytics e relatórios", "Multi-usuário"],
    ["React 18", "Vite", "Tailwind", "Express", "WebSocket", "Recharts"],
    ["Navegador moderno", "Conexão internet"],
    "https://nexodashboard.onrender.com/dashboard",
    "https://github.com/Jhin1v9/NexoDashboard",
    [
      "/screenshots/nexo-dashboard-pro-1.jpg",
      "/screenshots/nexo-dashboard-pro-2.jpg",
      "/screenshots/nexo-dashboard-pro-3.jpg"
    ],
    ["dashboard", "crm", "gestao", "projetos", "tarefas", "whatsapp", "github", "vercel", "clientes", "equipe", "analytics", "saas", "admin", "produtividade", "agencia", "dev", "deploy", "health score"]
  ),
  makeApp(
    "saas-002", "bug-detector-pro", "BugDetector Pro", "Bug reporting com IA para devs",
    "Ferramenta de bug reporting focada em desenvolvedores. Captura, organiza e prioriza bugs com auxílio de IA, integrando-se ao fluxo de desenvolvimento.",
    "Bug reporting inteligente para equipes de desenvolvimento.",
    "saas", "react", "other", "outro", "available", "1.0.0",
    "subscription", 29, "EUR", 4.5, 340,
    ["Captura de bugs", "Priorização com IA", "Integração dev-first", "Relatórios detalhados", "Colaboração em equipe", "Dashboard de issues"],
    ["TypeScript", "React", "Node.js"],
    ["Navegador moderno", "Conexão internet"],
    "https://github.com/Jhin1v9/bug-detector-pro",
    "https://github.com/Jhin1v9/bug-detector-pro",
    undefined,
    ["bug", "debug", "issue", "github", "ia", "relatorio", "desenvolvedor", "dev", "qa", "qualidade", "tracker", "priorizacao", "colaboracao", "software"]
  ),
  makeApp(
    "saas-003", "nexo-billing", "Nexo Billing", "Faturação inteligente para autónomos e PYMES",
    "SaaS de faturação inteligente para autónomos e PYMES espanholas. Cria faturas em segundos com QR Verifactu, controla tesouraria, calcula impostos (Modelo 303 e 130) e apresenta declarações à AEAT sem stress. Inclui link público PWA para clientes, gestor de equipa com roles e exportação ZIP para a assessoria.",
    "Faturação inteligente com Verifactu AEAT para autónomos e PYMES.",
    "saas", "react", "finance", "escritorio", "available", "1.0.0",
    "subscription", 39, "EUR", 4.8, 620,
    ["Faturas em segundos com QR Verifactu", "Envio direto à AEAT", "Tesouraria e cobranças pendentes", "Cálculo automático Modelo 303 e 130", "Link público PWA para clientes", "Gestor de equipa com roles", "Exportação ZIP para assessoria", "Pague por SEPA via GoCardless", "7 dias de teste grátis"],
    ["React", "TypeScript", "Next.js", "Tailwind CSS", "Node.js"],
    ["Navegador moderno", "Conexão internet", "Dados fiscais Espanha"],
    "https://billing.nexo-digital.app/",
    undefined,
    [
      "/screenshots/nexo-billing-1.jpg",
      "/screenshots/nexo-billing-2.jpg",
      "/screenshots/nexo-billing-3.jpg"
    ],
    ["billing", "faturacao", "faturas", "verifactu", "aeat", "impostos", "modelo 303", "modelo 130", "autonomo", "pyme", "tesouraria", "cobranca", "sepa", "gocardless", "qr", "espanha", "contabilidade", "contador", "zip"]
  ),
];

// ===== Sites =====
const sites: AppProduct[] = [
  makeApp(
    "site-001", "nexo-digital", "NEXO Digital", "Site institucional da NEXO",
    "Site oficial da NEXO DIGITAL S.L. Apresenta a marca, serviços, produtos e portfólio da empresa. Ponto de entrada para clientes conhecerem o ecossistema NEXO.",
    "Site institucional da NEXO Digital.",
    "site", "nextjs", "other", "outro", "available", "3.0.0",
    "fixed", 299, "EUR", 4.8, 3200,
    ["Site institucional", "Apresentação de serviços", "Portfólio", "SEO otimizado", "Design responsivo", "Multi-idioma"],
    ["Next.js", "React", "Tailwind CSS"],
    ["Navegador moderno", "Domínio próprio"],
    "https://www.nexo-digital.app/pt",
    "https://github.com/Jhin1v9/nexo-digital",
    [
      "/screenshots/nexo-digital-1.jpg",
      "/screenshots/nexo-digital-2.jpg",
      "/screenshots/nexo-digital-3.jpg"
    ],
    ["site", "institucional", "portfolio", "agencia", "desenvolvimento web", "software", "nextjs", "react", "tailwind", "seo", "multilingue", "nexo", "digital", "portugal", "espanha", "brasil", "landing page"]
  ),
  makeApp(
    "site-002", "santafe-construcciones", "Construcciones Santa Fe", "Site para empresas de construção",
    "Tema WordPress profissional para empresas de construção e reformas. Inclui galeria de obras, formulário de contato, blog, seções de serviços e depoimentos. Template ideal para construtoras, arquitetos e empresas de obras.",
    "Site WordPress para construtoras e empresas de obras.",
    "site", "php", "construction", "outro", "available", "2.1.0",
    "fixed", 399, "EUR", 4.6, 540,
    ["Galeria de obras", "Formulário de contato", "Blog integrado", "Seção de serviços", "Depoimentos", "SEO local", "i18n ES/CA", "Imagens reais das obras"],
    ["PHP 8.3", "WordPress", "Tailwind CSS v4", "Vanilla JS"],
    ["WordPress 6+", "PHP 8.3+", "Hospedagem compatível"],
    "https://santafe.nexo-digital.app/",
    "https://github.com/Jhin1v9/santafe-wordpress-theme",
    [
      "/screenshots/santafe-construcciones-1.jpg",
      "/screenshots/santafe-construcciones-2.jpg",
      "/screenshots/santafe-construcciones-3.jpg"
    ],
    ["construcao", "reformas", "obra", "wordpress", "php", "site", "template", "galeria", "formulario", "blog", "seo local", "construtora", "arquiteto", "barcelona", "empresa de obras"]
  ),
  makeApp(
    "site-003", "onadance", "Onadance", "Loja de sportswear artesanal em Barcelona",
    "Loja de sportswear e moda de dança artesanal, feita em Barcelona com tecido ECONYL® 100% regenerado. Peças limitadas, sem sobreprodução, com certificações OCS, GRS e OEKO-TEX®. Inclui carrinho, checkout, envios gratuitos para Barcelona e Europa em compras acima de 150€.",
    "Sportswear sustentável feito à mão em Barcelona com ECONYL® regenerado.",
    "site", "nextjs", "retail", "outro", "available", "2.0.0",
    "fixed", 499, "EUR", 4.7, 430,
    ["Loja online completa", "Tecido ECONYL® regenerado", "Feito à mão em Barcelona", "Séries limitadas", "Carrinho e checkout", "Envio grátis Barcelona", "Envio grátis Europa +150€", "Devoluções em 14 dias", "Certificações OCS/GRS/OEKO-TEX"],
    ["Next.js", "React", "Tailwind CSS", "Shopify"],
    ["Navegador moderno", "Domínio próprio", "Gateway de pagamento"],
    "https://onadance.com/",
    undefined,
    [
      "/screenshots/onadance-1.jpg",
      "/screenshots/onadance-2.jpg",
      "/screenshots/onadance-3.jpg"
    ],
    ["loja", "ecommerce", "shopify", "moda", "danca", "sportswear", "sustentavel", "econyl", "barcelona", "roupa", "fitness", "yoga", "ballet", "series limitadas", "envio gratis", "checkout", "carrinho"]
  ),
  makeApp(
    "site-004", "ana-paula-beauty-studio", "Ana Paula Beauty Studio", "Site para estúdio de beleza",
    "Site elegante para estúdio de beleza especializado em manicure, pedicure e design de sobrancelhas. Inclui apresentação de serviços com preços e duração, portfólio de trabalhos, agendamento, depoimentos e estatísticas de confiança. Design premium e responsivo.",
    "Site premium para estúdio de manicure, pedicure e sobrancelhas.",
    "site", "nextjs", "health", "outro", "available", "1.5.0",
    "fixed", 349, "EUR", 4.9, 280,
    ["Apresentação premium", "Serviços com preços", "Portfólio de trabalhos", "Agendamento", "Depoimentos", "Estatísticas de confiança", "Design responsivo", "Animações suaves"],
    ["Next.js", "React", "Tailwind CSS", "Framer Motion"],
    ["Navegador moderno", "Domínio próprio"],
    "https://anapaula-beauty-studio.vercel.app/",
    undefined,
    [
      "/screenshots/ana-paula-beauty-studio-1.jpg",
      "/screenshots/ana-paula-beauty-studio-2.jpg",
      "/screenshots/ana-paula-beauty-studio-3.jpg"
    ],
    ["beleza", "estetica", "manicure", "pedicure", "sobrancelha", "nail art", "salao", "studio", "agendamento", "portfolio", "depoimentos", "template", "site", "premium", "responsive"]
  ),
];

// ===== Apps / Jogos =====
const apps: AppProduct[] = [
  makeApp(
    "app-001", "bool-sinuca-premiere", "Bool Sinuca Premiere", "Jogo de sinuca 8-ball PWA mobile first",
    "Jogo de sinuca 8-ball online, PWA mobile first. Entre na mesa com um toque, sem cadastro obrigatório. Controle de tacada, física realista, multiplayer e login social com Google. Ideal para bares, salões de jogos e entretenimento mobile.",
    "Jogue sinuca 8-ball online no seu celular, sem cadastro.",
    "app", "react", "entertainment", "outro", "available", "1.0.0",
    "free", undefined, "EUR", 4.6, 2100,
    ["Jogo 8-ball online", "PWA mobile first", "Sem cadastro obrigatório", "Login com Google", "Física realista", "Multiplayer", "Design dark imersivo"],
    ["React", "TypeScript", "PWA", "Firebase", "Tailwind CSS"],
    ["Navegador moderno", "iOS/Android", "Conexão internet"],
    "https://8bollpool.com/pt",
    undefined,
    [
      "/screenshots/bool-sinuca-premiere-1.jpg",
      "/screenshots/bool-sinuca-premiere-2.jpg",
      "/screenshots/bool-sinuca-premiere-3.jpg"
    ],
    ["jogo", "game", "sinuca", "bilhar", "pool", "8-ball", "pwa", "mobile", "multiplayer", "google login", "entretenimento", "bar", "salao de jogos", "esporte", "tacada"]
  ),
  makeApp(
    "app-002", "campo-minado-neon", "Campo Minado Neon", "Jogo clássico de campo minado em neon",
    "Campo minado com visual neon e vibe cyberpunk. Múltiplas dificuldades, cronômetro, animações GSAP e efeitos sonoros. Jogue direto no navegador, sem instalação.",
    "Campo minado neon com dificuldades, timer e efeitos especiais.",
    "app", "other", "entertainment", "outro", "available", "1.0.0",
    "free", undefined, "EUR", 4.5, 850,
    ["Visual neon cyberpunk", "Dificuldades fáceis, médias e difíceis", "Cronômetro e contador de bandeiras", "Animações GSAP", "Efeitos sonoros", "Sem instalação"],
    ["HTML5", "CSS3", "JavaScript", "GSAP", "Vite"],
    ["Navegador moderno", "Desktop e mobile"],
    "https://github.com/Jhin1v9/luna-minesweeper",
    "https://github.com/Jhin1v9/luna-minesweeper",
    [
      "/screenshots/campo-minado-neon-1.jpg",
      "/screenshots/campo-minado-neon-2.jpg",
      "/screenshots/campo-minado-neon-3.jpg"
    ],
    ["jogo", "game", "campo minado", "minesweeper", "neon", "retro", "logica", "quebra-cabeca", "bombas", "dificuldade", "timer", "arcade", "html5"]
  ),
  makeApp(
    "app-003", "jogo-da-velha", "Jogo da Velha", "Clássico jogo da velha em React",
    "Jogo da velha moderno feito em React com design limpo, placar de vitórias, empates e derrotas, e modo para dois jogadores. Ideal para demonstrar interatividade e estado em React.",
    "Jogo da velha moderno com placar e design clean.",
    "app", "react", "entertainment", "outro", "available", "1.0.0",
    "free", undefined, "EUR", 4.3, 620,
    ["Modo 2 jogadores", "Placar de vitórias/empates/derrotas", "Design minimalista", "Animações suaves", "Reinício rápido"],
    ["React", "Vite", "CSS3"],
    ["Navegador moderno", "Desktop e mobile"],
    "https://github.com/Jhin1v9/jogo-da-velha",
    "https://github.com/Jhin1v9/jogo-da-velha",
    [
      "/screenshots/jogo-da-velha-1.jpg",
      "/screenshots/jogo-da-velha-2.jpg",
      "/screenshots/jogo-da-velha-3.jpg"
    ],
    ["jogo", "game", "velha", "tic-tac-toe", "classico", "placar", "dois jogadores", "react", "vite", "casual", "passatempo"]
  ),
  makeApp(
    "app-004", "snake-game", "Snake Game", "Jogo da cobrinha arcade",
    "Clássico jogo da cobrinha com estética arcade neon. Controle a cobra, coma a comida, aumente o nível e bata seu high score. Totalmente responsivo e jogável no mobile.",
    "Jogo da cobrinha arcade com níveis, high score e visual neon.",
    "app", "other", "entertainment", "outro", "available", "1.0.0",
    "free", undefined, "EUR", 4.4, 780,
    ["Estética arcade neon", "Níveis de dificuldade", "High score persistente", "Controles por teclado e touch", "Responsivo"],
    ["HTML5 Canvas", "JavaScript", "CSS3"],
    ["Navegador moderno", "Desktop e mobile"],
    "https://github.com/Jhin1v9/snake-game",
    "https://github.com/Jhin1v9/snake-game",
    [
      "/screenshots/snake-game-1.jpg",
      "/screenshots/snake-game-2.jpg",
      "/screenshots/snake-game-3.jpg"
    ],
    ["jogo", "game", "snake", "cobrinha", "arcade", "neon", "high score", "nivel", "canvas", "touch", "teclado", "casual"]
  ),
  makeApp(
    "app-005", "tetris-luna", "Tetris Luna", "Tetris clássico construído pela Luna",
    "Tetris clássico com painel lateral de pontuação, nível, próxima peça e controles. Design clean, controles de teclado e reinício rápido. Ótimo exemplo de lógica de jogo e canvas.",
    "Tetris clássico com pontuação, níveis e próxima peça.",
    "app", "other", "entertainment", "outro", "available", "1.0.0",
    "free", undefined, "EUR", 4.5, 540,
    ["Jogo Tetris completo", "Painel de pontuação e nível", "Próxima peça", "Controles de teclado", "Reinício rápido"],
    ["HTML5 Canvas", "JavaScript", "CSS3"],
    ["Navegador moderno", "Desktop e mobile"],
    "https://github.com/Jhin1v9/tetris-game",
    "https://github.com/Jhin1v9/tetris-game",
    [
      "/screenshots/tetris-luna-1.jpg",
      "/screenshots/tetris-luna-2.jpg",
      "/screenshots/tetris-luna-3.jpg"
    ],
    ["jogo", "game", "tetris", "blocos", "puzzle", "arcade", "pontuacao", "nivel", "linhas", "canvas", "classico", "casual"]
  ),
  makeApp(
    "app-006", "calculadora-react", "Calculadora React", "Calculadora moderna em React + Vite",
    "Calculadora funcional desenvolvida em React com Vite. Operações básicas, histórico da expressão, design dark e responsivo. Perfeita como exemplo de componente interativo e estado.",
    "Calculadora moderna com operações básicas e design responsivo.",
    "app", "react", "other", "outro", "available", "1.0.0",
    "free", undefined, "EUR", 4.2, 410,
    ["Operações básicas", "Histórico da expressão", "Design dark", "Responsivo", "Teclado virtual"],
    ["React", "Vite", "CSS3"],
    ["Navegador moderno", "Desktop e mobile"],
    "https://github.com/Jhin1v9/calculadora-react-vite",
    "https://github.com/Jhin1v9/calculadora-react-vite",
    [
      "/screenshots/calculadora-react-1.jpg",
      "/screenshots/calculadora-react-2.jpg",
      "/screenshots/calculadora-react-3.jpg"
    ],
    ["calculadora", "calculo", "matematica", "soma", "subtracao", "multiplicacao", "divisao", "react", "vite", "utilitario", "componente", "estado"]
  ),
];

// ===== Programas =====
const programs: AppProduct[] = [
  makeApp(
    "prog-001", "luna-kernel", "Luna Kernel", "Assistente autônomo NEXO",
    "Kernel de agente autônomo para a NEXO DIGITAL. Funciona como assistente próprio do Dashboard Pro, mas pode operar de forma standalone. Gerencia tarefas, orquestra subagentes e mantém a memória operacional dos projetos.",
    "Assistente autônomo para o Dashboard Pro ou uso standalone.",
    "program", "node", "other", "outro", "available", "4.0.0",
    "subscription", 59, "EUR", 4.8, 720,
    ["Agente autônomo", "Orquestração de subagentes", "Memória operacional", "Integração Dashboard Pro", "Modo standalone", "Brain persistente", "Automação de tarefas"],
    ["Node.js", "JavaScript", "WebSocket", "PostgreSQL"],
    ["Node.js 18+", "Servidor Linux/Windows", "Conexão internet"],
    "https://github.com/Jhin1v9/luna-kernel",
    "https://github.com/Jhin1v9/luna-kernel",
    undefined,
    ["luna", "agente", "ia", "autonomo", "kernel", "subagentes", "memoria", "tarefas", "orquestracao", "dashboard", "automatizacao", "brain", "postgres", "websocket"]
  ),
];

// ===== Personalizado =====
const custom: AppProduct[] = [
  makeApp(
    "cust-001", "nexo-custom", "NEXO Custom", "Software sob medida",
    "Desenvolvimento de software personalizado sob medida para sua empresa. Análise de requisitos, prototipagem, desenvolvimento, testes e suporte contínuo. Tecnologias modernas e escaláveis.",
    "Software personalizado sob medida para seu negócio.",
    "custom", "nextjs", "other", "outro", "available", "1.0.0",
    "quote", undefined, "EUR", 4.9, 890,
    ["Análise de requisitos", "Prototipagem", "Desenvolvimento ágil", "Testes automatizados", "Suporte contínuo", "Tecnologias modernas", "Escalável", "Seguro"],
    ["Next.js", "React", "Node.js", "PostgreSQL", "AWS"],
    ["Reunião de briefing", "Contrato de prestação"],
    undefined,
    undefined,
    undefined,
    ["custom", "sob medida", "software", "aplicativo", "desenvolvimento", "escalavel", "seguro", "prototipagem", "testes", "suporte", "aws", "nextjs", "react", "node"]
  ),
];

// ===== Google Drive Apps (ingested from Drive)
const driveApps: AppProduct[] = [
  makeApp(
    "gd-100", "gestor-documental-contable", "GESTOR DOCUMENTAL CONTABLE", "Solução app para escritorio.",
    "GESTOR DOCUMENTAL CONTABLE. Gestor Documental Contable Guía técnica e instructivo de instalación y publicación en la web. Sistema de gestión de documentos contables, contabilidad, tesorería, activos, presupuestos y obligaciones tributarias.",
    "Solução app para escritorio.",
    "app", "nextjs", "finance", "escritorio", "available", "1.0.0",
    CATEGORY_PRICING.app.pricing, CATEGORY_PRICING.app.price, CATEGORY_PRICING.app.currency, 4.5, 120,
    ["Tecnología con la que fue desarrollado", "Funcionalidades del sistema", "Multiempresa: manejo de varias empresas con selector de empresa activa y filtrado de datos.", "Roles y seguridad: Administrador (acceso total) y Operador (registra/edita, no elimina ni administra).", "Auditoría: bitácora que registra quién crea, edita o elimina cada registro.", "Moneda y tipo de cambio: conversión automática a soles según la cotización de la fecha.", "Detracciones y retenciones, notas de crédito/débito y cierre contable mensual.", "Pruebas automáticas: 37 pruebas que validan todos los módulos, reportes y la API."],
    ["Next.js", "Python", "Django", "PostgreSQL", "MySQL"],
    ["Navegador moderno", "Conexão internet"],
    undefined,
    undefined,
    ["/screenshot-placeholder.jpg", "/screenshot-placeholder.jpg", "/screenshot-placeholder.jpg"],
    ["gestor-documental-contable", "app", "finance", "escritorio"]
  ),
  makeApp(
    "gd-101", "sistema-de-encomiendas", "SISTEMA DE ENCOMIENDAS", "Solução app para escritorio.",
    "SISTEMA DE ENCOMIENDAS. EnviosPro Sistema de Encomiendas y Paqueteria Documentacion tecnica - Instalacion - Despliegue web",
    "Solução app para escritorio.",
    "app", "nextjs", "finance", "escritorio", "available", "1.0.0",
    CATEGORY_PRICING.app.pricing, CATEGORY_PRICING.app.price, CATEGORY_PRICING.app.currency, 4.5, 120,
    ["Interface moderna", "Design responsivo", "Fácil instalação", "Personalizável"],
    ["Next.js", "Python", "Django", "MySQL"],
    ["Navegador moderno", "Conexão internet"],
    undefined,
    undefined,
    ["/screenshot-placeholder.jpg", "/screenshot-placeholder.jpg", "/screenshot-placeholder.jpg"],
    ["sistema-de-encomiendas", "app", "finance", "escritorio"]
  ),
  makeApp(
    "gd-102", "gestor-documental-municipal", "GESTOR DOCUMENTAL MUNICIPAL", "Solução app para seu negócio.",
    "GESTOR DOCUMENTAL MUNICIPAL — Solução profissional da NEXO Digital para o seu negócio.",
    "Solução app para seu negócio.",
    "app", "nextjs", "other", "outro", "available", "1.0.0",
    CATEGORY_PRICING.app.pricing, CATEGORY_PRICING.app.price, CATEGORY_PRICING.app.currency, 4.5, 120,
    ["Interface moderna", "Design responsivo", "Fácil instalação", "Personalizável"],
    ["Next.js", "React", "Tailwind CSS"],
    ["Navegador moderno", "Conexão internet"],
    undefined,
    undefined,
    ["/screenshot-placeholder.jpg", "/screenshot-placeholder.jpg", "/screenshot-placeholder.jpg"],
    ["gestor-documental-municipal", "app", "other", "outro"]
  ),
  makeApp(
    "gd-103", "gestion-de-almacenes", "GESTIÓN DE ALMACENES", "Solução app para escritorio.",
    "GESTIÓN DE ALMACENES. AlmacénPro Sistema de Gestión de Almacenes",
    "Solução app para escritorio.",
    "app", "nextjs", "finance", "escritorio", "available", "1.0.0",
    CATEGORY_PRICING.app.pricing, CATEGORY_PRICING.app.price, CATEGORY_PRICING.app.currency, 4.5, 120,
    ["Tecnologías utilizadas", "Funcionalidades del sistema", "indicadores (KPIs) y 4 gráficos en tiempo real: movimientos, stock por", "Instalación en una computadora nueva", "Hosting web sugerido", "Despliegue paso a paso en PythonAnywhere"],
    ["Next.js", "Python", "Django", "PostgreSQL", "MySQL"],
    ["Navegador moderno", "Conexão internet"],
    undefined,
    undefined,
    ["/screenshot-placeholder.jpg", "/screenshot-placeholder.jpg", "/screenshot-placeholder.jpg"],
    ["gestion-de-almacenes", "app", "finance", "escritorio"]
  ),
  makeApp(
    "gd-104", "sistema-de-consultorio-medico", "SISTEMA DE CONSULTORIO MÉDICO", "Solução app para clinica.",
    "SISTEMA DE CONSULTORIO MÉDICO. Sistema de Gestion para Consultorio Medico",
    "Solução app para clinica.",
    "app", "nextjs", "health", "clinica", "available", "1.0.0",
    CATEGORY_PRICING.app.pricing, CATEGORY_PRICING.app.price, CATEGORY_PRICING.app.currency, 4.5, 120,
    ["modulos: pacientes, citas, consultas, laboratorio,", "Python 3.12", "XAMPP (MySQL)", "Editor de texto (opcional)", "Git (opcional)"],
    ["Next.js", "PHP", "Python", "Django", "PostgreSQL", "MySQL"],
    ["Navegador moderno", "Conexão internet"],
    undefined,
    undefined,
    ["/screenshot-placeholder.jpg", "/screenshot-placeholder.jpg", "/screenshot-placeholder.jpg"],
    ["sistema-de-consultorio-medico", "app", "health", "clinica"]
  ),
  makeApp(
    "gd-105", "saas-gimnasio", "SaaS Gimnasio", "Solução saas para clinica.",
    "SaaS Gimnasio. GymSaaS Pro Manual del Sistema Plataforma SaaS de Gestion para Gimnasios",
    "Solução saas para clinica.",
    "saas", "nextjs", "health", "clinica", "available", "1.0.0",
    CATEGORY_PRICING.saas.pricing, CATEGORY_PRICING.saas.price, CATEGORY_PRICING.saas.currency, 4.5, 120,
    ["Tecnologia utilizada", "Funcionalidades del sistema", "Instalacion en una computadora nueva", "Hosting web recomendado", "Despliegue paso a paso en Hostinger", "Multi-tenant: cada gimnasio ve unicamente sus propios datos.", "Registro de gimnasios con prueba gratis de 14 dias y landing con precios.", "Dashboard con KPIs, MRR (ingreso recurrente) y crecimiento mensual."],
    ["Next.js", "PHP", "Laravel", "MySQL"],
    ["Navegador moderno", "Conexão internet"],
    undefined,
    undefined,
    ["/screenshot-placeholder.jpg", "/screenshot-placeholder.jpg", "/screenshot-placeholder.jpg"],
    ["saas-gimnasio", "saas", "health", "clinica"]
  ),
  makeApp(
    "gd-106", "sistema-de-gimnasio", "SISTEMA DE GIMNASIO", "Solução saas para clinica.",
    "SISTEMA DE GIMNASIO. COL_GYM-SYSTEM Manual tecnico y operativo",
    "Solução saas para clinica.",
    "saas", "nextjs", "health", "clinica", "available", "1.0.0",
    CATEGORY_PRICING.saas.pricing, CATEGORY_PRICING.saas.price, CATEGORY_PRICING.saas.currency, 4.5, 120,
    ["Tecnologia utilizada en la integracion", "Funcionalidades disponibles en el sistema", "Datos que debe proveer el dueno de la empresa", "Configuracion y puesta en produccion paso a paso", "Diagramas y referencia visual", "Tecnologia utilizada en la integracion", "Funcionalidades disponibles en el sistema", "Factura electronica de venta (FV)"],
    ["Next.js", "PHP", "MySQL"],
    ["Navegador moderno", "Conexão internet"],
    undefined,
    undefined,
    ["/screenshot-placeholder.jpg", "/screenshot-placeholder.jpg", "/screenshot-placeholder.jpg"],
    ["sistema-de-gimnasio", "saas", "health", "clinica"]
  ),
  makeApp(
    "gd-107", "saas-odontologia", "SaaS Odontología", "Solução saas para clinica.",
    "SaaS Odontología. OdontoCRM Sistema de Gestión para Clínicas Dentales Documentación técnica: tecnología, funcionalidades, instalación en una computadora nueva y guía de publicación en un hosting web.",
    "Solução saas para clinica.",
    "saas", "nextjs", "health", "clinica", "available", "1.0.0",
    CATEGORY_PRICING.saas.pricing, CATEGORY_PRICING.saas.price, CATEGORY_PRICING.saas.currency, 4.5, 120,
    ["Ficha completa y buscador global", "Listado y calendario mensual", "Odontograma interactivo", "Disponibilidad por doctor y silla (antisolapamiento)", "Antecedentes médicos estructurados, alergias", "Confirmación de cita por enlace público", "Evolución clínica por sesión", "Recordatorios por email y WhatsApp"],
    ["Next.js", "PHP", "Laravel", "MySQL"],
    ["Navegador moderno", "Conexão internet"],
    undefined,
    undefined,
    ["/screenshot-placeholder.jpg", "/screenshot-placeholder.jpg", "/screenshot-placeholder.jpg"],
    ["saas-odontologia", "saas", "health", "clinica"]
  ),
  makeApp(
    "gd-108", "sistema-de-botica", "SISTEMA DE BOTICA", "Solução saas para clinica.",
    "SISTEMA DE BOTICA. D O C U M E N TAC I Ó N T É C N I C A Y F U N C I O N A L",
    "Solução saas para clinica.",
    "saas", "nextjs", "health", "clinica", "available", "1.0.0",
    CATEGORY_PRICING.saas.pricing, CATEGORY_PRICING.saas.price, CATEGORY_PRICING.saas.currency, 4.5, 120,
    ["XML UBL", "Respuesta", "Envío DIAN", "NIT de la empresa con su dígito de verificación.", "Razón social exacta (o nombre, si es persona natural).", "Dirección del establecimiento, ciudad y códigos DANE de municipio y departamento.", "Teléfono y correo electrónico de contacto.", "Tipo de persona: jurídica o natural."],
    ["Next.js", "PHP", "MySQL"],
    ["Navegador moderno", "Conexão internet"],
    undefined,
    undefined,
    ["/screenshot-placeholder.jpg", "/screenshot-placeholder.jpg", "/screenshot-placeholder.jpg"],
    ["sistema-de-botica", "saas", "health", "clinica"]
  ),
  makeApp(
    "gd-109", "crm-delivery", "CRM-DELIVERY", "Solução saas para escritorio.",
    "CRM-DELIVERY. CRM DELIVERY Manual de Sistema y Despliegue",
    "Solução saas para escritorio.",
    "saas", "nextjs", "other", "escritorio", "available", "1.0.0",
    CATEGORY_PRICING.saas.pricing, CATEGORY_PRICING.saas.price, CATEGORY_PRICING.saas.currency, 4.5, 120,
    ["Tecnologías utilizadas", "Funcionalidades del sistema", "niveles: solo transaccional, operativo o total (nueva empresa).", "Instalación local paso a paso", "Entra a laragon.org y descarga la versión Laragon Full (incluye PHP, MySQL, Apache).", "Ejecuta el instalador con doble clic. Acepta la ruta por defecto C:\\laragon.", "Al terminar, abre Laragon y haz clic en \"Iniciar Todo\". Verás los servicios Apache y MySQL en verde.", "Verifica que PHP funciona: clic en Menú → PHP → Versión debe mostrar 8.3 o superior."],
    ["Next.js", "Node.js", "PHP", "Laravel", "MySQL"],
    ["Navegador moderno", "Conexão internet"],
    undefined,
    undefined,
    ["/screenshot-placeholder.jpg", "/screenshot-placeholder.jpg", "/screenshot-placeholder.jpg"],
    ["crm-delivery", "saas", "other", "escritorio"]
  ),
  makeApp(
    "gd-110", "saas-clinica", "SaaS Clínica", "Solução saas para clinica.",
    "SaaS Clínica. SaaS Clinica Sistema de Gestion Clinica Multi-Clinica Documentacion Tecnica & Guia de Instalacion y Despliegue",
    "Solução saas para clinica.",
    "saas", "nextjs", "health", "clinica", "available", "1.0.0",
    CATEGORY_PRICING.saas.pricing, CATEGORY_PRICING.saas.price, CATEGORY_PRICING.saas.currency, 4.5, 120,
    ["Tecnologia utilizada", "Funcionalidades del sistema", "Instalacion local (paso a paso)", "Hosting web recomendado", "Despliegue en el hosting (paso a paso)"],
    ["Next.js", "Node.js", "PHP", "Tailwind CSS", "Laravel", "MySQL"],
    ["Navegador moderno", "Conexão internet"],
    undefined,
    undefined,
    ["/screenshot-placeholder.jpg", "/screenshot-placeholder.jpg", "/screenshot-placeholder.jpg"],
    ["saas-clinica", "saas", "health", "clinica"]
  ),
  makeApp(
    "gd-111", "tpv-zapateria", "TPV Zapateria", "Solução tpv para loja.",
    "TPV Zapateria. DOCUMENTACIÓN OFICIAL · V1.0.0",
    "Solução tpv para loja.",
    "tpv", "nextjs", "retail", "loja", "available", "1.0.0",
    CATEGORY_PRICING.tpv.pricing, CATEGORY_PRICING.tpv.price, CATEGORY_PRICING.tpv.currency, 4.5, 120,
    ["Gestão de vendas", "Controle de estoque", "Multi-usuário", "Relatórios"],
    ["Next.js", "Node.js", "PHP", "Tailwind CSS", "Laravel", "MySQL"],
    ["Navegador moderno", "Conexão internet"],
    undefined,
    undefined,
    ["/screenshot-placeholder.jpg", "/screenshot-placeholder.jpg", "/screenshot-placeholder.jpg"],
    ["tpv-zapateria", "tpv", "retail", "loja"]
  ),
  makeApp(
    "gd-112", "gestor-documental-abogados", "GESTOR DOCUMENTAL ABOGADOS", "Solução app para seu negócio.",
    "GESTOR DOCUMENTAL ABOGADOS. LexDoc Gestor Documental para Estudios Juridicos",
    "Solução app para seu negócio.",
    "app", "nextjs", "other", "outro", "available", "1.0.0",
    CATEGORY_PRICING.app.pricing, CATEGORY_PRICING.app.price, CATEGORY_PRICING.app.currency, 4.5, 120,
    ["Tecnologia utilizada", "graficos estadisticos del dashboard", "Funcionalidades del sistema", "Instalacion en una computadora nueva", "Hosting web sugerido", "Como subirlo a PythonAnywhere (paso a paso)"],
    ["Next.js", "Python", "Django", "PostgreSQL", "MySQL"],
    ["Navegador moderno", "Conexão internet"],
    undefined,
    undefined,
    ["/screenshot-placeholder.jpg", "/screenshot-placeholder.jpg", "/screenshot-placeholder.jpg"],
    ["gestor-documental-abogados", "app", "other", "outro"]
  ),
  makeApp(
    "gd-113", "tpv-peluqueria", "TPV Peluquería", "Solução tpv para barbearia.",
    "TPV Peluquería. T TPV Peluquería Sistema de gestión integral para peluquerías, barberías y salones de belleza",
    "Solução tpv para barbearia.",
    "tpv", "nextjs", "health", "barbearia", "available", "1.0.0",
    CATEGORY_PRICING.tpv.pricing, CATEGORY_PRICING.tpv.price, CATEGORY_PRICING.tpv.currency, 4.5, 120,
    ["Tecnologías utilizadas", "Funcionalidades", "módulos integrados en un solo sistema", "Instalación en una computadora nueva", "Hostings web recomendados", "Subir el sistema a Hostinger"],
    ["Next.js", "Node.js", "PHP", "Laravel", "MySQL"],
    ["Navegador moderno", "Conexão internet"],
    undefined,
    undefined,
    ["/screenshot-placeholder.jpg", "/screenshot-placeholder.jpg", "/screenshot-placeholder.jpg"],
    ["tpv-peluqueria", "tpv", "health", "barbearia"]
  ),
  makeApp(
    "gd-114", "sistema-de-hospedaje", "SISTEMA DE HOSPEDAJE", "Solução saas para escritorio.",
    "SISTEMA DE HOSPEDAJE. MANUAL TÉCNICO · v1.0",
    "Solução saas para escritorio.",
    "saas", "nextjs", "other", "escritorio", "available", "1.0.0",
    CATEGORY_PRICING.saas.pricing, CATEGORY_PRICING.saas.price, CATEGORY_PRICING.saas.currency, 4.5, 120,
    ["Tecnología de desarrollo — stack y librerías", "Funcionalidades del sistema — módulos para casos reales", "Instalación en una computadora nueva — programas y configuración", "Hosting web recomendado — opciones y comparativa", "Despliegue en el hosting recomendado — guía paso a paso"],
    ["Next.js", "Node.js", "PHP", "Laravel", "MySQL"],
    ["Navegador moderno", "Conexão internet"],
    undefined,
    undefined,
    ["/screenshot-placeholder.jpg", "/screenshot-placeholder.jpg", "/screenshot-placeholder.jpg"],
    ["sistema-de-hospedaje", "saas", "other", "escritorio"]
  ),
  makeApp(
    "gd-115", "tpv-panaderia", "TPV Panadería", "Solução tpv para restaurante.",
    "TPV Panadería. P TPV PANADERÍA Sistema de Punto de Venta para Panaderías, Pastelerías y Confiterías",
    "Solução tpv para restaurante.",
    "tpv", "nextjs", "food", "restaurante", "available", "1.0.0",
    CATEGORY_PRICING.tpv.pricing, CATEGORY_PRICING.tpv.price, CATEGORY_PRICING.tpv.currency, 4.5, 120,
    ["Tecnologías utilizadas", "controladores (TPV, Productos, Stock, etc.)", "modelos Eloquent con relaciones", "migraciones que crean todo el esquema", "plantillas Blade", "Funcionalidades del sistema", "Interfaz visual moderna con paleta panadería (tonos cálidos y profesionales).", "TPV optimizado para pantalla táctil: ideal para mostrador."],
    ["Next.js", "PHP", "Laravel", "MySQL"],
    ["Navegador moderno", "Conexão internet"],
    undefined,
    undefined,
    ["/screenshot-placeholder.jpg", "/screenshot-placeholder.jpg", "/screenshot-placeholder.jpg"],
    ["tpv-panaderia", "tpv", "food", "restaurante"]
  ),
  makeApp(
    "gd-116", "saas-botica", "SaaS Botica", "Solução saas para clinica.",
    "SaaS Botica. Manual del Sistema Sistema de Gestión para Botica / Farmacia Tecnología, funcionalidades, instalación y publicación en internet",
    "Solução saas para clinica.",
    "saas", "nextjs", "health", "clinica", "available", "1.0.0",
    CATEGORY_PRICING.saas.pricing, CATEGORY_PRICING.saas.price, CATEGORY_PRICING.saas.currency, 4.5, 120,
    ["Dashboard web", "Gestão centralizada", "Relatórios", "Multi-usuário"],
    ["Next.js", "PHP", "Tailwind CSS", "Laravel", "MySQL"],
    ["Navegador moderno", "Conexão internet"],
    undefined,
    undefined,
    ["/screenshot-placeholder.jpg", "/screenshot-placeholder.jpg", "/screenshot-placeholder.jpg"],
    ["saas-botica", "saas", "health", "clinica"]
  ),
  makeApp(
    "gd-117", "saas-citas-medicas", "SaaS Citas Médicas", "Solução saas para seu negócio.",
    "SaaS Citas Médicas. CitasMédicas SaaS CLÍNICO",
    "Solução saas para seu negócio.",
    "saas", "nextjs", "other", "outro", "available", "1.0.0",
    CATEGORY_PRICING.saas.pricing, CATEGORY_PRICING.saas.price, CATEGORY_PRICING.saas.currency, 4.5, 120,
    ["Dashboard web", "Gestão centralizada", "Relatórios", "Multi-usuário"],
    ["Next.js", "Node.js", "PHP", "Tailwind CSS", "Laravel", "MySQL"],
    ["Navegador moderno", "Conexão internet"],
    undefined,
    undefined,
    ["/screenshot-placeholder.jpg", "/screenshot-placeholder.jpg", "/screenshot-placeholder.jpg"],
    ["saas-citas-medicas", "saas", "other", "outro"]
  ),
  makeApp(
    "gd-118", "tpv-minimarket", "TPV Minimarket", "Solução tpv para loja.",
    "TPV Minimarket. S I ST E M A T PV M I N I M A R K E T",
    "Solução tpv para loja.",
    "tpv", "nextjs", "retail", "loja", "available", "1.0.0",
    CATEGORY_PRICING.tpv.pricing, CATEGORY_PRICING.tpv.price, CATEGORY_PRICING.tpv.currency, 4.5, 120,
    ["Tecnología con la que fue desarrollada la integración", "Funcionalidades de la facturación electrónica", "Datos que debe proporcionar el dueño de la empresa", "Configuración paso a paso para producción", "Clave de acceso", "Firma digital", "Recepción", "dígitos + XML"],
    ["Next.js", "PHP", "Tailwind CSS", "Laravel", "MySQL"],
    ["Navegador moderno", "Conexão internet"],
    undefined,
    undefined,
    ["/screenshot-placeholder.jpg", "/screenshot-placeholder.jpg", "/screenshot-placeholder.jpg"],
    ["tpv-minimarket", "tpv", "retail", "loja"]
  ),
  makeApp(
    "gd-119", "sistema-de-restaurante", "SISTEMA DE RESTAURANTE", "Solução site para restaurante.",
    "SISTEMA DE RESTAURANTE. FACTURACIÓN ELECTRÓNICA DIAN República de Colombia",
    "Solução site para restaurante.",
    "site", "php", "food", "restaurante", "available", "1.0.0",
    CATEGORY_PRICING.site.pricing, CATEGORY_PRICING.site.price, CATEGORY_PRICING.site.currency, 4.5, 120,
    ["Tecnología utilizada", "Funcionalidades del sistema", "Emisión desde el POS al cerrar la venta.", "Generación del XML UBL 2.1 con extensiones DIAN.", "Firma XAdES-EPES con el certificado .p12.", "Cálculo del CUFE (SHA-384) según fórmula DIAN.", "Envío sincrónico vía SOAP (SendBillSync).", "Almacenamiento del XML firmado y del AR."],
    ["Php", "PHP", "Laravel", "MySQL"],
    ["Navegador moderno", "Conexão internet"],
    undefined,
    undefined,
    ["/screenshot-placeholder.jpg", "/screenshot-placeholder.jpg", "/screenshot-placeholder.jpg"],
    ["sistema-de-restaurante", "site", "food", "restaurante"]
  ),
  makeApp(
    "gd-120", "tpv-hosteleria", "TPV_Hosteleria", "Solução tpv para restaurante.",
    "TPV_Hosteleria. TPV Hosteleria Manual del Sistema Software POS para restaurantes, bares y cafeterías. Comandas, mesas, cocina, caja, stock e informes — preparado para VeriFactu y TicketBAI. PHP 8.2 + Laravel 11",
    "Solução tpv para restaurante.",
    "tpv", "nextjs", "food", "restaurante", "available", "1.0.0",
    CATEGORY_PRICING.tpv.pricing, CATEGORY_PRICING.tpv.price, CATEGORY_PRICING.tpv.currency, 4.5, 120,
    ["Tecnología de desarrollo ········· Stack backend, frontend y librerías", "Funcionalidades del sistema ········· Módulos operativos y de gestión", "Instalación en una computadora nueva ········· Programas a instalar y configuración paso a", "Hosting web recomendado ········· Comparativa de opciones", "Puesta en producción paso a paso ········· Subir la app al hosting recomendado"],
    ["Next.js", "Node.js", "PHP", "Tailwind CSS", "Laravel", "MySQL"],
    ["Navegador moderno", "Conexão internet"],
    undefined,
    undefined,
    ["/screenshot-placeholder.jpg", "/screenshot-placeholder.jpg", "/screenshot-placeholder.jpg"],
    ["tpv-hosteleria", "tpv", "food", "restaurante"]
  ),
  makeApp(
    "gd-121", "tpv-cafeteria", "TPV Cafeteria", "Solução tpv para restaurante.",
    "TPV Cafeteria. Sistema TPV Cafetería Punto de Venta · Documentación de tecnología, instalación y despliegue web",
    "Solução tpv para restaurante.",
    "tpv", "nextjs", "food", "restaurante", "available", "1.0.0",
    CATEGORY_PRICING.tpv.pricing, CATEGORY_PRICING.tpv.price, CATEGORY_PRICING.tpv.currency, 4.5, 120,
    ["Tecnología utilizada", "Funcionalidades del sistema", "Instalación en una computadora nueva", "Hosting web recomendado", "Cómo subir la aplicación al hosting (paso a paso)", "· Dashboard", "· Punto de Venta (POS)", "· Productos y Categorías"],
    ["Next.js", "React", "PHP", "Laravel", "MySQL"],
    ["Navegador moderno", "Conexão internet"],
    undefined,
    undefined,
    ["/screenshot-placeholder.jpg", "/screenshot-placeholder.jpg", "/screenshot-placeholder.jpg"],
    ["tpv-cafeteria", "tpv", "food", "restaurante"]
  ),
  makeApp(
    "gd-122", "saas-minimarket", "SaaS Minimarket", "Solução saas para loja.",
    "SaaS Minimarket. SISTEMA DE PUNTO DE VENTA · SaaS",
    "Solução saas para loja.",
    "saas", "nextjs", "retail", "loja", "available", "1.0.0",
    CATEGORY_PRICING.saas.pricing, CATEGORY_PRICING.saas.price, CATEGORY_PRICING.saas.currency, 4.5, 120,
    ["Dashboard web", "Gestão centralizada", "Relatórios", "Multi-usuário"],
    ["Next.js", "PHP", "Tailwind CSS", "Laravel", "MySQL"],
    ["Navegador moderno", "Conexão internet"],
    undefined,
    undefined,
    ["/screenshot-placeholder.jpg", "/screenshot-placeholder.jpg", "/screenshot-placeholder.jpg"],
    ["saas-minimarket", "saas", "retail", "loja"]
  ),
  makeApp(
    "gd-123", "saas-tienda-moda", "SaaS Tienda Moda", "Solução saas para loja.",
    "SaaS Tienda Moda. SaaS Tienda Moda Sistema de Gestion Multi-Tienda para Moda",
    "Solução saas para loja.",
    "saas", "nextjs", "retail", "loja", "available", "1.0.0",
    CATEGORY_PRICING.saas.pricing, CATEGORY_PRICING.saas.price, CATEGORY_PRICING.saas.currency, 4.5, 120,
    ["Inicio de sesion seguro", "Registro publico de nuevas tiendas", "15 dias de prueba gratis", "Cierre de sesion", "KPIs: ventas hoy/mes, clientes, stock", "Grafico de ventas (7 dias)", "Ventas por categoria", "Inventario por categoria y metodos de pago"],
    ["Next.js", "PHP", "Laravel", "MySQL"],
    ["Navegador moderno", "Conexão internet"],
    undefined,
    undefined,
    ["/screenshot-placeholder.jpg", "/screenshot-placeholder.jpg", "/screenshot-placeholder.jpg"],
    ["saas-tienda-moda", "saas", "retail", "loja"]
  ),
  makeApp(
    "gd-124", "saas-restaurante", "SaaS Restaurante", "Solução saas para restaurante.",
    "SaaS Restaurante. R Mi Restaurante VIP Sistema SaaS de gestion para restaurantes",
    "Solução saas para restaurante.",
    "saas", "nextjs", "food", "restaurante", "available", "1.0.0",
    CATEGORY_PRICING.saas.pricing, CATEGORY_PRICING.saas.price, CATEGORY_PRICING.saas.currency, 4.5, 120,
    ["Punto de Venta (POS) con IGV, descuentos y", "Gestion de mesas en tiempo real", "Reservas con asignacion de mesa", "Pedidos y cambios de estado", "Cocina (KDS): tablero en vivo de comandas", "Caja: apertura, movimientos, cierre y arqueo", "Base de clientes", "Fidelizacion por puntos (ganar y canjear)"],
    ["Next.js", "Node.js", "PHP", "Tailwind CSS", "Laravel", "MySQL"],
    ["Navegador moderno", "Conexão internet"],
    undefined,
    undefined,
    ["/screenshot-placeholder.jpg", "/screenshot-placeholder.jpg", "/screenshot-placeholder.jpg"],
    ["saas-restaurante", "saas", "food", "restaurante"]
  ),
  makeApp(
    "gd-125", "saas-ferreteria", "SaaS Ferretería", "Solução saas para loja.",
    "SaaS Ferretería. FerreMax SaaS Sistema de Gestion para Ferreterias Documentacion tecnica · Instalacion · Despliegue",
    "Solução saas para loja.",
    "saas", "nextjs", "retail", "loja", "available", "1.0.0",
    CATEGORY_PRICING.saas.pricing, CATEGORY_PRICING.saas.price, CATEGORY_PRICING.saas.currency, 4.5, 120,
    ["· Tecnologia de desarrollo", "· Funcionalidades del sistema", "· Instalacion en una PC nueva", "· Hosting web recomendado", "· Despliegue paso a paso en Hostinger", "· Recomendaciones finales"],
    ["Next.js", "React", "PHP", "Tailwind CSS", "Laravel", "MySQL"],
    ["Navegador moderno", "Conexão internet"],
    undefined,
    undefined,
    ["/screenshot-placeholder.jpg", "/screenshot-placeholder.jpg", "/screenshot-placeholder.jpg"],
    ["saas-ferreteria", "saas", "retail", "loja"]
  ),
  makeApp(
    "gd-126", "crm-gestion-tienda-celulares", "CRM-GESTION-TIENDA-CELULARES", "Solução saas para loja.",
    "CRM-GESTION-TIENDA-CELULARES. C CRM Tienda Celulares Sistema de Gestion Integral Manual Tecnico, Guia de Instalacion y Despliegue en Hosting Web PHP 8.1",
    "Solução saas para loja.",
    "saas", "nextjs", "retail", "loja", "available", "1.0.0",
    CATEGORY_PRICING.saas.pricing, CATEGORY_PRICING.saas.price, CATEGORY_PRICING.saas.currency, 4.5, 120,
    ["Dashboard web", "Gestão centralizada", "Relatórios", "Multi-usuário"],
    ["Next.js", "PHP", "Python", "Laravel", "MySQL"],
    ["Navegador moderno", "Conexão internet"],
    undefined,
    undefined,
    ["/screenshot-placeholder.jpg", "/screenshot-placeholder.jpg", "/screenshot-placeholder.jpg"],
    ["crm-gestion-tienda-celulares", "saas", "retail", "loja"]
  ),
  makeApp(
    "gd-127", "saas-hospedaje", "SaaS Hospedaje", "Solução saas para escritorio.",
    "SaaS Hospedaje. Hospedaje Pro Sistema SaaS de Gestion Hotelera Documentacion tecnica, instalacion y despliegue",
    "Solução saas para escritorio.",
    "saas", "nextjs", "other", "escritorio", "available", "1.0.0",
    CATEGORY_PRICING.saas.pricing, CATEGORY_PRICING.saas.price, CATEGORY_PRICING.saas.currency, 4.5, 120,
    ["Tecnologia de desarrollo", "Funcionalidades del sistema", "Instalacion en una computadora nueva", "Hosting web sugerido", "- 9 /mes", "- 20 /mes", "Como subir el sistema a Hostinger"],
    ["Next.js", "PHP", "Laravel", "MySQL"],
    ["Navegador moderno", "Conexão internet"],
    undefined,
    undefined,
    ["/screenshot-placeholder.jpg", "/screenshot-placeholder.jpg", "/screenshot-placeholder.jpg"],
    ["saas-hospedaje", "saas", "other", "escritorio"]
  ),
  makeApp(
    "gd-128", "crm-odontologia", "CRM_ODONTOLOGIA", "Solução saas para clinica.",
    "CRM_ODONTOLOGIA. Manual Técnico & Guía de Implementación Sistema CRM para Odontología",
    "Solução saas para clinica.",
    "saas", "nextjs", "health", "clinica", "available", "1.0.0",
    CATEGORY_PRICING.saas.pricing, CATEGORY_PRICING.saas.price, CATEGORY_PRICING.saas.currency, 4.5, 120,
    ["Tecnologías del Desarrollo 🛠️", "Funcionalidades del Sistema ⚙️", "Dashboard y Analíticas:", "Gestión de Pacientes e Historia Clínica:", "Odontograma Interactivo:", "Módulo de Citas y Calendario:", "Presupuestos y Finanzas:", "Gestión de Tratamientos y Categorías:"],
    ["Next.js", "React", "Node.js", "PHP", "Tailwind CSS", "MySQL"],
    ["Navegador moderno", "Conexão internet"],
    undefined,
    undefined,
    ["/screenshot-placeholder.jpg", "/screenshot-placeholder.jpg", "/screenshot-placeholder.jpg"],
    ["crm-odontologia", "saas", "health", "clinica"]
  ),
  makeApp(
    "gd-129", "tpv-fastfood", "TPV Fastfood", "Solução tpv para restaurante.",
    "TPV Fastfood. Manual Técnico y Despliegue - TPV FastFood",
    "Solução tpv para restaurante.",
    "tpv", "nextjs", "food", "restaurante", "available", "1.0.0",
    CATEGORY_PRICING.tpv.pricing, CATEGORY_PRICING.tpv.price, CATEGORY_PRICING.tpv.currency, 4.5, 120,
    ["Descargar e instalar XAMPP (incluye PHP y MySQL).", "Descargar e instalar Composer (Gestor de dependencias de PHP).", "Un editor de código como Visual Studio Code.", "Copia la carpeta del proyecto crm-tpv-fastfood dentro del directorio de tu servidor local:", "Abre el panel de control de XAMPP e inicia los módulos de Apache y MySQL.", "Abre tu navegador y entra a http://localhost/phpmyadmin . Crea una nueva base de datos", "En la carpeta del proyecto, duplica el archivo .env.example y renómbralo como .env .", "Abre el archivo .env y configura la conexión a la base de datos:"],
    ["Next.js", "PHP", "Laravel", "MySQL"],
    ["Navegador moderno", "Conexão internet"],
    undefined,
    undefined,
    ["/screenshot-placeholder.jpg", "/screenshot-placeholder.jpg", "/screenshot-placeholder.jpg"],
    ["tpv-fastfood", "tpv", "food", "restaurante"]
  ),
  makeApp(
    "gd-130", "saas-academia", "SaaS Academia", "Solução saas para clinica.",
    "SaaS Academia. A AcademiaPro SISTEMA SaaS DE GESTIÓN DE ACADEMIAS",
    "Solução saas para clinica.",
    "saas", "nextjs", "health", "clinica", "available", "1.0.0",
    CATEGORY_PRICING.saas.pricing, CATEGORY_PRICING.saas.price, CATEGORY_PRICING.saas.currency, 4.5, 120,
    ["Multi-tenant (single-database): cada academia se aísla con una columna academia_id y un global scope", "Control de acceso por roles y permisos por módulo (Super Admin, Admin, Secretaría, Docente,", "Seguridad: contraseñas cifradas (hash), protección CSRF, validación de formularios y middleware de", "Bitácora de auditoría automática de altas, cambios, bajas e inicios de sesión.", "Panel global con métricas e ingresos (MRR)", "Landing con presentación y precios", "Gestión de academias (alta, edición, baja)", "Registro self-service (15 días de prueba)"],
    ["Next.js", "PHP", "Laravel", "MySQL"],
    ["Navegador moderno", "Conexão internet"],
    undefined,
    undefined,
    ["/screenshot-placeholder.jpg", "/screenshot-placeholder.jpg", "/screenshot-placeholder.jpg"],
    ["saas-academia", "saas", "health", "clinica"]
  ),
  makeApp(
    "gd-131", "tpv-joyeria-y-relojeria", "TPV Joyería y relojería", "Solução tpv para loja.",
    "TPV Joyería y relojería. TPV JOYERIA y RELOJERIA Sistema de punto de venta profesional Para joyerias, relojerias y bisuterias",
    "Solução tpv para loja.",
    "tpv", "nextjs", "retail", "loja", "available", "1.0.0",
    CATEGORY_PRICING.tpv.pricing, CATEGORY_PRICING.tpv.price, CATEGORY_PRICING.tpv.currency, 4.5, 120,
    ["Tecnologias utilizadas", "Funcionalidades del sistema", "Multiidioma y multimoneda: Configurable para Espana (EUR, IVA 21%), Mexico (MXN, IVA", "Multi-usuario con roles: Administrador, vendedor, cajero, tecnico. Cada uno con permisos", "Dashboard interactivo: 8 KPIs en tarjetas, 4 graficos en tiempo real (linea, barras, doughnut,", "TPV optimizado: Atajos de teclado, busqueda con escaner, cobro en multiples metodos de", "Trazabilidad de stock: Cada movimiento queda registrado con usuario, fecha y motivo.", "Documentos profesionales: Tickets para impresora termica y facturas A4 con datos fiscales."],
    ["Next.js", "PHP", "Laravel", "MySQL"],
    ["Navegador moderno", "Conexão internet"],
    undefined,
    undefined,
    ["/screenshot-placeholder.jpg", "/screenshot-placeholder.jpg", "/screenshot-placeholder.jpg"],
    ["tpv-joyeria-y-relojeria", "tpv", "retail", "loja"]
  ),
  makeApp(
    "gd-132", "saas-prestamos-y-cobranza", "Saas Préstamos y Cobranza", "Solução saas para escritorio.",
    "Saas Préstamos y Cobranza. Prestamos Pro - Documentacion Tecnica",
    "Solução saas para escritorio.",
    "saas", "nextjs", "finance", "escritorio", "available", "1.0.0",
    CATEGORY_PRICING.saas.pricing, CATEGORY_PRICING.saas.price, CATEGORY_PRICING.saas.currency, 4.5, 120,
    ["Dashboard web", "Gestão centralizada", "Relatórios", "Multi-usuário"],
    ["Next.js", "Node.js", "PHP", "Laravel", "MySQL"],
    ["Navegador moderno", "Conexão internet"],
    undefined,
    undefined,
    ["/screenshot-placeholder.jpg", "/screenshot-placeholder.jpg", "/screenshot-placeholder.jpg"],
    ["saas-prestamos-y-cobranza", "saas", "finance", "escritorio"]
  ),
  makeApp(
    "gd-133", "sistema-de-prestamos-y-cobranzas", "SISTEMA DE PRÉSTAMOS Y COBRANZAS", "Solução site para escritorio.",
    "SISTEMA DE PRÉSTAMOS Y COBRANZAS — Solução profissional da NEXO Digital para o seu negócio.",
    "Solução site para escritorio.",
    "site", "nextjs", "finance", "escritorio", "available", "1.0.0",
    CATEGORY_PRICING.site.pricing, CATEGORY_PRICING.site.price, CATEGORY_PRICING.site.currency, 4.5, 120,
    ["Design responsivo", "SEO otimizado", "Fácil instalação", "Personalizável"],
    ["Next.js", "React", "Tailwind CSS"],
    ["Navegador moderno", "Conexão internet"],
    undefined,
    undefined,
    ["/screenshot-placeholder.jpg", "/screenshot-placeholder.jpg", "/screenshot-placeholder.jpg"],
    ["sistema-de-prestamos-y-cobranzas", "site", "finance", "escritorio"]
  ),
  makeApp(
    "gd-134", "sistema-gestion-de-biblioteca", "SISTEMA GESTIÓN DE BIBLIOTECA", "Solução site para seu negócio.",
    "SISTEMA GESTIÓN DE BIBLIOTECA — Solução profissional da NEXO Digital para o seu negócio.",
    "Solução site para seu negócio.",
    "site", "python", "education", "outro", "available", "1.0.0",
    CATEGORY_PRICING.site.pricing, CATEGORY_PRICING.site.price, CATEGORY_PRICING.site.currency, 4.5, 120,
    ["Design responsivo", "SEO otimizado", "Fácil instalação", "Personalizável"],
    ["Python", "React", "Tailwind CSS"],
    ["Navegador moderno", "Conexão internet"],
    undefined,
    undefined,
    ["/screenshot-placeholder.jpg", "/screenshot-placeholder.jpg", "/screenshot-placeholder.jpg"],
    ["sistema-gestion-de-biblioteca", "site", "education", "outro"]
  ),
  makeApp(
    "gd-135", "sistema-de-polleria", "SISTEMA DE POLLERIA", "Solução site para restaurante.",
    "SISTEMA DE POLLERIA. Documentación Técnica y de Usuario: Sistema de Pollería MERN 1. Tecnología de Desarrollo (Stack Tecnológico) El sistema ha sido desarrollado utilizando el stack MERN (con una adaptación en la base de datos). Las tecnologías principales son:",
    "Solução site para restaurante.",
    "site", "nextjs", "food", "restaurante", "available", "1.0.0",
    CATEGORY_PRICING.site.pricing, CATEGORY_PRICING.site.price, CATEGORY_PRICING.site.currency, 4.5, 120,
    ["Tecnología de Desarrollo (Stack Tecnológico)", "Funcionalidades del Sistema", "Dashboard (Panel de Control): Muestra gráficos y estadísticas en tiempo real (KPIs) sobre ingresos, ventas", "Punto de Venta (POS): Pantalla optimizada para que los cajeros o meseros registren pedidos rápidamente.", "Gestión de Cajas: Permite la apertura y cierre de caja, registro manual de ingresos extras y egresos diarios.", "Clientes y CRM: Registro de clientes frecuentes, visualización de su perfil, historial de compras y estrategias", "Catálogo y Productos: Administración del menú o catálogo de venta. Creación, edición y eliminación de", "Gestión de Pedidos: Pantalla tipo KDS (Kitchen Display System) para ver el estado de los pedidos en tiempo"],
    ["Next.js", "React", "Node.js", "MySQL"],
    ["Navegador moderno", "Conexão internet"],
    undefined,
    undefined,
    ["/screenshot-placeholder.jpg", "/screenshot-placeholder.jpg", "/screenshot-placeholder.jpg"],
    ["sistema-de-polleria", "site", "food", "restaurante"]
  ),
  makeApp(
    "gd-136", "erp-farmacia", "ERP_FARMACIA", "Solução saas para clinica.",
    "ERP_FARMACIA. documentacion_sistema.md",
    "Solução saas para clinica.",
    "saas", "nextjs", "health", "clinica", "available", "1.0.0",
    CATEGORY_PRICING.saas.pricing, CATEGORY_PRICING.saas.price, CATEGORY_PRICING.saas.currency, 4.5, 120,
    ["**Punto de Venta (POS):** Venta rápida con búsqueda en tiempo real y gestión de caja.", "**Inventario de Productos:** Control de stock, categorías y alertas de existencias bajas.", "**Gestión de Lotes:** Control de fechas de vencimiento por lote de producto.", "**Caja Registradora:** Flujo completo de apertura, movimientos y cierre diario.", "**Recetas Médicas:** Control de medicamentos que requieren prescripción.", "**Compras y Proveedores:** Registro de órdenes de compra y recepción de mercadería.", "**Clientes y Fidelidad:** Historial de pacientes y sistema de puntos.", "**Reportes:** Exportación de ventas, stock y vencimientos."],
    ["Next.js", "PHP", "Tailwind CSS", "Laravel", "MySQL"],
    ["Navegador moderno", "Conexão internet"],
    undefined,
    undefined,
    ["/screenshot-placeholder.jpg", "/screenshot-placeholder.jpg", "/screenshot-placeholder.jpg"],
    ["erp-farmacia", "saas", "health", "clinica"]
  ),
  makeApp(
    "gd-137", "sistema-de-veterinaria", "SISTEMA DE VETERINARIA", "Solução site para clinica.",
    "SISTEMA DE VETERINARIA. Manual Técnico VetSystem",
    "Solução site para clinica.",
    "site", "python", "health", "clinica", "available", "1.0.0",
    CATEGORY_PRICING.site.pricing, CATEGORY_PRICING.site.price, CATEGORY_PRICING.site.currency, 4.5, 120,
    ["Tecnologías de Desarrollo", "Funcionalidades del Sistema", "Instalación y Configuración Local", "Instalar Python 3.10 o superior (asegurarse de marcar la casilla \"Add Python to PATH\"", "Instalar un servidor local de bases de datos como XAMPP, WAMP o instalar MySQL", "Preparar la Base de Datos:", "Configurar el Proyecto:", "Entorno Virtual y Dependencias (Recomendado):"],
    ["Python", "PHP", "Django", "PostgreSQL", "MySQL"],
    ["Navegador moderno", "Conexão internet"],
    undefined,
    undefined,
    ["/screenshot-placeholder.jpg", "/screenshot-placeholder.jpg", "/screenshot-placeholder.jpg"],
    ["sistema-de-veterinaria", "site", "health", "clinica"]
  ),
  makeApp(
    "gd-138", "tpv-papeleria-y-libreria", "TPV Papeleria y Libreria", "Solução tpv para loja.",
    "TPV Papeleria y Libreria. TPV Papeleria y Libreria Software de Punto de Venta Manual Tecnico y Guia de Instalacion",
    "Solução tpv para loja.",
    "tpv", "nextjs", "retail", "loja", "available", "1.0.0",
    CATEGORY_PRICING.tpv.pricing, CATEGORY_PRICING.tpv.price, CATEGORY_PRICING.tpv.currency, 4.5, 120,
    ["Gestão de vendas", "Controle de estoque", "Multi-usuário", "Relatórios"],
    ["Next.js", "Node.js", "PHP", "Tailwind CSS", "Laravel", "MySQL"],
    ["Navegador moderno", "Conexão internet"],
    undefined,
    undefined,
    ["/screenshot-placeholder.jpg", "/screenshot-placeholder.jpg", "/screenshot-placeholder.jpg"],
    ["tpv-papeleria-y-libreria", "tpv", "retail", "loja"]
  ),
  makeApp(
    "gd-139", "sistema-de-panaderia-y-pasteleria", "SISTEMA DE PANADERIA Y PASTELERIA", "Solução site para restaurante.",
    "SISTEMA DE PANADERIA Y PASTELERIA. Documentación Técnica y de Usuario Sistema Integral de Gestión para Panadería y Pastelería 1. Tecnologías de Desarrollo El sistema ha sido desarrollado utilizando un stack tecnológico moderno, robusto y escalable, pensado para garantizar alto rendimiento y seguridad: Backend: PHP 8.2 con el framework Laravel 12.0, el estándar de la industria para aplicaciones web robustas. Frontend: HTML5, CSS3, y",
    "Solução site para restaurante.",
    "site", "php", "food", "restaurante", "available", "1.0.0",
    CATEGORY_PRICING.site.pricing, CATEGORY_PRICING.site.price, CATEGORY_PRICING.site.currency, 4.5, 120,
    ["Tecnologías de Desarrollo", "Funcionalidades del Sistema", "Requisitos, Instalación y Configuración Local", "Clonar o copiar el proyecto en la carpeta de destino.", "Abrir la terminal (cmd/PowerShell) en la ruta del proyecto.", "Instalar las dependencias de PHP:", "Instalar las dependencias de Node.js:", "Configurar el entorno: Copiar el archivo .env.example y renombrarlo a .env . (Se puede hacer con el"],
    ["Php", "Node.js", "PHP", "Tailwind CSS", "Laravel", "MySQL"],
    ["Navegador moderno", "Conexão internet"],
    undefined,
    undefined,
    ["/screenshot-placeholder.jpg", "/screenshot-placeholder.jpg", "/screenshot-placeholder.jpg"],
    ["sistema-de-panaderia-y-pasteleria", "site", "food", "restaurante"]
  ),
  makeApp(
    "gd-140", "tpv-estetica-y-spa", "TPV Estética y SPA", "Solução tpv para barbearia.",
    "TPV Estética y SPA — Solução profissional da NEXO Digital para o seu negócio.",
    "Solução tpv para barbearia.",
    "tpv", "nextjs", "health", "barbearia", "available", "1.0.0",
    CATEGORY_PRICING.tpv.pricing, CATEGORY_PRICING.tpv.price, CATEGORY_PRICING.tpv.currency, 4.5, 120,
    ["Gestão de vendas", "Controle de estoque", "Multi-usuário", "Relatórios"],
    ["Next.js", "React", "Tailwind CSS"],
    ["Navegador moderno", "Conexão internet"],
    undefined,
    undefined,
    ["/screenshot-placeholder.jpg", "/screenshot-placeholder.jpg", "/screenshot-placeholder.jpg"],
    ["tpv-estetica-y-spa", "tpv", "health", "barbearia"]
  ),
  makeApp(
    "gd-141", "sistema-minimarket", "SISTEMA MINIMARKET", "Solução site para loja.",
    "SISTEMA MINIMARKET — Solução profissional da NEXO Digital para o seu negócio.",
    "Solução site para loja.",
    "site", "nextjs", "retail", "loja", "available", "1.0.0",
    CATEGORY_PRICING.site.pricing, CATEGORY_PRICING.site.price, CATEGORY_PRICING.site.currency, 4.5, 120,
    ["Design responsivo", "SEO otimizado", "Fácil instalação", "Personalizável"],
    ["Next.js", "React", "Tailwind CSS"],
    ["Navegador moderno", "Conexão internet"],
    undefined,
    undefined,
    ["/screenshot-placeholder.jpg", "/screenshot-placeholder.jpg", "/screenshot-placeholder.jpg"],
    ["sistema-minimarket", "site", "retail", "loja"]
  ),
  makeApp(
    "gd-142", "tpv-copas", "TPV Copas", "Solução tpv para restaurante.",
    "TPV Copas. TPV COPAS Sistema de gestión profesional para bares de copas, pubs y discotecas",
    "Solução tpv para restaurante.",
    "tpv", "nextjs", "food", "restaurante", "available", "1.0.0",
    CATEGORY_PRICING.tpv.pricing, CATEGORY_PRICING.tpv.price, CATEGORY_PRICING.tpv.currency, 4.5, 120,
    ["Dashboard", "Productos", "Categorías", "Promociones", "Clientes", "Reportes", "tablas · InnoDB · utf8mb4", "234 567,89 €"],
    ["Next.js", "PHP", "Laravel", "MySQL"],
    ["Navegador moderno", "Conexão internet"],
    undefined,
    undefined,
    ["/screenshot-placeholder.jpg", "/screenshot-placeholder.jpg", "/screenshot-placeholder.jpg"],
    ["tpv-copas", "tpv", "food", "restaurante"]
  ),
  makeApp(
    "gd-143", "sistema-de-inventario-de-equipos-tecnologicos", "SISTEMA DE INVENTARIO DE EQUIPOS TECNOLÓGICOS", "Solução site para escritorio.",
    "SISTEMA DE INVENTARIO DE EQUIPOS TECNOLÓGICOS — Solução profissional da NEXO Digital para o seu negócio.",
    "Solução site para escritorio.",
    "site", "php", "finance", "escritorio", "available", "1.0.0",
    CATEGORY_PRICING.site.pricing, CATEGORY_PRICING.site.price, CATEGORY_PRICING.site.currency, 4.5, 120,
    ["Design responsivo", "SEO otimizado", "Fácil instalação", "Personalizável"],
    ["Php", "React", "Tailwind CSS"],
    ["Navegador moderno", "Conexão internet"],
    undefined,
    undefined,
    ["/screenshot-placeholder.jpg", "/screenshot-placeholder.jpg", "/screenshot-placeholder.jpg"],
    ["sistema-de-inventario-de-equipos-tecnologicos", "site", "finance", "escritorio"]
  ),
  makeApp(
    "gd-144", "sistema-de-salon-de-belleza", "SISTEMA DE SALÓN DE BELLEZA", "Solução site para barbearia.",
    "SISTEMA DE SALÓN DE BELLEZA. Documentación Técnica – Sistema Salón de Belleza",
    "Solução site para barbearia.",
    "site", "nextjs", "health", "barbearia", "available", "1.0.0",
    CATEGORY_PRICING.site.pricing, CATEGORY_PRICING.site.price, CATEGORY_PRICING.site.currency, 4.5, 120,
    ["Stack Tecnológico del Sistema", "Funcionalidades del Sistema", "Guía de Instalación Local (Paso a Paso)", "Opciones de Hosting Web Recomendadas", "Despliegue en Railway + Vercel (Guía Completa)"],
    ["Next.js", "React", "Node.js", "Tailwind CSS", "MySQL"],
    ["Navegador moderno", "Conexão internet"],
    undefined,
    undefined,
    ["/screenshot-placeholder.jpg", "/screenshot-placeholder.jpg", "/screenshot-placeholder.jpg"],
    ["sistema-de-salon-de-belleza", "site", "health", "barbearia"]
  ),
  makeApp(
    "gd-145", "sistema-de-cotizacion", "SISTEMA DE COTIZACIÓN", "Solução site para escritorio.",
    "SISTEMA DE COTIZACIÓN. Manual Técnico y de Despliegue Sistema de Cotizaciones y Facturación (CotizaPro)",
    "Solução site para escritorio.",
    "site", "php", "finance", "escritorio", "available", "1.0.0",
    CATEGORY_PRICING.site.pricing, CATEGORY_PRICING.site.price, CATEGORY_PRICING.site.currency, 4.5, 120,
    ["Tecnologías del Sistema", "Funcionalidades Principales", "Instalación Local (Paso a Paso)", "Hosting Web Recomendado", "Guía de Despliegue (Hostinger)", "En tu computadora local, ejecuta npm run build.", "Comprime todo el proyecto en un archivo proyecto.zip (excluye node_modules, pero incluye", "En Hostinger, ve a Archivos > Administrador de Archivos."],
    ["Php", "Node.js", "PHP", "Laravel", "MySQL"],
    ["Navegador moderno", "Conexão internet"],
    undefined,
    undefined,
    ["/screenshot-placeholder.jpg", "/screenshot-placeholder.jpg", "/screenshot-placeholder.jpg"],
    ["sistema-de-cotizacion", "site", "finance", "escritorio"]
  ),
  makeApp(
    "gd-146", "sistema-de-laboratorio-clinico", "SISTEMA DE LABORATORIO CLÍNICO", "Solução site para clinica.",
    "SISTEMA DE LABORATORIO CLÍNICO. LabSalud MANUAL DE IMPLEMENTACIÓN Y USUARIO Fecha de generación: 20/04/2026",
    "Solução site para clinica.",
    "site", "php", "health", "clinica", "available", "1.0.0",
    CATEGORY_PRICING.site.pricing, CATEGORY_PRICING.site.price, CATEGORY_PRICING.site.currency, 4.5, 120,
    ["Tecnologías de Desarrollo", "Funcionalidades del Sistema", "Instalación en Computadora Nueva", "Hosting y Despliegue Web", "Preparación del Servidor", "Gestión de Código", "Configuración de Producción", "Optimización"],
    ["Php", "React", "Node.js", "PHP", "Laravel", "MySQL"],
    ["Navegador moderno", "Conexão internet"],
    undefined,
    undefined,
    ["/screenshot-placeholder.jpg", "/screenshot-placeholder.jpg", "/screenshot-placeholder.jpg"],
    ["sistema-de-laboratorio-clinico", "site", "health", "clinica"]
  ),
  makeApp(
    "gd-147", "sistema-de-parqueo-y-estacionamiento", "SISTEMA DE PARQUEO Y ESTACIONAMIENTO", "Solução site para escritorio.",
    "SISTEMA DE PARQUEO Y ESTACIONAMIENTO. Manual de Sistema: ParkSmart Pro 1. Tecnologías de Desarrollo El sistema ha sido desarrollado utilizando un stack web moderno y robusto (MERN/PERN adaptado a MySQL): Frontend (Interfaz de Usuario): React 19: Biblioteca principal para construir la interfaz. Vite: Herramienta de compilación ultrarrápida. Tailwind CSS: Framework de diseño para estilos modernos y responsivos. Lucide React & Recharts: ",
    "Solução site para escritorio.",
    "site", "nextjs", "other", "escritorio", "available", "1.0.0",
    CATEGORY_PRICING.site.pricing, CATEGORY_PRICING.site.price, CATEGORY_PRICING.site.currency, 4.5, 120,
    ["Tecnologías de Desarrollo", "Funcionalidades del Sistema", "Autenticación y Seguridad: Login seguro con roles jerárquicos (Administrador, Operador, Cajero).", "Control de Flujo de Vehículos: Registro de entrada y salida con asignación de espacios, lector de placa y", "Mapa del Parqueo en Tiempo Real: Vista gráfica para ver qué espacios están libres, ocupados o reservados", "Tarifas Dinámicas: Configuración de precios por hora, por fracción o tarifas planas, dependiente del tipo de", "Gestión de Clientes Abonados: Control para clientes frecuentes con pago de membresía mensual y acceso", "Módulo de Caja y Facturación: Cobros en diferentes métodos (efectivo, tarjeta, QR), emisión de tickets y"],
    ["Next.js", "React", "Node.js", "PHP", "Tailwind CSS", "MySQL"],
    ["Navegador moderno", "Conexão internet"],
    undefined,
    undefined,
    ["/screenshot-placeholder.jpg", "/screenshot-placeholder.jpg", "/screenshot-placeholder.jpg"],
    ["sistema-de-parqueo-y-estacionamiento", "site", "other", "escritorio"]
  ),
  makeApp(
    "gd-148", "sistema-de-ferreteria", "SISTEMA DE FERRETERIA", "Solução site para loja.",
    "SISTEMA DE FERRETERIA. Sistema de Gestion para Ferreteria Punto de Venta - Inventario - Reportes",
    "Solução site para loja.",
    "site", "nextjs", "retail", "loja", "available", "1.0.0",
    CATEGORY_PRICING.site.pricing, CATEGORY_PRICING.site.price, CATEGORY_PRICING.site.currency, 4.5, 120,
    ["Tecnologia del sistema", "Funcionalidades del sistema", "Instalacion en una computadora nueva", "Hosting web sugerido", "Como subir la app a Railway (paso a paso)"],
    ["Next.js", "React", "Node.js", "MySQL"],
    ["Navegador moderno", "Conexão internet"],
    undefined,
    undefined,
    ["/screenshot-placeholder.jpg", "/screenshot-placeholder.jpg", "/screenshot-placeholder.jpg"],
    ["sistema-de-ferreteria", "site", "retail", "loja"]
  ),
  makeApp(
    "gd-149", "erp-taller-automotriz", "ERP_TALLER_AUTOMOTRIZ", "Solução saas para seu negócio.",
    "ERP_TALLER_AUTOMOTRIZ. Manual Técnico - AutoTaller ERP",
    "Solução saas para seu negócio.",
    "saas", "nextjs", "construction", "outro", "available", "1.0.0",
    CATEGORY_PRICING.saas.pricing, CATEGORY_PRICING.saas.price, CATEGORY_PRICING.saas.currency, 4.5, 120,
    ["Especificaciones", "Instalación", "SDK de .NET 8.0: Descargar desde Microsoft .NET.", "SQL Server 2022 (Developer o Express): Descargar desde la página oficial", "SQL Server Management Studio (SSMS): Para visualización de la base de", "Visual Studio 2022 o VS Code: Entorno de desarrollo (IDE).", "Despliegue en la Recomendaciones de"],
    ["Next.js", "React", "Tailwind CSS"],
    ["Navegador moderno", "Conexão internet"],
    undefined,
    undefined,
    ["/screenshot-placeholder.jpg", "/screenshot-placeholder.jpg", "/screenshot-placeholder.jpg"],
    ["erp-taller-automotriz", "saas", "construction", "outro"]
  ),
  makeApp(
    "gd-150", "erp-educativo", "ERP_EDUCATIVO", "Solução saas para seu negócio.",
    "ERP_EDUCATIVO. ERP EDUCATIVO Sistema de Gestion Integral para Institutos, Academias y Universidades",
    "Solução saas para seu negócio.",
    "saas", "nextjs", "other", "outro", "available", "1.0.0",
    CATEGORY_PRICING.saas.pricing, CATEGORY_PRICING.saas.price, CATEGORY_PRICING.saas.currency, 4.5, 120,
    ["Tecnologia y arquitectura", "Funcionalidades - los 20 modulos", "Configuracion general", "Usuarios y seguridad", "Gestion academica", "Admision y matricula", "Gestion de estudiantes", "Gestion de docentes"],
    ["Next.js", "React", "Tailwind CSS"],
    ["Navegador moderno", "Conexão internet"],
    undefined,
    undefined,
    ["/screenshot-placeholder.jpg", "/screenshot-placeholder.jpg", "/screenshot-placeholder.jpg"],
    ["erp-educativo", "saas", "other", "outro"]
  ),
  makeApp(
    "gd-151", "crm-agencia-viajes", "CRM_AGENCIA_VIAJES", "Solução saas para seu negócio.",
    "CRM_AGENCIA_VIAJES. Viaje 360 CRM Manual Técnico y Guía de Implementación Sistema ERP para Agencia de Viajes · Versión 1.0 · 2026",
    "Solução saas para seu negócio.",
    "saas", "nextjs", "other", "outro", "available", "1.0.0",
    CATEGORY_PRICING.saas.pricing, CATEGORY_PRICING.saas.price, CATEGORY_PRICING.saas.currency, 4.5, 120,
    ["Dashboard web", "Gestão centralizada", "Relatórios", "Multi-usuário"],
    ["Next.js", "React", "Node.js", "PHP", "MySQL"],
    ["Navegador moderno", "Conexão internet"],
    undefined,
    undefined,
    ["/screenshot-placeholder.jpg", "/screenshot-placeholder.jpg", "/screenshot-placeholder.jpg"],
    ["crm-agencia-viajes", "saas", "other", "outro"]
  ),
  makeApp(
    "gd-152", "sistema-de-gestion-academica", "SISTEMA DE GESTIÓN ACADÉMICA", "Solução site para seu negócio.",
    "SISTEMA DE GESTIÓN ACADÉMICA — Solução profissional da NEXO Digital para o seu negócio.",
    "Solução site para seu negócio.",
    "site", "nextjs", "education", "outro", "available", "1.0.0",
    CATEGORY_PRICING.site.pricing, CATEGORY_PRICING.site.price, CATEGORY_PRICING.site.currency, 4.5, 120,
    ["Design responsivo", "SEO otimizado", "Fácil instalação", "Personalizável"],
    ["Next.js", "React", "Tailwind CSS"],
    ["Navegador moderno", "Conexão internet"],
    undefined,
    undefined,
    ["/screenshot-placeholder.jpg", "/screenshot-placeholder.jpg", "/screenshot-placeholder.jpg"],
    ["sistema-de-gestion-academica", "site", "education", "outro"]
  ),
  makeApp(
    "gd-153", "sistema-de-boutique", "SISTEMA DE BOUTIQUE", "Solução site para loja.",
    "SISTEMA DE BOUTIQUE — Solução profissional da NEXO Digital para o seu negócio.",
    "Solução site para loja.",
    "site", "nextjs", "retail", "loja", "available", "1.0.0",
    CATEGORY_PRICING.site.pricing, CATEGORY_PRICING.site.price, CATEGORY_PRICING.site.currency, 4.5, 120,
    ["Design responsivo", "SEO otimizado", "Fácil instalação", "Personalizável"],
    ["Next.js", "React", "Tailwind CSS"],
    ["Navegador moderno", "Conexão internet"],
    undefined,
    undefined,
    ["/screenshot-placeholder.jpg", "/screenshot-placeholder.jpg", "/screenshot-placeholder.jpg"],
    ["sistema-de-boutique", "site", "retail", "loja"]
  ),
];

// ===== LP Creator templates (unified as AppProduct) =====
const mockTemplateProducts: AppProduct[] = adaptLPCTemplates(mockLPCTemplates);

// Dynamic proxy so mutations done via the admin panel (add/update/delete)
// are immediately visible to every consumer without a rebuild/restart.
const appsProxy = new Proxy([] as AppProduct[], {
  get(_target, prop) {
    const apps = getDataApps();
    if (prop === "length") return apps.length;
    if (prop === Symbol.iterator) return apps[Symbol.iterator].bind(apps);
    if (prop === Symbol.toStringTag) return "Array";
    const value = (apps as any)[prop];
    if (typeof value === "function") return value.bind(apps);
    return value;
  },
  has(_target, prop) {
    return prop in getDataApps();
  },
  ownKeys() {
    return Reflect.ownKeys(getDataApps());
  },
  getOwnPropertyDescriptor(_target, prop) {
    return Reflect.getOwnPropertyDescriptor(getDataApps(), prop);
  },
});

export const mockApps: AppProduct[] = appsProxy;

const lpCategories = new Set([
  "business",
  "startup",
  "portfolio",
  "ecommerce",
  "saas",
  "agency",
  "personal",
  "event",
  "landing",
  "other",
]);

export const mockReviews: Review[] = [
  {
    id: "rev-001",
    appId: "tpv-001",
    author: "Ana Silva",
    rating: 5,
    title: "Perfeito para minha sorveteria",
    body: "O pack completo facilitou muito o atendimento. Cliente pede pelo celular, cozinha vê no KDS e eu controlo tudo no admin.",
    date: "2026-05-20",
    helpful: 18,
    replies: [
      {
        id: "rep-001",
        reviewId: "rev-001",
        responder: "developer",
        name: "NEXO Digital",
        content: "Obrigado, Ana! Ficamos felizes que o pack esteja ajudando no dia a dia da sorveteria. Qualquer ajuste é só chamar.",
        date: "2026-05-21",
      },
    ],
  },
  {
    id: "rev-002",
    appId: "tpv-001",
    author: "Pedro Costa",
    rating: 5,
    title: "Kiosk touch é show",
    body: "Clientes adoram o autoatendimento na mesa. Interface linda e rápida.",
    date: "2026-04-12",
    helpful: 12,
    replies: [
      {
        id: "rep-002",
        reviewId: "rev-002",
        responder: "luna",
        name: "Luna",
        content: "Que legal, Pedro! Se quiser, posso te mostrar como customizar o cardápio do kiosk pelo painel. É só abrir o chat aqui na loja.",
        date: "2026-04-13",
        chatId: "chat-tpv-kiosk",
      },
    ],
  },
  { id: "rev-003", appId: "saas-001", author: "Equipe NEXO", rating: 5, title: "Centraliza tudo", body: "Dashboard Pro nos dá visão completa dos projetos, GitHub e deploys.", date: "2026-05-15", helpful: 9 },
  { id: "rev-004", appId: "site-002", author: "Construcciones Santa Fe", rating: 5, title: "Site profissional", body: "Galeria de obras e formulário de contato trouxeram mais clientes.", date: "2026-03-10", helpful: 14 },
  { id: "rev-005", appId: "prog-001", author: "Dev NEXO", rating: 5, title: "Luna é incrível", body: "Assistente autônomo que realmente ajuda no dia a dia dos projetos.", date: "2026-05-28", helpful: 11 },
  { id: "rev-006", appId: "saas-002", author: "Startup Tech", rating: 4, title: "Bug reporting inteligente", body: "A IA ajuda a priorizar bugs críticos. Faltam algumas integrações, mas está evoluindo bem.", date: "2026-05-05", helpful: 7 },
  { id: "rev-007", appId: "site-001", author: "NEXO Marketing", rating: 5, title: "Nosso site oficial", body: "Site rápido, moderno e bem posicionado.", date: "2026-06-01", helpful: 8 },
  {
    id: "rev-008",
    appId: "cust-001",
    author: "Empresa Custom Ltda",
    rating: 5,
    title: "Software perfeito",
    body: "A NEXO entregou exatamente o que precisávamos.",
    date: "2025-12-12",
    helpful: 25,
    developerResponse: "Agradecemos a confiança! Foi um prazer trabalhar com vocês.",
  },
];

export const mockCategories: Category[] = [
  { id: "cat-tpv", name: "TPVs", slug: "tpv", icon: "CreditCard", description: "Terminais de ponto de venda para diversos negócios", count: tpvs.length, color: "#3B82F6" },
  { id: "cat-saas", name: "SaaS", slug: "saas", icon: "Cloud", description: "Software como serviço na nuvem", count: saasApps.length, color: "#10B981" },
  { id: "cat-web", name: "Webs", slug: "web", icon: "Globe", description: "Sites e landing pages profissionais", count: sites.length, color: "#8B5CF6" },
  { id: "cat-app", name: "Jogos", slug: "app", icon: "Smartphone", description: "Jogos e apps interativos para web e mobile", count: apps.length, color: "#F59E0B" },
  { id: "cat-program", name: "Programas", slug: "program", icon: "Monitor", description: "Aplicativos desktop e agentes autônomos", count: programs.length, color: "#EF4444" },
  { id: "cat-custom", name: "Personalizado", slug: "custom", icon: "Settings", description: "Software sob medida para seu negócio", count: custom.length, color: "#EC4899" },
  { id: "cat-clinics", name: "Clínicas", slug: "clinics", icon: "Heart", description: "Apps para clínicas, estética e saúde", count: getAppsByCategory("clinics").length, color: "#F43F5E" },
  { id: "cat-retail", name: "Retail", slug: "retail", icon: "ShoppingBag", description: "Soluções para varejo e e-commerce", count: getAppsByCategory("retail").length, color: "#F59E0B" },
  { id: "cat-food", name: "Food", slug: "food", icon: "UtensilsCrossed", description: "Apps para restaurantes, sorveterias e food service", count: getAppsByCategory("food").length, color: "#10B981" },
  // LP Creator marketplace categories
  { id: "cat-business", name: "Negócios", slug: "business", icon: "Briefcase", description: "Templates para negócios locais", count: getAppsByCategory("business").length, color: "#3B82F6" },
  { id: "cat-ecommerce", name: "E-commerce", slug: "ecommerce", icon: "ShoppingCart", description: "Templates de lojas virtuais", count: getAppsByCategory("ecommerce").length, color: "#8B5CF6" },
  { id: "cat-portfolio", name: "Portfolio", slug: "portfolio", icon: "Image", description: "Templates para portfolios criativos", count: getAppsByCategory("portfolio").length, color: "#F59E0B" },
  { id: "cat-landing", name: "Landing Pages", slug: "landing", icon: "Layout", description: "Landing pages de alta conversão", count: getAppsByCategory("landing").length, color: "#10B981" },
];

export function getReviewsByAppId(appId: string): Review[] {
  return mockReviews.filter((r) => r.appId === appId);
}

export function addReview(review: Omit<Review, "id">): Review {
  const newReview: Review = {
    ...review,
    id: `rev-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
  };
  mockReviews.unshift(newReview);
  return newReview;
}

export function addReviewReply(reviewId: string, reply: Omit<ReviewReply, "id" | "reviewId">): ReviewReply {
  const review = mockReviews.find((r) => r.id === reviewId);
  if (!review) throw new Error("Review not found");

  const newReply: ReviewReply = {
    ...reply,
    id: `rep-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    reviewId,
  };

  if (!review.replies) review.replies = [];
  review.replies.push(newReply);
  return newReply;
}

export function getAppBySlug(slug: string): AppProduct | undefined {
  return mockApps.find((a) => a.slug === slug);
}

export function getAppsByCategory(categorySlug: string): AppProduct[] {
  if (categorySlug === "clinics") return mockApps.filter((a) => a.industry === "health");
  if (categorySlug === "retail") return mockApps.filter((a) => a.industry === "retail");
  if (categorySlug === "food") return mockApps.filter((a) => a.industry === "food");
  if (lpCategories.has(categorySlug)) return mockApps.filter((a) => a.category === categorySlug);
  return mockApps.filter((a) => a.type === categorySlug);
}

export function getFeaturedApps(): AppProduct[] {
  return mockApps.filter((a) => ["tpv-001", "saas-001", "site-001", "prog-001", "site-002"].includes(a.id));
}

export function getNewArrivals(): AppProduct[] {
  return mockApps.filter((a) => ["saas-002", "prog-001"].includes(a.id));
}

export function getPopularApps(): AppProduct[] {
  return [...mockApps].sort((a, b) => b.downloadCount - a.downloadCount).slice(0, 8);
}
