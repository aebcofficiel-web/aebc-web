// src/pages/Projets.jsx
import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { projets } from "../data/projets"; 
import Tableau6M from "../components/ui/Tableau6M";

ChartJS.register(ArcElement, Tooltip, Legend);

// 1. Configuration des couleurs synchronisées
const COULEURS = {
  Terminé: "#22C55E",    // Vert
  "En cours": "#EAB308", // Jaune
  Suspendu: "#EF4444",   // Rouge
  "À venir": "#E5E7EB",  // Gris pâle
};

// 2. Les 6 Secteurs d'intervention (Piliers)
const SECTEURS = [
  { id: "Climat", label: "Climat", icon: "https://aebc-cdn.b-cdn.net/biodiversite/climat-change.png", desc: "RÉSILIENCE & FINANCE CARBONE" },
  { id: "Biodiversité", label: "Biodiversité", icon: "https://aebc-cdn.b-cdn.net/biodiversite/biodiversit%C3%A9.png", desc: "PROTECTION DES ÉCOSYSTÈMES" },
  { id: "Inclusion", label: "Inclusion", icon: "https://aebc-cdn.b-cdn.net/biodiversite/inclusion-sociale.png", desc: "DROITS & GENRE" },
  { id: "Eau", label: "Eau", icon: "https://aebc-cdn.b-cdn.net/Logo-Banni%C3%A8re/eau-logo.png", desc: "RESSOURCES HYDRIQUES" },
  { id: "Tourbières", label: "Tourbières", icon: "https://aebc-cdn.b-cdn.net/Logo-Banni%C3%A8re/Tourbi%C3%A8res-logo.png", desc: "CONSERVATION DU CARBONE" },
  { id: "Agroécologie", label: "Agroécologie", icon: "https://aebc-cdn.b-cdn.net/Logo-Banni%C3%A8re/Agro%C3%A9cologie-logo.png", desc: "AGRICULTURE DURABLE" },
];

