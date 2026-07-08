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
    date: "21 decembre 2023",
    dateSort: "2023-12-21" // Utilisé pour le tri automatique
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
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-500 font-medium">Chargement des publications...</p>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <div className="relative w-full h-[380px] bg-cover bg-center flex items-center" style={{ backgroundImage: "url('https://aebc-cdn.b-cdn.net/biodiversite/elephanto.jpeg')" }}>
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative container-custom text-white">
          <h1 className="text-4xl font-bold mb-4 uppercase tracking-tighter">Publications</h1>
          <p className="text-lg opacity-90 max-w-2xl">Documents officiels et rapports stratégiques de l'AEBC.</p>
        </div>
      </div>

      <section className="py-16">
        <div className="container-custom grid grid-cols-1 md:grid-cols-3 gap-8">
          {publications.map((pub) => (
            <div key={pub.id} className="border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition bg-gray-50 p-6 flex flex-col">
              <div className="w-full h-72 bg-gray-200 rounded-lg overflow-hidden mb-5 border border-gray-100 flex items-center justify-center p-4">
                <img src={pub.cover} alt={pub.title} className="max-w-full max-h-full object-contain hover:scale-105 transition duration-500 shadow-md" />
              </div>
              <span className="text-[10px] font-black text-primary uppercase mb-1 tracking-widest">{pub.type}</span>
              {/* Date d'affichage ajoutée */}
              <span className="text-xs text-gray-500 mb-3">{pub.date}</span>
              <h3 className="text-lg font-bold text-gray-900 mb-6 leading-tight flex-grow">{pub.title}</h3>
              
              <Link 
                to={`/publication/view/${pub.id}`} 
                className="w-full block text-center px-4 py-3 bg-primary text-white rounded-lg text-xs font-normal uppercase tracking-widest hover:bg-primary/90 transition shadow-sm"
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