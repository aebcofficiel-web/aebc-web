import { useEffect, useRef } from "react";
import Hls from "hls.js";

export default function UniversalVideoPlayer({ url, title, width = "100%", height = "400px", poster }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;

    if (!video || !url) return;

    // Si c'est un flux HLS (.m3u8)
    if (url.endsWith(".m3u8")) {
      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(url);
        hls.attachMedia(video);
      } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
        video.src = url;
      }
      return;
    }

    // Si c'est un embed (iframe)
    if (url.includes("iframe") || url.includes("mediadelivery")) {
      video.removeAttribute("src");
      return;
    }

    // Sinon : MP4, WebM, etc.
    video.src = url;
  }, [url]);

  // Si c'est un embed, on affiche une iframe
  if (url.includes("iframe") || url.includes("mediadelivery")) {
    return (
      <div className="rounded-lg overflow-hidden shadow-lg">
        <iframe
          src={url}
          width={width}
          height={height}
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{ border: "none" }}
        ></iframe>

        {title && (
          <p className="text-center text-sm mt-2 text-gray-600">{title}</p>
        )}
      </div>
    );
  }

  return (
    <div className="rounded-lg overflow-hidden shadow-lg">
      <video
        ref={videoRef}
        width={width}
        height={height}
        controls
        poster={poster}   // 🔥 MINIATURE ICI
        style={{ background: "#000" }}
      />

      {title && (
        <p className="text-center text-sm mt-2 text-gray-600">{title}</p>
      )}
    </div>
  );
}
