import { useState } from 'react'
import { db } from '../../services/firebase'
import { collection, addDoc } from 'firebase/firestore'
import emailjs from '@emailjs/browser'

function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(false)

    // 1️⃣ VALIDATION STRICTE
    if (
      !form.name.trim() ||
      !form.email.trim() ||
      !form.message.trim()
    ) {
      setError("Veuillez remplir tous les champs obligatoires.")
      setLoading(false)
      return
    }

    try {
      // 2️⃣ Enregistrer dans Firestore
      await addDoc(collection(db, "messages"), {
        name: form.name,
        email: form.email,
        message: form.message,
        date: new Date().toISOString()
      })

      // 3️⃣ Envoyer l’email à AEBC
      await emailjs.send(
        "service_60q460l",
        "template_erp9acw",
        {
          name: form.name,
          email: form.email,
          message: form.message,
        },
        "BJavmU22odCYR-ijF"
      )

      // 4️⃣ Envoyer la confirmation au client
      await emailjs.send(
        "service_60q460l",
        "template_l4jiip4",
        {
          name: form.name,
          email: form.email,
        },
        "BJavmU22odCYR-ijF"
      )

      // 5️⃣ Succès
      setSuccess(true)
      setForm({ name: "", email: "", message: "" })

    } catch (err) {
      console.error("Erreur EmailJS ou Firestore :", err)
      setError("Une erreur est survenue. Veuillez réessayer.")
    }

    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Nom</label>
        <input
          type="text"
          className="w-full border p-2 rounded focus:outline-none focus:border-primary"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Email</label>
        <input
          type="email"
          className="w-full border p-2 rounded focus:outline-none focus:border-primary"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Message</label>
        <textarea
          className="w-full border p-2 rounded h-32 focus:outline-none focus:border-primary"
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          required
        />
      </div>

      {error && <p className="text-red-600 text-sm">{error}</p>}
      {success && <p className="text-green-600 text-sm">Message envoyé avec succès !</p>}

      <button
        type="submit"
        disabled={loading}
        className="bg-primary text-white py-2 px-4 rounded w-full font-semibold hover:bg-primary-dark transition"
      >
        {loading ? "Envoi..." : "Envoyer"}
      </button>
    </form>
  )
}

export default ContactForm
