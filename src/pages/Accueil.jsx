// src/pages/Accueil.jsx
import HeroSection from '../components/sections/HeroSection'
import CountryFlags from '../components/sections/CountryFlags'
import SocialLinks from '../components/sections/SocialLinks'
import { Link } from 'react-router-dom'
import { Heart, Handshake } from 'lucide-react'

const latestNews = [
  {
    id: 1,
    title: "Forum sur la Communication environnementale dans le Bassin du Congo",
    date: "22 au 25 avril 2025 – Brazzaville",
    description: "Lors du premier Forum multi-acteurs consacré à l’information, l’éducation et la communication environnementales, l’accent a été mis sur le rôle essentiel des professionnels des médias.",
    image: "https://aebc-cdn.b-cdn.net/sensibilisation/Blank%20Collage%20Template%20(1).png",
    link: "/actualites/1",
  },
  {
    id: 2,
    title: "Réunion pour finaliser le déploiement du Fonds Bleu pour le Bassin du Congo (F2BC)",
    date: "1er avril 2026 - Brazzaville",
    description: "La réunion stratégique a marqué une étape clé pour la finance climatique. Les partenaires ont finalisé les préparatifs pour confirmer 54 projets prioritaires.",
    image: "https://aebc-cdn.b-cdn.net/sensibilisation/reunion-fond-bleu-001.png",
    link: "/actualites/2",
  },
  {
    id: 3,
    title: "CCBC et BDEAC mobilisent 3,65 milliards USD pour 63 projets du Fonds Bleu",
    date: "25 au 29 mai 2026 - Kintélé",
    description: "Ces investissements visent à renforcer la résilience climatique, développer les infrastructures liées à l'eau et promouvoir les énergies renouvelables.",
    image: "https://aebc-cdn.b-cdn.net/sensibilisation/Table-ronde-BDEAC-F2BC-001.png",
    link: "/actualites/3",
  },
];

const featuredProjects = [
  { 
    id: 1, 
    title: "Reboisement et Plantation communautaire", 
    sector: "Biodiversité",
    status: "Terminé",
    statusColor: "bg-green-500",
    description: "Restauration des écosystèmes dégradés par la plantation d'espèces locales avec l'implication active des populations.",
    image: "https://aebc-cdn.b-cdn.net/Reboisement/Plantation_01.webp"
  },
  { 
    id: 2, 
    title: "Sensibilisation à la loi n°5 (Peuples Autochtones)", 
    sector: "Inclusion Sociale",
    status: "Terminé",
    statusColor: "bg-green-500",
    description: "Campagne nationale de vulgarisation pour la reconnaissance des droits et l'inclusion des peuples autochtones.",
    image: "https://aebc-cdn.b-cdn.net/Reboisement/pexels-safari-consoler-3290243-10988628.jpg"
  },
  { 
    id: 3, 
    title: "Communication environnementale Bassin du Congo", 
    sector: "Climat",
    status: "En cours",
    statusColor: "bg-yellow-500",
    description: "Mise en place d'un réseau de communication stratégique pour la protection du second poumon vert de la planète.",
    image: "https://aebc-cdn.b-cdn.net/Reboisement/pexels-frostee-lens-ug-2150016714-36185281.jpg"
  },
]

