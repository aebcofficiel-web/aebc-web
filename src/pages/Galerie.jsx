// src/pages/Galerie.jsx
import { useState, useEffect, useMemo } from 'react'
import UniversalVideoPlayer from '../components/ui/UniversalVideoPlayer'
import { db } from '../services/firebase'
import { collection, getDocs, query, orderBy } from 'firebase/firestore'
import { getVideos } from '../services/Bunny'

// Fonction utilitaire pour s'assurer que l'autoplay est désactivé
const forceDisableAutoplay = (url) => {
  if (!url) return url;
  if (url.includes('autoplay=true')) {
    return url.replace('autoplay=true', 'autoplay=false');
  }
  if (!url.includes('autoplay=')) {
    const separator = url.includes('?') ? '&' : '?';
    return `${url}${separator}autoplay=false`;
  }
  return url;
};

// Vos vidéos prioritaires configurées avec l'autoplay désactivé
const STATIC_VIDEOS = [
  {
    id: "bunny-video-1",
    title: "Actions de conservation et sensibilisation dans le Bassin du Congo",
    description: "Découvrez nos initiatives sur le terrain pour la préservation des écosystèmes et de la faune sauvage du Bassin du Congo.",
    embed: forceDisableAutoplay("https://player.mediadelivery.net/play/662905/3387a4a7-eb86-4741-820f-34ae6e30ed45"),
    hls: forceDisableAutoplay("https://player.mediadelivery.net/play/662905/3387a4a7-eb86-4741-820f-34ae6e30ed45"),
    thumbnailUrl: "https://aebc-cdn.b-cdn.net/biodiversite/bob-brewer-lV5PT7R-RuE-unsplash.jpg"
  },
  {
    id: "bunny-video-2",
    title: "Protection des habitats critiques et des espèces prioritaires",
    description: "Un aperçu de nos efforts continus pour la protection des parcs nationaux, des réserves et de la riche biodiversité africaine.",
    embed: forceDisableAutoplay("https://player.mediadelivery.net/play/662905/88c94ff1-5db8-42b3-909a-59897c266ecc"),
    hls: forceDisableAutoplay("https://player.mediadelivery.net/play/662905/88c94ff1-5db8-42b3-909a-59897c266ecc"),
    thumbnailUrl: "https://aebc-cdn.b-cdn.net/biodiversite/bob-brewer-lV5PT7R-RuE-unsplash.jpg"
  }
];

// Données des Espèces Prioritaires du Bassin du Congo
const ESPECES_PRIORITAIRES = [
  {
    id: 1,
    title: "1. Gorille de plaine de l’Ouest",
    description: "Espèce gravement menacée, victime du braconnage et de la perte d’habitat.",
    imageUrl: "https://aebc-cdn.b-cdn.net/biodiversite/Galerie-Photos/paula-robinson-r5QsqLJ3znU-unsplash.jpg",
    badge: "Espèce gravement menacée"
  },
  {
    id: 2,
    title: "2. Gorille de montagne",
    description: "Espèce en danger, dont la population augmente mais reste fragile.",
    imageUrl: "https://aebc-cdn.b-cdn.net/biodiversite/Galerie-Photos/pexels-muwanguzi-isaac-459197912-30991594.jpg",
    badge: "En danger"
  },
  {
    id: 3,
    title: "3. Bonobo (RDC)",
    description: "Espèce endémique de la République démocratique du Congo, menacée par la chasse et la fragmentation des forêts.",
    imageUrl: "https://aebc-cdn.b-cdn.net/biodiversite/Galerie-Photos/pexels-brett-a-2161021813-37533550%20(1).jpg",
    badge: "Endémique RDC"
  },
  {
    id: 4,
    title: "4. Chimpanzé",
    description: "Présent dans plusieurs pays du Bassin du Congo, menacé par le braconnage et les maladies.",
    imageUrl: "https://aebc-cdn.b-cdn.net/biodiversite/Galerie-Photos/pexels-marc-nesen-2153115757-38241292.jpg",
    badge: "Espèce menacée"
  },
  {
    id: 5,
    title: "5. Éléphant de forêt d’Afrique",
    description: "Espèce en danger critique d’extinction, victime du trafic d’ivoire.",
    imageUrl: "https://aebc-cdn.b-cdn.net/biodiversite/Galerie-Photos/wolfgang-hasselmann-7COocBblpyE-unsplash.jpg",
    badge: "Danger critique"
  },
  {
    id: 6,
    title: "6. Okapi (RDC)",
    description: "Espèce endémique de la République démocratique du Congo, menacée par la déforestation et les activités minières.",
    imageUrl: "https://images.unsplash.com/photo-1621255567364-79fa69b2d398?auto=format&fit=crop&w=1200&q=80",
    badge: "Endémique RDC"
  },
  {
    id: 7,
    title: "7. Paon congolais (RDC)",
    description: "Espèce rare et endémique, menacée par la perte d’habitat.",
    imageUrl: "https://aebc-cdn.b-cdn.net/biodiversite/Galerie-Photos/pexels-marian-havenga-531055927-35348784.jpg",
    badge: "Rare & Endémique"
  },
  {
    id: 8,
    title: "8. Bongo (antilope)",
    description: "Espèce forestière emblématique, menacée par la chasse.",
    imageUrl: "https://images.unsplash.com/photo-1575550959106-5a7defe28b56?auto=format&fit=crop&w=1200&q=80",
    badge: "Espèce emblématique"
  },
  {
    id: 9,
    title: "9. Buffles de forêt",
    description: "Espèce vulnérable.",
    imageUrl: "https://images.unsplash.com/photo-1551085254-e96b210db58a?auto=format&fit=crop&w=1200&q=80",
    badge: "Espèce vulnérable"
  },
  {
    id: 10,
    title: "10. Poisson tigre goliath",
    description: "Espèce emblématique des grands fleuves du Bassin du Congo.",
    imageUrl: "https://aebc-cdn.b-cdn.net/biodiversite/Galerie-Photos/requin-marteau-halicorne-sphyrna-lewini-03.jpg",
    badge: "Espèce emblématique"
  }
];

