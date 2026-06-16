import { useState, useEffect } from 'react'
import ImageGrid from '../components/sections/ImageGrid'
import UniversalVideoPlayer from '../components/ui/UniversalVideoPlayer'
import { db } from '../services/firebase'
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore'
import { getVideos } from '../services/Bunny'

export default function Galerie() {
  const [images, setImages] = useState([])
  const [videos, setVideos] = useState([])

  const fetchImages = async () => {
    try {
      const q = query(
        collection(db, "gallery"),
        where("type", "==", "image"),
        orderBy("order", "asc")
      )

      const querySnapshot = await getDocs(q)

      const imageData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))

      console.log("Firestore images:", imageData)

      setImages(imageData)
    } catch (error) {
      console.error("Erreur Firestore (images) :", error)
    }
  }

  const fetchVideos = async () => {
    try {
      const videoData = await getVideos()
      setVideos(videoData)
    } catch (error) {
      console.error("Erreur Bunny (vidéos) :", error)
    }
  }

  useEffect(() => {
    fetchImages()
    fetchVideos()
  }, [])

  return (
    <div>

      {/* HERO — Bannière pleine largeur avec image + texte intégré */}
      <div
        className="relative w-full h-[410px] bg-cover bg-center flex items-center"
        style={{
          backgroundImage:
            "url('https://aebc-cdn.b-cdn.net/biodiversite/bob-brewer-lV5PT7R-RuE-unsplash.jpg')",
        }}
      >
        {/* Overlay sombre + vitrage fumé */}
        <div className="absolute inset-0 bg-black/60"></div>

        {/* Texte dans la bannière */}
        <div className="relative container-custom">
          <h1 className="text-4xl font-bold text-white mb-4 drop-shadow-lg">
            Galerie
          </h1>

          <p className="text-white text-lg leading-relaxed max-w-3xl drop-shadow">
            Explorez les images et vidéos illustrant les actions, projets et
            initiatives suivies par l’AEBC dans le Bassin du Congo. Cette
            galerie rassemble à la fois les contenus produits par l’AEBC et
            une sélection de ressources visuelles pertinentes mettant en lumière
            la biodiversité, les écosystèmes, les communautés locales et les
            enjeux environnementaux de la région.
          </p>
        </div>
      </div>

      {/* CONTENU */}
      <div className="py-16">
        <div className="container-custom">

          {/* SECTION IMAGES */}
          <section className="mb-16">
            <h2 className="text-2xl font-semibold mb-6">Photos</h2>

            {images.length === 0 ? (
              <p className="text-gray-500">Aucune image pour le moment.</p>
            ) : (
              <ImageGrid
                images={images.map(img => ({
                  url: img.imageUrl,
                  title: img.title,
                  description: img.description,
                  alt: img.title || "Image AEBC"
                }))}
                cols={3}
              />
            )}
          </section>

          {/* SECTION VIDÉOS */}
          <section>
            <h2 className="text-2xl font-semibold mb-6">Vidéos</h2>

            {videos.length === 0 ? (
              <p className="text-gray-500">Aucune vidéo pour le moment.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {videos.map(video => (
                  <div key={video.id}>
                    <UniversalVideoPlayer
                      url={video.hls || video.mp4 || video.embed}
                      title={video.title}
                      poster={video.thumbnailUrl}
                      height="300px"
                    />
                  </div>
                ))}
              </div>
            )}
          </section>

        </div>
      </div>
    </div>
  )
}
