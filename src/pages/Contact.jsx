// Fichier : src/pages/Contact.jsx

import ContactForm from '../components/ui/ContactForm'
import SocialLinks from '../components/sections/SocialLinks'
import { Mail, Phone, MapPin } from 'lucide-react'

const Contact = () => {
  return (
    <div className="py-16">
      <div className="container-custom">
        
        {/* TITRE */}
        <h1 className="text-4xl font-bold text-primary mb-12 text-center">
          Contactez-nous
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* FORMULAIRE */}
          <div>
            <ContactForm />
          </div>

          {/* COORDONNÉES */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            
            <h2 className="text-2xl font-semibold text-primary mb-6">
              Nos coordonnées
            </h2>

            <div className="space-y-5">
              
              {/* Email */}
              <div className="flex items-center gap-3">
                <Mail className="text-secondary" />
                <a 
                  href="mailto:aebcofficiel@gmail.com" 
                  className="hover:underline"
                >
                  aebcofficiel@gmail.com
                </a>
              </div>

              {/* Téléphone */}
              <div className="flex items-center gap-3">
                <Phone className="text-secondary" />
                <a href="tel:+242055780416">
                  (+242) 055 780 416
                </a>
              </div>

              {/* Adresse */}
              <div className="flex items-center gap-3">
                <MapPin className="text-secondary" />
                <span>Brazzaville, République du Congo</span>
              </div>
            </div>

            {/* Réseaux sociaux */}
            <div className="mt-10">
              <h3 className="text-xl font-semibold mb-4">
                Suivez-nous
              </h3>
              <SocialLinks />
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
