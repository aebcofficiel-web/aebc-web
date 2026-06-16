import { useState } from "react";
import { db } from "../services/firebase";
import { collection, addDoc } from "firebase/firestore";
import emailjs from "@emailjs/browser";

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

    if (
      !formData.nom.trim() ||
      !formData.email.trim() ||
      !formData.telephone.trim() ||
      !formData.ville.trim() ||
      !formData.disponibilites.trim() ||
      !formData.type.trim() ||
      !formData.message.trim() ||
      !formData.rgpd
    ) {
      setError("Veuillez remplir tous les champs obligatoires.");
      setLoading(false);
      return;
    }

    try {
      await addDoc(collection(db, "benevoles"), {
        ...formData,
        createdAt: new Date(),
      });

      await emailjs.send(
        "service_60q460l",
        "template_erp9acw",
        {
          title: "Candidature bénévole",
          name: formData.nom,
          email: formData.email,
          message: `
Téléphone : ${formData.telephone}
Ville/Pays : ${formData.ville}
Disponibilités : ${formData.disponibilites}
Type de bénévolat : ${formData.type}

Message :
${formData.message}
          `,
        },
        "BJavmU22odCYR-ijF"
      );

      await emailjs.send(
        "service_60q460l",
        "template_l4jiip4",
        {
          name: formData.nom,
          email: formData.email,
          title: "Candidature bénévole",
        },
        "BJavmU22odCYR-ijF"
      );

      setSuccess(true);

      setFormData({
        nom: "",
        email: "",
        telephone: "",
        ville: "",
        disponibilites: "",
        type: "",
        message: "",
        rgpd: false,
      });
    } catch (err) {
      console.error(err);
      setError("Une erreur est survenue. Veuillez réessayer.");
    }

    setLoading(false);
  };

  return (
    <div>

      {/* HERO — même style que les autres pages */}
      <div
        className="relative w-full h-[410px] bg-cover bg-center flex items-center"
        style={{
          backgroundImage:
            "url('https://aebc-cdn.b-cdn.net/biodiversite/heather-wilde-fpZRaTl7unI-unsplash.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>

        <div className="relative container-custom">
          <h1 className="text-4xl font-bold text-white mb-4 drop-shadow-lg">
            Devenir bénévole
          </h1>

          <p className="text-white text-lg leading-relaxed max-w-3xl drop-shadow">
            Engagez-vous pour la protection du Bassin du Congo et contribuez
            à un avenir durable pour les générations futures.
          </p>
        </div>
      </div>

      {/* CONTENU + FORMULAIRE */}
      <div className="container-custom py-16">
        <p className="text-gray-700 mb-10 leading-relaxed">
          Rejoignez l’AEBC et contribuez à la protection du deuxième poumon
          mondial. Que vous soyez disponible ponctuellement ou régulièrement,
          votre engagement peut faire la différence. Remplissez ce formulaire et
          notre équipe vous contactera rapidement.
        </p>

        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg p-8 rounded-lg space-y-6"
        >
          {/* Nom */}
          <div>
            <label className="block font-semibold mb-1">Nom complet</label>
            <input
              type="text"
              name="nom"
              value={formData.nom}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-primary"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block font-semibold mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-primary"
            />
          </div>

          {/* Téléphone */}
          <div>
            <label className="block font-semibold mb-1">Téléphone</label>
            <input
              type="text"
              name="telephone"
              value={formData.telephone}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-primary"
            />
          </div>

          {/* Ville */}
          <div>
            <label className="block font-semibold mb-1">Ville / Pays</label>
            <input
              type="text"
              name="ville"
              value={formData.ville}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-primary"
            />
          </div>

          {/* Disponibilités */}
          <div>
            <label className="block font-semibold mb-1">Disponibilités</label>
            <select
              name="disponibilites"
              value={formData.disponibilites}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-primary"
            >
              <option value="">Sélectionnez…</option>
              <option value="Ponctuelle">Ponctuelle</option>
              <option value="Régulière">Régulière</option>
              <option value="Week-end">Week-end</option>
              <option value="En semaine">En semaine</option>
            </select>
          </div>

          {/* Type de bénévolat */}
          <div>
            <label className="block font-semibold mb-1">
              Type de bénévolat souhaité
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-primary"
            >
              <option value="">Sélectionnez…</option>
              <option value="Actions terrain">Actions terrain</option>
              <option value="Communication">Communication / Médias</option>
              <option value="Événements">Organisation d’événements</option>
              <option value="Sensibilisation">Sensibilisation</option>
              <option value="Logistique">Logistique</option>
              <option value="Administration">Administration</option>
            </select>
          </div>

          {/* Message */}
          <div>
            <label className="block font-semibold mb-1">Votre message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="4"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-primary"
            ></textarea>
          </div>

          {/* RGPD */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="rgpd"
              checked={formData.rgpd}
              onChange={handleChange}
              required
            />
            <label className="text-sm text-gray-600">
              J’accepte que mes données soient utilisées pour être recontacté(e).
            </label>
          </div>

          {/* Bouton */}
          <button
            type="submit"
            disabled={loading}
            className="bg-primary text-white px-6 py-3 rounded-md font-semibold hover:bg-primary/90 transition"
          >
            {loading ? "Envoi..." : "Envoyer ma candidature bénévole"}
          </button>

          {success && (
            <p className="text-green-600 font-semibold">
              Votre candidature a été envoyée avec succès !
            </p>
          )}

          {error && (
            <p className="text-red-600 font-semibold">{error}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default DevenirBenevole;
