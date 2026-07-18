// src/components/layout/Footer.jsx
import { useState } from "react";
import { Heart, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import SocialLinks from "../sections/SocialLinks";

// Importations Firebase pour stocker les emails
import { db } from "../../services/firebase"; // Ajustez ce chemin d'accès si nécessaire
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle, loading, success, error

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!email.trim()) return;

    setStatus("loading");
    try {
      // Ajoute l'email dans la collection "newsletter" de Firestore
      await addDoc(collection(db, "newsletter"), {
        email: email.trim().toLowerCase(),
        subscribedAt: serverTimestamp(),
      });

      setStatus("success");
      setEmail(""); // Réinitialisation de l'input

      // Efface le message de succès après 4 secondes
      setTimeout(() => setStatus("idle"), 4000);
    } catch (error) {
      console.error("Erreur d'inscription à la newsletter :", error);
      setStatus("error");
      
      // Efface le message d'erreur après 4 secondes
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  const linkStyle = "hover:text-secondary hover:underline transition-colors";

  return (
    // bg-dark en mode clair (#103826) ➔ dark:bg-[#0f2c1e] (vert nuit profond) en mode sombre
    <footer className="bg-dark dark:bg-[#0f2c1e] text-white pt-16 pb-8 mt-12 border-t border-primary/10 dark:border-primary-dark/20 transition-colors duration-300">
      <div className="container-custom space-y-12">
        {/* Haut du footer */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Colonne 1 — Présentation */}
          <div className="space-y-4">
            <img
              src="https://aebc-cdn.b-cdn.net/Logo-Banni%C3%A8re/lg-G-aebc-02.png"
              alt="AEBC"
              className="h-[55px] w-auto mb-3"
            />
            <p className="text-sm text-gray-300 dark:text-gray-400 leading-relaxed">
              L’Association pour l’Environnement du Bassin du Congo œuvre sans relâche pour la préservation du deuxième poumon mondial, unissant les nations pour un avenir vert.
            </p>
          </div>

          {/* Colonne 2 — Navigation rapide */}
          <div>
            <h4 className="font-semibold text-secondary mb-5 uppercase tracking-wide text-sm">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm text-gray-300 dark:text-gray-400 font-medium">
              <li><Link to="/" className={linkStyle}>Accueil</Link></li>
              <li><Link to="/a-propos" className={linkStyle}>À propos</Link></li>
              <li><Link to="/notre-mission" className={linkStyle}>Notre mission</Link></li>
              <li><Link to="/projets" className={linkStyle}>Projets</Link></li>
              <li><Link to="/contact" className={linkStyle}>Contact</Link></li>
            </ul>
          </div>

          {/* Colonne 3 — Agir avec nous */}
          <div>
            <h4 className="font-semibold text-secondary mb-5 uppercase tracking-wide text-sm">
              Agir avec nous
            </h4>
            <ul className="space-y-2 text-sm text-gray-300 dark:text-gray-400 font-medium">
              <li><Link to="/don" className={linkStyle}>Faire un don</Link></li>
              <li><Link to="/benevolat" className={linkStyle}>Devenir bénévole</Link></li>
              <li><Link to="/partenaires" className={linkStyle}>Devenir partenaire</Link></li>
              <li><Link to="/publications" className={linkStyle}>Publications</Link></li>
            </ul>
          </div>

          {/* Colonne 4 — Contact officiel */}
          <div>
            <h4 className="font-semibold text-secondary mb-5 uppercase tracking-wide text-sm">
              Contact officiel
            </h4>
            <ul className="space-y-3 text-sm text-gray-300 dark:text-gray-400">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="mt-1 text-secondary shrink-0" />
                <Link to="/contact" className={linkStyle}>
                  Brazzaville, République du Congo<br/>Siège International AEBC
                </Link>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-secondary shrink-0" />
                <a href="tel:+242055780416" className={linkStyle}>
                  (+242) 055 780 416
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-secondary shrink-0" />
                <a href="mailto:aebcofficiel@gmail.com" className={linkStyle}>
                  aebcofficiel@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter & SocialLinks (Séparateur fluide dark:border-zinc-800/60) */}
        <div className="border-t border-gray-700 dark:border-zinc-800/60 pt-10 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left w-full md:w-auto">
            <p className="text-sm text-gray-300 dark:text-gray-400 mb-4 font-medium italic">
              Restez informé de nos dernières actions.
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col max-w-sm mx-auto md:mx-0">
              <div className="flex">
                <input
                  type="email"
                  required
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={status === "loading" || status === "success"}
                  className="flex-grow px-4 py-2 rounded-l-md bg-gray-800 dark:bg-zinc-900 text-gray-200 text-sm border border-gray-700 dark:border-zinc-800 focus:outline-none focus:ring-1 focus:ring-secondary disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={status === "loading" || status === "success"}
                  className="bg-secondary text-dark font-bold px-6 py-2 rounded-r-md hover:bg-white disabled:bg-gray-650 transition-all uppercase text-xs"
                >
                  {status === "loading" ? "..." : status === "success" ? "✓" : "OK"}
                </button>
              </div>

              {/* Messages de statut utilisateur */}
              {status === "success" && (
                <p className="text-xs text-secondary mt-2 text-left">
                  ✓ Inscription réussie ! Merci pour votre intérêt.
                </p>
              )}
              {status === "error" && (
                <p className="text-xs text-red-400 mt-2 text-left">
                  Une erreur s'est produite. Veuillez réessayer.
                </p>
              )}
            </form>
          </div>
          
          <div className="flex flex-col items-center md:items-end">
            <SocialLinks showFooterLinkedin={true} />
          </div>
        </div>

        {/* Bas du footer (Séparateur fluide dark:border-zinc-800/60) */}
        <div className="border-t border-gray-700 dark:border-zinc-800/60 pt-8 text-center text-xs text-gray-500 space-y-4">
          <p className="flex justify-center items-center gap-1 font-medium text-gray-400">
            Fait avec <Heart size={14} className="text-red-500 fill-red-500" /> pour l’environnement
          </p>
          <p className="font-bold text-gray-400">© {new Date().getFullYear()} AEBC – Association Environnement Bassin du Congo</p>
          <div className="flex flex-wrap justify-center gap-8 mt-2 font-bold uppercase tracking-tight">
            <a
              href="https://docs.google.com/document/d/1zBGjlKC6xEEJyB9RGy7cb_t2ioaSktllS1Bm6uVc04g/edit?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className={linkStyle}
            >
              Mentions légales
            </a>
            <a
              href="https://docs.google.com/document/d/1LGhwv8Kj3CpchmCmrT3wArzrbLKRz4kDlNNBConi1TA/edit?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className={linkStyle}
            >
              Politique de confidentialité
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;