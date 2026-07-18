// src/pages/Publications.jsx
import { useEffect, useState } from "react";
import { db } from "../services/firebase";
import { collection, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";

// Image de couverture par défaut si vous n'en spécifiez pas pour une publication
const IMAGE_TEST_PAR_DEFAUT = "[LIEN_DE_L_IMAGE_DE_COUVERTURE_PAR_DEFAUT_ICI]";

const DOCUMENTS_STATIQUES = [
  { 
    id: "1", 
    title: "Rapport Exécutif Bassin du Congo - Vol 2", 
    fileUrl: "[LIEN_DU_DOCUMENT_PDF_2_ICI]", 
    type: "Rapport", 
    cover: "https://aebc-cdn.b-cdn.net/aebc-publication/rapports/ressources-hydrographiques.png",
    date: "25 mai 2026",
    dateSort: "2026-05-25"
  },
  { 
    id: "2", 
    title: "Les Droits des Peuples Autochtones", 
    fileUrl: "[LIEN_DU_DOCUMENT_PDF_3_ICI]", 
    type: "Légal", 
    cover: "[LIEN_DE_L_IMAGE_DE_COUVERTURE_3_ICI]",
    date: "12 mai 2026",
    dateSort: "2026-05-12"
  },
  { 
    id: "3", 
    title: "Décret Création Comité National (MAB)", 
    fileUrl: "[LIEN_DU_DOCUMENT_PDF_4_ICI]", 
    type: "Décret", 
    cover: "[LIEN_DE_L_IMAGE_DE_COUVERTURE_4_ICI]",
    date: "25 avril 2025",
    dateSort: "2025-04-25"
  },
  { 
    id: "4", 
    title: "État des lieux du Bassin du Congo", 
    fileUrl: "[LIEN_DU_DOCUMENT_PDF_5_ICI]", 
    type: "Étude", 
    cover: "[LIEN_DE_L_IMAGE_DE_COUVERTURE_5_ICI]",
    date: "10 janvier 2025",
    dateSort: "2025-01-10"
  },
  { 
    id: "5", 
    title: "Rapport d'Évaluation de l'Accès à l'Eau Potable dans le Bassin du Congo", 
    fileUrl: "https://aebc-cdn.b-cdn.net/aebc-publication/rapports/CG-Rapport-d-Evaluation-Access-EauPotable.pdf", 
    type: "Rapport", 
    cover: "https://aebc-cdn.b-cdn.net/aebc-publication/rapports/eau-potable.png",
    date: "21 décembre 2023",
    dateSort: "2023-12-21"
  },
  {
    id: "6",
    title: "Mémorandum d'Entente pour la création du F2BC",
    fileUrl: "https://aebc-cdn.b-cdn.net/aebc-publication/MEMORANDUM-F2BC.pdf",
    type: "Mémorandum",
    cover: "https://aebc-cdn.b-cdn.net/aebc-publication/Couverture/M%C3%A9morandum%20d'Entente_creation%20F2BC.png",
    date: "17 mars 1999 - 5 février 2005",
    dateSort: "2005-02-05"
  }
];

export default function Publications() {
  const [publications, setPublications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDocs = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "publications"));
        const firestoreData = querySnapshot.docs.map(doc => ({ 
          id: doc.id, 
          ...doc.data(), 
          cover: doc.data().cover || IMAGE_TEST_PAR_DEFAUT,
          date: doc.data().date || "Date inconnue",
          dateSort: doc.data().dateSort || "2025-01-01"
        }));
        
        const combined = [...DOCUMENTS_STATIQUES, ...firestoreData];
        // Tri automatique décroissant (du plus récent au plus ancien)
        combined.sort((a, b) => new Date(b.dateSort) - new Date(a.dateSort));
        
        setPublications(combined);
      } catch (e) { 
        const sortedStatiques = [...DOCUMENTS_STATIQUES].sort((a, b) => new Date(b.dateSort) - new Date(a.dateSort));
        setPublications(sortedStatiques); 
      } finally { 
        setLoading(false); 
      }
    };
    fetchDocs();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-zinc-950 transition-colors duration-300">
        <p className="text-gray-500 dark:text-gray-400 font-medium animate-pulse">Chargement des publications...</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-zinc-950 min-h-screen transition-colors duration-300">
      
      {/* HERO SECTION */}
      <div className="relative w-full h-[380px] bg-cover bg-center flex items-center" style={{ backgroundImage: "url('https://aebc-cdn.b-cdn.net/biodiversite/surya-deepak-bEEg_5WAX0k-unsplash.jpg')" }}>
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative container-custom text-white">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">Publications</h1>
          <p className="text-lg opacity-90 max-w-2xl">Explorez les publications majeures consacrées au Bassin du Congo : rapports stratégiques, études scientifiques et documents officiels provenant d’acteurs reconnus de la région. Une veille documentaire essentielle pour comprendre ses enjeux environnementaux et socio‑écologiques.</p>
        </div>
      </div>

      {/* GRILLE DES CARTES DE PUBLICATIONS */}
      <section className="py-16">
        <div className="container-custom grid grid-cols-1 md:grid-cols-3 gap-8">
          {publications.map((pub) => (
            <div 
              key={pub.id} 
              // Contours gris neutres restaurés (border-gray-200 et dark:border-zinc-800)
              className="border border-gray-200 dark:border-zinc-800 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 bg-gray-50 dark:bg-zinc-900 p-6 flex flex-col"
            >
              {/* Cadre abritant le document configuré en gris foncé (dark:bg-zinc-800) */}
              <div className="w-full h-72 bg-gray-200 dark:bg-zinc-800 rounded-lg overflow-hidden mb-5 border border-gray-100 dark:border-zinc-700/50 flex items-center justify-center p-4">
                <img 
                  src={pub.cover} 
                  alt={pub.title} 
                  className="max-w-full max-h-full object-contain hover:scale-102 transition duration-300 shadow-md" 
                />
              </div>

              {/* Type de publication */}
              <span className="text-[10px] font-black text-primary dark:text-secondary uppercase mb-1 tracking-widest">
                {pub.type}
              </span>

              {/* Date d'affichage */}
              <span className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                {pub.date}
              </span>

              {/* Titre */}
              <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-6 leading-tight flex-grow">
                {pub.title}
              </h3>
              
              {/* Bouton d'action */}
              <Link 
                to={`/publication/view/${pub.id}`} 
                className="w-full block text-center px-4 py-3 bg-primary dark:bg-secondary text-white dark:text-dark rounded-lg text-xs font-semibold uppercase tracking-widest hover:bg-primary-light dark:hover:bg-secondary/90 transition shadow-sm"
              >
                Consulter le document
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}