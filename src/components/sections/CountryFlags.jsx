// src/components/sections/CountryFlags.jsx
const countries = [
  { name: 'Congo', flag: 'https://i.postimg.cc/FzsBJT7c/Flag-of-the-Republic-of-the-Congo-svg.png' },
  { name: 'Cameroun', flag: 'https://i.postimg.cc/nrcPQ3Cq/Flag-of-Cameroon-svg.webp' },
  { name: 'RDC', flag: 'https://i.postimg.cc/WzbHJ5hZ/Flag-of-the-Democratic-Republic-of-the-Congo-svg.png' },
  { name: 'Gabon', flag: 'https://i.postimg.cc/Hnsh76Vw/Flag-of-Gabon-svg.png' },
  { name: 'Guinée\nÉq', flag: 'https://i.postimg.cc/3NJcDtdm/Flag-of-Equatorial-Guinea-svg.png' },
  { name: 'RCA', flag: 'https://i.postimg.cc/C5LQfczj/Flag-of-the-Central-African-Republic-svg.png' },
]

const CountryFlags = () => {
  return (
    // bg-white/50 en mode clair ➔ transparent en mode sombre pour épouser la carte parente
    <div className="py-8 bg-white/50 dark:bg-transparent rounded-xl transition-colors duration-300">
      {/* Couleur du titre adaptée aux deux thèmes */}
      <h3 className="text-center text-2xl font-semibold text-primary dark:text-secondary mb-6">
        Nos pays d'action
      </h3>
      <div className="flex flex-wrap justify-center gap-6">
        {countries.map((country) => (
          <div key={country.name} className="flex flex-col items-center">
            <img src={country.flag} alt={country.name} className="w-16 h-12 object-cover rounded shadow" />
            {/* Couleur des noms de pays adaptée aux deux thèmes */}
            <span className="text-sm mt-1 font-medium text-gray-700 dark:text-gray-200">
              {country.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CountryFlags