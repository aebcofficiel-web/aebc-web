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
    <div className="py-8 bg-white/50 rounded-xl">
      <h3 className="text-center text-2xl font-semibold text-primary mb-6">Nos pays d'action</h3>
      <div className="flex flex-wrap justify-center gap-6">
        {countries.map((country) => (
          <div key={country.name} className="flex flex-col items-center">
            <img src={country.flag} alt={country.name} className="w-16 h-12 object-cover rounded shadow" />
            <span className="text-sm mt-1 font-medium">{country.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CountryFlags