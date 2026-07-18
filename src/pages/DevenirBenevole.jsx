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
    <div className="bg-white dark:bg-zinc-950 min-h-screen transition-colors duration-300">
      {/* BANNIÈRE STANDARDISÉE */}
      <div
        className="relative w-full h-[410px] bg-cover bg-center flex items-center"
        style={{ backgroundImage: "url('https://aebc-cdn.b-cdn.net/biodiversite/hadil-hasan-t21e0_eRQW8-unsplash.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative container-custom">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Devenir Bénévole
          </h1>
          <p className="text-white text-lg leading-relaxed max-w-3xl drop-shadow opacity-90">
            Engagez-vous pour la protection du Bassin du Congo et contribuez activement à la préservation de ses écosystèmes. Rejoignez une communauté de bénévoles mobilisés pour l’environnement et le développement durable.
          </p>
        </div>
      </div>

      {/* CONTENU PRINCIPAL */}
      <section className="py-20">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* COLONNE GAUCHE : ARGUMENTS */}
            <div>
              <h2 className="text-2xl font-black text-[#305c31] dark:text-secondary uppercase tracking-widest mb-6">
                Pourquoi nous rejoindre ?
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                Le bénévolat à l'AEBC est une opportunité unique d'agir concrètement pour le deuxième poumon vert de la planète. Votre temps et vos compétences sont précieux pour nos 6 piliers d'intervention.
              </p>

              <div className="space-y-6">
                {[
                  { t: "Agir sur le terrain", d: "Participez aux missions de reboisement et de sensibilisation locale." },
                  { t: "Partage de compétences", d: "Apportez votre expertise en communication, droit ou logistique." },
                  { t: "Réseau engagé", d: "Rencontrez des passionnés et des experts de l'environnement." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 p-5 bg-gray-50 dark:bg-[#122527] rounded-xl border border-gray-100 dark:border-[#1d3a3d] shadow-sm transition-colors duration-300">
                    <div className="w-2 h-2 rounded-full bg-[#305c31] dark:bg-secondary mt-2 shrink-0"></div>
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-gray-100 uppercase text-xs tracking-wider">{item.t}</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{item.d}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10 p-6 border-l-4 border-[#a6c76c] bg-[#a6c76c]/5 dark:bg-[#a6c76c]/10 rounded-r-xl transition-colors duration-300">
                <p className="text-[#305c31] dark:text-secondary italic font-medium">
                  "Chaque action, même minime, contribue à la résilience climatique du Bassin du Congo."
                </p>
              </div>
            </div>

            {/* COLONNE DROITE : FORMULAIRE ENCAPSULÉ */}
            <div className="bg-white dark:bg-[#122527] border border-gray-200 dark:border-[#1d3a3d] rounded-2xl p-8 shadow-xl relative transition-colors duration-300">
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6 tracking-tighter">
                Formulaire de candidature
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[10px] font-black uppercase text-gray-400 dark:text-gray-500 mb-1 tracking-widest">Nom complet</label>
                    <input type="text" name="nom" value={formData.nom} onChange={handleChange} required className="w-full px-4 py-3 bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-[#1d3a3d] text-gray-900 dark:text-gray-100 rounded-lg focus:outline-none focus:border-[#305c31] dark:focus:border-secondary transition" placeholder="Ex: Jean Dupont" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase text-gray-400 dark:text-gray-500 mb-1 tracking-widest">Email</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full px-4 py-3 bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-[#1d3a3d] text-gray-900 dark:text-gray-100 rounded-lg focus:outline-none focus:border-[#305c31] dark:focus:border-secondary transition" placeholder="jean@exemple.com" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[10px] font-black uppercase text-gray-400 dark:text-gray-500 mb-1 tracking-widest">Téléphone</label>
                    <input type="text" name="telephone" value={formData.telephone} onChange={handleChange} required className="w-full px-4 py-3 bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-[#1d3a3d] text-gray-900 dark:text-gray-100 rounded-lg focus:outline-none focus:border-[#305c31] dark:focus:border-secondary transition" placeholder="+242..." />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase text-gray-400 dark:text-gray-500 mb-1 tracking-widest">Ville / Pays</label>
                    <input type="text" name="ville" value={formData.ville} onChange={handleChange} required className="w-full px-4 py-3 bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-[#1d3a3d] text-gray-900 dark:text-gray-100 rounded-lg focus:outline-none focus:border-[#305c31] dark:focus:border-secondary transition" placeholder="Brazzaville, Congo" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[10px] font-black uppercase text-gray-400 dark:text-gray-500 mb-1 tracking-widest">Disponibilités</label>
                    <select name="disponibilites" value={formData.disponibilites} onChange={handleChange} required className="w-full px-4 py-3 bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-[#1d3a3d] text-gray-900 dark:text-gray-100 rounded-lg focus:outline-none focus:border-[#305c31] dark:focus:border-secondary transition">
                      <option value="" className="dark:bg-zinc-900">Sélectionnez…</option>
                      <option value="Ponctuelle" className="dark:bg-zinc-900">Ponctuelle</option>
                      <option value="Régulière" className="dark:bg-zinc-900">Régulière</option>
                      <option value="Week-end" className="dark:bg-zinc-900">Week-end</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase text-gray-400 dark:text-gray-500 mb-1 tracking-widest">Domaine souhaité</label>
                    <select name="type" value={formData.type} onChange={handleChange} required className="w-full px-4 py-3 bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-[#1d3a3d] text-gray-900 dark:text-gray-100 rounded-lg focus:outline-none focus:border-[#305c31] dark:focus:border-secondary transition">
                      <option value="" className="dark:bg-zinc-900">Sélectionnez…</option>
                      <option value="Actions terrain" className="dark:bg-zinc-900">Actions terrain</option>
                      <option value="Communication" className="dark:bg-zinc-900">Communication</option>
                      <option value="Sensibilisation" className="dark:bg-zinc-900">Sensibilisation</option>
                      <option value="Logistique" className="dark:bg-zinc-900">Logistique</option>
                      <option value="Administration" className="dark:bg-zinc-900">Administration</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase text-gray-400 dark:text-gray-500 mb-1 tracking-widest">Votre motivation</label>
                  <textarea name="message" value={formData.message} onChange={handleChange} required rows="3" className="w-full px-4 py-3 bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-[#1d3a3d] text-gray-900 dark:text-gray-100 rounded-lg focus:outline-none focus:border-[#305c31] dark:focus:border-secondary transition" placeholder="Dites-nous pourquoi vous souhaitez nous rejoindre..."></textarea>
                </div>

                <div className="flex items-start gap-2">
                  <input type="checkbox" name="rgpd" checked={formData.rgpd} onChange={handleChange} required className="mt-1" />
                  <label className="text-[11px] text-gray-500 dark:text-gray-400 leading-tight">
                    J’accepte que mes données soient traitées par l’AEBC pour ma candidature.
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-[#305c31] dark:bg-secondary text-white dark:text-dark font-bold uppercase text-xs tracking-widest rounded-xl shadow-lg hover:opacity-90 transition-all transform hover:-translate-y-1"
                >
                  {loading ? "Traitement..." : "Envoyer ma candidature"}
                </button>

                {success && (
                  <div className="p-4 bg-green-50 dark:bg-green-950/20 text-green-700 dark:text-green-400 rounded-lg text-sm font-bold text-center border border-green-100 dark:border-green-900/30">
                    Candidature envoyée avec succès !
                  </div>
                )}
                {error && (
                  <div className="p-4 bg-red-50 dark:bg-red-950/20 text-red-700 dark:text-red-400 rounded-lg text-sm font-bold text-center border border-red-100 dark:border-red-900/30">
                    {error}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER CTA */}
      <section className="py-16 bg-gray-50 dark:bg-zinc-900/30 border-t border-gray-200 dark:border-zinc-900 text-center transition-colors duration-300">
        <div className="container-custom">
          <h2 className="text-xl font-bold text-[#305c31] dark:text-secondary mb-6 uppercase tracking-tighter">
            Vous préférez nous parler directement ?
          </h2>
          <Link to="/contact" className="inline-block px-8 py-3 bg-[#a6c76c] text-[#305c31] font-bold uppercase text-[10px] tracking-widest rounded-lg transition hover:bg-[#305c31] hover:text-white">
            Page de contact
          </Link>
        </div>
      </section>
    </div>
  );
};

export default DevenirBenevole;