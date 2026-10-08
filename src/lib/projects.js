export const PROJECTS = [
  {
    slug: 'bots',
    id: 'bots-testing',
    titleKey: 'botsProjectTitle',
    descKey: 'botsProjectDesc',
    image: '/projects/bots.png',
    categories: ['web', 'discord'],
    technologies: ['React', 'Tailwind CSS', 'Discord.js', 'Node.js'],
    github: 'https://github.com/orzz5/Bots-web',
    githubRepo: 'orzz5/Bots-web',
    live: 'https://bots.orzz.website',
    status: 'Live',
    content: {
      en: {
        challenge:
          'People often want to try a Discord bot before inviting it to a server, but testing usually means inviting first and removing it later if it does not fit. There was no place to try the bots in a safe, zero-commitment way.',
        approach:
          'I built a showcase site that presents each bot with its commands and capabilities in the browser, so server owners can evaluate everything before adding anything to Discord. The site is deployed on its own subdomain and kept in sync with the bots it presents.',
        features: [
          'Interactive showcase of every bot with its full command list',
          'Per-bot detail pages covering permissions and setup steps',
          'Responsive dark UI consistent with the rest of orzz.website',
        ],
      },
      es: {
        challenge:
          'A menudo se quiere probar un bot de Discord antes de invitarlo a un servidor, pero normalmente eso implica invitarlo primero y eliminarlo después si no encaja. No existía un lugar para probar los bots de forma segura y sin compromiso.',
        approach:
          'Construí un sitio vitrina que presenta cada bot con sus comandos y capacidades en el navegador, para que los administradores puedan evaluarlo todo antes de añadir nada a Discord. El sitio está desplegado en su propio subdominio y se mantiene sincronizado con los bots que presenta.',
        features: [
          'Vitrina interactiva de cada bot con su lista completa de comandos',
          'Páginas de detalle por bot con permisos y pasos de configuración',
          'Interfaz oscura y responsiva, coherente con el resto de orzz.website',
        ],
      },
      fr: {
        challenge:
          "On veut souvent tester un bot Discord avant de l'inviter sur un serveur, mais cela implique généralement de l'inviter puis de le retirer s'il ne convient pas. Il n'existait pas d'endroit pour essayer les bots en toute sécurité, sans engagement.",
        approach:
          "J'ai construit un site vitrine qui présente chaque bot avec ses commandes et ses capacités dans le navigateur, afin que les administrateurs puissent tout évaluer avant d'ajouter quoi que ce soit à Discord. Le site est déployé sur son propre sous-domaine et reste synchronisé avec les bots qu'il présente.",
        features: [
          'Vitrine interactive de chaque bot avec sa liste complète de commandes',
          'Pages de détail par bot avec permissions et étapes de configuration',
          "Interface sombre et responsive, cohérente avec le reste d'orzz.website",
        ],
      },
    },
  },
  {
    slug: 'weather',
    id: 'weather-app',
    titleKey: 'weatherProjectTitle',
    descKey: 'weatherProjectDesc',
    image: '/projects/weather.png',
    categories: ['web'],
    technologies: ['React', 'Weather API', 'Tailwind CSS'],
    github: 'https://github.com/orzz5/orzz-weather',
    githubRepo: 'orzz5/orzz-weather',
    live: 'https://weather.orzz.website',
    status: 'Live',
    content: {
      en: {
        challenge:
          'Weather apps tend to be cluttered: ads, endless menus, and slow loads just to answer a simple question — what is the weather right now where I am going?',
        approach:
          'I built a focused single-purpose app: search a city, get current conditions and a multi-day forecast immediately. Data comes from a public weather API, responses are cached between visits, and the whole thing ships as a small static bundle on its own subdomain.',
        features: [
          'Instant city search with current temperature and conditions',
          'Multi-day forecast with highs, lows, and icons',
          'Fast, dependency-light static deployment',
        ],
      },
      es: {
        challenge:
          'Las apps del suelo suelen estar saturadas: anuncios, menús interminables y cargas lentas solo para responder una pregunta simple: ¿qué tiempo hace ahora mismo a donde voy?',
        approach:
          'Construí una app de propósito único: busca una ciudad y obtén al instante las condiciones actuales y el pronóstico de varios días. Los datos provienen de una API meteorológica pública, las respuestas se guardan en caché entre visitas y todo se despliega como un paquete estático pequeño en su propio subdominio.',
        features: [
          'Búsqueda instantánea de ciudades con temperatura y condiciones actuales',
          'Pronóstico de varios días con máximas, mínimas e iconos',
          'Despliegue estático rápido y con pocas dependencias',
        ],
      },
      fr: {
        challenge:
          "Les applications météo sont souvent surchargées : publicités, menus interminables et chargements lents juste pour répondre à une question simple — quelle fait-il là où je vais ?",
        approach:
          "J'ai construit une application à usage unique : cherchez une ville, obtenez immédiatement les conditions actuelles et les prévisions sur plusieurs jours. Les données viennent d'une API météo publique, les réponses mises en cache entre les visites, le tout est déployé en bundle statique léger sur son propre sous-domaine.",
        features: [
          'Recherche instantanée de villes avec température et conditions actuelles',
          'Prévisions sur plusieurs jours avec maximales, minimales et icônes',
          'Déploiement statique rapide et peu dépendant',
        ],
      },
    },
  },
  {
    slug: 'bio',
    id: 'bio-link',
    titleKey: 'bioProjectTitle',
    descKey: 'bioProjectDesc',
    image: '/projects/bio.png',
    categories: ['web'],
    technologies: ['React', 'Tailwind CSS', 'Vercel'],
    github: 'https://github.com/orzz5/orzz-bio',
    githubRepo: 'orzz5/orzz-bio',
    live: 'https://bio.orzz.website',
    status: 'Live',
    content: {
      en: {
        challenge:
          'A link-in-bio page has one job: send visitors to the right place in one tap. Most existing tools are heavy, ad-supported, and hard to customize to match a personal brand.',
        approach:
          'I wrote my own from scratch — a single lightweight page with my links, custom branding, and visit analytics, deployed on its own subdomain. No page builder, no tracking scripts I do not control, and full ownership of the code.',
        features: [
          'Curated link list with custom branding and icons',
          'Visit analytics without third-party trackers',
          'Static deployment that loads almost instantly',
        ],
      },
      es: {
        challenge:
          'Una página de enlaces tiene una sola función: llevar a los visitantes al lugar correcto con un toque. La mayoría de las herramientas existentes son pesadas, con anuncios y difíciles de personalizar para una marca personal.',
        approach:
          'La escribí desde cero: una única página ligera con mis enlaces, marca personalizada y analítica de visitas, desplegada en su propio subdominio. Sin constructor de páginas, sin scripts de rastreo que no controle, y con propiedad total del código.',
        features: [
          'Lista de enlaces seleccionada con marca e iconos personalizados',
          'Analítica de visitas sin rastreadores de terceros',
          'Despliegue estático que carga casi al instante',
        ],
      },
      fr: {
        challenge:
          "Une page de liens a un seul rôle : amener les visiteurs au bon endroit en un geste. La plupart des outils existants sont lourds, remplis de publicités et difficiles à personnaliser pour refléter une marque personnelle.",
        approach:
          "Je l'ai écrite from scratch — une seule page légère avec mes liens, une identité personnalisée et des statistiques de visites, déployée sur son propre sous-domaine. Sans constructeur de pages, sans scripts de suivi que je ne contrôle pas, et en gardant la propriété totale du code.",
        features: [
          'Liste de liens sélectionnés avec identité et icônes personnalisées',
          'Statistiques de visites sans traqueurs tiers',
          'Déploiement statique quasiment instantané',
        ],
      },
    },
  },
  {
    slug: 'labs',
    id: 'web-builder',
    titleKey: 'labsProjectTitle',
    descKey: 'labsProjectDesc',
    image: '/projects/labs.png',
    categories: ['web'],
    technologies: ['Web Builder', 'React', 'Tailwind CSS'],
    github: 'https://github.com/orzz5/labs',
    githubRepo: 'orzz5/labs',
    live: 'https://labs.orzz.website',
    status: 'Live',
    content: {
      en: {
        challenge:
          'Launching a simple landing page usually means wrestling with hosting, boilerplate, and deployment pipelines before a single line of real content exists.',
        approach:
          'Labs is a visual web builder that lets you assemble pages from ready-made blocks and launch them without writing boilerplate. It handles layout, styling, and deployment so the focus stays on the content itself.',
        features: [
          'Visual block-based page editing in the browser',
          'One-click publish to a live URL',
          'Templates styled to match a dark, modern aesthetic',
        ],
      },
      es: {
        challenge:
          'Lanzar una página de aterrizaje simple suele significar luchar con el alojamiento, el código base y los despliegues antes de escribir una sola línea de contenido real.',
        approach:
          'Labs es un constructor web visual que permite ensamblar páginas a partir de bloques listos y publicarlas sin escribir código repetitivo. Se encarga del diseño, los estilos y el despliegue para que el enfoque siga siendo el contenido.',
        features: [
          'Edición visual de páginas por bloques en el navegador',
          'Publicación con un clic en una URL en vivo',
          'Plantillas con estética oscura y moderna',
        ],
      },
      fr: {
        challenge:
          "Lancer une simple page d'atterrissage signifie souvent se battre avec l'hébergement, le code de base et les pipelines de déploiement avant d'écrire la moindre ligne de contenu réel.",
        approach:
          "Labs est un constructeur web visuel qui permet d'assembler des pages à partir de blocs prêts à l'emploi et de les publier sans écrire de code répétitif. Il gère la mise en page, les styles et le déploiement pour rester concentré sur le contenu.",
        features: [
          "Édition visuelle de pages par blocs dans le navigateur",
          'Publication en un clic sur une URL en direct',
          "Modèles au design sombre et moderne",
        ],
      },
    },
  },
];

export function getProjectBySlug(slug) {
  return PROJECTS.find((p) => p.slug === slug) || null;
}

export function getNextProject(slug) {
  const idx = PROJECTS.findIndex((p) => p.slug === slug);
  if (idx === -1) return PROJECTS[0];
  return PROJECTS[(idx + 1) % PROJECTS.length];
}
