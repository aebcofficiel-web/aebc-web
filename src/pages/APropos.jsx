// src/pages/APropos.jsx
import CountryFlags from '../components/sections/CountryFlags'

export default function APropos() {
  // Couleur de fond "Soft White" (blanc cassé) pour éviter l'éblouissement
  const softBg = "bg-slate-50/50"; 

  return (
    <div className={softBg}>
      {/* HERO — Même style que Publications/Accueil */}
      <div
        className="relative w-full h-[410px] bg-cover bg-center flex items-center"
        style={{
          backgroundImage: "url('https://aebc-cdn.b-cdn.net/biodiversite/geranimo-KsMD_tAdjg0-unsplash.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative container-custom">
          <h1 className="text-4xl font-bold text-white mb-4 drop-shadow-lg">
            À propos de l’AEBC
          </h1>
          <p className="text-white text-lg leading-relaxed max-w-3xl drop-shadow">
            L’Association Environnement Bassin du Congo (AEBC) œuvre pour la protection 
            des écosystèmes, la préservation de la biodiversité et le bien‑être des 
            communautés locales et autochtones.
          </p>
        </div>
      </div>

      {/* SECTION VISION ET STRATÉGIE — Style Cartes "Publications" */}
      <section className="py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="border border-gray-200 rounded-xl bg-white p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-primary mb-4">Notre vision</h2>
              <p className="text-gray-600 leading-relaxed italic mb-4 text-sm">
                Une perspective à long terme pour l'équilibre planétaire.
              </p>
              <p className="text-gray-700 leading-relaxed">
                L’écosystème forestier du Bassin du Congo joue un rôle vital dans la régulation du climat mondial. 
                La vision de l’AEBC est la gestion durable de cet écosystème en prenant en compte les dimensions 
                environnementales, sociales et économiques afin de préserver la biodiversité.
              </p>
            </div>
            <div className="border border-gray-200 rounded-xl bg-white p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-primary mb-4">Notre stratégie</h2>
              <p className="text-gray-600 leading-relaxed italic mb-4 text-sm">
                Des leviers d'action concrets pour un impact mesurable.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Elle repose sur un plan d’action pour la gestion durable et la protection du Bassin du Congo. 
                Nous prévoyons des mécanismes de suivi des activités industrielles afin de limiter leurs impacts 
                et développons des activités génératrices de revenus durables.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION OBJECTIFS — Cartes Gris Pâle Léger */}
      <section className="py-16 bg-white border-y border-gray-100">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-primary mb-2">Nos objectifs</h2>
          <p className="text-gray-500 mb-8 italic">Nos priorités pour transformer les défis en solutions durables.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              "Protéger les forêts pour le bien-être des communautés locales.",
              "Promouvoir le développement durable et l'égalité des genres.",
              "Contribuer à la mise en œuvre des politiques publiques.",
              "Sensibiliser les populations sur les bonnes pratiques de gestion."
            ].map((obj, i) => (
              <div key={i} className="bg-light p-4 border border-gray-200 rounded-lg flex items-center gap-3">
                <div className="w-2 h-2 bg-secondary rounded-full shrink-0"></div>
                <p className="text-gray-700 font-medium">{obj}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION VALEURS FONDAMENTALES — Gris pâle premium avec descriptions */}
      <section className="py-16">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-primary mb-2 text-center">Nos valeurs fondamentales</h2>
          <p className="text-gray-500 mb-10 text-center italic">Les piliers éthiques qui guident chacune de nos décisions.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { titre: "Engagement", desc: "Dévouement total envers la sauvegarde de la biodiversité et le développement durable des communautés forestières." },
              { titre: "Équité", desc: "Assurer une répartition juste des ressources et des opportunités, sans distinction de genre ou d'origine." },
              { titre: "Coopération", desc: "Favoriser le travail collectif et les partenariats solides entre les nations pour un impact global." },
              { titre: "Bonne gouvernance", desc: "Agir avec une transparence absolue et une responsabilité exemplaire dans la gestion de nos projets." },
              { titre: "Respect", desc: "Valoriser la dignité humaine, les savoirs ancestraux autochtones et l'intégrité de notre environnement." },
              { titre: "Intégrité", desc: "Maintenir des standards éthiques élevés et une honnêteté rigoureuse dans toutes nos actions." }
            ].map((valeur, i) => (
              <div key={i} className="border border-gray-200 bg-white p-6 rounded-xl hover:shadow-md transition-shadow">
                <h3 className="font-bold text-primary mb-3 text-lg">{valeur.titre}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{valeur.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION DOMAINES D’INTERVENTION — Gris pâle, très léger */}
      <section className="py-16 bg-light border-y border-gray-200">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-primary mb-2">Domaines d’intervention</h2>
          <p className="text-gray-500 mb-8 italic">Une expertise multisectorielle pour une protection complète du Bassin.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              "Environnement et conservation",
              "Santé, économie et éducation",
              "Agronomie et foresterie",
              "Changement climatique",
              "Forêt et biodiversité",
              "Sécurité alimentaire",
              "Égalité homme-femme",
              "Lutte contre les pollutions"
            ].map((domaine, i) => (
              <div key={i} className="p-4 bg-white border border-gray-100 rounded-lg shadow-sm text-center">
                <p className="text-gray-700 text-xs font-bold uppercase tracking-wider">{domaine}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LE BASSIN DU CONGO */}
      <section className="py-16">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-primary mb-2">Le Bassin du Congo</h2>
          <p className="text-gray-500 mb-6 italic text-sm">Le second poumon vert de la planète au cœur de nos préoccupations.</p>
          <p className="text-gray-700 leading-relaxed max-w-4xl mb-10">
            Deuxième plus grande forêt tropicale du monde, le Bassin du Congo couvre six pays
            et joue un rôle essentiel dans la régulation du climat mondial. L’AEBC agit dans chacun 
            de ces pays pour préserver les forêts, les tourbières et la faune.
          </p>
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
            <CountryFlags />
          </div>
        </div>
      </section>

      {/* APPEL À L’ENGAGEMENT — Boutons style Accueil */}
      <section className="py-20 bg-dark text-white text-center">
        <div className="container-custom">
          <h2 className="text-3xl font-bold mb-6">Notre engagement</h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-10">
            Nous croyons qu'un Bassin du Congo protégé est la clé d'un avenir durable pour les
            générations présentes et futures. Rejoignez-nous pour agir ensemble.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="/benevolat" className="btn-primary px-8 py-3">
              Devenir bénévole
            </a>
            <a href="/don" className="btn-secondary px-8 py-3">
              Soutenir nos projets
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}