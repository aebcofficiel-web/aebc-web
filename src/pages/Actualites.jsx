// src/pages/Actualites.jsx
import { actualites } from "../data/actualites";
import { Link } from "react-router-dom";

export default function Actualites() {
  return (
    <div>
      <div className="relative w-full h-[410px] bg-cover bg-center flex items-center" style={{ backgroundImage: "url('https://aebc-cdn.b-cdn.net/biodiversite/hippo10-scaled.jpg')" }}>
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative container-custom text-white">
          <h1 className="text-4xl font-bold mb-4 uppercase">Actualités</h1>
          <p className="text-lg opacity-90 max-w-2xl leading-relaxed">Suivez l'impact de nos actions pour le Bassin du Congo.</p>
        </div>
      </div>

      <section className="py-16 bg-white">
        <div className="container-custom grid grid-cols-1 md:grid-cols-3 gap-8">
          {actualites.map((actu) => (
            <div key={actu.id} className="border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition bg-gray-50 p-6 flex flex-col">
              <div className="w-full h-48 bg-gray-200 rounded-lg overflow-hidden mb-4">
                <img src={actu.image} alt={actu.titre} className="w-full h-full object-cover" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-1 line-clamp-2">{actu.titre}</h3>
              <span className="text-sm text-primary font-medium">{actu.date}</span>
              <p className="text-gray-600 text-sm leading-relaxed mt-3 mb-6 flex-grow">{actu.resume}</p>
              <Link to={`/actualites/${actu.id}`} className="px-4 py-2 bg-primary text-white rounded-lg shadow hover:bg-primary/90 transition text-sm font-bold w-max">
                Lire plus
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}