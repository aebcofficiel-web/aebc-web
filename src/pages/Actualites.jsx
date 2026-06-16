// src/pages/Actualites.jsx
import { actualites } from "../data/actualites"
import { Link } from "react-router-dom"

export default function Actualites() {
  return (
    <div>
      {/* HERO — Bannière pleine largeur */}
      <div
        className="relative w-full h-[410px] bg-cover bg-center flex items-center"
        style={{
          backgroundImage:
            "url('https://aebc-cdn.b-cdn.net/biodiversite/hippo10-scaled.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative container-custom">
          <h1 className="text-4xl font-bold text-white mb-4 drop-shadow-lg">
            Actualités
          </h1>
          <p className="text-white text-lg leading-relaxed max-w-3xl drop-shadow">
            Découvrez l’ensemble des actualités liées à l’AEBC et au Bassin du Congo. 
            Une veille structurée sur l’environnement, la biodiversité et le climat.
          </p>
        </div>
      </div>

      {/* GRILLE D'ACTUALITÉS */}
      <div className="py-16 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {actualites.map((actu) => (
              <div 
                key={actu.id} 
                className="border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition bg-gray-50 p-6 flex flex-col"
              >
                {/* IMAGE / MINIATURE */}
                <div className="w-full h-48 bg-gray-200 rounded-lg overflow-hidden mb-4">
                  <img 
                    src={actu.image} 
                    alt={actu.titre} 
                    className="w-full h-full object-cover" 
                  />
                </div>

                {/* TITRE */}
                <h3 className="text-xl font-semibold text-gray-900 mb-1 line-clamp-2">
                  {actu.titre}
                </h3>

                {/* DATE */}
                <span className="text-sm text-primary font-medium">
                  {actu.date}
                </span>

                {/* RÉSUMÉ (DESCRIPTION) */}
                <p className="text-gray-600 text-sm leading-relaxed mt-3 mb-4 flex-grow">
                  {actu.resume}
                </p>

                {/* BOUTON */}
                <div className="flex gap-3 mt-4">
                  <Link
                    to={`/actualites/${actu.id}`}
                    className="px-4 py-2 bg-primary text-white rounded-lg shadow hover:bg-primary/90 transition text-sm font-medium"
                  >
                    Lire plus
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}