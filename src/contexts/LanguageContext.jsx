import React, { createContext, useState, useContext } from 'react';

const translations = {
  en: {
    // Navigation
    home: "Home",
    about: "About", 
    projects: "Projects",
    discordBots: "Discord Bots",
    contact: "Contact",
    
    // Hero Section
    iBuild: "I build",
    amazingWebsites: "amazing websites",
    discordBots2: "Discord bots",
    userExperiences: "user experiences",
    digitalSolutions: "digital solutions",
    customApplications: "custom applications",
    helloIm: "Hello, I'm",
    fullStackDeveloper: "Full-Stack Developer & Discord Bot Specialist",
    letsWork: "Let's work together",
    viewProjects: "View Projects",
    contactMe: "Contact Me",
    
    // Stats
    projectsCompleted: "Projects Completed",
    happyClients: "Happy Clients",
    linesOfCode: "Lines of Code",
    coffeeCups: "Coffee Cups",
    
    // About Section
    aboutMe: "About Me",
    aboutDescription: "I'm a passionate full-stack developer specializing in creating exceptional web experiences and powerful Discord bots. With expertise in modern technologies and a keen eye for design, I transform ideas into reality.",
    skills: "Skills",
    expertise: "Expertise",
    
    // Services
    webDevelopment: "Web Development",
    discordBotDev: "Discord Bot Development",
    uiuxDesign: "UI/UX Design",
    consulting: "Consulting",
    
    // Contact Section
    getInTouch: "Get in Touch",
    contactDescription: "Send me a message and I'll get back to you as soon as possible.",
    connectOnSocial: "Connect on Social",
    sendMessage: "Send a Message",
    name: "Name",
    emailAddress: "Email Address", 
    subject: "Subject",
    projectType: "Project Type",
    message: "Message",
    send: "Send Message",
    sending: "Sending...",
    
    // Footer
    quickLinks: "Quick Links",
    services: "Services",
    backToTop: "Back to top",
    rights: "All rights reserved. Made with",
    andLotsOf: "and lots of",
    
    // Projects Section
    allProjects: "All Projects",
    webDev: "Web Development",
    discordDev: "Discord Development",
    design: "Design",
    viewProject: "View Project",
    liveDemo: "Live Demo"
  },
  
  es: {
    // Navigation
    home: "Inicio",
    about: "Acerca de",
    projects: "Proyectos", 
    discordBots: "Bots de Discord",
    contact: "Contacto",
    
    // Hero Section
    iBuild: "Creo",
    amazingWebsites: "sitios web increíbles",
    discordBots2: "bots de Discord",
    userExperiences: "experiencias de usuario",
    digitalSolutions: "soluciones digitales",
    customApplications: "aplicaciones personalizadas",
    helloIm: "Hola, soy",
    fullStackDeveloper: "Desarrollador Full-Stack y Especialista en Bots de Discord",
    letsWork: "Trabajemos juntos",
    viewProjects: "Ver Proyectos",
    contactMe: "Contáctame",
    
    // Stats
    projectsCompleted: "Proyectos Completados",
    happyClients: "Clientes Satisfechos",
    linesOfCode: "Líneas de Código",
    coffeeCups: "Tazas de Café",
    
    // About Section
    aboutMe: "Sobre Mí",
    aboutDescription: "Soy un desarrollador full-stack apasionado especializado en crear experiencias web excepcionales y bots de Discord potentes. Con experiencia en tecnologías modernas y un buen ojo para el diseño, transformo ideas en realidad.",
    skills: "Habilidades",
    expertise: "Experiencia",
    
    // Services
    webDevelopment: "Desarrollo Web",
    discordBotDev: "Desarrollo de Bots Discord",
    uiuxDesign: "Diseño UI/UX",
    consulting: "Consultoría",
    
    // Contact Section
    getInTouch: "Ponte en Contacto",
    contactDescription: "Envíame un mensaje y te responderé lo antes posible.",
    connectOnSocial: "Conecta en Redes",
    sendMessage: "Enviar Mensaje",
    name: "Nombre",
    emailAddress: "Correo Electrónico",
    subject: "Asunto",
    projectType: "Tipo de Proyecto",
    message: "Mensaje",
    send: "Enviar Mensaje",
    sending: "Enviando...",
    
    // Footer
    quickLinks: "Enlaces Rápidos",
    services: "Servicios",
    backToTop: "Volver arriba",
    rights: "Todos los derechos reservados. Hecho con",
    andLotsOf: "y mucho",
    
    // Projects Section
    allProjects: "Todos los Proyectos",
    webDev: "Desarrollo Web",
    discordDev: "Desarrollo Discord",
    design: "Diseño",
    viewProject: "Ver Proyecto",
    liveDemo: "Demo en Vivo"
  },
  
  fr: {
    // Navigation
    home: "Accueil",
    about: "À propos",
    projects: "Projets",
    discordBots: "Bots Discord", 
    contact: "Contact",
    
    // Hero Section
    iBuild: "Je crée",
    amazingWebsites: "des sites web incroyables",
    discordBots2: "bots Discord",
    userExperiences: "expériences utilisateur",
    digitalSolutions: "solutions numériques",
    customApplications: "applications personnalisées",
    helloIm: "Bonjour, je suis",
    fullStackDeveloper: "Développeur Full-Stack et Spécialiste de Bots Discord",
    letsWork: "Travaillons ensemble",
    viewProjects: "Voir les Projets",
    contactMe: "Contactez-moi",
    
    // Stats
    projectsCompleted: "Projets Terminés",
    happyClients: "Clients Satisfaits",
    linesOfCode: "Lignes de Code",
    coffeeCups: "Tasses de Café",
    
    // About Section
    aboutMe: "À Propos de Moi",
    aboutDescription: "Je suis un développeur full-stack passionné spécialisé dans la création d'expériences web exceptionnelles et de bots Discord puissants. Avec une expertise en technologies modernes et un œil attentif pour le design, je transforme les idées en réalité.",
    skills: "Compétences",
    expertise: "Expertise",
    
    // Services
    webDevelopment: "Développement Web",
    discordBotDev: "Développement de Bots Discord",
    uiuxDesign: "Design UI/UX",
    consulting: "Consultation",
    
    // Contact Section
    getInTouch: "Contactez-moi",
    contactDescription: "Envoyez-moi un message et je vous répondrai dès que possible.",
    connectOnSocial: "Connectez-vous sur les Réseaux",
    sendMessage: "Envoyer un Message",
    name: "Nom",
    emailAddress: "Adresse E-mail",
    subject: "Sujet",
    projectType: "Type de Projet",
    message: "Message",
    send: "Envoyer le Message",
    sending: "Envoi en cours...",
    
    // Footer
    quickLinks: "Liens Rapides",
    services: "Services",
    backToTop: "Retour en haut",
    rights: "Tous droits réservés. Fait avec",
    andLotsOf: "et plein de",
    
    // Projects Section
    allProjects: "Tous les Projets",
    webDev: "Développement Web",
    discordDev: "Développement Discord",
    design: "Design",
    viewProject: "Voir le Projet",
    liveDemo: "Démo en Direct"
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

  const t = (key) => {
    return translations[language][key] || translations['en'][key] || key;
  };

  const changeLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  React.useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setLanguage(savedLanguage);
  }, []);

  return (
    <LanguageContext.Provider value={{ language, t, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageContext;
