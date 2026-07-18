// src/pages/APropos.jsx
import CountryFlags from '../components/sections/CountryFlags'
import { 
  CheckCircle2, 
  Heart, 
  Scale, 
  Users, 
  ShieldCheck, 
  Award, 
  TreeDeciduous, 
  GraduationCap, 
  Sprout, 
  CloudSun, 
  Leaf, 
  Apple, 
  Activity, 
  Droplets 
} from 'lucide-react'

// Données des 5 piliers d'objectifs redéfinis avec vos icônes CDN officielles
const PILLIERS_OBJECTIFS = [
  {
    id: 1,
    title: "Climat",
    iconUrl: "https://aebc-cdn.b-cdn.net/biodiversite/climat-change.png",
    actions: [
      "Agir face au changement climatique par des actions locales et communautaires.",
      "Promouvoir la résilience des populations face aux impacts environnementaux."
    ]
  },
  {
    id: 2,
    title: "Biodiversité",
    iconUrl: "https://aebc-cdn.b-cdn.net/biodiversite/biodiversit%C3%A9.png",
    actions: [
      "Préserver la richesse du vivant et protéger les forêts pour le bien‑être des communautés locales.",
      "Lutter contre le braconnage et la dégradation des écosystèmes naturels."
    ]
  },
  {
    id: 3,
    title: "Inclusion sociale",
    iconUrl: "https://aebc-cdn.b-cdn.net/biodiversite/inclusion-sociale.png",
    actions: [
      "Promouvoir l’équité, la solidarité et l’égalité des genres dans toutes nos initiatives.",
      "Renforcer la participation des femmes, des jeunes et des peuples autochtones à la gouvernance environnementale."
    ]
  },
  {
    id: 4,
    title: "Eau",
    iconUrl: "https://aebc-cdn.b-cdn.net/Logo-Banni%C3%A8re/eau-logo.png",
    actions: [
      "Protéger et gérer durablement les ressources hydriques du Bassin du Congo.",
      "Soutenir la mise en œuvre de politiques publiques pour l’accès équitable à l’eau potable."
    ]
  },
  {
    id: 5,
    title: "Tourbières & Agroécologie",
    iconUrl: "https://aebc-cdn.b-cdn.net/Logo-Banni%C3%A8re/Tourbi%C3%A8res-logo.png",
    actions: [
      "Préserver les tourbières comme puits de carbone essentiels et zones de biodiversité.",
      "Promouvoir une agriculture durable et résiliente fondée sur les principes de l’agroécologie."
    ]
  }
];

