// src/pages/Contact.jsx
import ContactForm from '../components/ui/ContactForm'
import SocialLinks from '../components/sections/SocialLinks'
import { Mail, Phone, MapPin, Globe } from 'lucide-react'

const Contact = () => {
  return (
    <div className="bg-white dark:bg-zinc-950 min-h-screen transition-colors duration-300">
      
      {/* BANNIÈRE VITRÉE STANDARDISÉE */}
      <div
        className="relative w-full h-[410px] bg-cover bg-center flex items-center"
        style={{
          backgroundImage: "url('https://aebc-cdn.b-cdn.net/biodiversite/steve-c-6yEql50L05M-unsplash.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative container-custom text-white">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Contactez-nous
          </h1>
          <p className="text-lg leading-relaxed max-w-3xl opacity-90">
            Pour toute question, proposition de collaboration ou volonté de vous engager, notre équipe reste disponible et à l’écoute. Ensemble, contribuons à la protection et au développement durable du Bassin du Congo.
          </p>
        </div>
      </div>

      {/* SECTION CONTENU PRINCIPAL - Utilisation de items-stretch pour égaliser les hauteurs */}
      <section className="py-20">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">
            
            {/* COLONNE GAUCHE : FORMULAIRE (Fond #122527 et contour #1d3a3d en mode sombre) */}
            <div className="bg-white dark:bg-[#122527] border border-gray-100 dark:border-[#1d3a3d] rounded-2xl p-10 shadow-xl flex flex-col h-full transition-colors duration-300">
              <h2 className="text-2xl font-medium text-gray-800 dark:text-gray-100 mb-8 tracking-tight">
                Envoyez-nous un message
              </h2>
              <div className="flex-grow">
                <ContactForm />
              </div>
            </div>

            {/* COLONNE DROITE : CARTE UNIFIÉE (Fond #122527 et contour #1d3a3d en mode sombre) */}
            <div className="bg-gray-50 dark:bg-[#122527] border border-gray-200 dark:border-[#1d3a3d] rounded-2xl p-10 shadow-sm flex flex-col h-full transition-colors duration-300">
              
              {/* PARTIE 1 : COORDONNÉES */}
              <div className="flex-grow">
                <h2 className="text-[10px] font-bold text-[#305c31] dark:text-secondary uppercase tracking-[0.2em] mb-10">
                  Informations de contact
                </h2>

                <div className="space-y-8">
                  {/* Email */}
                  <div className="flex items-center gap-5">
                    <Mail size={20} className="text-[#305c31] dark:text-secondary shrink-0" />
                    <div>
                      <p className="text-[9px] uppercase text-gray-400 dark:text-gray-500 tracking-widest mb-0.5">Email</p>
                      <a href="mailto:aebcofficiel@gmail.com" className="text-base text-gray-700 dark:text-gray-300 hover:text-[#305c31] dark:hover:text-secondary transition-colors">
                        aebcofficiel@gmail.com
                      </a>
                    </div>
                  </div>

                  {/* Téléphone */}
                  <div className="flex items-center gap-5">
                    <Phone size={20} className="text-[#305c31] dark:text-secondary shrink-0" />
                    <div>
                      <p className="text-[9px] uppercase text-gray-400 dark:text-gray-500 tracking-widest mb-0.5">Téléphone</p>
                      <a href="tel:+242055780416" className="text-base text-gray-700 dark:text-gray-300 hover:text-[#305c31] dark:hover:text-secondary transition-colors">
                        (+242) 055 780 416
                      </a>
                    </div>
                  </div>

                  {/* Adresse */}
                  <div className="flex items-center gap-5">
                    <MapPin size={20} className="text-[#305c31] dark:text-secondary shrink-0" />
                    <div>
                      <p className="text-[9px] uppercase text-gray-400 dark:text-gray-500 tracking-widest mb-0.5">Siège Social</p>
                      <span className="text-base text-gray-700 dark:text-gray-300">
                        Brazzaville, République du Congo
                      </span>
                    </div>
                  </div>

                  {/* Web */}
                  <div className="flex items-center gap-5">
                    <Globe size={20} className="text-[#305c31] dark:text-secondary shrink-0" />
                    <div>
                      <p className="text-[9px] uppercase text-gray-400 dark:text-gray-500 tracking-widest mb-0.5">Site Officiel</p>
                      <span className="text-base text-gray-700 dark:text-gray-300">www.aebc-officiel.org</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* SÉPARATEUR DISCRET */}
              <div className="h-px bg-gray-200 dark:bg-zinc-800 w-full my-10"></div>

              {/* PARTIE 2 : RÉSEAUX SOCIAUX */}
              <div className="mt-auto">
                <h3 className="text-[9px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] mb-6">
                  Suivez notre action en ligne
                </h3>
                <SocialLinks />
                <p className="mt-6 text-[11px] text-gray-400 dark:text-gray-500 leading-relaxed italic">
                  Suivez l'actualité de nos projets au quotidien.
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* CTA FINAL ÉPURÉ */}
      <section className="py-16 bg-white dark:bg-zinc-950 border-t border-gray-100 dark:border-zinc-900 text-center transition-colors duration-300">
          <div className="container-custom">
            <h2 className="text-xl font-medium text-gray-800 dark:text-gray-100 mb-8 tracking-tight">Besoin d'un renseignement immédiat ?</h2>
            <a 
              href="mailto:aebcofficiel@gmail.com" 
              className="inline-block px-10 py-4 bg-[#a6c76c] text-[#305c31] font-bold uppercase text-[10px] tracking-widest rounded-lg shadow-sm hover:bg-[#305c31] hover:text-white transition-all duration-300"
            >
              Écrire à la direction
            </a>
          </div>
      </section>

    </div>
  )
}

export default Contact;