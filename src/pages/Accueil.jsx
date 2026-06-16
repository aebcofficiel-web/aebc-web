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
  { id: 1, title: "Éducation environnementale", description: "Programme de sensibilisation dans 50 écoles du Congo pour la protection de la biodiversité." },
  { id: 2, title: "Lutte anti-braconnage", description: "Formation et équipement des éco-gardes pour la surveillance des parcs nationaux en RDC." },
  { id: 3, title: "Agroforesterie", description: "Soutien aux communautés rurales pour développer une agriculture durable et respectueuse des forêts." },
]

export default function Accueil() {
  return (
    <div>
      <HeroSection />

      {/* SECTION QUI SOMMES-NOUS (D'ORIGINE) */}
      <section className="py-16 bg-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold text-primary">Qui sommes-nous ?</h2>
          <p className="mt-4 max-w-3xl mx-auto text-gray-700">
            L’AEBC œuvre pour la préservation du Bassin du Congo, second poumon vert de la planète. 
            Nous agissons concrètement pour les forêts, la faune et les populations locales.
          </p>
          <Link to="/a-propos" className="inline-block mt-6 btn-primary">
            En savoir plus
          </Link>
        </div>
      </section>

      {/* SECTION ACTUALITÉS (STYLE CARTES PUBLICATIONS) */}
      <section className="py-16 bg-light">
        <div className="container-custom">
          <h2 className="text-2xl font-bold text-primary mb-10 tracking-wide">
            Dernières actualités
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {latestNews.map(news => (
              <div key={news.id} className="border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition bg-gray-50 p-6 flex flex-col">
                {/* IMAGE / MINIATURE */}
                <div className="w-full h-48 bg-gray-200 rounded-lg overflow-hidden mb-4">
                  <img src={news.image} alt={news.title} className="w-full h-full object-cover" />
                </div>

                {/* TITRE */}
                <h3 className="text-xl font-semibold text-gray-900 mb-1 line-clamp-2">
                  {news.title}
                </h3>

                <span className="text-sm text-primary font-medium">
                  {news.date}
                </span>

                {/* DESCRIPTION */}
                <p className="text-gray-600 text-sm leading-relaxed mt-3 mb-4 flex-grow">
                  {news.description}
                </p>

                {/* BOUTON (STYLE PUBLICATION) */}
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

      {/* SECTION PROJETS PHARES (STYLE CARTES PUBLICATIONS) */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <h2 className="text-2xl font-bold text-primary mb-10 tracking-wide">
            Projets phares
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProjects.map(proj => (
              <div key={proj.id} className="border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition bg-gray-50 p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 text-primary text-2xl">
                  🌱
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{proj.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">{proj.description}</p>
                <Link to="/projets" className="text-primary font-bold text-sm hover:underline">
                  Voir le projet →
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

      {/* DRAPEAUX & SOCIAL (D'ORIGINE) */}
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