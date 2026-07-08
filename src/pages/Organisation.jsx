// src/pages/Organisation.jsx
import React from 'react'

export default function Organisation() {
  const membres = [
    {
      nom: 'Adéline Mianguila',
      poste: 'Président(e)',
      role: 'Direction générale, représentation officielle et supervision stratégique.',
      photo: '',
    },
    {
      nom: 'Jean Bilongo',
      poste: 'Vice-président(e)',
      role: 'Appui à la présidence, coordination des pôles et représentation secondaire.',
      photo: '',
    },
    {
      nom: 'Fustel Loueko',
      poste: 'Secrétaire Général(e)',
      role: 'Gestion administrative, rapports et coordination interne.',
      photo: 'https://aebc-cdn.b-cdn.net/organisation/sg.jpg',
    },
    {
      nom: 'Natacha Assounga Yobo',
      poste: 'Secrétaire Général(e) Adjoint(e)',
      role: 'Appui administratif, suivi des programmes et projets.',
      photo: 'https://aebc-cdn.b-cdn.net/organisation/sg-adjoint.jpg',
    },
    {
      nom: 'Phije Nganga',
      poste: 'Trésorier(ère)',
      role: 'Gestion financière, budgets et transparence comptable.',
      photo: 'https://aebc-cdn.b-cdn.net/organisation/tresorier.jpg',
    },
    {
      nom: 'Leandre Aubiege Lekeleson',
      poste: 'Responsable Communication & NTIC',
      role: 'Gestion de la communication interne et externe, réseaux sociaux et outils numériques.',
      photo: '',
    },
    {
      nom: 'David Moukassa',
      poste: 'Responsable Programmes & Projets',
      role: 'Supervision de la conception, mise en œuvre et évaluation des projets.',
      photo: 'https://aebc-cdn.b-cdn.net/organisation/programmes.jpg',
    },
    {
      nom: 'Inès Banzouzi',
      poste: 'Responsable Études & Diagnostics Environnementaux',
      role: 'Réalisation des études, diagnostics et enquêtes de terrain.',
      photo: 'https://aebc-cdn.b-cdn.net/organisation/etudes.jpg',
    },
    {
      nom: 'Michel Kodia',
      poste: 'Responsable Finances & Administration',
      role: 'Gestion des finances, comptabilité et rapports financiers.',
      photo: '',
    },
    {
      nom: 'Rosine Binsamou',
      poste: 'Responsable Mobilisation des Bénéficiaires',
      role: 'Coordination de la mobilisation communautaire et des bénéficiaires des projets.',
      photo: 'https://aebc-cdn.b-cdn.net/organisation/mobilisation.jpg',
    },
    {
      nom: 'Samuel Ekouala',
      poste: 'Responsable Environnement & Biodiversité',
      role: 'Supervision des actions de conservation, reboisement et lutte anti‑braconnage.',
      photo: 'https://aebc-cdn.b-cdn.net/organisation/environnement.jpg',
    },
    {
      nom: 'Aline Moukala',
      poste: 'Responsable Genre & Communautés Autochtones',
      role: 'Promotion de l’inclusion et des droits des peuples autochtones.',
      photo: 'https://aebc-cdn.b-cdn.net/organisation/genre.jpg',
    },
  ]

  const organes = [
    { titre: "Assemblée Générale", desc: "Organe suprême de décision regroupant tous les membres actifs." },
    { titre: "Conseil d’Administration", desc: "Supervise la stratégie et valide les programmes et budgets." },
    { titre: "Bureau Exécutif", desc: "Met en œuvre les décisions et coordonne les activités." },
    { titre: "Commission de contrôle", desc: "Assure le suivi, la transparence et l'évaluation des actions." },
    { titre: "Représentations", desc: "Assurent la présence de l’AEBC dans les départements et territoires." },
  ]

  const principes = [
    { titre: "Conservation", desc: "Protection rigoureuse de l’environnement et des ressources naturelles." },
    { titre: "Engagement Public", desc: "Participation active aux politiques publiques du Bassin du Congo." },
    { titre: "Coopération", desc: "Partenariat stratégique avec les ONG locales et internationales." },
    { titre: "Transparence", desc: "Bonne gouvernance, responsabilité et intégrité financière." },
    { titre: "Éco-responsabilité", desc: "Promotion d'une production et d'une consommation responsables." },
    { titre: "Suivi Scientifique", desc: "Cartographie précise et suivi rigoureux des zones protégées." },
  ]

  return (
    <div>
      {/* HERO SECTION */}
      <div
        className="relative w-full h-[410px] bg-cover bg-center flex items-center"
        style={{
          backgroundImage: "url('https://aebc-cdn.b-cdn.net/biodiversite/geranimo-yKiLWMWquKE-unsplash.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative container-custom">
          <h1 className="text-4xl font-bold text-white mb-4 drop-shadow-lg">
            Organisation
          </h1>
          <p className="text-white text-lg leading-relaxed max-w-3xl drop-shadow">
            Découvrez la structure organisationnelle de l’AEBC, ses organes de gouvernance,
            ses missions institutionnelles et les principes qui guident son action au service
            du Bassin du Congo.
          </p>
        </div>
      </div>

      {/* SECTION NOS ORGANES (Format Cellules) */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <h2 className="text-2xl font-bold text-primary mb-10 tracking-wide">
            Nos organes de gouvernance
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {organes.map((organe, idx) => (
              <div key={idx} className="flex gap-4 p-5 border border-gray-100 rounded-xl bg-gray-50/50 shadow-sm">
                <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0"></div>
                <div>
                  <h3 className="font-bold text-gray-900 leading-tight">{organe.titre}</h3>
                  <p className="text-sm text-gray-600 mt-2 leading-relaxed">{organe.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION BUREAU EXÉCUTIF (Format Cartes Accueil) */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-primary tracking-wide">
              Bureau Exécutif
            </h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              Voici la composition de l'équipe dirigeante et des responsables thématiques de l’AEBC.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {membres.map((membre, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition bg-white p-6 flex flex-col items-center text-center"
              >
                {/* Photo de profil */}
                <div className="w-32 h-32 mb-6 relative">
                  <div className="absolute inset-0 bg-primary/10 rounded-full scale-110"></div>
                  <img
                    src={membre.photo}
                    alt={membre.nom}
                    className="w-full h-full rounded-full object-cover border-4 border-white shadow-sm relative z-10"
                  />
                </div>

                {/* Nom & Poste */}
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  {membre.nom}
                </h3>
                <span className="text-sm px-3 py-1 bg-primary/10 text-primary font-semibold rounded-full mb-4">
                  {membre.poste}
                </span>

                {/* Rôle */}
                <p className="text-gray-600 text-sm leading-relaxed flex-grow">
                  {membre.role}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION PRINCIPES (Format Cellules - Identique aux Organes) */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <h2 className="text-2xl font-bold text-primary mb-10 tracking-wide">
            Nos principes de gouvernance
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {principes.map((principe, i) => (
              <div 
                key={i} 
                className="flex gap-4 p-5 border border-gray-100 rounded-xl bg-gray-50/50 shadow-sm"
              >
                <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0"></div>
                <div>
                  <h3 className="font-bold text-gray-900 leading-tight">
                    {principe.titre}
                  </h3>
                  <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                    {principe.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}