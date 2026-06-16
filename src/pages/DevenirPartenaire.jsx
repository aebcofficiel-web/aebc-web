import React from "react";

const partners = [
  { name: "UNESCO", url: "https://aebc-cdn.b-cdn.net/biodiversite/UNESCO-logo_px-01.jpg" },
  { name: "UNICEF", url: "https://aebc-cdn.b-cdn.net/biodiversite/unicef-with-def_2400x1496.jpg" },
  { name: "Ministère de l'Économie Forestière", url: "https://aebc-cdn.b-cdn.net/biodiversite/logo-Ministere-de-l-economie-forestiere.png" },
  { name: "AUF", url: "https://aebc-cdn.b-cdn.net/biodiversite/Logo%20AUF_440x312.png" },
  { name: "Fond Bleu", url: "https://aebc-cdn.b-cdn.net/biodiversite/fond-Bleu_01_1280x968.jpg" },
];

const DevenirPartenaire = () => {
  return (
    <div>

      {/* HERO */}
      <div
        className="relative w-full h-[410px] bg-cover bg-center flex items-center"
        style={{
          backgroundImage:
            "url('https://aebc-cdn.b-cdn.net/biodiversite/milin-john-u1MpPHh4fWw-unsplash.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>

        <div className="relative container-custom">
          <h1 className="text-4xl font-bold text-white mb-4 drop-shadow-lg">
            Devenir partenaire
          </h1>

          <p className="text-white text-lg leading-relaxed max-w-3xl drop-shadow">
            Soutenez l’AEBC et contribuez à la protection du Bassin du Congo
            grâce à un partenariat durable et engagé.
          </p>
        </div>
      </div>

      {/* CONTENU */}
      <div className="container-custom py-16">
        <p className="text-gray-700 mb-10 leading-relaxed">
          En devenant partenaire de l’AEBC, vous participez activement à la
          conservation du deuxième poumon mondial. Votre soutien permet de
          financer des actions concrètes, des projets scientifiques, des
          programmes éducatifs et des initiatives communautaires.
        </p>

        <div className="bg-white shadow-lg p-8 rounded-lg space-y-6">
          <h2 className="text-2xl font-bold text-primary">Pourquoi devenir partenaire ?</h2>

          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Renforcer la protection de la biodiversité</li>
            <li>Soutenir des projets environnementaux concrets</li>
            <li>Collaborer avec une organisation engagée et reconnue</li>
            <li>Valoriser votre image institutionnelle ou d’entreprise</li>
          </ul>

          <div className="mt-6">
            <a
              href="/contact"
              className="bg-primary text-white px-6 py-3 rounded-md font-semibold hover:bg-primary/90 transition"
            >
              Nous contacter
            </a>
          </div>
        </div>
      </div>

      {/* NOS PARTENAIRES */}
      <div className="bg-gray-50 py-16 border-t">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-primary mb-6">Nos partenaires</h2>

          <p className="text-gray-600 mb-10">
            Ils nous accompagnent dans nos missions de protection du Bassin du Congo.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {partners.map((p) => (
              <div
                key={p.name}
                className="bg-white shadow p-6 rounded-lg flex items-center justify-center max-w-full"
              >
                <img
                  src={p.url}
                  alt={p.name}
                  className="max-h-38 md:max-h-42 object-contain w-full"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};

export default DevenirPartenaire;