// Données des Espaces Prioritaires du Bassin du Congo
const ESPACES_PRIORITAIRES = [
  {
    id: 1,
    title: "1. Parc national des Virunga (RDC)",
    description: "Plus ancien parc d’Afrique, habitat des gorilles de montagne, éléphants et buffles.",
    imageUrl: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=1200&q=80",
    badge: "Parc National (RDC)"
  },
  {
    id: 2,
    title: "2. Parc national de Salonga (RDC)",
    description: "Plus grande forêt tropicale protégée d’Afrique, habitat du bonobo et de l’éléphant de forêt.",
    imageUrl: "https://aebc-cdn.b-cdn.net/biodiversite/Galerie-Photos/pexels-svitlana-shakalova-1789851085-31162779.jpg",
    badge: "Patrimoine de l'UNESCO (RDC)"
  },
  {
    id: 3,
    title: "3. Parc national de Lobéké (Cameroun)",
    description: "Zone clé pour les éléphants, gorilles et buffles.",
    imageUrl: "https://aebc-cdn.b-cdn.net/biodiversite/Galerie-Photos/parc-lobeke-cameroun.jpg",
    badge: "Parc National (Cameroun)"
  },
  {
    id: 4,
    title: "4. Parc national de Boumba Bek (Cameroun)",
    description: "Zone de conservation prioritaire.",
    imageUrl: "https://aebc-cdn.b-cdn.net/biodiversite/Galerie-Photos/parc-national-boumba-bek%2C_Cameroon.jpg",
    badge: "Zone de conservation (Cameroun)"
  },
  {
    id: 5,
    title: "5. Parc national de Nki (Cameroun)",
    description: "Région forestière intacte, riche en biodiversité.",
    imageUrl: "https://aebc-cdn.b-cdn.net/biodiversite/Galerie-Photos/parc-Nat-de-Nki-Cameroun.webp",
    badge: "Biodiversité (Cameroun)"
  },
  {
    id: 6,
    title: "6. Parc national de Campo Ma’an (Cameroun)",
    description: "Zone importante pour les éléphants et les primates.",
    imageUrl: "https://aebc-cdn.b-cdn.net/biodiversite/Galerie-Photos/parc-N-de-Compo-Ma'an.jpg",
    badge: "Réserve clé (Cameroun)"
  },
  {
    id: 7,
    title: "7. Parc national d’Odzala-Kokoua (République du Congo)",
    description: "Grand refuge de gorilles de plaine.",
    imageUrl: "https://aebc-cdn.b-cdn.net/biodiversite/Galerie-Photos/35221-sangha-likouala-le-parc-national-d-odzala-kokoua.webp",
    badge: "Refuge Faunique (Congo)"
  },
  {
    id: 8,
    title: "8. Parc national de Nouabalé-Ndoki (République du Congo)",
    description: "Forêt primaire intacte, habitat des éléphants, gorilles et chimpanzés.",
    imageUrl: "https://aebc-cdn.b-cdn.net/biodiversite/Galerie-Photos/parcN-OdzalaKokoua-RCongo.webp",
    badge: "Forêt Primaire (Congo)"
  },
  {
    id: 9,
    title: "9. Parc national de Minkébé (Gabon)",
    description: "Zone critique pour l’éléphant de forêt.",
    imageUrl: "https://aebc-cdn.b-cdn.net/biodiversite/Galerie-Photos/david-clode-o3r7oVPZnZI-unsplash.jpg",
    badge: "Zone critique (Gabon)"
  },
  {
    id: 10,
    title: "10. Parc national de Dzanga-Sangha (RCA)",
    description: "Connu pour ses clairières d’éléphants.",
    imageUrl: "https://images.unsplash.com/photo-1549488344-1f9b8d2bd1f3?auto=format&fit=crop&w=1200&q=80",
    badge: "Aire protégée (RCA)"
  }
];

