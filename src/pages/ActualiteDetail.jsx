// src/pages/ActualiteDetail.jsx
import { useParams, Link } from "react-router-dom"
import { actualites } from "../data/actualites"

export default function ActualiteDetail() {
  const { id } = useParams()
  const actu = actualites.find((a) => a.id === Number(id))

  if (!actu) {
    return (
      <div className="container-custom py-16 text-center">
        <h2 className="text-2xl font-bold text-primary">Actualité introuvable</h2>
        <Link to="/actualites" className="text-primary underline mt-4 inline-block">
          Retour aux actualités
        </Link>
      </div>
    )
  }

  return (
    <article className="bg-white pb-20">
      {/* En-tête simple */}
      <div className="container-custom py-12">
        <Link to="/actualites" className="text-primary font-medium mb-4 inline-block hover:underline">
          ← Retour aux actualités
        </Link>
        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
          {actu.titre}
        </h1>
        <p className="text-primary font-semibold mt-4">{actu.date}</p>
      </div>

      {/* Image Large - Cadre fixe avec arrière-plan immersif flouté */}
      <div className="container-custom">
        <div className="relative w-full h-[300px] md:h-[500px] rounded-2xl overflow-hidden shadow-lg bg-black flex items-center justify-center">
          {/* Arrière-plan flouté qui remplit la case */}
          <div 
            className="absolute inset-0 bg-cover bg-center blur-xl opacity-40 scale-110 pointer-events-none"
            style={{ backgroundImage: `url(${actu.image})` }}
          ></div>
          
          {/* Image principale visible en entier */}
          <img
            src={actu.image}
            alt={actu.titre}
            className="relative z-10 max-w-full max-h-full object-contain"
          />
        </div>
      </div>

      {/* Contenu de l'article */}
      <div className="container-custom mt-10">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg max-w-none text-gray-700 whitespace-pre-line leading-relaxed">
            {actu.contenu}
          </div>
        </div>
      </div>
    </article>
  )
}