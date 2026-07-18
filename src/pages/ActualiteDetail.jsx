// src/pages/ActualiteDetail.jsx
import { useParams, Link } from "react-router-dom"
import { actualites } from "../data/actualites"

export default function ActualiteDetail() {
  const { id } = useParams()
  const actu = actualites.find((a) => a.id === Number(id))

  // Rendu si l'actualité n'est pas trouvée
  if (!actu) {
    return (
      <div className="container-custom py-16 text-center bg-white dark:bg-zinc-950 min-h-screen">
        <h2 className="text-2xl font-bold text-primary dark:text-secondary">Actualité introuvable</h2>
        <Link to="/actualites" className="text-primary dark:text-secondary underline mt-4 inline-block">
          Retour aux actualités
        </Link>
      </div>
    )
  }

  return (
    <article className="bg-white dark:bg-zinc-950 pb-20 transition-colors duration-300">
      
      {/* En-tête simple */}
      <div className="container-custom py-12">
        <Link to="/actualites" className="text-primary dark:text-secondary font-medium mb-4 inline-block hover:underline">
          ← Retour aux actualités
        </Link>
        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 leading-tight">
          {actu.titre}
        </h1>
        <p className="text-primary dark:text-secondary font-semibold mt-4">{actu.date}</p>
      </div>

      {/* Image Large - Cadre fixe avec arrière-plan flouté */}
      <div className="container-custom">
        <div className="relative w-full h-[300px] md:h-[500px] rounded-2xl overflow-hidden shadow-lg bg-black dark:border dark:border-zinc-800 flex items-center justify-center">
          {/* Arrière-plan flouté */}
          <div 
            className="absolute inset-0 bg-cover bg-center blur-xl opacity-40 scale-110 pointer-events-none"
            style={{ backgroundImage: `url(${actu.image})` }}
          ></div>
          
          {/* Image principale */}
          <img
            src={actu.image}
            alt={actu.titre}
            className="relative z-10 max-w-full max-h-full object-contain"
          />
        </div>
      </div>

      {/* Contenu de l'article enveloppé pour un confort de lecture optimal */}
      <div className="container-custom mt-10">
        <div className="max-w-4xl mx-auto">
          
          {/* Enveloppe de lecture douce reprenant le fond des cartes */}
          <div className="bg-gray-50 dark:bg-[#122527] border border-gray-200 dark:border-[#1d3a3d] rounded-2xl p-8 md:p-12 shadow-sm transition-colors duration-300">
            <div className="prose prose-lg max-w-none text-gray-700 dark:text-gray-300 whitespace-pre-line leading-relaxed">
              {actu.contenu}
            </div>
          </div>
          
        </div>
      </div>
    </article>
  )
}