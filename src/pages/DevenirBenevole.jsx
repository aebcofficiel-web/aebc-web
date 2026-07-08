// src/pages/DevenirBenevole.jsx
import { useState } from "react";
import { db } from "../services/firebase";
import { collection, addDoc } from "firebase/firestore";
import emailjs from "@emailjs/browser";
import { Link } from "react-router-dom";

const DevenirBenevole = () => {
  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    telephone: "",
    ville: "",
    disponibilites: "",
    type: "",
    message: "",
    rgpd: false,
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await addDoc(collection(db, "benevoles"), {
        ...formData,
        createdAt: new Date(),
      });

      // Envoi EmailJS (Admin & Accusé réception)
      const emailParams = {
        title: "Candidature bénévole",
        name: formData.nom,
        email: formData.email,
        message: `Tél: ${formData.telephone} | Ville: ${formData.ville} | Dispo: ${formData.disponibilites} | Type: ${formData.type} \n\nMessage: ${formData.message}`,
      };

      await emailjs.send("service_60q460l", "template_erp9acw", emailParams, "BJavmU22odCYR-ijF");
      await emailjs.send("service_60q460l", "template_l4jiip4", { name: formData.nom, email: formData.email, title: "Candidature bénévole" }, "BJavmU22odCYR-ijF");

      setSuccess(true);
      setFormData({ nom: "", email: "", telephone: "", ville: "", disponibilites: "", type: "", message: "", rgpd: false });
    } catch (err) {
      setError("Une erreur est survenue. Veuillez réessayer.");
    }
    setLoading(false);
  };

  return (
    <div className="bg-white">
      {/* BANNIÈRE STANDARDISÉE */}
      <div
        className="relative w-full h-[410px] bg-cover bg-center flex items-center"
        style={{ backgroundImage: "url('https://aebc-cdn.b-cdn.net/biodiversite/heather-wilde-fpZRaTl7unI-unsplash.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative container-custom">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg uppercase tracking-tighter">
            Devenir Bénévole
          </h1>
          <p className="text-white text-lg leading-relaxed max-w-3xl drop-shadow opacity-90">
            Engagez-vous pour la protection du Bassin du Congo et contribuez activement à la préservation de notre patrimoine naturel.
          </p>
        </div>
      </div>

      {/* CONTENU PRINCIPAL */}
      <section className="py-20">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* COLONNE GAUCHE : ARGUMENTS */}
            <div>
              <h2 className="text-2xl font-black text-[#305c31] uppercase tracking-widest mb-6">Pourquoi nous rejoindre ?</h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Le bénévolat à l'AEBC est une opportunité unique d'agir concrètement pour le deuxième poumon vert de la planète. Votre temps et vos compétences sont précieux pour nos 6 piliers d'intervention.
              </p>

              <div className="space-y-6">
                {[
                  { t: "Agir sur le terrain", d: "Participez aux missions de reboisement et de sensibilisation locale." },
                  { t: "Partage de compétences", d: "Apportez votre expertise en communication, droit ou logistique." },
                  { t: "Réseau engagé", d: "Rencontrez des passionnés et des experts de l'environnement." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 p-5 bg-gray-50 rounded-xl border border-gray-100 shadow-sm">
                    <div className="w-2 h-2 rounded-full bg-[#305c31] mt-2"></div>
                    <div>
                      <h4 className="font-bold text-gray-900 uppercase text-xs tracking-wider">{item.t}</h4>
                      <p className="text-sm text-gray-500 mt-1">{item.d}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10 p-6 border-l-4 border-[#a6c76c] bg-[#a6c76c]/5">
                <p className="text-[#305c31] italic font-medium">
                  "Chaque action, même minime, contribue à la résilience climatique du Bassin du Congo."
                </p>
              </div>
            </div>

            {/* COLONNE DROITE : FORMULAIRE ENCAPSULÉ */}
            <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-xl relative">
              <h3 className="text-xl font-bold text-gray-900 mb-6 tracking-tighter">Formulaire de candidature</h3>
              
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[10px] font-black uppercase text-gray-400 mb-1 tracking-widest">Nom complet</label>
                    <input type="text" name="nom" value={formData.nom} onChange={handleChange} required className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#305c31] transition" placeholder="Ex: Jean Dupont" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase text-gray-400 mb-1 tracking-widest">Email</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#305c31] transition" placeholder="jean@exemple.com" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[10px] font-black uppercase text-gray-400 mb-1 tracking-widest">Téléphone</label>
                    <input type="text" name="telephone" value={formData.telephone} onChange={handleChange} required className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#305c31] transition" placeholder="+242..." />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase text-gray-400 mb-1 tracking-widest">Ville / Pays</label>
                    <input type="text" name="ville" value={formData.ville} onChange={handleChange} required className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#305c31] transition" placeholder="Brazzaville, Congo" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[10px] font-black uppercase text-gray-400 mb-1 tracking-widest">Disponibilités</label>
                    <select name="disponibilites" value={formData.disponibilites} onChange={handleChange} required className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#305c31] transition">
                      <option value="">Sélectionnez…</option>
                      <option value="Ponctuelle">Ponctuelle</option>
                      <option value="Régulière">Régulière</option>
                      <option value="Week-end">Week-end</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase text-gray-400 mb-1 tracking-widest">Domaine souhaité</label>
                    <select name="type" value={formData.type} onChange={handleChange} required className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#305c31] transition">
                      <option value="">Sélectionnez…</option>
                      <option value="Actions terrain">Actions terrain</option>
                      <option value="Communication">Communication</option>
                      <option value="Sensibilisation">Sensibilisation</option>
                      <option value="Logistique">Logistique</option>
                      <option value="Administration">Administration</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase text-gray-400 mb-1 tracking-widest">Votre motivation</label>
                  <textarea name="message" value={formData.message} onChange={handleChange} required rows="3" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#305c31] transition" placeholder="Dites-nous pourquoi vous souhaitez nous rejoindre..."></textarea>
                </div>

                <div className="flex items-start gap-2">
                  <input type="checkbox" name="rgpd" checked={formData.rgpd} onChange={handleChange} required className="mt-1" />
                  <label className="text-[11px] text-gray-500 leading-tight">
                    J’accepte que mes données soient traitées par l’AEBC pour ma candidature.
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-[#305c31] text-white font-bold uppercase text-xs tracking-widest rounded-xl shadow-lg hover:opacity-90 transition-all transform hover:-translate-y-1"
                >
                  {loading ? "Traitement..." : "Envoyer ma candidature"}
                </button>

                {success && (
                  <div className="p-4 bg-green-50 text-green-700 rounded-lg text-sm font-bold text-center border border-green-100">
                    Candidature envoyée avec succès !
                  </div>
                )}
                {error && (
                  <div className="p-4 bg-red-50 text-red-700 rounded-lg text-sm font-bold text-center border border-red-100">
                    {error}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER CTA */}
      <section className="py-16 bg-gray-50 border-t border-gray-200 text-center">
        <div className="container-custom">
          <h2 className="text-xl font-bold text-[#305c31] mb-6 uppercase tracking-tighter">Vous préférez nous parler directement ?</h2>
          <Link to="/contact" className="inline-block px-8 py-3 bg-[#a6c76c] text-[#305c31] font-bold uppercase text-[10px] tracking-widest rounded-lg transition hover:bg-[#305c31] hover:text-white">
            Page de contact
          </Link>
        </div>
      </section>
    </div>
  );
};

export default DevenirBenevole;