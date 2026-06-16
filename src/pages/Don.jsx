// src/pages/Don.jsx

export default function Don() {
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

        <a
          href="https://donate.stripe.com/test_aebc"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-600 py-3 rounded-lg font-semibold hover:bg-green-700 transition text-center"
        >
          DONNER PAR CARTE
        </a>

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
