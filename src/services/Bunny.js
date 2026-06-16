// Bunny.net Stream – Service vidéo AEBC

const libraryId = "662905";

const videos = [
  {
    id: "da147014-7eb9-4a9f-bf90-07e9244a8136",
    title: "Présentation de l'AEBC",
    embed: `https://iframe.mediadelivery.net/embed/${libraryId}/da147014-7eb9-4a9f-bf90-07e9244a8136?autoplay=false`,
    thumbnailUrl: `https://vz-da147014-7eb9-4a9f-bf90-07e9244a8136.b-cdn.net/thumbnail.jpg`
  }
];

// 👉 Fonction principale utilisée par Galerie.jsx
export async function getVideos() {
  return videos;
}

// Optionnel : token sécurisé (si tu veux ajouter plus tard)
export function getSignedUrl() {
  return null;
}

// ✅ Export par défaut pour compatibilité universelle
export default { getVideos, getSignedUrl };
