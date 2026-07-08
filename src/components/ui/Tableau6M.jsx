// src/components/ui/Tableau6M.jsx
import { useMemo } from "react";
import { projets } from "../../data/projets"; // Chemin corrigé

// Constante de configuration pour associer les couleurs et libellés aux secteurs
const SECTOR_METADATA = {
  "Biodiversité": { prefix: "1. Biodiversité", couleur: "border-l-[#22C55E]" },
  "Inclusion": { prefix: "2. Inclusion", couleur: "border-l-[#3B82F6]" },
  "Climat": { prefix: "3. Climat", couleur: "border-l-[#10B981]" },
  "Eau": { prefix: "4. Eau", couleur: "border-l-[#EF4444]" },
  "Tourbières": { prefix: "5. Tourbières", couleur: "border-l-[#8B5CF6]" },
  "Agroécologie": { prefix: "6. Agroécologie", couleur: "border-l-[#F59E0B]" }
};

export default function Tableau6M() {
  // Génération dynamique et sécurisée de la matrice à partir de projets.js
  const tableData = useMemo(() => {
    const safeProjets = projets || [];
    return safeProjets.map((p) => {
      const meta = SECTOR_METADATA[p.secteur] || { prefix: p.secteur, couleur: "border-l-gray-300" };
      return {
        id: p.id,
        pilier: meta.prefix,
        projet: p.titre,
        couleur: meta.couleur,
        m: {
          matiere: p.sixM?.matiere || "Non renseigné",
          milieu: p.sixM?.milieu || "Non renseigné",
          methode: p.sixM?.methode || "Non renseigné",
          // Gestion sécurisée des apostrophes
          "main-d'oeuvre": p.sixM?.["main-d'oeuvre"] || p.sixM?.["main-d’oeuvre"] || "Non renseigné",
          materiel: p.sixM?.materiel || "Non renseigné",
          mesures: p.sixM?.mesures || "Non renseigné"
        }
      };
    });
  }, []);

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden my-12">
      
      {/* En-tête du tableau */}
      <div className="bg-gray-50 p-6 border-b border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 uppercase tracking-tight text-sm">
          Matrice d'Évaluation Croisée (Piliers × Méthode 6M)
        </h3>
        <p className="text-gray-500 text-xs mt-1">
          Visualisation synthétique des justificatifs, intrants et méthodologies par pilier stratégique.
        </p>
      </div>

      {/* Conteneur de défilement pour assurer la compatibilité mobile */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100/70 border-b border-gray-200 text-gray-500 uppercase text-[10px] font-black tracking-widest">
              <th className="py-4 px-6 min-w-[200px]">Pilier & Projet</th>
              <th className="py-4 px-4 min-w-[220px]">Matière (Intrants)</th>
              <th className="py-4 px-4 min-w-[220px]">Milieu (Secteur)</th>
              <th className="py-4 px-4 min-w-[220px]">Méthode (Technique)</th>
              <th className="py-4 px-4 min-w-[220px]">Main-d'œuvre</th>
              <th className="py-4 px-4 min-w-[220px]">Matériel</th>
              <th className="py-4 px-4 min-w-[220px]">Mesures (KPI)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-sm">
            {tableData.map((row) => (
              <tr 
                key={row.id} 
                className="hover:bg-gray-50/50 transition duration-150 group"
              >
                {/* Pilier avec une bordure de couleur personnalisée sur la gauche */}
                <td className={`py-4 px-6 font-bold text-gray-900 border-l-4 ${row.couleur}`}>
                  <div className="text-xs text-gray-400 font-medium uppercase tracking-wider">
                    {row.pilier}
                  </div>
                  <div className="text-sm font-extrabold text-primary mt-0.5 group-hover:text-primary/95 leading-snug">
                    {row.projet}
                  </div>
                </td>

                {/* Les 6 M dynamiques */}
                <td className="py-4 px-4 text-xs text-gray-600 leading-relaxed whitespace-pre-line">
                  {row.m.matiere}
                </td>
                <td className="py-4 px-4 text-xs text-gray-600 leading-relaxed whitespace-pre-line">
                  {row.m.milieu}
                </td>
                <td className="py-4 px-4 text-xs text-gray-600 leading-relaxed whitespace-pre-line">
                  {row.m.methode}
                </td>
                <td className="py-4 px-4 text-xs text-gray-600 leading-relaxed whitespace-pre-line">
                  {row.m["main-d'oeuvre"]}
                </td>
                <td className="py-4 px-4 text-xs text-gray-600 leading-relaxed whitespace-pre-line">
                  {row.m.materiel}
                </td>
                <td className="py-4 px-4 text-xs font-semibold text-gray-900 leading-relaxed whitespace-pre-line bg-gray-50/30">
                  {row.m.mesures}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}