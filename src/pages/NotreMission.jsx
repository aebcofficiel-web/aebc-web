// src/pages/NotreMission.jsx
import React from "react";

const NotreMission = () => {
  return (
    <main>
      {/* HERO */}
      <section
        className="relative w-full h-[320px] bg-cover bg-center flex items-center"
        style={{
          backgroundImage:
            "url('https://aebc-cdn.b-cdn.net/biodiversite/heather-wilde-fpZRaTl7unI-unsplash.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative container-custom text-white">
          <h1 className="text-4xl font-bold drop-shadow-lg">Notre mission</h1>
          <p className="mt-3 max-w-3xl drop-shadow">
            Protéger et restaurer la biodiversité du Bassin du Congo en
            mobilisant communautés, partenaires et savoirs scientifiques.
          </p>
        </div>
      </section>

      {/* CONTENU */}
      <section className="container-custom py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          <article>
            <h2 className="text-2xl font-bold text-primary">Mission</h2>
            <p className="text-gray-700 mt-3">
              L’AEBC œuvre pour la conservation des écosystèmes, le renforcement
              des capacités locales et la promotion de solutions durables.
            </p>
          </article>

          <article>
            <h3 className="text-xl font-semibold text-primary">Vision</h3>
            <p className="text-gray-700 mt-2">
              Un Bassin du Congo résilient où communautés et nature prospèrent
              ensemble.
            </p>
          </article>

          <article>
            <h3 className="text-xl font-semibold text-primary">Valeurs</h3>
            <ul className="list-disc pl-6 mt-2 text-gray-700 space-y-1">
              <li>Respect des communautés locales</li>
              <li>Transparence et rigueur scientifique</li>
              <li>Durabilité et équité</li>
            </ul>
          </article>

          <article>
            <h3 className="text-xl font-semibold text-primary">Objectifs stratégiques</h3>
            <ul className="list-decimal pl-6 mt-2 text-gray-700 space-y-1">
              <li>Renforcer la protection des habitats clés</li>
              <li>Développer des programmes d’éducation et d’emploi verts</li>
              <li>Consolider des partenariats institutionnels</li>
            </ul>
          </article>

          <div className="pt-4">
            <a href="/contact" className="bg-primary text-white px-5 py-3 rounded-md font-semibold">
              Nous soutenir / Contact
            </a>
            <a href="/projets" className="ml-4 text-primary underline">
              Voir nos projets
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};

export default NotreMission;
