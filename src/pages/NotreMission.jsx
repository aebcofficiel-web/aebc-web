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
    <main className="bg-white">
      {/* HERO SECTION */}
      <section
        className="relative w-full h-[410px] bg-cover bg-center flex items-center"
        style={{
          backgroundImage:
            "url('https://aebc-cdn.b-cdn.net/biodiversite/heather-wilde-fpZRaTl7unI-unsplash.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative container-custom text-white">
          {/*<span className="text-xs font-black uppercase tracking-[0.3em] bg-[#265329] px-3 py-1 rounded-full shadow-lg">Manifeste</span>*/}
          <h1 className="text-4xl md:text-5xl font-bold mt-4 drop-shadow-lg tracking-tighter">Notre mission</h1>
          <p className="mt-4 max-w-2xl text-lg opacity-90 leading-relaxed drop-shadow">
            L'AEBC se consacre à la protection du second poumon vert de la planète en conciliant rigueur scientifique et inclusion communautaire.
          </p>
        </div>
      </section>

      {/* SECTION VISION & VALEURS */}
      <section className="py-16 bg-gray-50 border-b border-gray-200">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
              <h2 className="text-sm font-black text-primary uppercase tracking-widest mb-4">Notre Vision</h2>
              <p className="text-xl font-semibold text-gray-900 leading-tight">
                "Un Bassin du Congo où la biodiversité est préservée et où les populations locales sont les acteurs majeurs d'un développement durable."
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
              <h2 className="text-sm font-black text-primary uppercase tracking-widest mb-4">Nos Valeurs</h2>
              <div className="grid grid-cols-2 gap-4">
                {["Transparence", "Rigueur Scientifique", "Inclusion", "Durabilité"].map((val, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                    <span className="text-gray-700 font-bold text-xs uppercase tracking-tighter">{val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION LES 6 PILIERS D'ACTION */}
      <section className="py-20">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-2xl font-black text-primary uppercase tracking-widest">Nos 6 Piliers Stratégiques</h2>
            <p className="text-gray-500 mt-2 font-medium">Les axes fondamentaux qui guident chacune de nos interventions sur le terrain.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {piliers.map((pilier) => (
              <div 
                key={pilier.id} 
                className="border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition bg-gray-50 p-8 flex flex-col items-center text-center group"
              >
                <div className="w-20 h-20 mb-6 transition-transform group-hover:scale-110">
                  <img src={pilier.icon} alt={pilier.label} className="w-full h-full object-contain" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 uppercase tracking-tighter">
                  {pilier.label}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {pilier.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION APPEL À L'ACTION (BOUTONS SYNCHRONISÉS) */}
      <section className="py-20 bg-gray-50 border-t border-gray-200">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold text-primary mb-8 uppercase tracking-tighter">Prêt à soutenir notre mission ?</h2>
          
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            {/* Bouton Vert Foncé - Identique à "Tous nos projets" */}
            <Link 
              to="/contact" 
              className="px-6 py-2.5 bg-[#265329] text-white font-medium rounded-lg shadow-sm hover:bg-[#1d3f1f] transition duration-200 text-sm flex items-center justify-center"
            >
              Nous contacter
            </Link>

            {/* Bouton Vert Pâle - Identique à "Voir toutes les actualités" */}
            <Link 
              to="/projets" 
              className="px-6 py-2.5 bg-[#97C159] text-gray-900 font-medium rounded-lg shadow-sm hover:bg-[#85ab4f] transition duration-200 text-sm flex items-center justify-center"
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