// src/pages/PublicationViewer.jsx
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { db } from "../services/firebase";
import { doc, getDoc } from "firebase/firestore";

// Les IDs et liens correspondent exactement à ceux définis dans Publications.jsx
const DOCUMENTS_STATIQUES = [
  { 
    id: "1", 
    title: "Rapport Exécutif Bassin du Congo - Vol 2", 
    fileUrl: "[LIEN_DU_DOCUMENT_PDF_2_ICI]", 
    type: "Rapport",
    date: "25 mai 2026"
  },
  { 
    id: "2", 
    title: "Les Droits des Peuples Autochtones", 
    fileUrl: "[LIEN_DU_DOCUMENT_PDF_3_ICI]", 
    type: "Légal",
    date: "12 mai 2026"
  },
  { 
    id: "3", 
    title: "Décret Création Comité National (MAB)", 
    fileUrl: "[LIEN_DU_DOCUMENT_PDF_4_ICI]", 
    type: "Décret",
    date: "25 avril 2025"
  },
  { 
    id: "4", 
    title: "État des lieux du Bassin du Congo", 
    fileUrl: "[LIEN_DU_DOCUMENT_PDF_5_ICI]", 
    type: "Étude",
    date: "10 janvier 2025"
  },
  { 
    id: "5", 
    title: "Rapport d'Évaluation de l'Accès à l'Eau Potable dans le Bassin du Congo", 
    fileUrl: "https://aebc-cdn.b-cdn.net/aebc-publication/rapports/CG-Rapport-d-Evaluation-Access-EauPotable.pdf", 
    type: "Rapport",
    date: "21 décembre 2023"
  }
];

export default function PublicationViewer() {
  const { id } = useParams();
  const [pub, setPub] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Recherche par ID dans les documents statiques
    const staticDoc = DOCUMENTS_STATIQUES.find((d) => d.id === id);
    if (staticDoc) {
      setPub(staticDoc);
      setLoading(false);
    } else {
      // 2. Recherche sur Firebase Firestore
      const fetchFirestoreDoc = async () => {
        try {
          const docRef = doc(db, "publications", id);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setPub({
              id: docSnap.id,
              title: docSnap.data().title || "Document officiel",
              fileUrl: docSnap.data().fileUrl || "",
              type: docSnap.data().type || "Publication",
              cover: docSnap.data().cover || "",
              date: docSnap.data().date || "Date inconnue"
            });
          }
        } catch (error) {
          console.error("Erreur de récupération du document:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchFirestoreDoc();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-500 font-medium">Chargement du document...</p>
      </div>
    );
  }

  // AFFICHAGE SI LE DOCUMENT N'EST PAS TROUVÉ (Bouton retour propre)
  if (!pub) {
    return (
      <div className="container-custom py-16 text-center">
        <h2 className="text-2xl font-bold text-primary mb-2">Publication introuvable</h2>
        <p className="text-gray-500 mb-6">Nous n'avons trouvé aucun document correspondant à cet identifiant.</p>
        <Link to="/publications" className="text-primary underline font-normal text-sm">
          ← Retour aux publications
        </Link>
      </div>
    );
  }

  // RENDU NORMAL DE LA PAGE DE VISUALISATION
  return (
    <article className="bg-white pb-20">
      
      {/* En-tête simple avec Titre (Calqué sur le style ActualiteDetail) */}
      <div className="container-custom py-12 border-b border-gray-100">
        <Link to="/publications" className="text-primary font-normal mb-4 inline-block hover:underline">
          ← Retour aux publications
        </Link>
        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
          {pub.title}
        </h1>
        <div className="flex items-center gap-4 mt-4">
          <span className="text-xs font-normal uppercase tracking-widest text-primary bg-primary/10 px-3 py-1.5 rounded-full">
            {pub.type}
          </span>
          <span className="text-gray-300">|</span>
          {/* Correction de pub.periode en pub.date pour l'affichage de la date */}
          <span className="text-gray-500 font-semibold">{pub.date}</span>
        </div>
      </div>

      {/* Contenu et cadre de lecture de 850px */}
      <div className="container-custom mt-8">
        <div className="flex flex-col items-center">
          
          <p className="text-gray-600 text-sm mb-8 leading-relaxed max-w-3xl text-center">
            Ce document de l'AEBC est mis à votre disposition pour le suivi et la mise en œuvre des politiques environnementales dans le Bassin du Congo.
          </p>

          {/* SÉCURISATION : Si le lien du document PDF est valide */}
          {pub.fileUrl && !pub.fileUrl.includes("[LIEN") ? (
            <div className="w-full flex flex-col items-center gap-8">
              
              {/* Bouton ouvrir en plein écran / Télécharger (Style normal, non gras) */}
              <a 
                href={pub.fileUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-block px-8 py-3.5 bg-primary text-white rounded-lg text-xs font-normal uppercase tracking-widest hover:bg-primary/90 transition shadow-md"
              >
                Ouvrir le document PDF
              </a>

              {/* Cadre de lecture de hauteur agrandie à 850px et repositionné */}
              <div className="w-full h-[850px] border border-gray-200 rounded-2xl overflow-hidden shadow-inner bg-gray-50 mt-4">
                <iframe
                  src={`${pub.fileUrl}#toolbar=1`}
                  title={pub.title}
                  className="w-full h-full border-none"
                />
              </div>

            </div>
          ) : (
            // Message si le fichier PDF n'est pas encore lié (Bouton retour propre)
            <div className="bg-amber-50 border border-amber-200 text-amber-800 px-6 py-4 rounded-xl text-sm max-w-lg mx-auto text-center">
              Le fichier PDF de cette publication n'est pas encore configuré en téléchargement.
            </div>
          )}
        </div>
      </div>

    </article>
  );
}