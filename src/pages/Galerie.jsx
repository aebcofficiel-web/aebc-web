// src/pages/Galerie.jsx
import { useState, useEffect, useMemo } from 'react'
import UniversalVideoPlayer from '../components/ui/UniversalVideoPlayer'
import { db } from '../services/firebase'
import { collection, getDocs, query, orderBy } from 'firebase/firestore'
import { getVideos } from '../services/Bunny'

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
    { id: "Projets", label: "Projets" },
    { id: "Vie", label: "Vie Association" }
  ]

  const fetchData = async () => {
    setLoading(true)
    try {
      const q = query(collection(db, "gallery"), orderBy("order", "asc"))
      const querySnapshot = await getDocs(q)
      setImages(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))
      const videoData = await getVideos()
      setVideos(videoData)
    } catch (error) { console.error(error) } 
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
    <div className="bg-white min-h-screen">

      {/* BANNIÈRE */}
      <div
        className="relative w-full h-[410px] bg-cover bg-center flex items-center"
        style={{ backgroundImage: "url('https://aebc-cdn.b-cdn.net/biodiversite/bob-brewer-lV5PT7R-RuE-unsplash.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative container-custom">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg uppercase tracking-tighter">
            Galerie
          </h1>
          <p className="text-white text-lg leading-relaxed max-w-3xl drop-shadow opacity-90">
            Retrouvez l'ensemble des ressources visuelles et audiovisuelles de l'AEBC dans le Bassin du Congo.
          </p>
        </div>
      </div>

      {/* FILTRES */}
      <section className="py-10 bg-white border-b border-gray-100 sticky top-0 z-20">
        <div className="container-custom text-center">
          <div className="inline-flex bg-gray-100 p-1.5 rounded-2xl shadow-inner">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                  activeCategory === cat.id 
                  ? "bg-white text-[#305c31] shadow-sm" 
                  : "text-gray-500 hover:text-gray-800"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="py-16">
        <div className="container-custom">
          {loading ? (
            <div className="text-center py-20 text-gray-400 font-bold uppercase text-[10px] tracking-widest animate-pulse">
              Chargement de la médiathèque...
            </div>
          ) : (
            <div className="space-y-24">

              {/* VIDÉOS */}
              {(activeCategory === "Tous" || activeCategory === "Vidéos") && filteredContent.videos.length > 0 && (
                <section>
                  <h2 className="text-[11px] font-black text-[#305c31] uppercase tracking-[0.3em] mb-10 flex items-center gap-4">
                    Vidéos <span className="flex-grow h-px bg-gray-100"></span>
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {filteredContent.videos.map(video => (
                      <div key={video.id} className="border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition bg-gray-50 p-6 flex flex-col">

                        {/* VIDÉO AGRANDIE + NON TRONQUÉE */}
                        <div className="relative w-full h-[400px] md:h-[400px] bg-black rounded-lg overflow-hidden mb-5 shadow-inner">
                          <UniversalVideoPlayer
                            url={video.hls || video.mp4 || video.embed}
                            title={video.title}
                            poster={video.thumbnailUrl}
                            className="absolute inset-0 w-full h-full object-contain bg-black"
                          />
                        </div>

                        <h3 className="text-xl font-bold text-gray-900 mb-1 leading-tight">
                          {video.title}
                        </h3>
                        <span className="text-[10px] text-[#305c31] font-black uppercase tracking-widest">
                          Médiathèque AEBC
                        </span>
                        <p className="text-gray-600 text-sm leading-relaxed mt-4 line-clamp-3 italic">
                          {video.description || "Visionnez nos interventions et reportages sur la préservation de l'environnement."}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* PHOTOS */}
              {(activeCategory === "Tous" || activeCategory !== "Vidéos") && filteredContent.images.length > 0 && (
                <section>
                  <h2 className="text-[11px] font-black text-[#305c31] uppercase tracking-[0.3em] mb-10 flex items-center gap-4">
                    Photothèque <span className="flex-grow h-px bg-gray-100"></span>
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {filteredContent.images.map((img, idx) => (
                      <div key={idx} className="border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition bg-gray-50 p-6 flex flex-col">

                        <div 
                          className="w-full aspect-video bg-gray-200 rounded-lg overflow-hidden mb-4 cursor-pointer relative group"
                          onClick={() => setSelectedImage(img)}
                        >
                          <img 
                            src={img.imageUrl} 
                            alt={img.title} 
                            className="w-full h-full object-cover transition duration-500 group-hover:scale-110" 
                          />
                          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                            <span className="text-white text-3xl font-light">+</span>
                          </div>
                        </div>

                        <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-2">{img.title}</h3>
                        <span className="text-[10px] text-[#305c31] font-black uppercase tracking-widest">{img.category || "Actions"}</span>
                        <p className="text-gray-600 text-sm leading-relaxed mt-3 mb-6 flex-grow line-clamp-3 italic">
                          {img.description || "Ressource visuelle de l'AEBC."}
                        </p>

                        <button 
                          onClick={() => setSelectedImage(img)}
                          className="w-full py-2 bg-[#305c31] text-white rounded-lg text-xs font-bold uppercase tracking-widest hover:opacity-90 transition"
                        >
                          Agrandir la photo
                        </button>
                      </div>
                    ))}
                  </div>
                </section>
              )}

            </div>
          )}
        </div>
      </div>

      {/* LIGHTBOX */}
      {selectedImage && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4" onClick={() => setSelectedImage(null)}>
          <button className="absolute top-6 right-6 text-white text-3xl">✕</button>
          <div className="max-w-5xl w-full flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
            <img 
              src={selectedImage.imageUrl} 
              alt={selectedImage.title} 
              className="max-h-[80vh] w-auto rounded shadow-2xl object-contain animate-in zoom-in duration-300" 
            />
            <div className="mt-6 text-center text-white">
              <h3 className="text-lg font-bold uppercase tracking-widest">{selectedImage.title}</h3>
              <p className="text-gray-400 text-sm mt-2">{selectedImage.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
