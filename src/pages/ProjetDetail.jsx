// src/pages/ProjetDetail.jsx
import { useParams, Link } from "react-router-dom";
import { projets } from "../data/projets";

const COULEURS = {
  Terminé: "#22C55E",
  "En cours": "#EAB308",
  Suspendu: "#EF4444",
  "À venir": "#9CA3AF",
};

export default function ProjetDetail() {
  const { id } = useParams();
  const projet = projets.find((p) => p.id === Number(id));

  if (!projet) {
    return (
      <div className="container-custom py-16 text-center">
        <h2 className="text-2xl font-bold text-primary">Projet introuvable</h2>
        <Link to="/projets" className="text-primary underline mt-4 inline-block">Retour aux projets</Link>
      </div>
    );
  }

  return (
    <article className="bg-white pb-20 min-h-screen">
      {/* En-tête de retour */}
      <div className="container-custom py-8">
        <Link to="/projets" className="text-primary font-medium mb-4 inline-block hover:underline">
          ← Retour aux projets
        </Link>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mt-2">
          <div>
            <span className="text-xs font-black uppercase tracking-widest text-primary bg-primary/10 px-3 py-1.5 rounded-full">
              {projet.secteur}
            </span>
            <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight mt-3">
              {projet.titre}
            </h1>
            <p className="text-gray-500 font-semibold mt-2">{projet.periode}</p>
          </div>

          <div className="flex flex-col items-start md:items-end gap-2">
            <span 
              className="px-3 py-1.5 rounded-full text-xs font-black uppercase tracking-widest text-white shadow-sm"
              style={{ backgroundColor: COULEURS[projet.statut] }}
            >
              Statut : {projet.statut}
            </span>
            <div className="w-full md:w-48">
              <div className="flex justify-between text-[10px] font-bold text-gray-400 mb-1">
                <span>Progression</span>
                <span>{projet.progression}%</span>
              </div>
              <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                <div 
                  className="h-full transition-all duration-1000"
                  style={{ 
                    width: `${projet.progression}%`,
                    backgroundColor: COULEURS[projet.statut] 
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bannière Ambilight floutée (Le style que vous appréciez) */}
      <div className="container-custom mb-12">
        <div className="relative w-full h-[300px] md:h-[500px] rounded-2xl overflow-hidden shadow-lg bg-black flex items-center justify-center">
          <div 
            className="absolute inset-0 bg-cover bg-center blur-xl opacity-40 scale-110 pointer-events-none"
            style={{ backgroundImage: `url(${projet.image})` }}
          ></div>
          <img
            src={projet.image}
            alt={projet.titre}
            className="relative z-10 max-w-full max-h-full object-contain"
          />
        </div>
      </div>

      {/* Contenu et Démonstration des résultats */}
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Bloc de Gauche : Description Générale & Justification Institutionnelle */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-3 border-b pb-2">Description Générale</h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                {projet.description}
              </p>
            </div>

            <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-primary mb-3 border-b border-primary/10 pb-2">
                Justification & Évaluation
              </h3>
              <p className="text-gray-800 text-sm leading-relaxed font-medium">
                {projet.justificatif}
              </p>
            </div>
          </div>

          {/* Bloc de Droite : Méthode des 6M quantifiée */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Méthode 6M — Paramètres d'évaluation</h3>
            <p className="text-gray-500 text-sm mb-6">
              Justificatifs techniques basés sur les indicateurs de performance structurels et institutionnels.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(projet.sixM).map(([key, value]) => (
                <div 
                  key={key} 
                  className="border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md transition duration-300 bg-gray-50/50 flex flex-col"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-black text-sm uppercase">
                      {key.charAt(0)}
                    </span>
                    <h4 className="text-base font-extrabold text-gray-800 uppercase tracking-wider capitalize">
                      {key}
                    </h4>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line flex-grow">
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </article>
  );
}