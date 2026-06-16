import React, { useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Projets() {
  // === Projets terminés ===
  const projetsTermines = [
    {
      titre: "Création d’espaces d’échange environnementaux",
      periode: "Janvier 2022 – Juin 2022",
      description:
        "Mise en place de deux espaces de dialogue sur la protection de l’environnement et la participation communautaire.",
      statut: "Terminé",
      progression: 100,
      image: "https://aebc-cdn.b-cdn.net/projets/echanges.jpg",
    },
    {
      titre: "Sensibilisation à la loi n°5 sur la reconnaissance des peuples autochtones",
      periode: "Mars 2022 – Août 2022",
      description:
        "Campagne nationale de vulgarisation de la loi n°5 pour la reconnaissance et la protection des peuples autochtones.",
      statut: "Terminé",
      progression: 100,
      image: "https://aebc-cdn.b-cdn.net/projets/loi5.jpg",
    },
    {
      titre: "Formation des peuples autochtones aux métiers de l’agriculture et de la pisciculture",
      periode: "Septembre 2022 – Décembre 2022",
      description:
        "Programme de renforcement des capacités pour l’autonomie économique et la gestion durable des ressources naturelles.",
      statut: "Terminé",
      progression: 100,
      image: "https://aebc-cdn.b-cdn.net/projets/autochtones.jpg",
    },
  ];

  // === Projets en cours ===
  const projetsEnCours = [
    {
      titre: "Programme de communication environnementale dans le Bassin du Congo",
      periode: "Avril 2025 – Décembre 2026",
      description:
        "L’AEBC suit activement les initiatives régionales en matière de communication environnementale et se positionne pour contribuer aux futures actions de sensibilisation.",
      statut: "En cours",
      progression: 40,
      image: "https://aebc-cdn.b-cdn.net/projets/communication.jpg",
    },
    {
      titre: "Participation au déploiement du Fonds Bleu pour le Bassin du Congo",
      periode: "Avril 2026 – Décembre 2026",
      description:
        "L’AEBC souhaite être associée aux actions de terrain du Fonds Bleu. L’association recherche des partenariats institutionnels afin de contribuer à la mise en œuvre des 63 projets prioritaires.",
      statut: "En cours",
      progression: 55,
      image: "https://aebc-cdn.b-cdn.net/projets/fondsbleu.jpg",
    },
    {
      titre: "Programme de résilience climatique et agro-écologique",
      periode: "Mai 2026 – Décembre 2026",
      description:
        "L’AEBC se prépare à participer aux initiatives régionales visant à renforcer la résilience climatique et promouvoir l’agroforesterie durable.",
      statut: "En cours",
      progression: 30,
      image: "https://aebc-cdn.b-cdn.net/projets/agroecologie.jpg",
    },
  ];

  // === Projets à venir ===
  const projetsAvenir = [
    {
      titre: "Programme d’innovation verte et numérique",
      periode: "2027 – 2028",
      description:
        "Création d’un incubateur dédié aux solutions vertes et numériques pour soutenir les jeunes entrepreneurs engagés dans la transition écologique.",
      statut: "À venir",
      progression: 0,
      image: "https://aebc-cdn.b-cdn.net/projets/innovation.jpg",
    },
    {
      titre: "Projet de restauration des tourbières du Bassin du Congo",
      periode: "2027 – 2029",
      description:
        "L’AEBC souhaite rejoindre les initiatives de restauration des tourbières, zones essentielles pour la séquestration du carbone.",
      statut: "À venir",
      progression: 0,
      image: "https://aebc-cdn.b-cdn.net/projets/tourbieres.jpg",
    },
    {
      titre: "Programme d’inclusion sociale et genre",
      periode: "2027 – 2028",
      description:
        "Renforcement de la participation des femmes et des peuples autochtones dans la gouvernance environnementale.",
      statut: "À venir",
      progression: 0,
      image: "https://aebc-cdn.b-cdn.net/projets/inclusion.jpg",
    },
  ];

  // === Filtre ===
  const [filtre, setFiltre] = useState("Tous");

  const tousProjets = [
    ...projetsTermines,
    ...projetsEnCours,
    ...projetsAvenir,
  ];

  const projetsFiltres =
    filtre === "Tous"
      ? tousProjets
      : tousProjets.filter((p) => p.statut === filtre);

  // === Stats ===
  const stats = {
    termines: projetsTermines.length,
    enCours: projetsEnCours.length,
    avenir: projetsAvenir.length,
  };

  // === Répartition par niveaux d’avancement ===
  const niveaux = {
    faible: tousProjets.filter((p) => p.progression <= 25).length,
    moyen: tousProjets.filter((p) => p.progression > 25 && p.progression <= 50).length,
    eleve: tousProjets.filter((p) => p.progression > 50 && p.progression <= 75).length,
    tresEleve: tousProjets.filter((p) => p.progression > 75).length,
  };

  // === Diagramme avancé ===
  const pieDataAvance = {
    labels: [
      "0–25% (Faible)",
      "25–50% (Moyen)",
      "50–75% (Élevé)",
      "75–100% (Très élevé)",
    ],
    datasets: [
      {
        data: [
          niveaux.faible,
          niveaux.moyen,
          niveaux.eleve,
          niveaux.tresEleve,
        ],
        backgroundColor: ["#DC241F", "#FF6501", "#FFCC01", "#22C55E"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
     
     {/* HERO — Bannière pleine largeur avec image + texte intégré */}
<div
  className="relative w-full h-[410px] bg-cover bg-center flex items-center"
  style={{
    backgroundImage: "url('https://aebc-cdn.b-cdn.net/biodiversite/climat-biodiversit%C3%A9-inclusion-eau-tourbi%C3%A8re-agroecologie.png')",
  }}
>
  {/* Overlay sombre + vitrage fumé */}
  <div className="absolute inset-0 bg-black/60"></div>

  {/* Texte directement dans la bannière */}
  <div className="relative container-custom">
    <h1 className="text-4xl font-bold text-white mb-4 drop-shadow-lg">
      Nos projets
    </h1>

    <p className="text-white text-lg leading-relaxed max-w-3xl drop-shadow">
      Un tableau de bord institutionnel permettant de suivre, en toute transparence,
      l’évolution des projets AEBC. Indicateurs visuels, statistiques consolidées,
      niveaux d’avancement et répartition sectorielle offrent une lecture claire
      et professionnelle de nos actions dans le Bassin du Congo.
    </p>
  </div>
</div>

     
      {/* TABLEAU + DIAGRAMME */}
      <section className="py-12 bg-gray-50">
        <div className="container-custom max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">

            {/* STATISTIQUES */}
            <div className="bg-white rounded-xl shadow p-6">
              <h3 className="text-xl font-semibold text-primary mb-4 text-center">
                Statistiques des projets
              </h3>

              <div className="space-y-4">
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-600">Projets terminés</span>
                  <span className="font-bold text-green-600">{stats.termines}</span>
                </div>

                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-600">Projets en cours</span>
                  <span className="font-bold text-yellow-600">{stats.enCours}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Projets à venir</span>
                  <span className="font-bold text-blue-600">{stats.avenir}</span>
                </div>
              </div>
            </div>

            {/* DIAGRAMME */}
            <div className="bg-white rounded-xl shadow p-6 flex flex-col">
  <h3 className="text-xl font-semibold text-primary mb-4 text-center">
    Répartition des niveaux d’avancement
  </h3>

  <div className="flex items-center justify-center">
    {/* Diagramme + légende dans un canvas un peu plus large */}
    <div className="w-[300px] h-[200px] flex justify-center items-center">
      <Pie
        data={pieDataAvance}
        options={{
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: "left",
              align: "start",
              labels: {
                boxWidth: 12,
                padding: 8, // plus petit pour éviter de pousser le texte hors cadre
                font: {
                  size: 12,
                },
              },
            },
          },
        }}
      />
    </div>
  </div>
</div>



          </div>
        </div>
      </section>

      {/* CARTES SECTORIELLES — VERSION AVEC ICONES BUNNYCDN */}
<section className="py-16 bg-white">
  <div className="container-custom">
    <h2 className="text-2xl font-bold text-primary mb-10 text-center tracking-wide">
      Secteurs d’intervention de l’AEBC
    </h2>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

      {/* CLIMAT */}
      <div className="border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition bg-gray-50 p-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center overflow-hidden">
            <img 
              src="https://aebc-cdn.b-cdn.net/biodiversite/climat-change.png" 
              alt="Icône Climat" 
              className="w-8 h-8 object-contain"
            />
          </div>
          <h3 className="text-xl font-semibold text-gray-900">Climat</h3>
        </div>

        <p className="text-gray-600 leading-relaxed text-sm">
          Renforcement de la résilience climatique, appui aux politiques nationales,
          participation aux initiatives régionales et contribution aux mécanismes
          de finance climatique (Fonds Bleu, CCBC).
        </p>
      </div>

      {/* BIODIVERSITÉ */}
      <div className="border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition bg-gray-50 p-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center overflow-hidden">
            <img 
              src="https://aebc-cdn.b-cdn.net/biodiversite/biodiversit%C3%A9.png" 
              alt="Icône Biodiversité" 
              className="w-8 h-8 object-contain"
            />
          </div>
          <h3 className="text-xl font-semibold text-gray-900">Biodiversité</h3>
        </div>

        <p className="text-gray-600 leading-relaxed text-sm">
          Protection des écosystèmes, restauration des tourbières, lutte contre
          la déforestation, conservation des espèces et promotion de l’agroécologie
          durable dans le Bassin du Congo.
        </p>
      </div>

      {/* INCLUSION SOCIALE */}
      <div className="border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition bg-gray-50 p-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center overflow-hidden">
            <img 
              src="https://aebc-cdn.b-cdn.net/biodiversite/inclusion-sociale.png" 
              alt="Icône Inclusion sociale" 
              className="w-8 h-8 object-contain"
            />
          </div>
          <h3 className="text-xl font-semibold text-gray-900">Inclusion sociale</h3>
        </div>

        <p className="text-gray-600 leading-relaxed text-sm">
          Participation active des femmes, des jeunes et des peuples autochtones
          dans la gouvernance environnementale, la sensibilisation et les projets
          de développement durable.
        </p>
      </div>

      {/* EAU */}
      <div className="border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition bg-gray-50 p-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center overflow-hidden">
            <img 
              src="https://aebc-cdn.b-cdn.net/Logo-Banni%C3%A8re/eau-logo.png" 
              alt="Icône Eau" 
              className="w-8 h-8 object-contain"
            />
          </div>
          <h3 className="text-xl font-semibold text-gray-900">Eau</h3>
        </div>

        <p className="text-gray-600 leading-relaxed text-sm">
          Gestion durable des ressources hydriques, protection des bassins versants,
          construction de stations d’épuration et sensibilisation à la préservation
          de l’eau dans les communautés locales.
        </p>
      </div>

      {/* TOURBIÈRES */}
      <div className="border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition bg-gray-50 p-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center overflow-hidden">
            <img 
              src="https://aebc-cdn.b-cdn.net/Logo-Banni%C3%A8re/Tourbi%C3%A8res-logo.png" 
              alt="Icône Tourbières" 
              className="w-8 h-8 object-contain"
            />
          </div>
          <h3 className="text-xl font-semibold text-gray-900">Tourbières</h3>
        </div>

        <p className="text-gray-600 leading-relaxed text-sm">
          Conservation et restauration des tourbières du Bassin du Congo, lutte contre
          leur dégradation et valorisation de leur rôle essentiel dans la régulation
          du climat et la biodiversité.
        </p>
      </div>

      {/* AGROÉCOLOGIE */}
      <div className="border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition bg-gray-50 p-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-lime-100 rounded-full flex items-center justify-center overflow-hidden">
            <img 
              src="https://aebc-cdn.b-cdn.net/Logo-Banni%C3%A8re/Agro%C3%A9cologie-logo.png" 
              alt="Icône Agroécologie" 
              className="w-8 h-8 object-contain"
            />
          </div>
          <h3 className="text-xl font-semibold text-gray-900">Agroécologie</h3>
        </div>

        <p className="text-gray-600 leading-relaxed text-sm">
          Promotion de pratiques agricoles durables, respectueuses des sols et des
          cycles naturels, intégrant les savoirs locaux et contribuant à la sécurité
          alimentaire des communautés.
        </p>
      </div>

    </div>
  </div>
</section>

      {/* LISTE DES PROJETS */}
      <section className="py-12">
        <div className="container-custom text-center mb-8">
          <div className="inline-flex gap-4">
            {["Tous", "Terminé", "En cours", "À venir"].map((cat) => (
              <button
                key={cat}
                onClick={() => setFiltre(cat)}
                className={`px-4 py-2 rounded-full border transition ${
                  filtre === cat
                    ? "bg-primary text-white"
                    : "bg-white text-primary border-primary"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="container-custom grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {projetsFiltres.map((projet, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-6"
            >
              <img
                src={projet.image}
                alt={projet.titre}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />

              <h3 className="text-xl font-semibold text-gray-900">
                {projet.titre}
              </h3>
              <p className="text-sm text-gray-500">{projet.periode}</p>

              <span
                className={`inline-block mt-2 px-3 py-1 text-sm rounded-full ${
                  projet.statut === "Terminé"
                    ? "bg-green-100 text-green-800"
                    : projet.statut === "En cours"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-blue-100 text-blue-800"
                }`}
              >
                {projet.statut}
              </span>

              {/* PROGRESSION */}
              <div className="mt-4">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Progression</span>
                  <span className="font-medium text-gray-800">
                    {projet.progression}%
                  </span>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div
                    className={`h-3 rounded-full transition-all duration-700 ${
                      projet.statut === "Terminé"
                        ? "bg-green-500"
                        : projet.statut === "En cours"
                        ? "bg-yellow-500"
                        : "bg-blue-500"
                    }`}
                    style={{ width: `${projet.progression}%` }}
                  ></div>
                </div>
              </div>

              <p className="text-gray-600 mt-4 leading-relaxed">
                {projet.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
