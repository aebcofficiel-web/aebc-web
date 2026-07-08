// src/pages/Actualites.jsx
import { useState } from "react";
import { actualites } from "../data/actualites";
import { Link } from "react-router-dom";

export default function Actualites() {
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 9;

  const totalPages = Math.ceil(actualites.length / cardsPerPage);
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentActualites = actualites.slice(indexOfFirstCard, indexOfLastCard);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);

    setTimeout(() => {
      const anchor = document.getElementById("actualites-grid-start");
      anchor
        ? anchor.scrollIntoView({ behavior: "smooth", block: "start" })
        : window.scrollTo({ top: 0, behavior: "smooth" });
    }, 40);
  };

  return (
    <div>
      {/* Animation */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-in { animation: fadeIn 0.4s ease-out forwards; }
      `}</style>

      {/* HERO */}
      <div
        className="relative w-full h-[410px] bg-cover bg-center flex items-center"
        style={{
          backgroundImage:
            "url('https://aebc-cdn.b-cdn.net/biodiversite/hippo10-scaled.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>

        <div className="relative container-custom text-white">
          <h1 className="text-4xl font-bold mb-4 uppercase">Actualités</h1>

          <p className="text-lg opacity-90 max-w-3xl leading-relaxed">
            Suivez l’évolution des initiatives, projets, réformes et actions
            institutionnelles menées pour la protection du Bassin du Congo.
            Retrouvez ici les temps forts, les avancées stratégiques et les
            engagements portés par les acteurs du climat, de la biodiversité et
            du développement durable.
          </p>
        </div>
      </div>

      {/* Anchor for scroll */}
      <div id="actualites-grid-start" className="scroll-mt-20"></div>

      {/* GRID */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div
            key={currentPage}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 fade-in"
          >
            {currentActualites.map((actu) => (
              <div
                key={actu.id}
                className="border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition bg-gray-50 p-6 flex flex-col"
              >
                <div className="w-full h-48 rounded-lg overflow-hidden mb-4">
                  <img
                    src={actu.image}
                    alt={actu.titre}
                    className="w-full h-full object-cover"
                  />
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-1 line-clamp-2">
                  {actu.titre}
                </h3>

                <span className="text-sm text-primary font-medium">
                  {actu.date}
                </span>

                <p className="text-gray-600 text-sm leading-relaxed mt-3 mb-6 flex-grow">
                  {actu.resume}
                </p>

                <Link
                  to={`/actualites/${actu.id}`}
                  className="px-4 py-2 bg-primary text-white rounded-lg shadow hover:bg-primary/90 transition text-sm font-bold w-max"
                >
                  Lire plus
                </Link>
              </div>
            ))}
          </div>

          {/* PAGINATION */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-16 border-t border-gray-100 pt-8">
              {/* Prev */}
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

              {/* Numbers */}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
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
                )
              )}

              {/* Next */}
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
      </section>
    </div>
  );
}
