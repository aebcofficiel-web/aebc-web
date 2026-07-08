// src/pages/DevenirPartenaire.jsx
import React from "react";
import { Link } from "react-router-dom";

const partners = [
  { name: "UNESCO", url: "https://aebc-cdn.b-cdn.net/biodiversite/UNESCO-logo_px-01_1600x1600.jpg" },
  { name: "UNICEF", url: "https://aebc-cdn.b-cdn.net/biodiversite/unicef-with-def_2400x1496_4800x2992.jpg" },
  { name: "Ministère de l'Économie Forestière", url: "https://aebc-cdn.b-cdn.net/biodiversite/logo-Ministere-de-l-economie-forestiere.png" },
  { name: "Ministère de l'Environnement", url: "https://aebc-cdn.b-cdn.net/biodiversite/lg-MinistereEnv-BC-DD_2534x2482.jpg" },
  { name: "Fond Bleu", url: "https://aebc-cdn.b-cdn.net/biodiversite/fond-Bleu_01_1280x968.jpg" },
  { name: "PRECAP-CCOD", url: "https://aebc-cdn.b-cdn.net/biodiversite/Precap-ccod.png" },
  { name: "AUF", url: "https://aebc-cdn.b-cdn.net/biodiversite/Logo%20AUF_440x312_880x624.png" },
];

const raisons = [
  { titre: "Impact Écologique", desc: "Renforcer concrètement la protection de la biodiversité du Bassin du Congo." },
  { titre: "Soutien Projet", desc: "Soutenir le déploiement de solutions innovantes et durables sur le terrain." },
  { titre: "Expertise Partagée", desc: "Collaborer avec une organisation engagée, scientifique et reconnue." },
  { titre: "Image de Marque", desc: "Valoriser votre engagement institutionnel auprès d'un large public." }
];

export default function DevenirPartenaire() {
  return (
    <div className="bg-white min-h-screen">

      {/* BANNIÈRE */}
      <div
        className="relative w-full h-[380px] bg-cover bg-center flex items-center"
        style={{ backgroundImage: "url('https://aebc-cdn.b-cdn.net/biodiversite/milin-john-u1MpPHh4fWw-unsplash.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative container-custom">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Devenir Partenaire
          </h1>
          <p className="text-white text-lg max-w-2xl opacity-90 leading-relaxed">
            Unissons nos forces pour la sauvegarde du deuxième poumon vert mondial.
          </p>
        </div>
      </div>

      {/* ARGUMENTS */}
      <section className="py-20">
        <div className="container-custom grid lg:grid-cols-2 gap-12 items-start">

          <div>
            <h2 className="text-2xl font-black text-[#305c31] uppercase tracking-widest mb-6">
              Pourquoi nous rejoindre ?
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              Devenir partenaire de l’AEBC, c’est s’associer à une vision globale de conservation.
              Votre soutien permet de financer des actions concrètes et des programmes de sensibilisation.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {raisons.map((r, i) => (
              <div key={i} className="p-5 bg-gray-50 border border-gray-100 rounded-xl shadow-sm">
                <div className="w-2 h-2 rounded-full bg-[#305c31] mb-3"></div>
                <h4 className="font-bold text-gray-900 uppercase text-[11px] tracking-wider mb-2">{r.titre}</h4>
                <p className="text-xs text-gray-500 leading-relaxed">{r.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* PARTENAIRES */}
      <section className="py-20 bg-gray-50 border-t border-gray-100">
        <div className="container-custom text-center">

          {/* Nouveau titre + description */}
          <h2 className="text-2xl font-black text-[#305c31] uppercase tracking-tight">
            Nos partenaires
          </h2>

          <p className="text-gray-500 text-sm mt-2">
            Ils nous accompagnent
          </p>

          {/* Grille logos */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-10 max-w-5xl mx-auto mt-16">
            {partners.map((p, i) => (
              <div
                key={i}
                className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex items-center justify-center aspect-square"
              >
                <img
                  src={p.url}
                  alt={p.name}
                  className="w-full h-full object-contain"
                  loading="lazy"
                />
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-[#305c31] mb-10 tracking-tight">
            Prêt à bâtir une collaboration ?
          </h2>

          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link 
              to="/contact" 
              className="px-10 py-4 bg-[#305c31] text-white font-bold uppercase text-xs tracking-widest rounded-lg shadow-lg hover:opacity-90 transition"
            >
              Proposer un partenariat
            </Link>

            <Link 
              to="/notre-mission" 
              className="px-10 py-4 bg-[#a6c76c] text-[#305c31] font-bold uppercase text-xs tracking-widest rounded-lg shadow-sm hover:opacity-90 transition"
            >
              Notre Mission
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
