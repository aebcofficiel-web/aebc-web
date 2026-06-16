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
        <Link to="/actualites" className="text-primary underline mt-4 inline-block">Retour aux actualités</Link>
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

      {/* Image Large */}
      <div className="container-custom">
        <img
          src={actu.image}
          alt={actu.titre}
          className="w-full h-[300px] md:h-[500px] object-cover rounded-2xl shadow-lg"
        />
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