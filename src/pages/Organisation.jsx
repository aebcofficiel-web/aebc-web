// src_new/pages/Organisation.jsx
import React from 'react'

export default function Organisation() {
  const membres = [
    {
      nom: 'Adéline Mianguila',
      poste: 'Président(e)',
      role: 'Direction générale, représentation officielle et supervision stratégique.',
      photo: 'https://aebc-cdn.b-cdn.net/Organisation%20%26%20Membres/adeline-MIANGUILA-bkg-remove-grav_866x1154.png',
    },
    {
      nom: 'Natacha Assounga',
      poste: 'Vice-président(e)',
      role: 'Appui à la présidence, coordination des pôles et représentation secondaire.',
      photo: 'https://aebc-cdn.b-cdn.net/Organisation%20%26%20Membres/Natacha_Assounga-bkg-remove-grav_748x1334.png',
    },
    {
      nom: 'Alain Mavoungou',
      poste: 'Secrétaire Général(e)',
      role: 'Gestion administrative, rapports et coordination interne.',
      photo: 'https://aebc-cdn.b-cdn.net/organisation/sg.jpg',
    },
    {
      nom: 'Clarisse Mbani',
      poste: 'Secrétaire Général(e) Adjoint(e)',
      role: 'Appui administratif, suivi des programmes et projets.',
      photo: 'https://aebc-cdn.b-cdn.net/organisation/sg-adjoint.jpg',
    },
    {
      nom: 'Patrick Loubaki',
      poste: 'Trésorier(ère)',
      role: 'Gestion financière, budgets et transparence comptable.',
      photo: 'https://aebc-cdn.b-cdn.net/organisation/tresorier.jpg',
    },
    {
      nom: 'Leandre Aubiege Lekeleson',
      poste: 'Responsable Communication & NTIC',
      role: 'Gestion de la communication interne et externe, réseaux sociaux et outils numériques.',
      photo: 'https://aebc-cdn.b-cdn.net/Organisation%20%26%20Membres/Leandre-Aubiege-LEKELESON-scrt-charg%C3%A9e-a-la-com-et-NTIC_670x1490.png',
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
      photo: 'https://aebc-cdn.b-cdn.net/Organisation%20%26%20Membres/cp%2Cseillere-charg%C3%A9e-a-la-mobilisation-des-financiaires_866x1154.png',
    },
    {
      nom: 'Josiane Mavoungou',
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

  return (
    <div>

      {/* En-tête /* HERO — Bannière pleine largeur avec image + texte intégré */}
<div
  className="relative w-full h-[410px] bg-cover bg-center flex items-center"
  style={{
    backgroundImage: "url('https://aebc-cdn.b-cdn.net/biodiversite/geranimo-yKiLWMWquKE-unsplash.jpg')",
  }}
>
  {/* Overlay sombre + vitrage fumé */}
  <div className="absolute inset-0 bg-black/60"></div>

  {/* Texte directement dans la bannière */}
  <div className="relative container-custom">
    <h1 className="text-4xl font-bold text-white mb-4 drop-shadow-lg">
      Organisation
    </h1>

    <p className="text-white text-lg leading-relaxed max-w-3xl drop-shadow">
      Découvrez la structure organisationnelle de l’AEBC, ses organes de gouvernance,
      ses missions institutionnelles et les principes qui guident son action au service
      de la protection de l’environnement et des communautés du Bassin du Congo.
    </p>
  </div>
</div>


      {/* Contenu principal */}
      <section className="py-16">
        <div className="container-custom space-y-12">

          {/* Nos organes */}
          <div>
            <h2 className="text-3xl font-semibold text-primary">Nos organes</h2>

            <ul className="list-disc list-inside mt-4 text-gray-700 space-y-2">

              <li>
                <span className="font-semibold">Assemblée Générale :</span>
                {' '}organe suprême de décision regroupant tous les membres actifs.
              </li>

              <li>
                <span className="font-semibold">Conseil d’Administration :</span>
                {' '}supervise la stratégie et valide les programmes et budgets.
              </li>

              <li>
                <span className="font-semibold">Bureau Exécutif :</span>
                {' '}met en œuvre les décisions et coordonne les activités.
              </li>

              <li>
                <span className="font-semibold">Commission de contrôle et d’évaluation :</span>
                {' '}assure le suivi et la transparence des actions.
              </li>

              <li>
                <span className="font-semibold">Représentations départementales :</span>
                {' '}assurent la présence de l’AEBC dans les territoires.
              </li>

            </ul>
          </div>

          {/* Organigramme */}
          <div>
            <h2 className="text-3xl font-semibold text-primary">Organigramme</h2>

            <p className="mt-4 text-gray-700 leading-relaxed">
              Voici la composition du Bureau Exécutif et des responsables thématiques de l’AEBC.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
              {membres.map((membre, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition"
                >
                  <img
                    src={membre.photo}
                    alt={membre.nom}
                    className="w-32 h-32 mx-auto rounded-full object-cover mb-4 border-4 border-primary/20"
                  />

                  {/* Nom */}
                  <h3 className="text-xl font-semibold text-gray-900">
                    {membre.nom}
                  </h3>

                  {/* Poste */}
                  <p className="text-primary font-medium">
                    {membre.poste}
                  </p>

                  {/* Rôle */}
                  <p className="text-gray-600 mt-2 text-sm">
                    {membre.role}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Principes de gouvernance */}
          <div>
            <h2 className="text-3xl font-semibold text-primary">Principes de gouvernance</h2>

            <ul className="list-disc list-inside mt-4 text-gray-700 space-y-2">
              <li>Protection de l’environnement et des ressources naturelles.</li>
              <li>Participation active aux politiques publiques du Bassin du Congo.</li>
              <li>Partenariat et coopération avec les ONG locales et internationales.</li>
              <li>Bonne gouvernance, transparence et responsabilité.</li>
              <li>Production et consommation responsables.</li>
              <li>Cartographie et suivi des zones vertes.</li>
            </ul>
          </div>

        </div>
      </section>
    </div>
  )
}
