export default function DonMTN() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-dark text-white p-6 space-y-6">
      <h1 className="text-3xl font-bold">Don via MTN Money</h1>

      <div className="bg-yellow-400 text-black rounded-lg p-6 w-full max-w-sm text-center space-y-4 shadow-lg">
        <p>Envoyez votre don au numéro :</p>
        <p className="text-2xl font-bold">+242 000 000 000</p>

        <p className="text-sm text-gray-800">
          Après le transfert, envoyez un message de confirmation à :  
          <strong>aebcofficiel@gmail.com</strong>
        </p>

        <a
          href="/don"
          className="block mt-4 text-center bg-dark text-white py-2 rounded-lg hover:bg-gray-800 transition"
        >
          Retour
        </a>
      </div>
    </div>
  );
}
