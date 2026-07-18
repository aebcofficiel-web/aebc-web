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
    <div className="transition-colors duration-300">
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
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">Actualités</h1>

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
      <section className="py-16 bg-white dark:bg-zinc-950 transition-colors duration-300">
        <div className="container-custom">
          <div
            key={currentPage}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 fade-in"
          >
            {currentActualites.map((actu) => (
              <div
                key={actu.id}
                // Contours fins assortis (dark:border-[#1d3a3d]) sur fond #122527
                className="border border-gray-200 dark:border-[#1d3a3d] rounded-xl shadow-sm hover:shadow-md transition-all duration-300 bg-gray-50 dark:bg-[#122527] p-6 flex flex-col"
              >
                <div className="w-full h-48 rounded-lg overflow-hidden mb-4 bg-gray-200 dark:bg-zinc-950">
                  <img
                    src={actu.image}
                    alt={actu.titre}
                    className="w-full h-full object-cover"
                  />
                </div>

                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-1 line-clamp-2">
                  {actu.titre}
                </h3>

                <span className="text-sm text-primary dark:text-secondary font-medium">
                  {actu.date}
                </span>

                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mt-3 mb-6 flex-grow">
                  {actu.resume}
                </p>

                <Link
                  to={`/actualites/${actu.id}`}
                  className="px-4 py-2 bg-primary dark:bg-secondary text-white dark:text-dark rounded-lg shadow hover:bg-primary-light dark:hover:bg-secondary/90 transition text-sm font-bold w-max"
                >
                  Lire plus
                </Link>
              </div>
            ))}
          </div>

          {/* PAGINATION */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-16 border-t border-gray-100 dark:border-zinc-900 pt-8">
              {/* Prev */}
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-4 py-2 border rounded-lg text-sm font-semibold transition ${
                  currentPage === 1
                    ? "border-gray-100 dark:border-zinc-800 text-gray-300 dark:text-zinc-700 cursor-not-allowed bg-gray-50 dark:bg-zinc-900/50"
                    : "border-gray-200 dark:border-zinc-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-zinc-850 hover:text-primary dark:hover:text-secondary hover:border-primary/30 dark:hover:border-secondary/30"
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
                        ? "bg-primary dark:bg-secondary text-white dark:text-dark shadow-md shadow-primary/20"
                        : "border border-gray-200 dark:border-zinc-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-zinc-850 hover:text-primary dark:hover:text-secondary hover:border-primary/30 dark:hover:border-secondary/30"
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
                    ? "border-gray-100 dark:border-zinc-800 text-gray-300 dark:text-zinc-700 cursor-not-allowed bg-gray-50 dark:bg-zinc-900/50"
                    : "border-gray-200 dark:border-zinc-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-zinc-850 hover:text-primary dark:hover:text-secondary hover:border-primary/30 dark:hover:border-secondary/30"
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