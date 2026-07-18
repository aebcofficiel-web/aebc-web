// src/pages/Don.jsx
import { useState } from "react";

// =========================================================================
// CONFIGURATION DE VOTRE BOUTON STRIPE
// =========================================================================
// Mettez à "true" dès que vous souhaitez basculer sur votre lien Stripe actif
const STRIPE_LINK_ACTIF = true; 

// Remplacez par votre lien de production final dès qu'il sera validé
const URL_LIEN_STRIPE = "https://donate.stripe.com/test_aebc"; 
// =========================================================================

export default function Don() {
  const [loading, setLoading] = useState(false);

  // Gère le paiement par clé API (lorsque STRIPE_LINK_ACTIF est à false)
  const handleStripeCheckout = async () => {
    setLoading(true);
    try {
      if (!window.Stripe) {
        console.error("Stripe.js n'a pas pu être chargé depuis index.html.");
        setLoading(false);
        return;
      }

      // Initialisation avec votre clé publique live
      const stripe = window.Stripe('pk_live_51TeKD4RtiKmmQ1L0SiFhLs86o0lHbRAFqwrYL4YAfvs2nx9kwx43nKjJQU5uBFQ6NzrPH8kBSnJLiOsl8z5kSeXy00GVa1sz68');

      // Remplacez 'ID_DE_VOTRE_PRIX' par l'ID de votre produit/tarif Stripe (ex: price_12345...)
      const { error } = await stripe.redirectToCheckout({
        lineItems: [{ price: "ID_DE_VOTRE_PRIX", quantity: 1 }],
        mode: "payment",
        successUrl: `${window.location.origin}/don`,
        cancelUrl: `${window.location.origin}/don`,
      });

      if (error) {
        console.error("Erreur de redirection Stripe :", error.message);
      }
    } catch (err) {
      console.error("Une erreur est survenue :", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#F4F9F4] dark:bg-zinc-950 min-h-screen transition-colors duration-300">
      
      {/* BANNIÈRE VITRÉE STANDARDISÉE */}
      <div
        className="relative w-full h-[410px] bg-cover bg-center flex items-center"
        style={{
          backgroundImage: "url('https://aebc-cdn.b-cdn.net/Reboisement/congo-republic-of.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative container-custom text-white">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Soutenez nos actions
          </h1>
          <p className="text-lg leading-relaxed max-w-3xl opacity-90">
            Votre contribution permet de financer des projets de reforestation, d’éducation écologique et de protection de la biodiversité pour sauvegarder le Bassin du Congo.
          </p>
        </div>
      </div>

      {/* SECTION DES MOYENS DE PAIEMENT */}
      <section className="py-20">
        <div className="container-custom flex flex-col items-center">
          
          {/* CARTE UNIFIÉE (Mêmes styles que la page Contact) */}
          <div className="w-full max-w-md bg-white dark:bg-[#122527] border border-gray-100 dark:border-[#1d3a3d] rounded-2xl p-10 shadow-xl transition-colors duration-300">
            <h2 className="text-2xl font-medium text-center text-gray-800 dark:text-gray-100 mb-8 tracking-tight">
              Faire un don
            </h2>
            
            <div className="flex flex-col space-y-4">
              {/* PAYPAL */}
              <a
                href="https://www.paypal.com/paypalme/aebcofficiel"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-blue-600 hover:bg-blue-500 dark:bg-blue-700 dark:hover:bg-blue-600 py-3 rounded-lg font-semibold text-white text-center shadow hover:shadow-md transform hover:scale-[1.02] active:scale-98 transition-all duration-300"
              >
                DONNER VIA PAYPAL
              </a>

              {/* STRIPE */}
              {STRIPE_LINK_ACTIF ? (
                <a
                  href={URL_LIEN_STRIPE}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-green-600 hover:bg-green-500 dark:bg-primary dark:hover:bg-primary-light py-3 rounded-lg font-semibold text-white text-center shadow hover:shadow-md transform hover:scale-[1.02] active:scale-98 transition-all duration-300"
                >
                  DONNER PAR CARTE
                </a>
              ) : (
                <button
                  onClick={handleStripeCheckout}
                  disabled={loading}
                  className="block w-full bg-green-600 hover:bg-green-500 dark:bg-primary dark:hover:bg-primary-light py-3 rounded-lg font-semibold text-white text-center shadow hover:shadow-md transform hover:scale-[1.02] active:scale-98 transition-all duration-300 disabled:opacity-50"
                >
                  {loading ? "CHARGEMENT..." : "DONNER PAR CARTE"}
                </button>
              )}

              {/* MTN MONEY */}
              <a
                href="/don-mtn"
                className="block w-full bg-yellow-400 hover:bg-yellow-300 dark:bg-yellow-500 dark:hover:bg-yellow-400 py-3 rounded-lg font-semibold text-black text-center shadow hover:shadow-md transform hover:scale-[1.02] active:scale-98 transition-all duration-300"
              >
                MTN MONEY
              </a>

              {/* AIRTEL MONEY */}
              <a
                href="/don-airtel"
                className="block w-full bg-red-600 hover:bg-red-500 dark:bg-red-700 dark:hover:bg-red-600 py-3 rounded-lg font-semibold text-white text-center shadow hover:shadow-md transform hover:scale-[1.02] active:scale-98 transition-all duration-300"
              >
                AIRTEL MONEY
              </a>
            </div>

            <p className="mt-8 text-center text-xs text-gray-400 dark:text-gray-500 italic">
              Merci pour votre engagement à nos côtés.
            </p>
          </div>

        </div>
      </section>

    </div>
  );
}