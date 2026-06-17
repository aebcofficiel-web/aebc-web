// src/pages/Accueil.jsx
import HeroSection from '../components/sections/HeroSection'
import CountryFlags from '../components/sections/CountryFlags'
import SocialLinks from '../components/sections/SocialLinks'
import { Link } from 'react-router-dom'

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
    <div>
      <HeroSection />

      {/* SECTION QUI SOMMES-NOUS */}
      <section className="py-16 bg-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold text-primary">Qui sommes-nous ?</h2>
          <p className="mt-4 max-w-3xl mx-auto text-gray-700 leading-relaxed">
            L’AEBC œuvre pour la préservation du Bassin du Congo, second poumon vert de la planète. 
            Nous agissons concrètement pour la conservation des forêts, la protection de la faune et le développement des populations locales.
          </p>
          <Link to="/a-propos" className="inline-block mt-6 btn-primary">
            En savoir plus
          </Link>
        </div>
      </section>

      {/* SECTION ACTUALITÉS */}
      <section className="py-16 bg-light">
        <div className="container-custom">
          <h2 className="text-2xl font-bold text-primary mb-10 tracking-wide">
            Dernières actualités
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {latestNews.map(news => (
              <div key={news.id} className="border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition bg-gray-50 p-6 flex flex-col">
                <div className="w-full h-48 bg-gray-200 rounded-lg overflow-hidden mb-4">
                  <img src={news.image} alt={news.title} className="w-full h-full object-cover" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-1 line-clamp-2">
                  {news.title}
                </h3>
                <span className="text-sm text-primary font-medium">
                  {news.date}
                </span>
                <p className="text-gray-600 text-sm leading-relaxed mt-3 mb-4 flex-grow">
                  {news.description}
                </p>
                <div className="flex gap-3 mt-4">
                  <Link
                    to={news.link}
                    className="px-4 py-2 bg-primary text-white rounded-lg shadow hover:bg-primary/90 transition text-sm font-medium"
                  >
                    Lire plus
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/actualites" className="btn-secondary">
              Voir toutes les actualités
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION PROJETS PHARES (MIS À JOUR AVEC PROJETS RÉELS) */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <h2 className="text-2xl font-bold text-primary mb-10 tracking-wide">
            Projets phares
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProjects.map(proj => (
              <div key={proj.id} className="border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition bg-gray-50 p-6 flex flex-col">
                {/* IMAGE AVEC BADGE STATUT */}
                <div className="w-full h-48 bg-gray-200 rounded-lg overflow-hidden mb-4 relative">
                  <img src={proj.image} alt={proj.title} className="w-full h-full object-cover" />
                  <span className={`absolute top-3 right-3 px-2 py-1 rounded text-[9px] font-black uppercase tracking-widest text-white shadow-lg ${proj.statusColor}`}>
                    {proj.status}
                  </span>
                </div>

                {/* CONTENU */}
                <h3 className="text-xl font-semibold text-gray-900 mb-1 line-clamp-2">{proj.title}</h3>
                <span className="text-[10px] text-primary font-black uppercase tracking-widest mb-3">
                  Secteur : {proj.sector}
                </span>
                
                <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-grow">{proj.description}</p>
                
                <Link to="/projets" className="text-primary font-bold text-sm hover:underline flex items-center gap-2">
                  Détails du projet <span>→</span>
                </Link>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/projets" className="btn-primary">
              Tous nos projets
            </Link>
          </div>
        </div>
      </section>

      {/* DRAPEAUX & SOCIAL */}
      <section className="py-10 bg-primary/10">
        <div className="container-custom">
          <CountryFlags />
        </div>
      </section>

      <section className="py-16 bg-white text-center">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-primary mb-6">
            Suivez notre action
          </h2>
          <SocialLinks showContact={false} />
        </div>
      </section>
    </div>
  )
}