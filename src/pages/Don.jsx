// src/pages/Don.jsx
import { useState } from "react";
import { CreditCard, Smartphone, Landmark, ShieldCheck } from "lucide-react";

// =========================================================================
// CONFIGURATION DE VOTRE BOUTON STRIPE
// =========================================================================
const STRIPE_LINK_ACTIF = true; 
const URL_LIEN_STRIPE = "https://donate.stripe.com/test_aebc"; 
const URL_PAYPAL = "https://www.paypal.com/paypalme/aebcofficiel";
// =========================================================================

// Configuration des onglets avec leurs icônes respectives
const TABS = [
  { id: "stripe", icon: CreditCard, label: "Carte" },
  { 
    id: "paypal", 
    icon: ({ size, className }) => (
      <span 
        className={`font-extrabold text-[10px] leading-none flex items-center justify-center ${className}`} 
        style={{ height: size, width: size }}
      >
        PP
      </span>
    ), 
    label: "PayPal" 
  },
  { id: "airtel", icon: Smartphone, label: "Airtel" },
  { id: "mtn", icon: Smartphone, label: "MTN" },
  { id: "virement", icon: Landmark, label: "IBAN" },
];

export default function Don() {
  const [loading, setLoading] = useState(false);
  const [donationType, setDonationType] = useState("unique"); // "unique" | "mensuel"
  const [currency, setCurrency] = useState("EUR"); // "EUR" | "USD" | "XAF"
  const [selectedAmount, setSelectedAmount] = useState(75); // Montant prédéfini par défaut
  const [customAmount, setCustomAmount] = useState(""); // Montant libre
  const [paymentMethod, setPaymentMethod] = useState("stripe"); // "stripe" | "paypal" | "airtel" | "mtn" | "virement"
  const [copied, setCopied] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    prenom: "",
    nom: "",
    ville: "",
    cardNumber: "",
    cardExpiry: "",
    cardCvc: ""
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Récupération dynamique du symbole de la devise
  const getCurrencySymbol = () => {
    if (currency === "EUR") return "€";
    if (currency === "USD") return "$";
    return "FCFA";
  };

  // Liste des paliers adaptés à la devise
  const presets = currency === "XAF" ? [10000, 25000, 50000] : [30, 75, 150];

  // Calcul du montant final
  const finalAmount = customAmount ? parseFloat(customAmount) || 0 : selectedAmount;
  const formattedAmount = `${finalAmount.toLocaleString()} ${getCurrencySymbol()}`;

  // Presse-papiers pour Mobile Money ou IBAN
  const handleCopyText = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  // Redirection Stripe si actif
  const handleStripeCheckout = async () => {
    setLoading(true);
    try {
      if (!window.Stripe) {
        console.error("Stripe.js n'a pas pu être chargé.");
        setLoading(false);
        return;
      }
      const stripe = window.Stripe('pk_live_51TeKD4RtiKmmQ1L0SiFhLs86o0lHbRAFqwrYL4YAfvs2nx9kwx43nKjJQU5uBFQ6NzrPH8kBSnJLiOsl8z5kSeXy00GVa1sz68');
      const { error } = await stripe.redirectToCheckout({
        lineItems: [{ price: "ID_DE_VOTRE_PRIX", quantity: 1 }],
        mode: donationType === "mensuel" ? "subscription" : "payment",
        successUrl: `${window.location.origin}/don`,
        cancelUrl: `${window.location.origin}/don`,
      });
      if (error) console.error(error.message);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDonSubmit = (e) => {
    e.preventDefault();
    if (paymentMethod === "stripe") {
      if (STRIPE_LINK_ACTIF) {
        window.open(URL_LIEN_STRIPE, "_blank");
      } else {
        handleStripeCheckout();
      }
    } else if (paymentMethod === "paypal") {
      window.open(URL_PAYPAL, "_blank");
    } else if (paymentMethod === "airtel") {
      handleCopyText("+242 05 578 04 16");
    } else if (paymentMethod === "mtn") {
      handleCopyText("+242 06 679 74 99");
    } else if (paymentMethod === "virement") {
      handleCopyText("CG76 3000 1000 1234 5678 9012 345");
    }
  };

  // Style dynamique des boutons avec contours fins de la même couleur que leur fond (Stripe, PayPal, Airtel, MTN, IBAN)
  const getDynamicStyles = (method) => {
    switch (method) {
      case "stripe":
        return "bg-black hover:bg-zinc-800 text-white dark:bg-white dark:hover:bg-zinc-200 dark:text-black border-black dark:border-white"; // Noir en jour, Blanc en sombre
      case "paypal":
        return "bg-[#1d70e7] hover:bg-[#155fc4] text-white border-[#1d70e7] hover:border-[#155fc4]"; // Bleu PayPal
      case "airtel":
        return "bg-[#DB0512] hover:bg-[#b0040e] text-white border-[#DB0512] hover:border-[#b0040e]"; // Rouge Airtel
      case "mtn":
        return "bg-[#F6C304] hover:bg-[#d9a803] text-black border-[#F6C304] hover:border-[#d9a803]"; // Jaune MTN
      case "virement":
        return "bg-[#305c31] hover:bg-[#254826] text-white border-[#305c31] hover:border-[#254826]"; // Vert AEBC
      default:
        return "bg-[#305c31] hover:bg-[#254826] text-white border-[#305c31] hover:border-[#254826]";
    }
  };

  // Style dynamique de l'icône de l'onglet selon s'il est sélectionné ou non
  const getTabIconClass = (id, isActive) => {
    if (isActive) {
      return id === "mtn" ? "text-black" : "text-white dark:text-black";
    }
    switch (id) {
      case "airtel":
        return "text-[#DB0512]";
      case "mtn":
        return "text-[#F6C304]";
      default:
        return "text-gray-500 dark:text-gray-400";
    }
  };

  // Label dynamique du bouton de validation (sans flèches)
  const getButtonLabel = () => {
    if (loading) return "Traitement...";
    switch (paymentMethod) {
      case "stripe":
        return `Valider par Carte (${formattedAmount})`;
      case "paypal":
        return `Donner via PayPal (${formattedAmount})`;
      case "airtel":
        return `Copier le numéro Airtel Money (${formattedAmount})`;
      case "mtn":
        return `Copier le numéro MTN Money (${formattedAmount})`;
      case "virement":
        return `Copier l'IBAN de l'AEBC (${formattedAmount})`;
      default:
        return `Valider mon don de ${formattedAmount}`;
    }
  };

  return (
    <div className="bg-[#F4F9F4] dark:bg-zinc-950 min-h-screen transition-colors duration-300 pb-20">
      
      {/* BANNIÈRE VITRÉE */}
      <div
        className="relative w-full h-[320px] bg-cover bg-center flex items-center"
        style={{ backgroundImage: "url('https://aebc-cdn.b-cdn.net/Reboisement/congo-republic-of.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative container-custom text-white">
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#a6c76c] mb-2 block">
            Faire un geste pour la planète
          </span>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-3">
            Soutenez nos actions
          </h1>
          <p className="text-sm md:text-base leading-relaxed max-w-2xl opacity-90">
            Chaque contribution finance la reforestation du Bassin du Congo, la sensibilisation des communautés et la protection de la faune sauvage.
          </p>
        </div>
      </div>

      {/* PARCOURS DE DON SIMPLIFIÉ EN 3 COLONNES */}
      <div className="container-custom mt-12">
        <form onSubmit={handleDonSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          
          {/* ÉTAPE 1 : MON DON */}
          <div className="bg-white dark:bg-[#122527] border border-gray-150 dark:border-[#1d3a3d] rounded-2xl p-6 md:p-8 shadow-sm flex flex-col transition-colors duration-300">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-7 h-7 rounded-full bg-[#305c31] text-white flex items-center justify-center font-bold text-sm">1</span>
              <h2 className="text-lg font-black uppercase tracking-wider text-gray-900 dark:text-gray-100">Mon don</h2>
            </div>

            {/* SÉLECTEUR DE DEVISE (EUR / USD / FCFA) */}
            <div className="mb-5">
              <label className="block text-[9px] font-black uppercase text-gray-400 dark:text-gray-500 mb-1.5 tracking-widest">Devise</label>
              <div className="grid grid-cols-3 gap-2 bg-gray-100 dark:bg-zinc-900 p-1.5 rounded-xl">
                {[
                  { code: "EUR", symbol: "€" },
                  { code: "USD", symbol: "$" },
                  { code: "XAF", symbol: "FCFA" }
                ].map((c) => (
                  <button
                    key={c.code}
                    type="button"
                    onClick={() => {
                      setCurrency(c.code);
                      setSelectedAmount(c.code === "XAF" ? 25000 : 75);
                      setCustomAmount("");
                    }}
                    className={`py-1.5 rounded-lg text-xs font-bold transition-all ${
                      currency === c.code
                        ? "bg-white dark:bg-zinc-800 text-[#305c31] dark:text-secondary shadow-sm"
                        : "text-gray-500 hover:text-gray-900 dark:hover:text-gray-200"
                    }`}
                  >
                    {c.symbol} ({c.code})
                  </button>
                ))}
              </div>
            </div>

            {/* OPTION DE DON (Unique / Mensuel) */}
            <div className="mb-6">
              <label className="block text-[9px] font-black uppercase text-gray-400 dark:text-gray-500 mb-1.5 tracking-widest">Option de don</label>
              <div className="grid grid-cols-2 gap-2 bg-gray-100 dark:bg-zinc-900 p-1.5 rounded-xl">
                <button
                  type="button"
                  onClick={() => setDonationType("unique")}
                  className={`py-2.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${
                    donationType === "unique"
                      ? "bg-white dark:bg-zinc-800 text-[#305c31] dark:text-secondary shadow-sm"
                      : "text-gray-500 hover:text-gray-900 dark:hover:text-gray-200"
                  }`}
                >
                  Don Unique
                </button>
                <button
                  type="button"
                  onClick={() => setDonationType("mensuel")}
                  className={`py-2.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${
                    donationType === "mensuel"
                      ? "bg-white dark:bg-zinc-800 text-[#305c31] dark:text-secondary shadow-sm"
                      : "text-gray-500 hover:text-gray-900 dark:hover:text-gray-200"
                  }`}
                >
                  Don Mensuel
                </button>
              </div>
            </div>

            {/* Montants prédéfinis dynamiques (Avec contours affinés /30 en mode clair et sombre) */}
            <div className="grid grid-cols-3 gap-3 mb-4">
              {presets.map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => {
                    setSelectedAmount(amt);
                    setCustomAmount("");
                  }}
                  className={`py-4 rounded-xl border text-sm font-bold transition-all ${
                    selectedAmount === amt && !customAmount
                      ? "border-[#305c31]/30 bg-[#305c31]/10 text-[#305c31] dark:border-secondary/30 dark:bg-[#18373a] dark:text-secondary"
                      : "border-gray-200 dark:border-[#1d3a3d] text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-zinc-900/50"
                  }`}
                >
                  {amt.toLocaleString()} {getCurrencySymbol()}
                </button>
              ))}
            </div>

            {/* Montant libre avec de la marge à droite pour la devise (avant les flèches de défilement) */}
            <div className="relative mt-2">
              <input
                type="number"
                placeholder="Montant libre"
                value={customAmount}
                onChange={(e) => {
                  setCustomAmount(e.target.value);
                  setSelectedAmount(0);
                }}
                className="w-full pl-4 pr-20 py-3.5 bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-[#1d3a3d] text-gray-900 dark:text-gray-100 rounded-xl focus:outline-none focus:border-[#305c31] dark:focus:border-secondary transition text-sm font-medium animate-in fade-in"
              />
              <span className="absolute right-10 top-1/2 transform -translate-y-1/2 text-xs font-black text-gray-400 dark:text-gray-500 pointer-events-none select-none">
                {currency}
              </span>
            </div>
          </div>

          {/* ÉTAPE 2 : MES COORDONNÉES */}
          <div className="bg-white dark:bg-[#122527] border border-gray-150 dark:border-[#1d3a3d] rounded-2xl p-6 md:p-8 shadow-sm flex flex-col transition-colors duration-300">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-7 h-7 rounded-full bg-[#305c31] text-white flex items-center justify-center font-bold text-sm">2</span>
              <h2 className="text-lg font-black uppercase tracking-wider text-gray-900 dark:text-gray-100">Mes coordonnées</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-[9px] font-black uppercase text-gray-400 dark:text-gray-500 mb-1 tracking-widest">Email</label>
                <input required type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full px-4 py-2.5 bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-[#1d3a3d] text-gray-900 dark:text-gray-100 rounded-xl focus:outline-none focus:border-[#305c31] dark:focus:border-secondary transition text-sm" placeholder="exemple@mail.com" />
              </div>

              <div>
                <label className="block text-[9px] font-black uppercase text-gray-400 dark:text-gray-500 mb-1 tracking-widest">Prénom</label>
                <input required type="text" name="prenom" value={formData.prenom} onChange={handleInputChange} className="w-full px-4 py-2.5 bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-[#1d3a3d] text-gray-900 dark:text-gray-100 rounded-xl focus:outline-none focus:border-[#305c31] dark:focus:border-secondary transition text-sm" placeholder="Jean" />
              </div>

              <div>
                <label className="block text-[9px] font-black uppercase text-gray-400 dark:text-gray-500 mb-1 tracking-widest">Nom</label>
                <input required type="text" name="nom" value={formData.nom} onChange={handleInputChange} className="w-full px-4 py-2.5 bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-[#1d3a3d] text-gray-900 dark:text-gray-100 rounded-xl focus:outline-none focus:border-[#305c31] dark:focus:border-secondary transition text-sm" placeholder="Dupont" />
              </div>

              <div>
                <label className="block text-[9px] font-black uppercase text-gray-400 dark:text-gray-500 mb-1 tracking-widest">Ville / Pays</label>
                <input required type="text" name="ville" value={formData.ville} onChange={handleInputChange} className="w-full px-4 py-2.5 bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-[#1d3a3d] text-gray-900 dark:text-gray-100 rounded-xl focus:outline-none focus:border-[#305c31] dark:focus:border-secondary transition text-sm" placeholder="Brazzaville, Congo" />
              </div>
            </div>
          </div>

          {/* ÉTAPE 3 : MON RÈGLEMENT */}
          <div className="bg-white dark:bg-[#122527] border border-gray-150 dark:border-[#1d3a3d] rounded-2xl p-6 md:p-8 shadow-sm flex flex-col transition-colors duration-300">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-7 h-7 rounded-full bg-[#305c31] text-white flex items-center justify-center font-bold text-sm">3</span>
              <h2 className="text-lg font-black uppercase tracking-wider text-gray-900 dark:text-gray-100">Mon règlement</h2>
            </div>

            {/* Onglets des moyens de paiement (Airtel avant MTN - Avec contours fins de même couleur) */}
            <div className="grid grid-cols-5 gap-1.5 mb-6 bg-gray-50 dark:bg-zinc-900 p-1.5 rounded-2xl border border-gray-100 dark:border-[#1d3a3d]">
              {TABS.map((m) => {
                const isActive = paymentMethod === m.id;
                const IconComponent = m.icon;
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => {
                      setPaymentMethod(m.id);
                      setCopied(false);
                    }}
                    className={`flex flex-col items-center justify-center py-2.5 rounded-xl transition-all duration-300 border ${
                      isActive
                        ? `${getDynamicStyles(m.id)} shadow-sm font-bold scale-[1.03]`
                        : "border-transparent text-gray-500 hover:text-gray-800 dark:hover:text-gray-200"
                    }`}
                    title={m.label}
                  >
                    <IconComponent size={18} className={getTabIconClass(m.id, isActive)} />
                    <span className="text-[8px] font-bold uppercase mt-1 tracking-wider">{m.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Panneaux de détails du paiement */}
            <div className="flex-grow flex flex-col justify-between">
              
              {/* CARTE BANCAIRE */}
              {paymentMethod === "stripe" && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <div>
                    <label className="block text-[9px] font-black uppercase text-gray-400 dark:text-gray-500 mb-1 tracking-widest">Numéro de carte</label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      placeholder="1234 1234 1234 1234"
                      className="w-full px-4 py-2.5 bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-[#1d3a3d] text-gray-900 dark:text-gray-100 rounded-xl focus:outline-none focus:border-[#305c31] dark:focus:border-secondary transition text-sm"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[9px] font-black uppercase text-gray-400 dark:text-gray-500 mb-1 tracking-widest">Expiration</label>
                      <input
                        type="text"
                        name="cardExpiry"
                        value={formData.cardExpiry}
                        onChange={handleInputChange}
                        placeholder="MM / AA"
                        className="w-full px-4 py-2.5 bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-[#1d3a3d] text-gray-900 dark:text-gray-100 rounded-xl focus:outline-none focus:border-[#305c31] dark:focus:border-secondary transition text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] font-black uppercase text-gray-400 dark:text-gray-500 mb-1 tracking-widest">CVV</label>
                      <input
                        type="text"
                        name="cardCvc"
                        value={formData.cardCvc}
                        onChange={handleInputChange}
                        placeholder="CVC"
                        className="w-full px-4 py-2.5 bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-[#1d3a3d] text-gray-900 dark:text-gray-100 rounded-xl focus:outline-none focus:border-[#305c31] dark:focus:border-secondary transition text-sm"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* PAYPAL */}
              {paymentMethod === "paypal" && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Vous allez être redirigé vers l'interface PayPal sécurisée pour finaliser votre don de <strong className="text-gray-800 dark:text-gray-250">{formattedAmount}</strong>.
                  </p>
                </div>
              )}

              {/* AIRTEL MONEY */}
              {paymentMethod === "airtel" && (
                <div className="p-4 rounded-xl bg-[#DB0512]/5 dark:bg-[#DB0512]/10 border border-[#DB0512]/20 text-gray-700 dark:text-gray-300 text-xs space-y-4 animate-in fade-in duration-200">
                  <div className="flex items-center gap-2 font-bold text-[#DB0512] dark:text-[#ff2b38]">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#DB0512]"></span>
                    Airtel Money
                  </div>
                  <p>Effectuez votre dépôt ou transfert de <strong className="text-gray-850 dark:text-gray-250">{formattedAmount}</strong> au numéro officiel AEBC :</p>
                  <p className="text-center py-2.5 bg-[#DB0512]/10 dark:bg-[#DB0512]/20 text-lg font-black tracking-widest text-[#305c31] dark:text-secondary rounded-lg">
                    +242 05 578 04 16
                  </p>
                  <p className="leading-relaxed border-t border-[#DB0512]/15 pt-3">
                    Cliquez sur le bouton ci-dessous pour copier automatiquement le numéro, puis envoyez une capture du reçu à <strong>aebcofficiel@gmail.com</strong>.
                  </p>
                </div>
              )}

              {/* MTN MONEY */}
              {paymentMethod === "mtn" && (
                <div className="p-4 rounded-xl bg-[#F6C304]/5 dark:bg-[#F6C304]/10 border border-[#F6C304]/20 text-gray-700 dark:text-gray-300 text-xs space-y-4 animate-in fade-in duration-200">
                  <div className="flex items-center gap-2 font-bold text-[#e1ab00] dark:text-[#F6C304]">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#F6C304]"></span>
                    MTN Mobile Money
                  </div>
                  <p>Effectuez votre dépôt ou transfert de <strong className="text-gray-850 dark:text-gray-250">{formattedAmount}</strong> au numéro officiel AEBC :</p>
                  <p className="text-center py-2.5 bg-[#F6C304]/10 dark:bg-[#F6C304]/20 text-lg font-black tracking-widest text-[#305c31] dark:text-secondary rounded-lg">
                    +242 06 679 74 99
                  </p>
                  <p className="leading-relaxed border-t border-[#F6C304]/15 pt-3">
                    Cliquez sur le bouton ci-dessous pour copier automatiquement le numéro, puis envoyez une capture du reçu à <strong>aebcofficiel@gmail.com</strong>.
                  </p>
                </div>
              )}

              {/* VIREMENT BANCAIRE */}
              {paymentMethod === "virement" && (
                <div className="p-4 rounded-xl bg-blue-600/5 dark:bg-blue-600/10 border border-blue-600/20 text-gray-700 dark:text-gray-300 text-xs space-y-3 animate-in fade-in duration-200">
                  <div className="flex items-center gap-2 font-bold text-blue-600 dark:text-blue-400">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
                    Virement Bancaire (RIB)
                  </div>
                  <p className="font-semibold text-gray-900 dark:text-gray-100">Bénéficiaire : AEBC Officiel</p>
                  <p>Pour votre don de <strong className="text-gray-850 dark:text-gray-250">{formattedAmount}</strong> :</p>
                  <div className="space-y-1 pt-1.5 border-t border-blue-600/15">
                    <p className="font-mono tracking-tight text-[10px]">
                      IBAN : CG76 3000 1000 1234 5678 9012 345
                    </p>
                    <p className="font-mono tracking-tight text-[10px]">
                      BIC / SWIFT : AEBCCGBZXXX
                    </p>
                  </div>
                </div>
              )}

              {/* BOUTON DE VALIDATION UNIQUE & DYNAMIQUE (Sans flèches, avec contours de même couleur que son fond) */}
              <button
                type="submit"
                disabled={loading || (paymentMethod === "stripe" && finalAmount <= 0) || (paymentMethod === "paypal" && finalAmount <= 0)}
                className={`w-full py-4 text-xs font-bold uppercase tracking-widest rounded-xl shadow-md transition-all flex items-center justify-center mt-6 border ${getDynamicStyles(paymentMethod)}`}
              >
                {copied ? (
                  <span>✓ Informations copiées !</span>
                ) : (
                  getButtonLabel()
                )}
              </button>

              {/* Mention de sécurité */}
              <div className="mt-6 pt-6 border-t border-gray-150 dark:border-[#1d3a3d] flex items-start gap-3">
                <ShieldCheck size={28} className="text-[#305c31] dark:text-secondary shrink-0" />
                <p className="text-[10px] leading-relaxed text-gray-400 dark:text-gray-500">
                  Vos informations de paiement font l'objet d'un chiffrement hautement sécurisé pour respecter les exigences de l'industrie.
                </p>
              </div>

            </div>
          </div>

        </form>
      </div>

    </div>
  );
}