export default function Accueil() {
  return (
    <div className="transition-colors duration-300">
      <HeroSection />

      {/* 1. SECTION QUI SOMMES-NOUS (À Propos) */}
      <section className="py-16 bg-white dark:bg-zinc-950 transition-colors duration-300">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold text-primary dark:text-secondary">Qui sommes-nous ?</h2>
          <p className="mt-4 max-w-3xl mx-auto text-gray-700 dark:text-gray-300 leading-relaxed">
            L’AEBC œuvre pour la préservation du Bassin du Congo, second poumon vert de la planète. 
            Nous agissons concrètement pour la conservation des forêts, la protection de la faune et le développement des populations locales.
          </p>
          <Link to="/a-propos" className="inline-block mt-6 btn-primary dark:bg-secondary dark:text-dark dark:hover:bg-secondary/90 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-md">
            En savoir plus
          </Link>
        </div>
      </section>

      {/* 2. SECTION NOTRE MISSION */}
      <section className="py-16 bg-light dark:bg-zinc-900/30 border-y border-gray-100 dark:border-zinc-900 transition-colors duration-300">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Image illustrative des activités de la mission */}
            <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-lg bg-gray-100 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800">
              <img 
                src="https://aebc-cdn.b-cdn.net/Vue%20a%C3%A9rienne%20du%20bassin%20du%20Congo%20au%20niveau%20du%20Parc%20national%20d'Odzala-Kokoua%2C%20en%20R%C3%A9publique%20d%C3%A9mocratique%20du%20Congo.avif" 
                alt="Activités de reboisement et plantation AEBC" 
                className="w-full h-full object-cover" 
              />
            </div>

            {/* Descriptif textuel */}
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-primary dark:text-secondary">Notre Mission & Manifeste</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base">
                Nous nous consacrons entièrement à la protection du bassin hydrographique et forestier du Congo en conciliant rigueur scientifique, plaidoyer d'impact et inclusion directe des peuples locaux et autochtones. Notre action s'articule autour de nos piliers d'intervention stratégiques visant à assurer un avenir durable et solidaire pour ce patrimoine mondial.
              </p>
              <Link to="/notre-mission" className="inline-block px-6 py-3 bg-primary dark:bg-secondary text-white dark:text-dark font-bold uppercase text-xs tracking-widest rounded-lg shadow hover:bg-primary-light dark:hover:bg-secondary/90 transition transform hover:scale-105 active:scale-95">
                Découvrir notre manifeste
              </Link>
            </div>
            
          </div>
        </div>
      </section>

      {/* 3. SECTION ACTUALITÉS */}
      <section className="py-16 bg-white dark:bg-zinc-950 transition-colors duration-300">
        <div className="container-custom">
          <h2 className="text-2xl font-bold text-primary dark:text-secondary mb-10 tracking-wide">
            Dernières actualités
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {latestNews.map(news => (
              <div 
                key={news.id} 
                className="border border-gray-200 dark:border-[#1d3a3d] rounded-xl shadow-sm hover:shadow-md transition-all duration-300 bg-gray-50 dark:bg-[#122527] p-6 flex flex-col"
              >
                <div className="w-full h-48 bg-gray-200 dark:bg-zinc-950 rounded-lg overflow-hidden mb-4 border border-transparent dark:border-zinc-800">
                  <img src={news.image} alt={news.title} className="w-full h-full object-cover" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-1 line-clamp-2">
                  {news.title}
                </h3>
                <span className="text-sm text-primary dark:text-secondary font-medium">
                  {news.date}
                </span>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mt-3 mb-4 flex-grow">
                  {news.description}
                </p>
                <div className="flex gap-3 mt-4">
                  <Link
                    to={news.link}
                    className="px-4 py-2 bg-primary dark:bg-secondary text-white dark:text-dark rounded-lg shadow hover:bg-primary-light dark:hover:bg-secondary/90 transition text-sm font-medium"
                  >
                    Lire plus
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/actualites" className="btn-secondary dark:bg-secondary dark:text-dark dark:hover:bg-secondary/90 transition-all duration-300 transform hover:scale-105 active:scale-95">
              Voir toutes les actualités
            </Link>
          </div>
        </div>
      </section>

      {/* 4. SECTION PROJETS PHARES */}
      <section className="py-16 bg-light dark:bg-zinc-900/30 border-y border-gray-150 dark:border-zinc-900 transition-colors duration-300">
        <div className="container-custom">
          <h2 className="text-2xl font-bold text-primary dark:text-secondary mb-10 tracking-wide">
            Projets phares
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProjects.map(proj => (
              <div 
                key={proj.id} 
                className="border border-gray-200 dark:border-[#1d3a3d] rounded-xl shadow-sm hover:shadow-md transition-all duration-300 bg-white dark:bg-[#122527] p-6 flex flex-col"
              >
                {/* IMAGE AVEC BADGE STATUT */}
                <div className="w-full h-48 bg-gray-200 dark:bg-zinc-950 rounded-lg overflow-hidden mb-4 relative border border-transparent dark:border-zinc-800">
                  <img src={proj.image} alt={proj.title} className="w-full h-full object-cover" />
                  <span className={`absolute top-3 right-3 px-2 py-1 rounded text-[9px] font-black uppercase tracking-widest text-white shadow-lg ${proj.statusColor}`}>
                    {proj.status}
                  </span>
                </div>

                {/* CONTENU */}
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-1 line-clamp-2">{proj.title}</h3>
                <span className="text-[10px] text-primary dark:text-secondary font-black uppercase tracking-widest mb-3">
                  Secteur : {proj.sector}
                </span>
                
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-6 flex-grow">
                  {proj.description}
                </p>
                
                <Link to="/projets" className="text-primary dark:text-secondary font-bold text-sm hover:underline flex items-center gap-2">
                  Détails du projet <span>→</span>
                </Link>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/projets" className="btn-primary dark:bg-secondary dark:text-dark dark:hover:bg-secondary/90 transition-all duration-300 transform hover:scale-105 active:scale-95">
              Tous nos projets
            </Link>
          </div>
        </div>
      </section>

      {/* 5. SECTION RAPPORTS & PUBLICATIONS (Nouveau bloc résumé pour compléter l'accueil) */}
      <section className="py-16 bg-white dark:bg-zinc-950 transition-colors duration-300">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Colonne Gauche : Descriptif et lien de direction */}
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-primary dark:text-secondary">Rapports & Publications</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base">
                Retrouvez l'ensemble de nos rapports stratégiques, études scientifiques, mémorandums et décrets officiels produits par l'AEBC. Ces travaux documentent la transition écologique, l'accès à l'eau potable et la conservation de la biodiversité dans le Bassin du Congo.
              </p>
              <Link to="/publications" className="inline-block px-10 py-4 bg-[#305c31] text-white font-bold uppercase text-xs tracking-widest rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:opacity-90 active:scale-95 text-center">
                Consulter les publications
              </Link>
            </div>

            {/* Colonne Droite : Grille visuelle de vos rapports réels */}
            <div className="grid grid-cols-2 gap-6 max-w-lg mx-auto w-full">
              {/* Rapport Exécutif */}
              <Link to="/publications" className="border border-gray-200 dark:border-[#1d3a3d] rounded-2xl bg-white dark:bg-[#122527] p-4 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-center text-center group transform hover:-translate-y-1">
                <div className="w-full aspect-[3/4] bg-gray-100 dark:bg-zinc-950 rounded-xl overflow-hidden p-2 flex items-center justify-center border border-gray-100 dark:border-zinc-800">
                  <img src="https://aebc-cdn.b-cdn.net/aebc-publication/rapports/ressources-hydrographiques.png" alt="Rapport Exécutif" className="max-h-full max-w-full object-contain" />
                </div>
                <h4 className="font-extrabold text-gray-900 dark:text-gray-100 text-[10px] mt-3 uppercase tracking-wider line-clamp-1">Rapport Exécutif</h4>
              </Link>
              {/* Rapport d'évaluation Eau Potable */}
              <Link to="/publications" className="border border-gray-200 dark:border-[#1d3a3d] rounded-2xl bg-white dark:bg-[#122527] p-4 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-center text-center group transform hover:-translate-y-1">
                <div className="w-full aspect-[3/4] bg-gray-100 dark:bg-zinc-950 rounded-xl overflow-hidden p-2 flex items-center justify-center border border-gray-100 dark:border-zinc-800">
                  <img src="https://aebc-cdn.b-cdn.net/aebc-publication/rapports/eau-potable.png" alt="Rapport d'évaluation Eau Potable" className="max-h-full max-w-full object-contain" />
                </div>
                <h4 className="font-extrabold text-gray-900 dark:text-gray-100 text-[10px] mt-3 uppercase tracking-wider line-clamp-1">Accès Eau Potable</h4>
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* 6. SECTION GALERIE ET MÉDIATHÈQUE */}
      <section className="py-16 bg-light dark:bg-zinc-900/30 border-y border-gray-150 dark:border-zinc-900 transition-colors duration-300">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Grille de 3 images alignées sur la même ligne (sans décalage) */}
            <div className="grid grid-cols-3 gap-4">
              <div className="aspect-[3/4] rounded-xl overflow-hidden bg-gray-100 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 shadow-sm">
                <img src="https://aebc-cdn.b-cdn.net/biodiversite/Galerie-Photos/paula-robinson-r5QsqLJ3znU-unsplash.jpg" alt="Gorille de plaine" className="w-full h-full object-cover" />
              </div>
              <div className="aspect-[3/4] rounded-xl overflow-hidden bg-gray-100 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 shadow-sm">
                <img src="https://aebc-cdn.b-cdn.net/biodiversite/Galerie-Photos/wolfgang-hasselmann-7COocBblpyE-unsplash.jpg" alt="Elephant de forêt" className="w-full h-full object-cover" />
              </div>
              <div className="aspect-[3/4] rounded-xl overflow-hidden bg-gray-100 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 shadow-sm">
                <img src="https://aebc-cdn.b-cdn.net/biodiversite/Galerie-Photos/parc-lobeke-cameroun.jpg" alt="Parc National Lobéké" className="w-full h-full object-cover" />
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-primary dark:text-secondary">Médiathèque & Photothèque</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base">
                Explorez notre photothèque dédiée à la faune, la flore et aux paysages préservés du Bassin du Congo. Retrouvez également l'ensemble des ressources de notre vidéothèque d'intervention sur le terrain.
              </p>
              <Link to="/galerie" className="inline-block px-10 py-4 bg-[#305c31] text-white font-bold uppercase text-xs tracking-widest rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:opacity-90 active:scale-95 text-center">
                Explorer la galerie
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 7. SECTION AGIR AVEC NOUS (Bénévolat et Partenaires - Icônes conservées) */}
      <section className="py-16 bg-white dark:bg-zinc-950 transition-colors duration-300">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-primary dark:text-secondary mb-4">Rejoignez notre action</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Que vous soyez un particulier ou une organisation, votre engagement est précieux pour l'avenir de la biodiversité d'Afrique centrale.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Carte Bénévolat (Icône Heart conservée) */}
            <div className="bg-white dark:bg-[#122527] border border-gray-200 dark:border-[#1d3a3d] p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
              <div>
                <Heart size={32} className="text-secondary mb-4" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">Devenir Bénévole</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                  Apportez votre temps, votre expertise ou votre énergie sur le terrain pour soutenir le déploiement de nos projets communautaires et environnementaux.
                </p>
              </div>
              <Link to="/benevolat" className="w-full text-center px-6 py-3 bg-[#a6c76c] text-[#305c31] font-bold uppercase text-xs tracking-widest rounded-lg shadow-sm hover:opacity-90 transition transform hover:scale-105 active:scale-95">
                Nous rejoindre
              </Link>
            </div>

            {/* Carte Partenaires (Icône Handshake conservée) */}
            <div className="bg-white dark:bg-[#122527] border border-gray-200 dark:border-[#1d3a3d] p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
              <div>
                <Handshake size={32} className="text-secondary mb-4" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">Devenir Partenaire</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                  Associez votre institution, entreprise ou fondation à notre charte d'impact pour bâtir ensemble des solutions de conservation solides.
                </p>
              </div>
              <Link to="/partenaires" className="w-full text-center px-6 py-3 bg-[#305c31] text-white font-bold uppercase text-xs tracking-widest rounded-lg shadow-lg hover:opacity-90 transition transform hover:scale-105 active:scale-95">
                Collaborer avec nous
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* DRAPEAUX & SOCIAL */}
      <section className="py-10 bg-primary/10 dark:bg-dark/40 transition-colors duration-300">
        <div className="container-custom">
          <CountryFlags />
        </div>
      </section>

      <section className="py-16 bg-white dark:bg-zinc-950 text-center transition-colors duration-300">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-primary dark:text-secondary mb-6">
            Suivez notre action
          </h2>
          <SocialLinks showContact={false} />
        </div>
      </section>
    </div>
  )
}