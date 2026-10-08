import { createContext, useState, useContext, useCallback, useMemo, useEffect } from 'react';

const translations = {
  en: {
    home: "Home",
    about: "About",
    projects: "Projects",
    discordBots: "Discord Bots",
    contact: "Contact",
    skipToContent: "Skip to content",

    helloIm: "Hello, I'm",
    heroRole: "Frontend Developer & Discord Bot Specialist",
    availableForWork: "Available for new projects",
    iBuild: "I build",
    amazingWebsites: "fast, modern websites",
    discordBots2: "Discord bots",
    userExperiences: "smooth user interfaces",
    digitalSolutions: "automation tools",
    customApplications: "custom web apps",
    heroDescription: "Frontend developer building React interfaces and production Discord bots — from UI and automation to deployment.",
    viewMyWork: "View My Work",
    letsConnect: "Let's Connect",
    github: "GitHub",

    aboutMe: "About Me",
    aboutTagline: "React developer and Discord bot engineer with four live products deployed on orzz.website.",
    aboutDescription: "Hi, I'm orzz5. I build web products end to end — interface, state, APIs, and deployment. My work includes a bot showcase, a weather app, a link-in-bio page, and a visual web builder, all live under orzz.website. I also ship Discord bots for moderation, music, and community automation.",
    publicRepos: "Public Repositories",
    siteLanguages: "Site Languages",
    license: "License",
    projectsCompleted: "Live Products",
    whatIOffer: "What I Offer",
    webDevTitle: "Web Development",
    webDevDesc: "React front ends built for speed, accessibility, and maintainability — deployed and monitored in production",
    discordDevTitle: "Discord Bots",
    discordDevDesc: "Production Discord bots for moderation, music, and community automation, built with Discord.js and Node.js",
    designTitle: "UI/UX Design",
    designDesc: "Interfaces designed around clarity and speed: consistent components, sensible defaults, no clutter",
    perfOptTitle: "Performance Optimization",
    perfOptDesc: "Bundle analysis, rendering fixes, and Core Web Vitals work to keep pages fast on real devices",

    whatIUse: "What I Use",
    toolsDaily: "Tools and technologies I work with daily",

    projectsTitle: "Projects",
    projectsTagline: "Four live products on orzz.website — source code on GitHub.",
    allProjects: "All Projects",
    webApps: "Web Apps",
    projectsComingSoon: "Projects Coming Soon",
    projectsSoonDesc: "I'm currently working on some exciting projects that will be showcased here soon. Check back later to see my latest work in web development and Discord bot creation.",
    getNotified: "Get Notified",

    // Bots Project
    botsProjectTitle: "bots.orzz.website",
    botsProjectDesc: "A website to try my bots before adding them to your server",
    preview: "Preview",

    // Weather Project
    weatherProjectTitle: "weather.orzz.website",
    weatherProjectDesc: "Real-time weather app with city search, current conditions, and multi-day forecasts",

    // Bio Project
    bioProjectTitle: "bio.orzz.website",
    bioProjectDesc: "Link-in-bio page with custom branding and visit analytics",

    // Labs Project
    labsProjectTitle: "labs.orzz.website",
    labsProjectDesc: "Visual web builder for creating and launching pages without writing boilerplate",
    showAllProjects: "Show all projects",
    showLessProjects: "Show less",

    getInTouch: "Get in Touch",
    contactTagline: "Send me a message and I'll get back to you as soon as possible.",
    connectOnSocial: "Connect on Social",
    sendMessage: "Send a Message",
    name: "Name",
    emailAddress: "Email Address",
    subject: "Subject",
    projectType: "Project Type",
    message: "Message",
    send: "Send Message",
    sending: "Sending...",
    selectProjectType: "Select a project type",
    webDevelopment: "Web Development",
    discordBot: "Discord Bot",
    uiuxDesign: "UI/UX Design",
    mobileApp: "Mobile App",
    messagePlaceholder: "Tell me about your project...",
    messageSuccess: "Message Sent Successfully!",
    messageSuccessDesc: "Thank you for reaching out. I'll get back to you soon.",
    messageError: "Failed to send message. Please try again.",

    footerDesc: "Building React web products and Discord bots that ship — live on orzz.website.",
    quickLinks: "Quick Links",
    services: "Services",
    consulting: "Consulting",
    backToTop: "Back to top",
    rights: "All rights reserved. Made with",
    andLotsOf: "and lots of",

    discordPresence: "Discord Presence",
    online: "Online",
    idle: "Idle",
    dnd: "Do Not Disturb",
    offline: "Offline",
    available: "Available",
    viewProfile: "View Profile",
    copyDiscord: "Copy Discord profile link",
    copied: "Copied!",

    blog: "Blog",
    blogTitle: "Notes & Write-ups",
    blogTagline: "Notes, write-ups, and lessons from building and shipping projects on orzz.website.",
    readArticle: "Read post",
    backToBlog: "Back to blog",
    minRead: "min read",
    rssFeed: "RSS feed",
    readPrev: "Previous",
    readNext: "Next",

    caseStudy: "Case Study",
    viewCaseStudy: "View case study",
    backToProjects: "Back to projects",
    challenge: "The Challenge",
    approach: "The Approach",
    keyFeatures: "Key Features",
    techStack: "Tech Stack",
    liveDemo: "Live Demo",
    sourceCode: "Source Code",
    nextProject: "Next Project",
    repositoryStats: "Repository Stats",

    notFoundTitle: "Page not found",
    notFoundDesc: "The page you are looking for doesn't exist or has been moved.",
    backHome: "Back home",
    errorTitle: "Something went wrong",
    errorDesc: "An unexpected error occurred. You can try reloading the page.",
    reload: "Reload",

    openPalette: "Open command menu",
    palettePlaceholder: "Search pages, projects, actions...",
    paletteNav: "Navigation",
    palettePages: "Pages",
    paletteActions: "Actions",
    paletteNoResults: "No results found",
    paletteNavigate: "Navigate",
    paletteSelect: "Open",
    changeLanguage: "Language",

    accentColor: "Accent color",
    accentBlue: "Blue",
    accentViolet: "Violet",
    accentGreen: "Green",
    accentAmber: "Amber",
  },

  es: {
    home: "Inicio",
    about: "Sobre Mí",
    projects: "Proyectos",
    discordBots: "Bots de Discord",
    contact: "Contacto",
    skipToContent: "Saltar al contenido",

    helloIm: "Hola, soy",
    heroRole: "Desarrollador frontend y especialista en bots de Discord",
    availableForWork: "Disponible para nuevos proyectos",
    iBuild: "Desarrollo",
    amazingWebsites: "sitios web rápidos y modernos",
    discordBots2: "bots de Discord",
    userExperiences: "interfaces de usuario fluidas",
    digitalSolutions: "herramientas de automatización",
    customApplications: "aplicaciones web a medida",
    heroDescription: "Desarrollador frontend que crea interfaces React y bots de Discord en producción — desde la interfaz y la automatización hasta el despliegue.",
    viewMyWork: "Ver mi trabajo",
    letsConnect: "Conectemos",
    github: "GitHub",

    aboutMe: "Sobre Mí",
    aboutTagline: "Desarrollador React e ingeniero de bots de Discord con cuatro productos en vivo desplegados en orzz.website.",
    aboutDescription: "Hola, soy orzz5. Construyo productos web de principio a fin: interfaz, estado, APIs y despliegue. Mis trabajos incluyen un showcase de bots, una aplicación del tiempo, una página de links y un constructor web visual, todos en vivo en orzz.website. También desarrollo bots de Discord para moderación, música y automatización de comunidades.",
    publicRepos: "Repositorios Públicos",
    siteLanguages: "Idiomas del Sitio",
    license: "Licencia",
    projectsCompleted: "Productos en Vivo",
    whatIOffer: "Lo que Ofrezco",
    webDevTitle: "Desarrollo Web",
    webDevDesc: "Interfaces React diseñadas para velocidad, accesibilidad y mantenibilidad — desplegadas y monitoreadas en producción.",
    discordDevTitle: "Bots de Discord",
    discordDevDesc: "Bots de Discord en producción para moderación, música y automatización, construidos con Discord.js y Node.js.",
    designTitle: "Diseño UI/UX",
    designDesc: "Interfaces diseñadas con claridad y velocidad: componentes consistentes, decisiones sensatas y sin clutter.",
    perfOptTitle: "Optimización de Rendimiento",
    perfOptDesc: "Análisis de bundle, correcciones de renderizado y trabajo sobre Core Web Vitals para mantener páginas rápidas en dispositivos reales.",

    whatIUse: "Lo que Utilizo",
    toolsDaily: "Herramientas y tecnologías con las que trabajo a diario.",

    projectsTitle: "Proyectos",
    projectsTagline: "Cuatro productos en vivo en orzz.website — código fuente en GitHub.",
    allProjects: "Todos los Proyectos",
    webApps: "Apps Web",
    projectsComingSoon: "Próximamente",
    projectsSoonDesc: "Actualmente estoy trabajando en proyectos emocionantes que se mostrarán aquí pronto. ¡Vuelve más tarde!",
    getNotified: "Avísame",

    // Bots Project
    botsProjectTitle: "bots.orzz.website",
    botsProjectDesc: "Un sitio para probar mis bots antes de añadirlos a tu servidor",
    preview: "Vista Previa",

    // Weather Project
    weatherProjectTitle: "weather.orzz.website",
    weatherProjectDesc: "App del tiempo en tiempo real con búsqueda de ciudad, condiciones actuales y pronósticos de varios días",

    // Bio Project
    bioProjectTitle: "bio.orzz.website",
    bioProjectDesc: "Página de links con marca personalizada y analíticas de visitas",

    // Labs Project
    labsProjectTitle: "labs.orzz.website",
    labsProjectDesc: "Constructor web visual para crear y lanzar páginas sin escribir código repetitivo",
    showAllProjects: "Mostrar todos los proyectos",
    showLessProjects: "Mostrar menos",

    getInTouch: "Ponte en Contacto",
    contactTagline: "Envíame un mensaje y te responderé lo antes posible.",
    connectOnSocial: "Redes Sociales",
    sendMessage: "Enviar Mensaje",
    name: "Nombre",
    emailAddress: "Correo Electrónico",
    subject: "Asunto",
    projectType: "Tipo de Proyecto",
    message: "Mensaje",
    send: "Enviar Mensaje",
    sending: "Enviando...",
    selectProjectType: "Selecciona el tipo de proyecto",
    webDevelopment: "Desarrollo Web",
    discordBot: "Bot de Discord",
    uiuxDesign: "Diseño UI/UX",
    mobileApp: "App Móvil",
    messagePlaceholder: "Cuéntame sobre tu proyecto...",
    messageSuccess: "¡Mensaje Enviado!",
    messageSuccessDesc: "Gracias por contactarme. Te responderé muy pronto.",
    messageError: "Error al enviar el mensaje. Inténtalo de nuevo.",

    footerDesc: "Construyendo productos web con React y bots de Discord que se lanzan a producción — en vivo en orzz.website.",
    quickLinks: "Enlaces Rápidos",
    services: "Servicios",
    consulting: "Consultoría",
    backToTop: "Volver arriba",
    rights: "Todos los derechos reservados. Hecho con",
    andLotsOf: "y mucho",

    discordPresence: "Presencia en Discord",
    online: "En línea",
    idle: "Ausente",
    dnd: "No molestar",
    offline: "Desconectado",
    available: "Disponible",
    viewProfile: "Ver perfil",
    copyDiscord: "Copiar enlace del perfil de Discord",
    copied: "¡Copiado!",

    blog: "Blog",
    blogTitle: "Notas y Artículos",
    blogTagline: "Notas, artículos y aprendizajes de construir y lanzar proyectos en orzz.website.",
    readArticle: "Leer artículo",
    backToBlog: "Volver al blog",
    minRead: "min de lectura",
    rssFeed: "Feed RSS",
    readPrev: "Anterior",
    readNext: "Siguiente",

    caseStudy: "Caso de Estudio",
    viewCaseStudy: "Ver caso de estudio",
    backToProjects: "Volver a proyectos",
    challenge: "El Reto",
    approach: "El Enfoque",
    keyFeatures: "Características Clave",
    techStack: "Tecnologías",
    liveDemo: "Demo en Vivo",
    sourceCode: "Código Fuente",
    nextProject: "Siguiente Proyecto",
    repositoryStats: "Estadísticas del Repositorio",

    notFoundTitle: "Página no encontrada",
    notFoundDesc: "La página que buscas no existe o ha sido movida.",
    backHome: "Volver al inicio",
    errorTitle: "Algo salió mal",
    errorDesc: "Ocurrió un error inesperado. Puedes intentar recargar la página.",
    reload: "Recargar",

    openPalette: "Abrir menú de comandos",
    palettePlaceholder: "Busca páginas, proyectos, acciones...",
    paletteNav: "Navegación",
    palettePages: "Páginas",
    paletteActions: "Acciones",
    paletteNoResults: "Sin resultados",
    paletteNavigate: "Navegar",
    paletteSelect: "Abrir",
    changeLanguage: "Idioma",

    accentColor: "Color de acento",
    accentBlue: "Azul",
    accentViolet: "Violeta",
    accentGreen: "Verde",
    accentAmber: "Ámbar",
  },

  fr: {
    home: "Accueil",
    about: "À Propos",
    projects: "Projets",
    discordBots: "Bots Discord",
    contact: "Contact",
    skipToContent: "Aller au contenu",

    helloIm: "Bonjour, je suis",
    heroRole: "Développeur frontend et spécialiste des bots Discord",
    availableForWork: "Disponible pour de nouveaux projets",
    iBuild: "Je conçois",
    amazingWebsites: "des sites web rapides et modernes",
    discordBots2: "des bots Discord",
    userExperiences: "des interfaces fluides",
    digitalSolutions: "des outils d'automatisation",
    customApplications: "des applications web sur mesure",
    heroDescription: "Développeur frontend créant des interfaces React et des bots Discord prêts pour la production — de l'interface et de l'automatisation au déploiement.",
    viewMyWork: "Voir mon travail",
    letsConnect: "Connectons-nous",
    github: "GitHub",

    aboutMe: "À Propos de Moi",
    aboutTagline: "Développeur React et ingénieur de bots Discord avec quatre produits en ligne déployés sur orzz.website.",
    aboutDescription: "Salut, je suis orzz5. Je construis des produits web de bout en bout : interface, état, API et déploiement. Mes réalisations incluent une vitrine de bots, une application météo, une page de liens et un constructeur web visuel, tous en ligne sur orzz.website. Je développe aussi des bots Discord pour la modération, la musique et l'automatisation de communauté.",
    publicRepos: "Dépôts Publics",
    siteLanguages: "Langues du Site",
    license: "Licence",
    projectsCompleted: "Produits en Ligne",
    whatIOffer: "Ce que je propose",
    webDevTitle: "Développement Web",
    webDevDesc: "Des interfaces React conçues pour la vitesse, l'accessibilité et la maintenabilité — déployées et monitorées en production.",
    discordDevTitle: "Bots Discord",
    discordDevDesc: "Des bots Discord en production pour la modération, la musique et l'automatisation, construits avec Discord.js et Node.js.",
    designTitle: "Design UI/UX",
    designDesc: "Des interfaces conçues pour la clarté et la vitesse : composants cohérents, choix judicieux, sans superflu.",
    perfOptTitle: "Optimisation des Performances",
    perfOptDesc: "Analyse de bundle, corrections de rendu et travail sur les Core Web Vitals pour garder les pages rapides sur les vrais appareils.",

    whatIUse: "Ce que j'utilise",
    toolsDaily: "Outils et technologies avec lesquels je travaille quotidiennement.",

    projectsTitle: "Projets",
    projectsTagline: "Quatre produits en ligne sur orzz.website — code source sur GitHub.",
    allProjects: "Tous les Projets",
    webApps: "Apps Web",
    projectsComingSoon: "Bientôt disponible",
    projectsSoonDesc: "Je travaille actuellement sur des projets passionnants qui seront présentés ici bientôt. Revenez plus tard !",
    getNotified: "M'avertir",

    // Bots Project
    botsProjectTitle: "bots.orzz.website",
    botsProjectDesc: "Un site pour tester mes bots avant de les ajouter à votre serveur",
    preview: "Aperçu",

    // Weather Project
    weatherProjectTitle: "weather.orzz.website",
    weatherProjectDesc: "Application météo en temps réel avec recherche de ville, conditions actuelles et prévisions sur plusieurs jours",

    // Bio Project
    bioProjectTitle: "bio.orzz.website",
    bioProjectDesc: "Page de liens avec branding personnalisé et statistiques de visites",

    // Labs Project
    labsProjectTitle: "labs.orzz.website",
    labsProjectDesc: "Constructeur web visuel pour créer et publier des pages sans écrire de code répétitif",
    showAllProjects: "Voir tous les projets",
    showLessProjects: "Voir moins",

    getInTouch: "Contactez-moi",
    contactTagline: "Envoyez-moi un message et je vous répondrai dès que possible.",
    connectOnSocial: "Réseaux Sociaux",
    sendMessage: "Envoyer un Message",
    name: "Nom",
    emailAddress: "Adresse e-mail",
    subject: "Sujet",
    projectType: "Type de Projet",
    message: "Message",
    send: "Envoyer le Message",
    sending: "Envoi en cours...",
    selectProjectType: "Sélectionnez un type de projet",
    webDevelopment: "Développement Web",
    discordBot: "Bot Discord",
    uiuxDesign: "Design UI/UX",
    mobileApp: "App Mobile",
    messagePlaceholder: "Parlez-moi de votre projet...",
    messageSuccess: "Message Envoyé !",
    messageSuccessDesc: "Merci de m'avoir contacté. Je vous répondrai très bientôt.",
    messageError: "Échec de l'envoi du message. Veuillez réessayer.",

    footerDesc: "Je construis des produits web React et des bots Discord prêts pour la production — en ligne sur orzz.website.",
    quickLinks: "Liens Rapides",
    services: "Services",
    consulting: "Consultation",
    backToTop: "Retour en haut",
    rights: "Tous droits réservés. Fait avec",
    andLotsOf: "et beaucoup de",

    discordPresence: "Présence Discord",
    online: "En ligne",
    idle: "Inactif",
    dnd: "Ne pas déranger",
    offline: "Hors ligne",
    available: "Disponible",
    viewProfile: "Voir le profil",
    copyDiscord: "Copier le lien du profil Discord",
    copied: "Copié !",

    blog: "Blog",
    blogTitle: "Notes & Articles",
    blogTagline: "Notes, articles et enseignements de la construction et du déploiement de projets sur orzz.website.",
    readArticle: "Lire l'article",
    backToBlog: "Retour au blog",
    minRead: "min de lecture",
    rssFeed: "Flux RSS",
    readPrev: "Précédent",
    readNext: "Suivant",

    caseStudy: "Étude de cas",
    viewCaseStudy: "Voir l'étude de cas",
    backToProjects: "Retour aux projets",
    challenge: "Le Défi",
    approach: "L'Approche",
    keyFeatures: "Fonctionnalités Clés",
    techStack: "Stack Technique",
    liveDemo: "Démo en Direct",
    sourceCode: "Code Source",
    nextProject: "Projet Suivant",
    repositoryStats: "Statistiques du Dépôt",

    notFoundTitle: "Page introuvable",
    notFoundDesc: "La page que vous cherchez n'existe pas ou a été déplacée.",
    backHome: "Retour à l'accueil",
    errorTitle: "Quelque chose s'est mal passé",
    errorDesc: "Une erreur inattendue s'est produite. Vous pouvez essayer de recharger la page.",
    reload: "Recharger",

    openPalette: "Ouvrir le menu de commandes",
    palettePlaceholder: "Rechercher pages, projets, actions...",
    paletteNav: "Navigation",
    palettePages: "Pages",
    paletteActions: "Actions",
    paletteNoResults: "Aucun résultat",
    paletteNavigate: "Naviguer",
    paletteSelect: "Ouvrir",
    changeLanguage: "Langue",

    accentColor: "Couleur d'accent",
    accentBlue: "Bleu",
    accentViolet: "Violet",
    accentGreen: "Vert",
    accentAmber: "Ambre",
  }
};

const LanguageContext = createContext();

export const useTranslation = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');

  const t = useCallback((key) => {
    return translations[language][key] || translations['en'][key] || key;
  }, [language]);

  const changeLanguage = useCallback((lang) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  }, []);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setLanguage(savedLanguage);
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const value = useMemo(() => ({
    language,
    t,
    changeLanguage
  }), [language, t, changeLanguage]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageContext;