export default function Projets() {
  const safeProjets = useMemo(() => projets || [], []);

  // États pour les filtres et la pagination
  const [filtreStatut, setFiltreStatut] = useState("Tous");
  const [filtreSecteur, setFiltreSecteur] = useState("Tous");
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 9;

  // Fonctions de mise à jour des filtres (réinitialisent aussi la page à 1)
  const handleFiltreStatut = (statut) => {
    setFiltreStatut(statut);
    setCurrentPage(1);
  };

  const handleFiltreSecteur = (secteur) => {
    setFiltreSecteur(secteur);
    setCurrentPage(1);
  };

  // 1. Filtrage global du portefeuille
  const filteredProjets = useMemo(() => {
    return safeProjets.filter((p) => {
      const matchStatut = filtreStatut === "Tous" || p.statut === filtreStatut;
      const matchSecteur = filtreSecteur === "Tous" || p.secteur === filtreSecteur;
      return matchStatut && matchSecteur;
    });
  }, [safeProjets, filtreStatut, filtreSecteur]);

  // 2. Calcul des statistiques du dashboard basé sur le filtre global
  const stats = useMemo(() => {
    return {
      termines: filteredProjets.filter((p) => p.statut === "Terminé").length,
      enCours: filteredProjets.filter((p) => p.statut === "En cours").length,
      suspendus: filteredProjets.filter((p) => p.statut === "Suspendu").length,
      avenir: filteredProjets.filter((p) => p.statut === "À venir").length,
    };
  }, [filteredProjets]);

  // 3. Données du graphique basées sur le filtre global
  const pieData = useMemo(() => {
    return {
      labels: ["Terminés", "En cours", "Suspendus", "À venir"],
      datasets: [
        {
          data: [stats.termines, stats.enCours, stats.suspendus, stats.avenir],
          backgroundColor: [COULEURS.Terminé, COULEURS["En cours"], COULEURS.Suspendu, COULEURS["À venir"]],
          borderWidth: 1,
          borderColor: "#ffffff",
        },
      ],
    };
  }, [stats]);

  // 4. Découpage pour la pagination des cartes uniquement (9 par page)
  const totalPages = Math.ceil(filteredProjets.length / cardsPerPage);
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentProjets = useMemo(() => {
    return filteredProjets.slice(indexOfFirstCard, indexOfLastCard);
  }, [filteredProjets, indexOfFirstCard, indexOfLastCard]);

  // Fonction de changement de page avec transition et défilement fluide
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    
    setTimeout(() => {
      const element = document.getElementById("projets-grid-start");
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }, 40);
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Styles d'animation d'apparition fluide des cartes */}
      <style>{`
        @keyframes customFadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: customFadeIn 0.4s ease-out forwards;
        }
      `}</style>

      {/* HERO SECTION */}
      <div 
        className="relative w-full h-[380px] bg-cover bg-center flex items-center" 
        style={{ backgroundImage: "url('https://aebc-cdn.b-cdn.net/biodiversite/climat-biodiversit%C3%A9-inclusion-eau-tourbi%C3%A8re-agroecologie.png')" }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative container-custom text-white">
          <h1 className="text-4xl font-bold mb-4 uppercase tracking-tighter">Projets & Programmes</h1>
          <p className="text-lg opacity-90 max-w-2xl">
            Suivi opérationnel et état d'avancement des initiatives d'impact de l'AEBC.
          </p>
        </div>
      </div>

      {/* DASHBOARD STATS */}
      <section className="py-12 bg-gray-50 border-b border-gray-200">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            
            {/* Boîte d'états des dossiers */}
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
                    <span className="text-xl font-bold" style={{ color: item.color === "#E5E7EB" ? "#9ca3af" : item.color }}>
                      {item.count}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Boîte Graphique circulaire */}
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

      {/* Point d'ancrage pour le défilement fluide lors de la navigation des pages */}
      <div id="projets-grid-start" className="scroll-mt-20"></div>

      {/* SECTEURS ENCADRÉS (PILIERS) */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <h2 className="text-2xl font-bold text-primary mb-10 tracking-wide text-center uppercase text-sm">
            Piliers d'intervention
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {SECTEURS.map((s) => {
              const isSelected = filtreSecteur === s.id;
              return (
                <button
                  key={s.id}
                  onClick={() => handleFiltreSecteur(s.id)}
                  className={`flex flex-col items-center p-5 rounded-xl border text-center transition-all duration-300 ease-in-out transform hover:shadow-md active:scale-95 ${
                    isSelected 
                      ? "border-primary bg-primary/5 shadow-md scale-105" 
                      : "border-gray-200 bg-gray-50 hover:bg-white hover:border-primary/50"
                  }`}
                >
                  <img src={s.icon} alt={s.label} className="w-14 h-14 object-contain mb-3" />
                  <h4 className="font-bold text-gray-900 text-[11px] mb-1 uppercase">{s.label}</h4>
                  <p className="text-[9px] text-gray-400 leading-tight font-medium uppercase">{s.desc}</p>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* FILTRES STATUT */}
      <section className="pb-10 text-center">
        <div className="inline-flex gap-2 bg-gray-100 p-1.5 rounded-xl border border-gray-200/50">
          {["Tous", "Terminé", "En cours", "Suspendu", "À venir"].map((cat) => {
            const isActive = filtreStatut === cat;
            return (
              <button
                key={cat}
                onClick={() => handleFiltreStatut(cat)}
                className={`px-5 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all duration-300 ease-in-out transform active:scale-95 ${
                  isActive 
                    ? "bg-white text-primary shadow-sm scale-102" 
                    : "text-gray-500 hover:text-gray-800 hover:bg-white/40"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </section>

      {/* LISTE PROJETS */}
      <section className="pb-20">
        <div className="container-custom">
          {filteredProjets.length === 0 ? (
            <div className="text-center py-12 text-gray-500">Aucun projet ne correspond à ces critères.</div>
          ) : (
            <div>
              {/* Grille avec clé de transition basée sur currentPage */}
              <div 
                key={currentPage} 
                className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-fade-in"
              >
                {currentProjets.map((p) => (
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
                    <span className="text-[10px] text-primary font-black uppercase tracking-widest">
                      {p.secteur} — {p.periode}
                    </span>
                    <p className="text-gray-600 text-sm leading-relaxed mt-3 mb-6 flex-grow line-clamp-3">
                      {p.description}
                    </p>

                    <div className="mb-6">
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

                    <Link 
                      to={`/projets/${p.id}`} 
                      className="px-4 py-2 bg-primary text-white text-center rounded-lg shadow hover:bg-primary/90 transition text-sm font-bold w-full md:w-max mt-auto block"
                    >
                      Lire plus
                    </Link>
                  </div>
                ))}
              </div>

              {/* Barre de navigation paginée */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-16 border-t border-gray-100 pt-8">
                  
                  {/* Bouton Précédent */}
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 border rounded-lg text-sm font-semibold transition ${
                      currentPage === 1
                        ? "border-gray-100 text-gray-300 cursor-not-allowed bg-gray-50"
                        : "border-gray-200 text-gray-700 hover:bg-gray-50 hover:text-primary hover:border-primary/30"
                    }`}
                  >
                    Précédent
                  </button>

                  {/* Boutons numériques */}
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`w-10 h-10 flex items-center justify-center rounded-lg text-sm font-bold transition ${
                        currentPage === page
                          ? "bg-primary text-white shadow-md shadow-primary/20"
                          : "border border-gray-200 text-gray-700 hover:bg-gray-50 hover:text-primary hover:border-primary/30"
                      }`}
                    >
                      {page}
                    </button>
                  ))}

                  {/* Bouton Suivant */}
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 border rounded-lg text-sm font-semibold transition ${
                      currentPage === totalPages
                        ? "border-gray-100 text-gray-300 cursor-not-allowed bg-gray-50"
                        : "border-gray-200 text-gray-700 hover:bg-gray-50 hover:text-primary hover:border-primary/30"
                    }`}
                  >
                    Suivant
                  </button>
                  
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* SECTION DU TABLEAU SYNTHÉTIQUE DES 6M */}
      <section className="pb-20 bg-white">
        <div className="container-custom">
          <Tableau6M />
        </div>
      </section>
    </div>
  );
}