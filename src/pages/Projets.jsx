import React, { useState, useMemo } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

// 1. Configuration des couleurs synchronisées
// Le gris "À venir" est désormais identique au fond des barres de progression (Gray 200)
const COULEURS = {
  Terminé: "#22C55E",    // Vert
  "En cours": "#EAB308", // Jaune
  Suspendu: "#EF4444",   // Rouge
  "À venir": "#E5E7EB",  // Gris pâle (Harmonisé avec l'UI)
};

export default function Projets() {
  // 2. Les 6 Secteurs d'intervention (Piliers)
  const SECTEURS = [
    { id: "Climat", label: "Climat", icon: "https://aebc-cdn.b-cdn.net/biodiversite/climat-change.png", desc: "RÉSILIENCE & FINANCE CARBONE" },
    { id: "Biodiversité", label: "Biodiversité", icon: "https://aebc-cdn.b-cdn.net/biodiversite/biodiversit%C3%A9.png", desc: "PROTECTION DES ÉCOSYSTÈMES" },
    { id: "Inclusion", label: "Inclusion", icon: "https://aebc-cdn.b-cdn.net/biodiversite/inclusion-sociale.png", desc: "DROITS & GENRE" },
    { id: "Eau", label: "Eau", icon: "https://aebc-cdn.b-cdn.net/Logo-Banni%C3%A8re/eau-logo.png", desc: "RESSOURCES HYDRIQUES" },
    { id: "Tourbières", label: "Tourbières", icon: "https://aebc-cdn.b-cdn.net/Logo-Banni%C3%A8re/Tourbi%C3%A8res-logo.png", desc: "CONSERVATION DU CARBONE" },
    { id: "Agroécologie", label: "Agroécologie", icon: "https://aebc-cdn.b-cdn.net/Logo-Banni%C3%A8re/Agro%C3%A9cologie-logo.png", desc: "AGRICULTURE DURABLE" },
  ];

  // 3. Base de données
  const projetsData = [
    {
      id: 1,
      titre: "Reboisement et Plantation communautaire",
      periode: "Janvier 2022 – Juin 2022",
      description: "Restauration des écosystèmes dégradés par la plantation d'espèces locales avec l'implication des populations.",
      statut: "Terminé",
      progression: 100,
      secteur: "Biodiversité",
      image: "https://aebc-cdn.b-cdn.net/Reboisement/Plantation_01.webp",
    },
    {
      id: 2,
      titre: "Sensibilisation à la loi n°5 (Peuples Autochtones)",
      periode: "Mars 2022 – Août 2022",
      description: "Campagne nationale de vulgarisation pour la reconnaissance des droits et l'inclusion des peuples autochtones.",
      statut: "Terminé",
      progression: 100,
      secteur: "Inclusion",
      image: "https://aebc-cdn.b-cdn.net/Reboisement/pexels-safari-consoler-3290243-10988628.jpg",
    },
    {
      id: 3,
      titre: "Communication environnementale Bassin du Congo",
      periode: "2025 – 2026",
      description: "Mise en place d'un réseau de communication pour la protection du second poumon vert de la planète.",
      statut: "En cours",
      progression: 45,
      secteur: "Climat",
      image: "https://aebc-cdn.b-cdn.net/Reboisement/pexels-frostee-lens-ug-2150016714-36185281.jpg",
    },
    {
      id: 4,
      titre: "Station d'épuration pilote - Brazzaville",
      periode: "2023 - 2024",
      description: "Projet temporairement arrêté en attente de validation technique supplémentaire sur le site.",
      statut: "Suspendu",
      progression: 15,
      secteur: "Eau",
      image: "https://aebc-cdn.b-cdn.net/Reboisement/reboisement_03.jpg",
    },
    {
      id: 5,
      titre: "Sauvegarde des Tourbières primaires",
      periode: "2027 – 2028",
      description: "Projet validé visant à sanctuariser les zones de tourbières riches en carbone.",
      statut: "À venir",
      progression: 0,
      secteur: "Tourbières",
      image: "https://aebc-cdn.b-cdn.net/Reboisement/pexels-kwakugriffn-14554004.jpg",
    },
    {
      id: 6,
      titre: "Initiative Agroforesterie durable",
      periode: "2026",
      description: "Accompagnement vers des pratiques agricoles protectrices de la canopée.",
      statut: "En cours",
      progression: 30,
      secteur: "Agroécologie",
      image: "https://aebc-cdn.b-cdn.net/Reboisement/pexels-jose-carlos-alexandre-2433751-26974534.jpg",
    },
  ];

  const [filtreStatut, setFiltreStatut] = useState("Tous");
  const [filtreSecteur, setFiltreSecteur] = useState("Tous");

  const filteredProjets = useMemo(() => {
    return projetsData.filter((p) => {
      const matchStatut = filtreStatut === "Tous" || p.statut === filtreStatut;
      const matchSecteur = filtreSecteur === "Tous" || p.secteur === filtreSecteur;
      return matchStatut && matchSecteur;
    });
  }, [filtreStatut, filtreSecteur]);

  const stats = {
    termines: filteredProjets.filter(p => p.statut === "Terminé").length,
    enCours: filteredProjets.filter(p => p.statut === "En cours").length,
    suspendus: filteredProjets.filter(p => p.statut === "Suspendu").length,
    avenir: filteredProjets.filter(p => p.statut === "À venir").length,
  };

  const pieData = {
    labels: ["Terminés", "En cours", "Suspendus", "À venir"],
    datasets: [{
      data: [stats.termines, stats.enCours, stats.suspendus, stats.avenir],
      backgroundColor: [COULEURS.Terminé, COULEURS["En cours"], COULEURS.Suspendu, COULEURS["À venir"]],
      borderWidth: 1,
      borderColor: "#ffffff"
    }]
  };

  return (
    <div className="bg-white">
      {/* HERO SECTION */}
      <div
        className="relative w-full h-[410px] bg-cover bg-center flex items-center"
        style={{ backgroundImage: "url('https://aebc-cdn.b-cdn.net/biodiversite/climat-biodiversit%C3%A9-inclusion-eau-tourbi%C3%A8re-agroecologie.png')" }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative container-custom">
          <h1 className="text-4xl font-bold text-white mb-4 drop-shadow-lg">Dashboard des Projets</h1>
          <p className="text-white text-lg leading-relaxed max-w-3xl drop-shadow">
            Suivi institutionnel de l'état d'avancement des programmes de l'AEBC.
          </p>
        </div>
      </div>

      {/* DASHBOARD STATS */}
      <section className="py-12 bg-gray-50 border-b border-gray-200">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            
            <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm">
              <h3 className="text-xl font-bold text-primary mb-6 uppercase text-sm tracking-widest">États des dossiers</h3>
              <div className="space-y-4">
                {[
                  { label: "Terminé", count: stats.termines, color: COULEURS.Terminé },
                  { label: "En cours", count: stats.enCours, color: COULEURS["En cours"] },
                  { label: "Suspendu", count: stats.suspendus, color: COULEURS.Suspendu },
                  { label: "À venir", count: stats.avenir, color: COULEURS["À venir"] },
                ].map((item, i) => (
                  <div key={i} className="flex justify-between items-center border-b border-gray-50 pb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                      <span className="text-gray-600 font-medium">{item.label}</span>
                    </div>
                    <span className="text-xl font-bold" style={{ color: item.color === "#E5E7EB" ? "#9ca3af" : item.color }}>{item.count}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm flex flex-col items-center">
              <div className="w-52 h-52">
                <Pie data={pieData} options={{ plugins: { legend: { display: false } }, maintainAspectRatio: false }} />
              </div>
              <div className="flex gap-4 mt-6 flex-wrap justify-center">
                 {Object.entries(COULEURS).map(([label, color]) => (
                   <div key={label} className="flex items-center gap-1.5">
                     <div className="w-2 h-2 rounded-full border border-gray-300" style={{ backgroundColor: color }}></div>
                     <span className="text-[10px] font-bold uppercase text-gray-500">{label}</span>
                   </div>
                 ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTEURS ENCADRÉS */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <h2 className="text-2xl font-bold text-primary mb-10 tracking-wide text-center uppercase text-sm">Piliers d'intervention</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {SECTEURS.map((s) => (
              <button
                key={s.id}
                onClick={() => setFiltreSecteur(s.id === filtreSecteur ? "Tous" : s.id)}
                className={`flex flex-col items-center p-5 rounded-xl border transition-all duration-300 text-center ${
                  filtreSecteur === s.id 
                  ? "border-primary bg-primary/5 shadow-md scale-105" 
                  : "border-gray-200 bg-gray-50 hover:bg-white hover:border-primary/50"
                }`}
              >
                <img src={s.icon} alt={s.label} className="w-14 h-14 object-contain mb-3" />
                <h4 className="font-bold text-gray-900 text-[11px] mb-1 uppercase">{s.label}</h4>
                <p className="text-[9px] text-gray-400 leading-tight font-medium uppercase">{s.desc}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FILTRES STATUT */}
      <section className="pb-10 text-center">
        <div className="inline-flex gap-2 bg-gray-100 p-1.5 rounded-xl">
          {["Tous", "Terminé", "En cours", "Suspendu", "À venir"].map((cat) => (
            <button
              key={cat}
              onClick={() => setFiltreStatut(cat)}
              className={`px-5 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${
                filtreStatut === cat ? "bg-white text-primary shadow-sm" : "text-gray-500 hover:text-gray-800"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* LISTE PROJETS (FORMAT ACCUEIL) */}
      <section className="pb-20">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {filteredProjets.map((p) => (
              <div key={p.id} className="border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition bg-gray-50 p-6 flex flex-col">
                <div className="w-full h-48 bg-gray-200 rounded-lg overflow-hidden mb-4 relative">
                  <img src={p.image} alt={p.titre} className="w-full h-full object-cover" />
                  <span 
                    className="absolute top-3 right-3 px-2 py-1 rounded text-[9px] font-black uppercase tracking-widest text-white shadow"
                    style={{ 
                      backgroundColor: COULEURS[p.statut],
                      color: p.statut === "À venir" ? "#6b7280" : "white" 
                    }}
                  >
                    {p.statut}
                  </span>
                </div>

                <h3 className="text-xl font-semibold text-gray-900 mb-1 line-clamp-2">{p.titre}</h3>
                <span className="text-[10px] text-primary font-black uppercase tracking-widest">{p.secteur} — {p.periode}</span>
                <p className="text-gray-600 text-sm leading-relaxed mt-3 mb-6 flex-grow">{p.description}</p>

                <div className="mt-auto">
                  <div className="flex justify-between text-[9px] font-black uppercase text-gray-400 mb-1">
                    <span>Avancement</span>
                    <span>{p.progression}%</span>
                  </div>
                  <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden shadow-inner">
                    <div 
                      className="h-full transition-all duration-1000"
                      style={{ 
                        width: `${p.progression}%`,
                        backgroundColor: COULEURS[p.statut] 
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}