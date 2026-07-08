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
    <div className="min-h-screen flex flex-col items-center justify-center bg-dark text-white p-6 space-y-6">
      <h1 className="text-3xl font-bold">SOUTENEZ NOS ACTIONS ENVIRONNEMENTALES</h1>
      <p className="text-gray-300 text-center max-w-md">
        Votre contribution permet de financer des projets de reforestation, d’éducation écologique et de protection de la biodiversité.
      </p>

      <div className="flex flex-col space-y-4 w-full max-w-sm">
        <a
          href="https://www.paypal.com/paypalme/aebcofficiel"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-600 py-3 rounded-lg font-semibold hover:bg-blue-700 transition text-center"
        >
          DONNER VIA PAYPAL
        </a>

        {/* Un seul bouton Stripe dont le comportement s'adapte à votre configuration */}
        {STRIPE_LINK_ACTIF ? (
          <a
            href={URL_LIEN_STRIPE}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-600 py-3 rounded-lg font-semibold hover:bg-green-700 transition text-center"
          >
            DONNER PAR CARTE
          </a>
        ) : (
          <button
            onClick={handleStripeCheckout}
            disabled={loading}
            className="bg-green-600 py-3 rounded-lg font-semibold hover:bg-green-700 transition text-center disabled:opacity-50"
          >
            {loading ? "CHARGEMENT..." : "DONNER PAR CARTE"}
          </button>
        )}

        <a
          href="/don-mtn"
          className="bg-yellow-400 py-3 rounded-lg font-semibold text-black hover:bg-yellow-500 transition text-center"
        >
          MTN MONEY
        </a>

        <a
          href="/don-airtel"
          className="bg-red-600 py-3 rounded-lg font-semibold hover:bg-red-700 transition text-center"
        >
          AIRTEL MONEY
        </a>
      </div>
    </div>
  );
}