const HeroSection = () => {
  return (
    <div
      className="relative h-[600px] md:h-[800px] bg-contain bg-center bg-no-repeat flex items-center justify-center"
      style={{
        backgroundImage: "url('https://aebc-cdn.b-cdn.net/Logo-Banni%C3%A8re/AEBC-Banniere-px-01_chaud.png')",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 text-center text-white px-4">
        <img
          src="https://aebc-cdn.b-cdn.net/Logo-Banni%C3%A8re/AEBC-Logo-px%20(1).png"
          alt="AEBC Logo"
          className="h-[250px] md:h-[360px] mx-auto mb-6 drop-shadow-lg"
        />

        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Protégeons le Bassin du Congo
        </h1>

        <p className="text-lg md:text-xl max-w-2xl mx-auto">
          Ensemble pour la préservation des écosystèmes et le développement durable en Afrique centrale
        </p>
      </div>
    </div>
  )
}

export default HeroSection
