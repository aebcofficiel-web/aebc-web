// src/pages/Publications.jsx
import React, { useEffect, useState } from "react";
import { db } from "../services/firebase";
import { collection, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";

const IMAGE_TEST = "https://aebc-cdn.b-cdn.net/aebc-publication/rapports/rapport-2025-sur-le-Bassin-du-Congo.png";

const DOCUMENTS_STATIQUES = [
  { id: "1", title: "Rapport Exécutif Bassin du Congo - Vol 1", fileUrl: "https://aebc-cdn.b-cdn.net/aebc-publication/rapports/2025-congo-basin-executive-summary-fr%20(1).pdf", type: "Rapport", cover: IMAGE_TEST },
  { id: "2", title: "Rapport Exécutif Bassin du Congo - Vol 2", fileUrl: "https://aebc-cdn.b-cdn.net/aebc-publication/rapports/2025-congo-basin-executive-summary-fr%20(2).pdf", type: "Rapport", cover: IMAGE_TEST },
  { id: "3", title: "Les Droits des Peuples Autochtones", fileUrl: "https://aebc-cdn.b-cdn.net/aebc-publication/rapports/Les_droits_des_peuples_autochtones_-_R%C3%A9publique_du_Congo.pdf", type: "Légal", cover: IMAGE_TEST },
  { id: "4", title: "Décret Création Comité National (MAB)", fileUrl: "https://aebc-cdn.b-cdn.net/aebc-publication/rapports/Decret_creation_comite_national_homme_biosphere_MAB.pdf", type: "Décret", cover: IMAGE_TEST },
  { id: "5", title: "État des lieux du Bassin du Congo", fileUrl: "https://aebc-cdn.b-cdn.net/aebc-publication/rapports/Page-BassinCongo-FR.pdf", type: "Étude", cover: IMAGE_TEST },
];

export default function Publications() {
  const [publications, setPublications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDocs = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "publications"));
        const firestoreData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data(), cover: doc.data().cover || IMAGE_TEST }));
        setPublications([...DOCUMENTS_STATIQUES, ...firestoreData]);
      } catch (e) { setPublications(DOCUMENTS_STATIQUES); }
      finally { setLoading(false); }
    };
    fetchDocs();
  }, []);

  return (
    <div className="bg-white min-h-screen">
      <div className="relative w-full h-[380px] bg-cover bg-center flex items-center" style={{ backgroundImage: "url('https://aebc-cdn.b-cdn.net/biodiversite/nzaou.jpg')" }}>
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
              <span className="text-[10px] font-black text-primary uppercase mb-2 tracking-widest">{pub.type}</span>
              <h3 className="text-lg font-bold text-gray-900 mb-6 leading-tight flex-grow">{pub.title}</h3>
              <Link to={`/publication/view/${encodeURIComponent(pub.fileUrl)}`} className="w-full block text-center px-4 py-3 bg-primary text-white rounded-lg text-xs font-black uppercase tracking-widest hover:bg-primary/90 transition shadow-sm">
                Consulter le document
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}