export default function APropos() {
  // Arrière-plan s'adaptant au mode sombre (Zinc 950) pour faire ressortir les contours des cellules
  const softBg = "bg-slate-50/50 dark:bg-zinc-950 transition-colors duration-300"; 

  return (
    <div className={softBg}>
      {/* HERO BANNER */}
      <div
        className="relative w-full h-[450px] bg-cover bg-center flex items-center"
        style={{
          backgroundImage: "url('https://aebc-cdn.b-cdn.net/biodiversite/geranimo-KsMD_tAdjg0-unsplash.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/50"></div>
        <div className="relative container-custom">
          <span className="inline-block px-3 py-1 bg-secondary/20 border border-secondary text-secondary text-xs font-black uppercase tracking-widest rounded-full mb-3">
            Qui sommes-nous ?
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            À propos de l’AEBC
          </h1>
          <p className="text-gray-200 text-lg leading-relaxed max-w-3xl drop-shadow opacity-95">
            L’Association Environnement Bassin du Congo (AEBC) œuvre au quotidien pour la protection 
            des écosystèmes, la préservation de la biodiversité et le bien‑être des 
            communautés locales et autochtones du second poumon vert de la planète.
          </p>
        </div>
      </div>

      {/* SECTION VISION ET STRATÉGIE (Fonds des cartes #122527 et contours #1d3a3d en mode sombre) */}
      <section className="py-20">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Notre Vision */}
            <div className="border border-primary/30 dark:border-[#1d3a3d] rounded-xl bg-white dark:bg-[#122527] p-8 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
              <h2 className="text-2xl font-black text-primary dark:text-secondary tracking-tight mb-4">Notre vision</h2>
              <p className="text-gray-500 leading-relaxed italic mb-4 text-xs font-semibold uppercase tracking-wider">
                Une perspective à long terme pour l'équilibre planétaire.
              </p>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                L’écosystème forestier du Bassin du Congo joue un rôle vital dans la régulation du climat mondial. 
                La vision de l’AEBC est la gestion durable de cet écosystème en prenant en compte les dimensions 
                environnementales, sociales et économiques afin de préserver définitivement sa biodiversité.
              </p>
            </div>

            {/* Notre Stratégie */}
            <div className="border border-primary/30 dark:border-[#1d3a3d] rounded-xl bg-white dark:bg-[#122527] p-8 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
              <h2 className="text-2xl font-black text-primary dark:text-secondary tracking-tight mb-4">Notre stratégie</h2>
              <p className="text-gray-500 leading-relaxed italic mb-4 text-xs font-semibold uppercase tracking-wider">
                Des leviers d'action concrets pour un impact mesurable.
              </p>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Elle repose sur un plan d’action direct pour la gestion durable and la protection du Bassin du Congo. 
                Nous prévoyons des mécanismes de suivi des activités industrielles afin de limiter leurs impacts 
                et développons des activités génératrices de revenus durables pour les communautés locales.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION OBJECTIFS */}
      <section className="py-20 bg-white dark:bg-zinc-950 border-y border-gray-150 dark:border-zinc-900 transition-colors duration-300">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[11px] font-black text-secondary uppercase tracking-[0.3em]">
              Nos priorités
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-primary dark:text-secondary mt-1 mb-2 tracking-tight">
              Nos objectifs
            </h2>
            <p className="text-gray-500 dark:text-gray-400 italic text-sm">
              Nos axes d'intervention prioritaires pour transformer les défis du Bassin du Congo en solutions durables.
            </p>
          </div>
          
          {/* Les 5 Piliers Stratégiques (Fonds des cartes #122527 et contours #1d3a3d en mode sombre) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {PILLIERS_OBJECTIFS.map((pillar) => (
              <div 
                key={pillar.id} 
                className="bg-light/40 dark:bg-[#122527] border border-primary/30 dark:border-[#1d3a3d] p-6 rounded-2xl flex flex-col justify-between hover:shadow-md transition-all duration-300"
              >
                <div>
                  {/* En-tête du pilier avec l'icône transparente */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 flex items-center justify-center shrink-0">
                      <img 
                        src={pillar.iconUrl} 
                        alt={`Icône ${pillar.title}`} 
                        className="w-full h-full object-contain" 
                        loading="lazy"
                      />
                    </div>
                    <h3 className="font-extrabold text-primary dark:text-secondary text-base leading-tight">
                      {pillar.title}
                    </h3>
                  </div>
                  
                  {/* Liste d'actions */}
                  <ul className="space-y-4">
                    {pillar.actions.map((action, idx) => (
                      <li key={idx} className="flex gap-2 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                        <span className="text-[#305c31] dark:text-secondary font-bold mt-0.5 shrink-0">•</span>
                        <span>{action}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Synthèse institutionnelle */}
          <div className="mt-16 bg-[#2c5f2d]/5 dark:bg-[#122527]/40 border border-primary/30 dark:border-[#1d3a3d] rounded-2xl p-8 max-w-4xl mx-auto text-center transition-colors duration-300">
            <h3 className="text-xl font-black text-primary dark:text-secondary mb-3">Synthèse institutionnelle</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm max-w-2xl mx-auto mb-6">
              L’AEBC agit au quotidien pour construire un Bassin du Congo durable et solidaire, en focalisant ses efforts sur :
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto text-left">
              <div className="flex items-start gap-2 text-xs text-gray-700 dark:text-gray-300 font-semibold">
                <span className="text-secondary font-extrabold mt-0.5 shrink-0">✓</span>
                <span>La protection du climat et des écosystèmes</span>
              </div>
              <div className="flex items-start gap-2 text-xs text-gray-700 dark:text-gray-300 font-semibold">
                <span className="text-secondary font-extrabold mt-0.5 shrink-0">✓</span>
                <span>L’inclusion sociale et l’égalité</span>
              </div>
              <div className="flex items-start gap-2 text-xs text-gray-700 dark:text-gray-300 font-semibold">
                <span className="text-secondary font-extrabold mt-0.5 shrink-0">✓</span>
                <span>La gestion durable de l’eau et des tourbières</span>
              </div>
              <div className="flex items-start gap-2 text-xs text-gray-700 dark:text-gray-300 font-semibold">
                <span className="text-secondary font-extrabold mt-0.5 shrink-0">✓</span>
                <span>Le développement d’une agriculture respectueuse du vivant</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION VALEURS FONDAMENTALES (Fonds des cartes #122527 et contours #1d3a3d en mode sombre) */}
      <section className="py-20">
        <div className="container-custom">
          <h2 className="text-3xl font-black text-primary dark:text-secondary mb-2 text-center tracking-tight">Nos valeurs fondamentales</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-12 text-center italic">Les piliers éthiques qui guident chacune de nos décisions.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { titre: "Engagement", icon: <Heart size={22} />, desc: "Dévouement total envers la sauvegarde de la biodiversité et le développement durable des communautés forestières." },
              { titre: "Équité", icon: <Scale size={22} />, desc: "Assurer une répartition juste des ressources et des opportunités, sans distinction de genre ou d'origine." },
              { titre: "Coopération", icon: <Users size={22} />, desc: "Favoriser le travail collectif et les partenariats solides entre les nations pour un impact global." },
              { titre: "Bonne gouvernance", icon: <ShieldCheck size={22} />, desc: "Agir avec une transparence absolue et une responsabilité exemplaire dans la gestion de nos projets." },
              { titre: "Respect", icon: <Leaf size={22} />, desc: "Valoriser la dignité humaine, les savoirs ancestraux autochtones et l'intégrité de notre environnement." },
              { titre: "Intégrité", icon: <Award size={22} />, desc: "Maintenir des standards éthiques élevés et une honnêteté rigoureuse dans toutes nos actions." }
            ].map((valeur, i) => (
              <div key={i} className="border border-primary/30 dark:border-[#1d3a3d] bg-white dark:bg-[#122527] p-6 rounded-2xl hover:shadow-md transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-secondary/10 dark:bg-[#1b3b1c] text-primary dark:text-secondary flex items-center justify-center mb-4">
                    {valeur.icon}
                  </div>
                  <h3 className="font-bold text-primary dark:text-secondary mb-3 text-lg">{valeur.titre}</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{valeur.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION DOMAINES D’INTERVENTION (Fonds des cartes #122527 et contours #1d3a3d en mode sombre) */}
      <section className="py-20 bg-light dark:bg-zinc-950 border-y border-gray-200 dark:border-zinc-900 transition-colors duration-300">
        <div className="container-custom">
          <h2 className="text-3xl font-black text-primary dark:text-secondary mb-2 tracking-tight">Domaines d’intervention</h2>
          <p className="text-gray-500 mb-10 italic">Une expertise multisectorielle pour une protection complète du Bassin.</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: "Environnement et conservation", icon: <TreeDeciduous size={24} /> },
              { label: "Santé, économie et éducation", icon: <GraduationCap size={24} /> },
              { label: "Agronomie et foresterie", icon: <Sprout size={24} /> },
              { label: "Changement climatique", icon: <CloudSun size={24} /> },
              { label: "Forêt et biodiversité", icon: <Leaf size={24} /> },
              { label: "Sécurité alimentaire", icon: <Apple size={24} /> },
              { label: "Égalité homme-femme", icon: <Activity size={24} /> },
              { label: "Lutte contre les pollutions", icon: <Droplets size={24} /> }
            ].map((domaine, i) => (
              <div key={i} className="p-6 bg-white dark:bg-[#122527] border border-primary/30 dark:border-[#1d3a3d] rounded-2xl shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                  {domaine.icon}
                </div>
                <p className="text-primary dark:text-secondary text-xs font-extrabold uppercase tracking-widest leading-relaxed">
                  {domaine.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LE BASSIN DU CONGO */}
      <section className="py-20">
        <div className="container-custom">
          {/* En-tête centré */}
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-[11px] font-black text-secondary uppercase tracking-[0.3em]">
              Notre périmètre d'action
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-primary dark:text-secondary mt-1 mb-2 tracking-tight">Le Bassin du Congo</h2>
            <p className="text-gray-500 dark:text-gray-400 italic text-sm">Le second poumon vert de la planète au cœur de nos préoccupations.</p>
          </div>
          
          {/* Paragraphe centré */}
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base text-center max-w-4xl mx-auto mb-12">
            Deuxième plus grande forêt tropicale du monde après l'Amazonie, le Bassin du Congo couvre six pays d'Afrique centrale 
            et joue un rôle de premier plan dans la régulation du climat mondial en séquestrant des gigatonnes de carbone. 
            L’AEBC déploie ses équipes et ses initiatives dans chacun de ces pays pour préserver durablement les forêts primaires, 
            les tourbières critiques et la faune emblématique de cette région.
          </p>
          
          {/* 1. Les 4 Cartes statistiques alignées en haut (Fonds des cartes #122527 et contours #1d3a3d en mode sombre) */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto mb-10">
            <div className="bg-white dark:bg-[#122527] border border-primary/30 dark:border-[#1d3a3d] p-6 rounded-2xl text-center shadow-sm hover:shadow-md transition-shadow">
              <span className="block text-4xl font-black text-primary dark:text-secondary mb-1">2e</span>
              <span className="text-[10px] text-gray-500 dark:text-gray-400 font-extrabold uppercase tracking-wider">Poumon vert mondial</span>
            </div>
            <div className="bg-white dark:bg-[#122527] border border-primary/30 dark:border-[#1d3a3d] p-6 rounded-2xl text-center shadow-sm hover:shadow-md transition-shadow">
              <span className="block text-4xl font-black text-primary dark:text-secondary mb-1">220M</span>
              <span className="text-[10px] text-gray-500 dark:text-gray-400 font-extrabold uppercase tracking-wider">Hectares de forêts</span>
            </div>
            <div className="bg-white dark:bg-[#122527] border border-primary/30 dark:border-[#1d3a3d] p-6 rounded-2xl text-center shadow-sm hover:shadow-md transition-shadow">
              <span className="block text-4xl font-black text-primary dark:text-secondary mb-1">6</span>
              <span className="text-[10px] text-gray-500 dark:text-gray-400 font-extrabold uppercase tracking-wider">Pays d'intervention</span>
            </div>
            <div className="bg-white dark:bg-[#122527] border border-primary/30 dark:border-[#1d3a3d] p-6 rounded-2xl text-center shadow-sm hover:shadow-md transition-shadow">
              <span className="block text-4xl font-black text-primary dark:text-secondary mb-1">10k+</span>
              <span className="text-[10px] text-gray-500 dark:text-gray-400 font-extrabold uppercase tracking-wider">Espèces de plantes</span>
            </div>
          </div>

          {/* 2. La carte des flags en bas (Fonds des cartes #122527 et contours #1d3a3d en mode sombre) */}
          <div className="max-w-3xl mx-auto">
            <div className="bg-white dark:bg-[#122527] border border-primary/30 dark:border-[#1d3a3d] p-6 rounded-2xl shadow-sm transition-colors duration-300">
              <CountryFlags />
            </div>
          </div>
        </div>
      </section>

      {/* APPEL À L’ENGAGEMENT */}
      <section style={{ backgroundColor: "#0C0C0C" }} className="py-24 text-white text-center">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-6 tracking-tight">Agissons ensemble pour le Bassin du Congo</h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed text-base">
            Nous croyons qu'un Bassin du Congo protégé est la clé d'un avenir durable pour les
            générations présentes et futures. Rejoignez-nous pour faire la différence sur le terrain.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            {/* Bouton "Devenir bénévole" */}
            <a 
              href="/benevolat" 
              className="px-10 py-4 bg-[#a6c76c] text-[#305c31] font-bold uppercase text-xs tracking-widest rounded-lg shadow-sm transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:opacity-90 active:scale-95 text-center inline-block"
            >
              Devenir bénévole
            </a>
            {/* Bouton "Soutenir nos projets" */}
            <a 
              href="/don" 
              className="px-10 py-4 bg-[#305c31] text-white font-bold uppercase text-xs tracking-widest rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:opacity-90 active:scale-95 text-center inline-block"
            >
              Soutenir nos projets
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}