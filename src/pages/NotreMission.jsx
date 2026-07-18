// src/pages/NotreMission.jsx
import React from "react";
import { Link } from "react-router-dom";

const NotreMission = () => {
  const piliers = [
    { 
      id: "Climat", 
      label: "Climat", 
      icon: "https://aebc-cdn.b-cdn.net/biodiversite/climat-change.png", 
      desc: "Lutter contre le réchauffement climatique en renforçant la résilience des écosystèmes et en appuyant les politiques de finance carbone." 
    },
    { 
      id: "Biodiversité", 
      label: "Biodiversité", 
      icon: "https://aebc-cdn.b-cdn.net/biodiversite/biodiversit%C3%A9.png", 
      desc: "Protéger la faune et la flore du Bassin du Congo à travers la restauration des habitats naturels et la lutte contre le braconnage." 
    },
    { 
      id: "Inclusion", 
      label: "Inclusion Sociale", 
      icon: "https://aebc-cdn.b-cdn.net/biodiversite/inclusion-sociale.png", 
      desc: "Garantir les droits des peuples autochtones et intégrer les femmes et les jeunes dans la gouvernance environnementale." 
    },
    { 
      id: "Eau", 
      label: "Eau", 
      icon: "https://aebc-cdn.b-cdn.net/Logo-Banni%C3%A8re/eau-logo.png", 
      desc: "Préserver les ressources hydriques et protéger les bassins versants pour assurer un accès durable à l'eau potable." 
    },
    { 
      id: "Tourbières", 
      label: "Tourbières", 
      icon: "https://aebc-cdn.b-cdn.net/Logo-Banni%C3%A8re/Tourbi%C3%A8res-logo.png", 
      desc: "Sanctuariser les tourbières, véritables puits de carbone mondiaux, essentiels pour l'équilibre climatique de la planète." 
    },
    { 
      id: "Agroécologie", 
      label: "Agroécologie", 
      icon: "https://aebc-cdn.b-cdn.net/Logo-Banni%C3%A8re/Agro%C3%A9cologie-logo.png", 
      desc: "Promouvoir une agriculture durable qui respecte les cycles naturels et assure la sécurité alimentaire des communautés." 
    },
  ];

  return (
    <main className="bg-white dark:bg-zinc-950 transition-colors duration-300 min-h-screen">
      
      {/* HERO SECTION */}
      <section
        className="relative w-full h-[410px] bg-cover bg-center flex items-center"
        style={{
          backgroundImage:
            "url('https://aebc-cdn.b-cdn.net/Reboisement/pexels-jose-carlos-alexandre-2433751-26974534.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative container-custom text-white">
          <h1 className="text-4xl md:text-5xl font-bold mt-4 drop-shadow-lg tracking-tighter">Notre mission</h1>
          <p className="mt-4 max-w-2xl text-lg opacity-90 leading-relaxed drop-shadow">
            Protéger le Bassin du Congo grâce à une approche scientifique, inclusive et durable, en agissant sur ses écosystèmes, ses communautés et ses ressources vitales. Notre mission s’appuie sur des piliers essentiels — climat, biodiversité, inclusion sociale, eau, tourbières et agroécologie — pour préserver durablement le second poumon vert de la planète.
          </p>
        </div>
      </section>

      {/* SECTION VISION & VALEURS (Cellules de fond #122527 et contour #1d3a3d en mode sombre) */}
      <section className="py-16 bg-gray-50 dark:bg-zinc-900/30 border-b border-gray-200 dark:border-zinc-900 transition-colors duration-300">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Notre Vision */}
            <div className="bg-white dark:bg-[#122527] p-8 rounded-xl border border-gray-200 dark:border-[#1d3a3d] shadow-sm transition-all duration-300">
              <h2 className="text-sm font-black text-primary dark:text-secondary uppercase tracking-widest mb-4">Notre Vision</h2>
              <p className="text-xl font-semibold text-gray-900 dark:text-gray-100 leading-tight">
                "Un Bassin du Congo où la biodiversité est préservée et où les populations locales sont les acteurs majeurs d'un développement durable."
              </p>
            </div>

            {/* Nos Valeurs */}
            <div className="bg-white dark:bg-[#122527] p-8 rounded-xl border border-gray-200 dark:border-[#1d3a3d] shadow-sm transition-all duration-300">
              <h2 className="text-sm font-black text-primary dark:text-secondary uppercase tracking-widest mb-4">Nos Valeurs</h2>
              <div className="grid grid-cols-2 gap-4">
                {["Transparence", "Rigueur Scientifique", "Inclusion", "Durabilité"].map((val, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary dark:bg-secondary"></div>
                    <span className="text-gray-700 dark:text-gray-300 font-bold text-xs uppercase tracking-tighter">{val}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION LES 6 PILIERS D'ACTION (Cellules de fond #122527 et contour #1d3a3d en mode sombre) */}
      <section className="py-20">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-2xl font-black text-primary dark:text-secondary uppercase tracking-widest">Nos 6 Piliers Stratégiques</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-2 font-medium">Les axes fondamentaux qui guident chacune de nos interventions sur le terrain.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {piliers.map((pilier) => (
              <div 
                key={pilier.id} 
                className="border border-gray-200 dark:border-[#1d3a3d] rounded-xl shadow-sm hover:shadow-md transition bg-gray-50 dark:bg-[#122527] p-8 flex flex-col items-center text-center group transition-all duration-300"
              >
                <div className="w-20 h-20 mb-6 transition-transform group-hover:scale-110">
                  <img src={pilier.icon} alt={pilier.label} className="w-full h-full object-contain" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4 uppercase tracking-tighter">
                  {pilier.label}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                  {pilier.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION APPEL À L'ACTION (BOUTONS SYNCHRONISÉS & FOND #0C0C0C) */}
      <section style={{ backgroundColor: "#0C0C0C" }} className="py-20 text-white text-center">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold text-primary dark:text-secondary mb-8 uppercase tracking-tighter">Prêt à soutenir notre mission ?</h2>
          
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            {/* Bouton "Nous contacter" - Style d'origine "Proposer un partenariat" (rounded-lg / px-10 py-4 / uppercase text-xs) */}
            <Link 
              to="/contact" 
              className="px-10 py-4 bg-[#305c31] text-white font-bold uppercase text-xs tracking-widest rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:opacity-90 active:scale-95 text-center flex items-center justify-center"
            >
              Nous contacter
            </Link>

            {/* Bouton "Explorer nos projets" - Style d'origine "Notre Mission" (rounded-lg / px-10 py-4 / bg-[#a6c76c] / text-primary) */}
            <Link 
              to="/projets" 
              className="px-10 py-4 bg-[#a6c76c] text-[#305c31] font-bold uppercase text-xs tracking-widest rounded-lg shadow-sm transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:opacity-90 active:scale-95 text-center flex items-center justify-center"
            >
              Explorer nos projets
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default NotreMission;