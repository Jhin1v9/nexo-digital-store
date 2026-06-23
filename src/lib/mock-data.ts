import { AppProduct, Review, ReviewReply, Category, AppType, Framework, Industry, Sense, AppStatus, Pricing } from "@/types/app";
import { mockLPCTemplates } from "@/lib/mock-templates";
import { adaptLPCTemplates } from "@/lib/template-adapter";

const developer = "NEXO Digital S.L.";

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

// ===== Google Drive Apps (templates do catálogo legado) =====
const driveApps: AppProduct[] = [
  makeApp(
    "gd-010", "academia-fitness", "Academia Fitness", "Site para academias e centros de treino",
    "Academia Fitness — Site para academias e centros de treino. Solução profissional da NEXO Digital para o seu negócio.",
    "Site para academias e centros de treino",
    "site", "nextjs", "health", "clinica", "available", "1.0.0",
    "fixed", 299, "EUR", 4.5, 120,
    ["Site para academias e centros de treino", "Design responsivo", "SEO otimizado", "Fácil instalação"],
    ["Next.js", "React", "Tailwind CSS"],
    ["Navegador moderno", "Conexão internet"],
    undefined,
    undefined,
    undefined,
    ["academia-fitness", "health", "clinica", "site"]
  ),
  makeApp(
    "gd-011", "barbearia-machado", "Barbearia Machado", "Site para barbearias e estética masculina",
    "Barbearia Machado — Site para barbearias e estética masculina. Solução profissional da NEXO Digital para o seu negócio.",
    "Site para barbearias e estética masculina",
    "site", "nextjs", "health", "barbearia", "available", "1.0.0",
    "fixed", 299, "EUR", 4.5, 120,
    ["Site para barbearias e estética masculina", "Design responsivo", "SEO otimizado", "Fácil instalação"],
    ["Next.js", "React", "Tailwind CSS"],
    ["Navegador moderno", "Conexão internet"],
    undefined,
    undefined,
    undefined,
    ["barbearia-machado", "health", "barbearia", "site"]
  ),
  makeApp(
    "gd-012", "boutique-chic", "Boutique Chic", "Loja virtual para boutiques e moda feminina",
    "Boutique Chic — Loja virtual para boutiques e moda feminina. Solução profissional da NEXO Digital para o seu negócio.",
    "Loja virtual para boutiques e moda feminina",
    "site", "nextjs", "retail", "loja", "available", "1.0.0",
    "fixed", 299, "EUR", 4.5, 120,
    ["Loja virtual para boutiques e moda feminina", "Design responsivo", "SEO otimizado", "Fácil instalação"],
    ["Next.js", "React", "Tailwind CSS"],
    ["Navegador moderno", "Conexão internet"],
    undefined,
    undefined,
    undefined,
    ["boutique-chic", "retail", "loja", "site"]
  ),
  makeApp(
    "gd-013", "cafe-cultural", "Café Cultural", "Site para cafeterias e espaços culturais",
    "Café Cultural — Site para cafeterias e espaços culturais. Solução profissional da NEXO Digital para o seu negócio.",
    "Site para cafeterias e espaços culturais",
    "site", "nextjs", "food", "restaurante", "available", "1.0.0",
    "fixed", 299, "EUR", 4.5, 120,
    ["Site para cafeterias e espaços culturais", "Design responsivo", "SEO otimizado", "Fácil instalação"],
    ["Next.js", "React", "Tailwind CSS"],
    ["Navegador moderno", "Conexão internet"],
    undefined,
    undefined,
    undefined,
    ["cafe-cultural", "food", "restaurante", "site"]
  ),
  makeApp(
    "gd-014", "clinica-dental-sorriso", "Clínica Dental Sorriso", "Site para clínicas dentárias",
    "Clínica Dental Sorriso — Site para clínicas dentárias. Solução profissional da NEXO Digital para o seu negócio.",
    "Site para clínicas dentárias",
    "site", "nextjs", "health", "clinica", "available", "1.0.0",
    "fixed", 299, "EUR", 4.5, 120,
    ["Site para clínicas dentárias", "Design responsivo", "SEO otimizado", "Fácil instalação"],
    ["Next.js", "React", "Tailwind CSS"],
    ["Navegador moderno", "Conexão internet"],
    undefined,
    undefined,
    undefined,
    ["clinica-dental-sorriso", "health", "clinica", "site"]
  ),
  makeApp(
    "gd-015", "clinica-fisioterapia", "Clínica Fisioterapia", "Site para clínicas de fisioterapia",
    "Clínica Fisioterapia — Site para clínicas de fisioterapia. Solução profissional da NEXO Digital para o seu negócio.",
    "Site para clínicas de fisioterapia",
    "site", "nextjs", "health", "clinica", "available", "1.0.0",
    "fixed", 299, "EUR", 4.5, 120,
    ["Site para clínicas de fisioterapia", "Design responsivo", "SEO otimizado", "Fácil instalação"],
    ["Next.js", "React", "Tailwind CSS"],
    ["Navegador moderno", "Conexão internet"],
    undefined,
    undefined,
    undefined,
    ["clinica-fisioterapia", "health", "clinica", "site"]
  ),
  makeApp(
    "gd-016", "clinica-vida-saude", "Clínica Vida Saúde", "Site para clínicas médicas e de saúde",
    "Clínica Vida Saúde — Site para clínicas médicas e de saúde. Solução profissional da NEXO Digital para o seu negócio.",
    "Site para clínicas médicas e de saúde",
    "site", "nextjs", "health", "clinica", "available", "1.0.0",
    "fixed", 299, "EUR", 4.5, 120,
    ["Site para clínicas médicas e de saúde", "Design responsivo", "SEO otimizado", "Fácil instalação"],
    ["Next.js", "React", "Tailwind CSS"],
    ["Navegador moderno", "Conexão internet"],
    undefined,
    undefined,
    undefined,
    ["clinica-vida-saude", "health", "clinica", "site"]
  ),
  makeApp(
    "gd-017", "escritorio-advogados", "Escritório Advogados", "Site para escritórios de advocacia",
    "Escritório Advogados — Site para escritórios de advocacia. Solução profissional da NEXO Digital para o seu negócio.",
    "Site para escritórios de advocacia",
    "site", "nextjs", "other", "escritorio", "available", "1.0.0",
    "fixed", 299, "EUR", 4.5, 120,
    ["Site para escritórios de advocacia", "Design responsivo", "SEO otimizado", "Fácil instalação"],
    ["Next.js", "React", "Tailwind CSS"],
    ["Navegador moderno", "Conexão internet"],
    undefined,
    undefined,
    undefined,
    ["escritorio-advogados", "other", "escritorio", "site"]
  ),
  makeApp(
    "gd-018", "farmacia-bem-estar", "Farmácia Bem Estar", "Site para farmácias e drogarias",
    "Farmácia Bem Estar — Site para farmácias e drogarias. Solução profissional da NEXO Digital para o seu negócio.",
    "Site para farmácias e drogarias",
    "site", "nextjs", "health", "clinica", "available", "1.0.0",
    "fixed", 299, "EUR", 4.5, 120,
    ["Site para farmácias e drogarias", "Design responsivo", "SEO otimizado", "Fácil instalação"],
    ["Next.js", "React", "Tailwind CSS"],
    ["Navegador moderno", "Conexão internet"],
    undefined,
    undefined,
    undefined,
    ["farmacia-bem-estar", "health", "clinica", "site"]
  ),
  makeApp(
    "gd-019", "gelato-artesanal", "Gelato Artesanal", "Site para gelaterias e sorveterias",
    "Gelato Artesanal — Site para gelaterias e sorveterias. Solução profissional da NEXO Digital para o seu negócio.",
    "Site para gelaterias e sorveterias",
    "site", "nextjs", "food", "sorveteria", "available", "1.0.0",
    "fixed", 299, "EUR", 4.5, 120,
    ["Site para gelaterias e sorveterias", "Design responsivo", "SEO otimizado", "Fácil instalação"],
    ["Next.js", "React", "Tailwind CSS"],
    ["Navegador moderno", "Conexão internet"],
    undefined,
    undefined,
    undefined,
    ["gelato-artesanal", "food", "sorveteria", "site"]
  ),
  makeApp(
    "gd-020", "hamburgueria-bom-sabor", "Hamburgueria Bom Sabor", "Site para hamburguerias",
    "Hamburgueria Bom Sabor — Site para hamburguerias. Solução profissional da NEXO Digital para o seu negócio.",
    "Site para hamburguerias",
    "site", "nextjs", "food", "restaurante", "available", "1.0.0",
    "fixed", 299, "EUR", 4.5, 120,
    ["Site para hamburguerias", "Design responsivo", "SEO otimizado", "Fácil instalação"],
    ["Next.js", "React", "Tailwind CSS"],
    ["Navegador moderno", "Conexão internet"],
    undefined,
    undefined,
    undefined,
    ["hamburgueria-bom-sabor", "food", "restaurante", "site"]
  ),
  makeApp(
    "gd-021", "lanchonete-central", "Lanchonete Central", "Site para lanchonetes e cafeterias",
    "Lanchonete Central — Site para lanchonetes e cafeterias. Solução profissional da NEXO Digital para o seu negócio.",
    "Site para lanchonetes e cafeterias",
    "site", "nextjs", "food", "restaurante", "available", "1.0.0",
    "fixed", 299, "EUR", 4.5, 120,
    ["Site para lanchonetes e cafeterias", "Design responsivo", "SEO otimizado", "Fácil instalação"],
    ["Next.js", "React", "Tailwind CSS"],
    ["Navegador moderno", "Conexão internet"],
    undefined,
    undefined,
    undefined,
    ["lanchonete-central", "food", "restaurante", "site"]
  ),
  makeApp(
    "gd-022", "loja-brinquedos", "Loja Brinquedos", "Loja virtual para brinquedos",
    "Loja Brinquedos — Loja virtual para brinquedos. Solução profissional da NEXO Digital para o seu negócio.",
    "Loja virtual para brinquedos",
    "site", "nextjs", "retail", "loja", "available", "1.0.0",
    "fixed", 299, "EUR", 4.5, 120,
    ["Loja virtual para brinquedos", "Design responsivo", "SEO otimizado", "Fácil instalação"],
    ["Next.js", "React", "Tailwind CSS"],
    ["Navegador moderno", "Conexão internet"],
    undefined,
    undefined,
    undefined,
    ["loja-brinquedos", "retail", "loja", "site"]
  ),
  makeApp(
    "gd-023", "mercearia-sao-jose", "Mercearia São José", "Site para mercearias e pequenos mercados",
    "Mercearia São José — Site para mercearias e pequenos mercados. Solução profissional da NEXO Digital para o seu negócio.",
    "Site para mercearias e pequenos mercados",
    "site", "nextjs", "food", "restaurante", "available", "1.0.0",
    "fixed", 299, "EUR", 4.5, 120,
    ["Site para mercearias e pequenos mercados", "Design responsivo", "SEO otimizado", "Fácil instalação"],
    ["Next.js", "React", "Tailwind CSS"],
    ["Navegador moderno", "Conexão internet"],
    undefined,
    undefined,
    undefined,
    ["mercearia-sao-jose", "food", "restaurante", "site"]
  ),
  makeApp(
    "gd-024", "moda-express-loja", "Moda Express Loja", "Loja virtual de moda e acessórios",
    "Moda Express Loja — Loja virtual de moda e acessórios. Solução profissional da NEXO Digital para o seu negócio.",
    "Loja virtual de moda e acessórios",
    "site", "nextjs", "retail", "loja", "available", "1.0.0",
    "fixed", 299, "EUR", 4.5, 120,
    ["Loja virtual de moda e acessórios", "Design responsivo", "SEO otimizado", "Fácil instalação"],
    ["Next.js", "React", "Tailwind CSS"],
    ["Navegador moderno", "Conexão internet"],
    undefined,
    undefined,
    undefined,
    ["moda-express-loja", "retail", "loja", "site"]
  ),
  makeApp(
    "gd-025", "nexo-analytics", "Nexo Analytics", "Dashboard de analytics para negócios",
    "Nexo Analytics — Dashboard de analytics para negócios. Solução profissional da NEXO Digital para o seu negócio.",
    "Dashboard de analytics para negócios",
    "saas", "react", "finance", "escritorio", "available", "1.0.0",
    "subscription", 49, "EUR", 4.5, 120,
    ["Dashboard de analytics para negócios", "Design responsivo", "SEO otimizado", "Fácil instalação"],
    ["React", "Next.js", "Tailwind CSS"],
    ["Navegador moderno", "Conexão internet"],
    undefined,
    undefined,
    undefined,
    ["nexo-analytics", "finance", "escritorio", "saas"]
  ),
  makeApp(
    "gd-026", "nexo-crm", "Nexo CRM", "Sistema CRM para gestão de clientes",
    "Nexo CRM — Sistema CRM para gestão de clientes. Solução profissional da NEXO Digital para o seu negócio.",
    "Sistema CRM para gestão de clientes",
    "saas", "react", "other", "escritorio", "available", "1.0.0",
    "subscription", 49, "EUR", 4.5, 120,
    ["Sistema CRM para gestão de clientes", "Design responsivo", "SEO otimizado", "Fácil instalação"],
    ["React", "Next.js", "Tailwind CSS"],
    ["Navegador moderno", "Conexão internet"],
    undefined,
    undefined,
    undefined,
    ["nexo-crm", "other", "escritorio", "saas"]
  ),
  makeApp(
    "gd-027", "nexo-ecommerce", "Nexo Ecommerce", "Template de loja virtual completa",
    "Nexo Ecommerce — Template de loja virtual completa. Solução profissional da NEXO Digital para o seu negócio.",
    "Template de loja virtual completa",
    "site", "nextjs", "retail", "loja", "available", "1.0.0",
    "fixed", 299, "EUR", 4.5, 120,
    ["Template de loja virtual completa", "Design responsivo", "SEO otimizado", "Fácil instalação"],
    ["Next.js", "React", "Tailwind CSS"],
    ["Navegador moderno", "Conexão internet"],
    undefined,
    undefined,
    undefined,
    ["nexo-ecommerce", "retail", "loja", "site"]
  ),
  makeApp(
    "gd-028", "nexo-invoice", "Nexo Invoice", "Sistema de faturação e notas fiscais",
    "Nexo Invoice — Sistema de faturação e notas fiscais. Solução profissional da NEXO Digital para o seu negócio.",
    "Sistema de faturação e notas fiscais",
    "saas", "react", "finance", "escritorio", "available", "1.0.0",
    "subscription", 49, "EUR", 4.5, 120,
    ["Sistema de faturação e notas fiscais", "Design responsivo", "SEO otimizado", "Fácil instalação"],
    ["React", "Next.js", "Tailwind CSS"],
    ["Navegador moderno", "Conexão internet"],
    undefined,
    undefined,
    undefined,
    ["nexo-invoice", "finance", "escritorio", "saas"]
  ),
  makeApp(
    "gd-029", "nexo-kiosk", "Nexo Kiosk", "Kiosk de autoatendimento para restaurantes",
    "Nexo Kiosk — Kiosk de autoatendimento para restaurantes. Solução profissional da NEXO Digital para o seu negócio.",
    "Kiosk de autoatendimento para restaurantes",
    "tpv", "react", "food", "restaurante", "available", "1.0.0",
    "subscription", 79, "EUR", 4.5, 120,
    ["Kiosk de autoatendimento para restaurantes", "Design responsivo", "SEO otimizado", "Fácil instalação"],
    ["React", "Next.js", "Tailwind CSS"],
    ["Navegador moderno", "Conexão internet"],
    undefined,
    undefined,
    undefined,
    ["nexo-kiosk", "food", "restaurante", "tpv"]
  ),
  makeApp(
    "gd-030", "nexo-landing", "Nexo Landing", "Template de landing page profissional",
    "Nexo Landing — Template de landing page profissional. Solução profissional da NEXO Digital para o seu negócio.",
    "Template de landing page profissional",
    "site", "nextjs", "other", "outro", "available", "1.0.0",
    "fixed", 299, "EUR", 4.5, 120,
    ["Template de landing page profissional", "Design responsivo", "SEO otimizado", "Fácil instalação"],
    ["Next.js", "React", "Tailwind CSS"],
    ["Navegador moderno", "Conexão internet"],
    undefined,
    undefined,
    undefined,
    ["nexo-landing", "other", "outro", "site"]
  ),
  makeApp(
    "gd-031", "nexo-portfolio", "Nexo Portfolio", "Template de portfólio para criativos",
    "Nexo Portfolio — Template de portfólio para criativos. Solução profissional da NEXO Digital para o seu negócio.",
    "Template de portfólio para criativos",
    "site", "nextjs", "other", "outro", "available", "1.0.0",
    "fixed", 299, "EUR", 4.5, 120,
    ["Template de portfólio para criativos", "Design responsivo", "SEO otimizado", "Fácil instalação"],
    ["Next.js", "React", "Tailwind CSS"],
    ["Navegador moderno", "Conexão internet"],
    undefined,
    undefined,
    undefined,
    ["nexo-portfolio", "other", "outro", "site"]
  ),
  makeApp(
    "gd-032", "nexo-seo", "Nexo SEO", "Ferramenta de auditoria e SEO",
    "Nexo SEO — Ferramenta de auditoria e SEO. Solução profissional da NEXO Digital para o seu negócio.",
    "Ferramenta de auditoria e SEO",
    "saas", "react", "other", "escritorio", "available", "1.0.0",
    "subscription", 49, "EUR", 4.5, 120,
    ["Ferramenta de auditoria e SEO", "Design responsivo", "SEO otimizado", "Fácil instalação"],
    ["React", "Next.js", "Tailwind CSS"],
    ["Navegador moderno", "Conexão internet"],
    undefined,
    undefined,
    undefined,
    ["nexo-seo", "other", "escritorio", "saas"]
  ),
  makeApp(
    "gd-033", "nexo-tpv-desktop", "Nexo TPV Desktop", "TPV desktop para restaurantes e bares",
    "Nexo TPV Desktop — TPV desktop para restaurantes e bares. Solução profissional da NEXO Digital para o seu negócio.",
    "TPV desktop para restaurantes e bares",
    "tpv", "react", "food", "restaurante", "available", "1.0.0",
    "subscription", 79, "EUR", 4.5, 120,
    ["TPV desktop para restaurantes e bares", "Design responsivo", "SEO otimizado", "Fácil instalação"],
    ["React", "Next.js", "Tailwind CSS"],
    ["Navegador moderno", "Conexão internet"],
    undefined,
    undefined,
    undefined,
    ["nexo-tpv-desktop", "food", "restaurante", "tpv"]
  ),
  makeApp(
    "gd-034", "padaria-central", "Padaria Central", "Site para padarias e confeitarias",
    "Padaria Central — Site para padarias e confeitarias. Solução profissional da NEXO Digital para o seu negócio.",
    "Site para padarias e confeitarias",
    "site", "nextjs", "food", "restaurante", "available", "1.0.0",
    "fixed", 299, "EUR", 4.5, 120,
    ["Site para padarias e confeitarias", "Design responsivo", "SEO otimizado", "Fácil instalação"],
    ["Next.js", "React", "Tailwind CSS"],
    ["Navegador moderno", "Conexão internet"],
    undefined,
    undefined,
    undefined,
    ["padaria-central", "food", "restaurante", "site"]
  ),
  makeApp(
    "gd-035", "pet-shop-amigo", "Pet Shop Amigo", "Site para pet shops e clínicas veterinárias",
    "Pet Shop Amigo — Site para pet shops e clínicas veterinárias. Solução profissional da NEXO Digital para o seu negócio.",
    "Site para pet shops e clínicas veterinárias",
    "site", "nextjs", "retail", "loja", "available", "1.0.0",
    "fixed", 299, "EUR", 4.5, 120,
    ["Site para pet shops e clínicas veterinárias", "Design responsivo", "SEO otimizado", "Fácil instalação"],
    ["Next.js", "React", "Tailwind CSS"],
    ["Navegador moderno", "Conexão internet"],
    undefined,
    undefined,
    undefined,
    ["pet-shop-amigo", "retail", "loja", "site"]
  ),
  makeApp(
    "gd-036", "pizzaria-napoli", "Pizzaria Napoli", "Site para pizzarias e delivery",
    "Pizzaria Napoli — Site para pizzarias e delivery. Solução profissional da NEXO Digital para o seu negócio.",
    "Site para pizzarias e delivery",
    "site", "nextjs", "food", "restaurante", "available", "1.0.0",
    "fixed", 299, "EUR", 4.5, 120,
    ["Site para pizzarias e delivery", "Design responsivo", "SEO otimizado", "Fácil instalação"],
    ["Next.js", "React", "Tailwind CSS"],
    ["Navegador moderno", "Conexão internet"],
    undefined,
    undefined,
    undefined,
    ["pizzaria-napoli", "food", "restaurante", "site"]
  ),
  makeApp(
    "gd-037", "sabor-brasil-restaurante", "Sabor Brasil Restaurante", "Site para restaurantes brasileiros",
    "Sabor Brasil Restaurante — Site para restaurantes brasileiros. Solução profissional da NEXO Digital para o seu negócio.",
    "Site para restaurantes brasileiros",
    "site", "nextjs", "food", "restaurante", "available", "1.0.0",
    "fixed", 299, "EUR", 4.5, 120,
    ["Site para restaurantes brasileiros", "Design responsivo", "SEO otimizado", "Fácil instalação"],
    ["Next.js", "React", "Tailwind CSS"],
    ["Navegador moderno", "Conexão internet"],
    undefined,
    undefined,
    undefined,
    ["sabor-brasil-restaurante", "food", "restaurante", "site"]
  ),
  makeApp(
    "gd-038", "salao-beleza-flor", "Salão Beleza Flor", "Site para salões de beleza",
    "Salão Beleza Flor — Site para salões de beleza. Solução profissional da NEXO Digital para o seu negócio.",
    "Site para salões de beleza",
    "site", "nextjs", "health", "barbearia", "available", "1.0.0",
    "fixed", 299, "EUR", 4.5, 120,
    ["Site para salões de beleza", "Design responsivo", "SEO otimizado", "Fácil instalação"],
    ["Next.js", "React", "Tailwind CSS"],
    ["Navegador moderno", "Conexão internet"],
    undefined,
    undefined,
    undefined,
    ["salao-beleza-flor", "health", "barbearia", "site"]
  ),
];

// ===== LP Creator templates (unified as AppProduct) =====
const mockTemplateProducts: AppProduct[] = adaptLPCTemplates(mockLPCTemplates);

export const mockApps: AppProduct[] = [
  ...tpvs,
  ...saasApps,
  ...sites,
  ...apps,
  ...programs,
  ...custom,
  ...driveApps,
  ...mockTemplateProducts,
];

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
