// src/components/layout/Navbar.jsx
import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X, Sun, Moon, Globe } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'
import SocialLinks from '../sections/SocialLinks' 

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [langDropdownOpen, setLangDropdownOpen] = useState(false)
  
  // Utilisation de l'état global du thème
  const { darkMode, setDarkMode } = useTheme()

  // Gère et mémorise la langue active via le cookie de traduction
  const [currentLang, setCurrentLang] = useState(() => {
    if (typeof window !== 'undefined') {
      const match = document.cookie.match(/googtrans=\/fr\/([^;]+)/);
      return match ? match[1] : 'fr';
    }
    return 'fr';
  });

  // Injection asynchrone du script de traduction Google
  useEffect(() => {
    const addGoogleTranslateScript = () => {
      if (document.getElementById("google-translate-script")) return;
      
      const script = document.createElement("script");
      script.id = "google-translate-script";
      script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);

      window.googleTranslateElementInit = () => {
        new window.google.translate.TranslateElement({
          pageLanguage: 'fr',
          // Remplacement de 'he' par le code historique de Google 'iw' pour l'Hébreu
          includedLanguages: 'en,es,pt,ar,de,it,nl,sw,zh-CN,ru,el,la,ja,ko,iw,am,hi,kg,ktu,ln,wo,bm,rw', 
          autoDisplay: false,
        }, 'google_translate_element');
      };
    };

    addGoogleTranslateScript();
  }, []);

  // Déclenche le changement de langue par écriture de cookie
  const changeLanguage = (langCode) => {
    document.cookie = `googtrans=/fr/${langCode}; path=/`;
    document.cookie = `googtrans=/fr/${langCode}; path=/; domain=${window.location.hostname}`;
    
    // Si l'utilisateur choisit le Français (langue d'origine), on efface le cookie
    if (langCode === 'fr') {
      document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${window.location.hostname}`;
    }
    
    window.location.reload();
  };

  const navItems = [
    { path: '/', label: 'Accueil' },
    { path: '/a-propos', label: 'À propos' },
    { path: '/organisation', label: 'Organisation' },
    { path: '/projets', label: 'Projets' },
    { path: '/publications', label: 'Publications' },
    { path: '/actualites', label: 'Actualités' },
    { path: '/galerie', label: 'Galerie' },
    { path: '/contact', label: 'Contact' },
  ]

  // Remplacement du code 'he' par 'iw' pour l'Hébreu
  const languages = [
    { code: 'fr', label: 'Français', flag: '🇫🇷' },
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'es', label: 'Español', flag: '🇪🇸' },
    { code: 'pt', label: 'Português', flag: '🇵🇹' },
    { code: 'ar', label: 'العربية', flag: '🇸🇦' },
    { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
    { code: 'it', label: 'Italiano', flag: '🇮🇹' },
    { code: 'nl', label: 'Nederlands', flag: '🇳🇱' },
    { code: 'sw', label: 'Kiswahili', flag: '🇹🇿' },
    { code: 'zh-CN', label: '中文 (CN)', flag: '🇨🇳' },
    { code: 'ru', label: 'Русский', flag: '🇷🇺' },
    { code: 'el', label: 'Ελληνικά', flag: '🇬🇷' },
    { code: 'la', label: 'Latina', flag: '🏛️' },
    { code: 'ja', label: '日本語', flag: '🇯🇵' },
    { code: 'ko', label: '한국어', flag: '🇰🇷' },
    { code: 'iw', label: 'עברית', flag: '🇮🇱' }, // <--- Modification ici (iw au lieu de he)
    { code: 'am', label: 'አማርኛ', flag: '🇪🇹' },
    { code: 'hi', label: 'हिन्दी', flag: '🇮🇳' },
    { code: 'kg', label: 'Kikongo', flag: '🇨🇬' },
    { code: 'ktu', label: 'Kituba', flag: '🇨🇩' },
    { code: 'ln', label: 'Lingala', flag: '🇨🇩' },
    { code: 'wo', label: 'Wolof', flag: '🇸🇳' },
    { code: 'bm', label: 'Bambara', flag: '🇲🇱' },
    { code: 'rw', label: 'Kinyarwanda', flag: '🇷🇼' }
  ];

  const activeLangObj = languages.find(l => l.code === currentLang) || languages[0];

  return (
    <nav className="bg-white dark:bg-dark border-b border-transparent dark:border-[#1b3b1c] shadow-md sticky top-0 z-50 transition-colors duration-300">
      <div className="container-custom py-3 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 shrink-0" onClick={() => setLangDropdownOpen(false)}>
          <img
            src="https://aebc-cdn.b-cdn.net/Logo-Banni%C3%A8re/lg-G-aebc-02.png"
            alt="AEBC Logo"
            className="h-[55px] w-auto object-contain shrink-0"
            style={{ minWidth: '55px' }}
          />
        </Link>

        {/* Desktop menu */}
        <div className="hidden lg:flex space-x-6 items-center">
          {navItems.map(item => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setLangDropdownOpen(false)}
              className={({ isActive }) =>
                `text-dark dark:text-gray-200 hover:text-primary dark:hover:text-secondary transition-colors ${
                  isActive ? 'text-primary dark:text-secondary font-semibold border-b-2 border-primary dark:border-secondary' : ''
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}

          {/* Bouton Faire un don */}
          <Link
            to="/don"
            onClick={() => setLangDropdownOpen(false)}
            className="bg-primary text-white px-4 py-2 rounded-lg shadow-md hover:bg-primary/90 transition shrink-0 font-medium"
          >
            Faire un don
          </Link>

          {/* Bouton de changement de thème (Vert pâle bg-primary/10, contour vert border-primary/30 et icône verte text-primary en mode clair) */}
          <button
            onClick={() => {
              setDarkMode(!darkMode);
              setLangDropdownOpen(false);
            }}
            className="p-2 rounded-xl border border-primary/30 dark:border-transparent bg-primary/10 hover:bg-primary/20 dark:bg-primary-dark dark:hover:bg-primary text-primary dark:text-secondary transition-all"
            aria-label="Changer de thème"
            title={darkMode ? "Activer le mode clair" : "Activer le mode sombre"}
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* SÉLECTEUR DE LANGUE PERSONNALISÉ (Ordinateur - Vert pâle bg-primary/10, contour vert border-primary/30 et texte/icône verts text-primary en mode clair) */}
          <div className="relative">
            <button
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="flex items-center gap-2 p-2 rounded-xl border border-primary/30 dark:border-transparent bg-primary/10 hover:bg-primary/20 dark:bg-primary-dark dark:hover:bg-primary text-primary dark:text-secondary transition-all"
              aria-label="Sélecteur de langue"
              title="Traduire le site"
            >
              <Globe size={20} />
              <span className="text-[11px] font-black uppercase tracking-wider">
                {activeLangObj.code === "iw" ? "he" : activeLangObj.code === "zh-CN" ? "zh" : activeLangObj.code}
              </span>
            </button>

            {/* Menu déroulant des langues */}
            {langDropdownOpen && (
              <div className="absolute right-0 mt-2 w-44 max-h-80 overflow-y-auto bg-white dark:bg-dark border border-gray-100 dark:border-[#1b3b1c] rounded-xl shadow-xl z-50 py-1">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      changeLanguage(lang.code);
                      setLangDropdownOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider transition-colors ${
                      currentLang === lang.code
                        ? "bg-primary/10 dark:bg-secondary/10 text-primary dark:text-secondary"
                        : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-primary-dark"
                    }`}
                  >
                    <span>{lang.flag}</span>
                    <span>{lang.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Mobile menu button */}
        <button className="lg:hidden p-2 text-dark dark:text-gray-200" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="lg:hidden bg-white dark:bg-dark border-t dark:border-[#1b3b1c] py-4 px-4 flex flex-col space-y-3 transition-colors duration-300">
          {navItems.map(item => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `block py-2 ${
                  isActive ? 'text-primary dark:text-secondary font-semibold' : 'text-dark dark:text-gray-200'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}

          {/* SÉLECTEUR DE LANGUE (Version Mobile) */}
          <div className="pt-2 border-t border-gray-100 dark:border-primary-dark">
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 font-black uppercase tracking-widest">Traduire le site</p>
            <div className="grid grid-cols-2 gap-2 max-h-60 overflow-y-auto pr-1">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    changeLanguage(lang.code);
                    setIsOpen(false);
                  }}
                  className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-bold uppercase transition ${
                    currentLang === lang.code
                      ? "bg-primary dark:bg-secondary text-white dark:text-dark shadow-sm"
                      : "bg-gray-100 dark:bg-primary-dark text-gray-700 dark:text-gray-200"
                  }`}
                >
                  <span>{lang.flag}</span>
                  <span>{lang.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Séparateur pour mobile - Thème (Vert pâle bg-primary/10, contour vert border-primary/30 et icône/texte verts text-primary en mode clair) */}
          <div className="pt-2 flex items-center justify-between border-t border-gray-100 dark:border-[#1b3b1c]">
            <span className="text-xs text-gray-500 dark:text-gray-400 font-black uppercase tracking-widest">Mode sombre</span>
            <button
              onClick={() => {
                setDarkMode(!darkMode);
                setIsOpen(false);
              }}
              className="p-2 rounded-xl border border-primary/30 dark:border-transparent bg-primary/10 dark:bg-primary-dark text-primary dark:text-secondary"
              aria-label="Changer de thème"
              title={darkMode ? "Activer le mode clair" : "Activer le mode sombre"}
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>

          {/* Bouton Faire un don (mobile) */}
          <Link
            to="/don"
            onClick={() => setIsOpen(false)}
            className="block text-center bg-primary text-white px-4 py-2 rounded-lg shadow-md hover:bg-primary/90 transition font-medium"
          >
            Faire un don
          </Link>

          {/* Réseaux Sociaux */}
          <div className="pt-4 border-t border-gray-100 dark:border-[#1b3b1c] flex justify-center">
            <SocialLinks />
          </div>
        </div>
      )}

      {/* Élément technique invisible obligatoire pour le montage de Google Translate */}
      <div id="google_translate_element" style={{ display: 'none' }}></div>
    </nav>
  )
}

export default Navbar