export default function Galerie() {
  const [images, setImages] = useState([])
  const [videos, setVideos] = useState([])
  const [activeCategory, setActiveCategory] = useState("Tous")
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(null)

  const CATEGORIES = [
    { id: "Tous", label: "Tous" },
    { id: "Photos", label: "Photos" },
    { id: "Vidéos", label: "Vidéos" },
    { id: "Actions", label: "Actions Terrain" },
    { id: "Vie", label: "Vie Association" }
  ]

  const fetchData = async () => {
    setLoading(true)
    try {
      const q = query(collection(db, "gallery"), orderBy("order", "asc"))
      const querySnapshot = await getDocs(q)
      setImages(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))
      
      let bunnyVideos = []
      try {
        bunnyVideos = await getVideos()
      } catch (videoError) {
        console.error("Erreur de récupération Bunny Stream: ", videoError)
      }
      
      const allVideos = [...STATIC_VIDEOS, ...bunnyVideos].map(video => ({
        ...video,
        embed: forceDisableAutoplay(video.embed),
        hls: forceDisableAutoplay(video.hls),
        mp4: forceDisableAutoplay(video.mp4),
      }));
      
      setVideos(allVideos)
    } catch (error) { 
      console.error(error) 
      setVideos(STATIC_VIDEOS)
    } 
    finally { setLoading(false) }
  }

  useEffect(() => { fetchData() }, [])

  const filteredContent = useMemo(() => {
    if (activeCategory === "Tous") return { images, videos }
    const fImages = images.filter(img => img.category === activeCategory || (activeCategory === "Photos" && img.type === "image"))
    const fVideos = (activeCategory === "Vidéos" || activeCategory === "Actions") ? videos : [] 
    return { images: fImages, videos: fVideos }
  }, [activeCategory, images, videos])

  return (
    <div className="bg-white dark:bg-zinc-950 min-h-screen transition-colors duration-300">

      {/* BANNIÈRE */}
      <div
        className="relative w-full h-[410px] bg-cover bg-center flex items-center"
        style={{ backgroundImage: "url('https://aebc-cdn.b-cdn.net/biodiversite/bob-brewer-lV5PT7R-RuE-unsplash.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative container-custom">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Galerie
          </h1>
          <p className="text-white text-lg leading-relaxed max-w-3xl drop-shadow opacity-90">
            Explorez les ressources visuelles et audiovisuelles illustrant les actions menées dans le Bassin du Congo : photos de terrain, séquences de sensibilisation et contenus témoignant de l’engagement environnemental de la région.
          </p>
        </div>
      </div>

      {/* FILTRES - HAUTEUR ADAPTÉE À 62PX ET 78PX POUR ÉLIMINER L'ESPACE SUBPIXEL */}
      <section className="py-6 bg-white dark:bg-zinc-950 border-b border-gray-100 dark:border-zinc-900 sticky top-[62px] md:top-[78px] z-40 shadow-sm transition-colors duration-300">
        <div className="container-custom">
          
          {/* CONTENEUR DÉFILANT SUR MOBILE (flex-nowrap sur mobile, wrap sur desktop) */}
          <div className="w-full overflow-x-auto pb-3 md:pb-0 scrollbar-visible text-center">
            <div className="inline-flex md:flex bg-slate-100/90 dark:bg-zinc-900 p-1.5 rounded-[20px] border border-slate-200/50 dark:border-zinc-800/80 flex-nowrap md:flex-wrap justify-start md:justify-center gap-1.5 min-w-max md:min-w-0 mx-auto">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-6 py-2.5 rounded-[14px] text-[10px] font-black uppercase tracking-widest transition-all duration-300 border ${
                    activeCategory === cat.id 
                    ? "bg-white dark:bg-zinc-800 text-[#305c31] dark:text-secondary border-slate-200 dark:border-zinc-700/80 shadow-[0_4px_10px_rgba(0,0,0,0.08),_0_1px_3px_rgba(0,0,0,0.04)]" 
                    : "text-slate-500 hover:text-slate-800 dark:text-zinc-400 dark:hover:text-gray-200 hover:bg-white/40 dark:hover:bg-zinc-800/40 border-transparent dark:border-zinc-800/60 dark:hover:border-zinc-700"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* STYLE INJECTÉ POUR FORCER L'AFFICHAGE DE LA BARRE DE DÉFILEMENT SUR MOBILE */}
          <style dangerouslySetInnerHTML={{__html: `
            .scrollbar-visible::-webkit-scrollbar {
              height: 5px;
            }
            .scrollbar-visible::-webkit-scrollbar-track {
              background: transparent;
            }
            .scrollbar-visible::-webkit-scrollbar-thumb {
              background-color: rgba(0, 0, 0, 0.15);
              border-radius: 10px;
            }
            .dark .scrollbar-visible::-webkit-scrollbar-thumb {
              background-color: rgba(255, 255, 255, 0.25); /* Très visible en mode sombre */
            }
            @media (min-width: 768px) {
              .scrollbar-visible::-webkit-scrollbar {
                display: none;
              }
            }
          `}} />

        </div>
      </section>

      <div className="py-16">
        <div className="container-custom">
          {loading ? (
            <div className="text-center py-20 text-gray-400 dark:text-gray-500 font-bold uppercase text-[10px] tracking-widest animate-pulse">
              Chargement de la médiathèque...
            </div>
          ) : (
            <div className="space-y-24">

              {/* 1. SECTION VIDÉOS */}
              {(activeCategory === "Tous" || activeCategory === "Vidéos") && filteredContent.videos.length > 0 && (
                <section>
                  <h2 className="text-[11px] font-black text-[#305c31] dark:text-secondary uppercase tracking-[0.3em] mb-10 flex items-center gap-4">
                    Vidéos <span className="flex-grow h-px bg-gray-100 dark:bg-zinc-900"></span>
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {filteredContent.videos.map(video => (
                      <div key={video.id} className="border border-gray-200 dark:border-zinc-800 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 bg-gray-50 dark:bg-zinc-900 p-6 flex flex-col">

                        <div className="relative w-full h-[400px] bg-black rounded-lg overflow-hidden mb-5 shadow-inner">
                          <UniversalVideoPlayer
                            url={video.hls || video.mp4 || video.embed}
                            title={video.title}
                            poster={video.thumbnailUrl}
                            className="absolute inset-0 w-full h-full object-contain bg-black"
                          />
                        </div>

                        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-1 leading-tight">
                          {video.title}
                        </h3>
                        <span className="text-[10px] text-[#305c31] dark:text-secondary font-black uppercase tracking-widest">
                          Médiathèque AEBC
                        </span>
                        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mt-4 line-clamp-3 italic">
                          {video.description || "Visionnez nos interventions et reportages sur la préservation de l'environnement."}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* 2. SECTION ESPÈCES & ESPACES */}
              {(activeCategory === "Tous" || activeCategory === "Photos") && (
                <div className="space-y-32">
                  
                  {/* Espèces prioritaires */}
                  <section>
                    <div className="max-w-3xl mx-auto text-center mb-16">
                      <span className="text-[11px] font-black text-[#305c31] dark:text-secondary uppercase tracking-[0.3em]">
                        Biodiversité Exceptionnelle
                      </span>
                      <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-gray-100 mt-2 mb-4 leading-tight tracking-tight">
                        Espèces prioritaires du Bassin du Congo
                      </h2>
                      <p className="text-gray-600 dark:text-gray-300 text-base leading-relaxed">
                        Espèces menacées, emblématiques ou vulnérables, jouant un rôle écologique majeur dans le Bassin du Congo.
                      </p>
                    </div>

                    <div className="space-y-16">
                      {ESPECES_PRIORITAIRES.map((item, idx) => (
                        <div 
                          key={item.id} 
                          className={`flex flex-col md:flex-row ${idx % 2 === 1 ? 'md:flex-row-reverse' : ''} gap-8 md:gap-12 items-center bg-gray-50 dark:bg-zinc-900 p-6 md:p-8 rounded-2xl border border-gray-100 dark:border-zinc-800 shadow-sm`}
                        >
                          {/* Image fixe sans zoom au survol */}
                          <div 
                            className="w-full md:w-1/2 aspect-[4/3] rounded-xl overflow-hidden cursor-pointer relative group shadow-sm bg-gray-200 dark:bg-zinc-950"
                            onClick={() => setSelectedImage({ imageUrl: item.imageUrl, title: item.title, description: item.description })}
                          >
                            <img 
                              src={item.imageUrl} 
                              alt={item.title} 
                              className="w-full h-full object-cover" 
                            />
                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                              <span className="text-white text-3xl font-light">+</span>
                            </div>
                          </div>

                          {/* Texte */}
                          <div className="w-full md:w-1/2 space-y-4">
                            <span className="inline-block px-3 py-1 bg-[#305c31]/10 dark:bg-secondary/20 text-[#305c31] dark:text-secondary text-[10px] font-bold uppercase tracking-wider rounded-full">
                              {item.badge}
                            </span>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 leading-tight">
                              {item.title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300 text-base leading-relaxed">
                              {item.description}
                            </p>
                            <button 
                              onClick={() => setSelectedImage({ imageUrl: item.imageUrl, title: item.title, description: item.description })}
                              className="mt-2 px-5 py-2.5 bg-[#305c31] dark:bg-secondary text-white dark:text-dark hover:bg-[#254826] dark:hover:bg-secondary/90 rounded-xl text-[10px] font-black uppercase tracking-widest transition shadow-sm"
                            >
                              Agrandir la photo
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* Espaces prioritaires */}
                  <section>
                    <div className="max-w-3xl mx-auto text-center mb-16">
                      <span className="text-[11px] font-black text-[#305c31] dark:text-secondary uppercase tracking-[0.3em]">
                        Patrimoine Naturel de l'Afrique
                      </span>
                      <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-gray-100 mt-2 mb-4 leading-tight tracking-tight">
                        Espaces prioritaires du Bassin du Congo
                      </h2>
                      <p className="text-gray-600 dark:text-gray-300 text-base leading-relaxed">
                        Zones naturelles à protéger absolument : parcs nationaux, réserves, forêts primaires et paysages écologiques critiques.
                      </p>
                    </div>

                    <div className="space-y-16">
                      {ESPACES_PRIORITAIRES.map((item, idx) => (
                        <div 
                          key={item.id} 
                          className={`flex flex-col md:flex-row ${idx % 2 === 1 ? 'md:flex-row-reverse' : ''} gap-8 md:gap-12 items-center bg-gray-50 dark:bg-zinc-900 p-6 md:p-8 rounded-2xl border border-gray-100 dark:border-zinc-800 shadow-sm`}
                        >
                          {/* Image fixe sans zoom au survol */}
                          <div 
                            className="w-full md:w-1/2 aspect-[4/3] rounded-xl overflow-hidden cursor-pointer relative group shadow-sm bg-gray-200 dark:bg-zinc-950"
                            onClick={() => setSelectedImage({ imageUrl: item.imageUrl, title: item.title, description: item.description })}
                          >
                            <img 
                              src={item.imageUrl} 
                              alt={item.title} 
                              className="w-full h-full object-cover" 
                            />
                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                              <span className="text-white text-3xl font-light">+</span>
                            </div>
                          </div>

                          {/* Texte */}
                          <div className="w-full md:w-1/2 space-y-4">
                            <span className="inline-block px-3 py-1 bg-blue-50 dark:bg-blue-950/30 text-blue-800 dark:text-blue-300 text-[10px] font-bold uppercase tracking-wider rounded-full border border-blue-100 dark:border-blue-900/40">
                              {item.badge}
                            </span>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 leading-tight">
                              {item.title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300 text-base leading-relaxed">
                              {item.description}
                            </p>
                            <button 
                              onClick={() => setSelectedImage({ imageUrl: item.imageUrl, title: item.title, description: item.description })}
                              className="mt-2 px-5 py-2.5 bg-[#305c31] dark:bg-secondary text-white dark:text-dark hover:bg-[#254826] dark:hover:bg-secondary/90 rounded-xl text-[10px] font-black uppercase tracking-widest transition shadow-sm"
                            >
                              Agrandir la photo
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>

                </div>
              )}

              {/* 3. SECTION PHOTOS CLASSIQUES DE L'ASSOCIATION (Restructurée en style alternatif) */}
              {(activeCategory === "Tous" || (activeCategory !== "Vidéos" && activeCategory !== "Photos")) && filteredContent.images.length > 0 && (
                <section>
                  <h2 className="text-[11px] font-black text-[#305c31] dark:text-secondary uppercase tracking-[0.3em] mb-10 flex items-center gap-4">
                    {activeCategory === "Tous" ? "Photothèque de l'association" : "Photothèque"} <span className="flex-grow h-px bg-gray-100 dark:bg-zinc-900"></span>
                  </h2>

                  {/* Rendu sous forme de liste à mise en page alternée */}
                  <div className="space-y-16">
                    {filteredContent.images.map((img, idx) => (
                      <div 
                        key={img.id || idx} 
                        className={`flex flex-col md:flex-row ${idx % 2 === 1 ? 'md:flex-row-reverse' : ''} gap-8 md:gap-12 items-center bg-gray-50 dark:bg-zinc-900 p-6 md:p-8 rounded-2xl border border-gray-100 dark:border-zinc-800 shadow-sm`}
                      >
                        {/* Image fixe sans zoom au survol */}
                        <div 
                          className="w-full md:w-1/2 aspect-[4/3] rounded-xl overflow-hidden cursor-pointer relative group shadow-sm bg-gray-200 dark:bg-zinc-950"
                          onClick={() => setSelectedImage(img)}
                        >
                          <img 
                            src={img.imageUrl} 
                            alt={img.title} 
                            className="w-full h-full object-cover" 
                          />
                          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                            <span className="text-white text-3xl font-light">+</span>
                          </div>
                        </div>

                        {/* Texte */}
                        <div className="w-full md:w-1/2 space-y-4">
                          <span className="inline-block px-3 py-1 bg-[#305c31]/10 dark:bg-secondary/20 text-[#305c31] dark:text-secondary text-[10px] font-bold uppercase tracking-wider rounded-full">
                            {img.category || "Actions"}
                          </span>
                          <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 leading-tight">
                            {img.title}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-300 text-base leading-relaxed italic">
                            {img.description || "Ressource visuelle de l'AEBC."}
                          </p>
                          <button 
                            onClick={() => setSelectedImage(img)}
                            className="mt-2 px-5 py-2.5 bg-[#305c31] dark:bg-secondary text-white dark:text-dark hover:bg-[#254826] dark:hover:bg-secondary/90 rounded-xl text-[10px] font-black uppercase tracking-widest transition shadow-sm w-full sm:w-auto"
                          >
                            Agrandir la photo
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

            </div>
          )}
        </div>
      </div>

      {/* LIGHTBOX (Visionneuse plein écran) */}
      {selectedImage && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4" onClick={() => setSelectedImage(null)}>
          <button className="absolute top-6 right-6 text-white text-3xl hover:text-gray-300 transition">✕</button>
          <div className="max-w-5xl w-full flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
            <img 
              src={selectedImage.imageUrl} 
              alt={selectedImage.title} 
              className="max-h-[80vh] w-auto rounded shadow-2xl object-contain animate-in zoom-in duration-300" 
            />
            <div className="mt-6 text-center text-white max-w-3xl">
              <h3 className="text-lg font-bold uppercase tracking-widest">{selectedImage.title}</h3>
              <p className="text-gray-400 text-sm mt-2">{selectedImage.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}