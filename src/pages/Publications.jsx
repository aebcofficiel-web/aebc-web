import React, { useEffect, useState } from "react";
import { db } from "../services/firebase";
import { collection, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";
import * as pdfjsLib from "pdfjs-dist";
import "pdfjs-dist/web/pdf_viewer.css";

// Configuration du worker PDF.js
pdfjsLib.GlobalWorkerOptions.workerSrc =
  `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

// Génère une miniature à partir de la première page d'un PDF
const generatePdfThumbnail = async (url) => {
  try {
    const loadingTask = pdfjsLib.getDocument(url);
    const pdf = await loadingTask.promise;
    const page = await pdf.getPage(1);

    const viewport = page.getViewport({ scale: 0.4 });
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    canvas.width = viewport.width;
    canvas.height = viewport.height;

    await page.render({ canvasContext: context, viewport }).promise;

    return canvas.toDataURL("image/png");
  } catch (e) {
    console.error("Erreur miniature PDF :", e);
    return null;
  }
};

const Publications = () => {
  const [publications, setPublications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [thumbnails, setThumbnails] = useState({});

  // Charger les publications Firestore
  useEffect(() => {
    const fetchPublications = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "publications"));
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPublications(data);
      } catch (error) {
        console.error("Erreur lors du chargement des publications :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPublications();
  }, []);

  // Générer les miniatures PDF
  useEffect(() => {
    const loadThumbnails = async () => {
      const newThumbs = {};

      for (const pub of publications) {
        if (pub.fileUrl?.toLowerCase().endsWith(".pdf")) {
          const thumb = await generatePdfThumbnail(pub.fileUrl);
          newThumbs[pub.id] = thumb;
        }
      }

      setThumbnails(newThumbs);
    };

    if (publications.length > 0) {
      loadThumbnails();
    }
  }, [publications]);

  return (
    <div>

      {/* HERO */}
      <div
        className="relative w-full h-[410px] bg-cover bg-center flex items-center"
        style={{
          backgroundImage:
            "url('https://aebc-cdn.b-cdn.net/biodiversite/nzaou.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>

        <div className="relative container-custom">
          <h1 className="text-4xl font-bold text-white mb-4 drop-shadow-lg">
            Publications
          </h1>

          <p className="text-white text-lg leading-relaxed max-w-3xl drop-shadow">
            Documents officiels, rapports, études, images, archives et ressources AEBC.
          </p>
        </div>
      </div>

      {/* LISTE */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <h2 className="text-2xl font-bold text-primary mb-10 tracking-wide">
            Documents disponibles
          </h2>

          {loading ? (
            <p className="text-gray-600">Chargement des publications...</p>
          ) : publications.length === 0 ? (
            <p className="text-gray-600">Aucune publication disponible pour le moment.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {publications.map((pub) => (
                <div
                  key={pub.id}
                  className="border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition bg-gray-50 p-6"
                >

                  {/* MINIATURE */}
                  <div className="w-full h-64 bg-gray-200 rounded-lg overflow-hidden mb-4 flex items-center justify-center">
                    {thumbnails[pub.id] ? (
                      <img
                        src={thumbnails[pub.id]}
                        alt="Miniature PDF"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-gray-500 text-sm">
                        Aperçu non disponible
                      </div>
                    )}
                  </div>

                  {/* TITRE */}
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">
                    {pub.title}
                  </h3>

                  <span className="text-sm text-primary font-medium">
                    {pub.type || "Document"}
                  </span>

                  {/* DESCRIPTION */}
                  <p className="text-gray-600 text-sm leading-relaxed mt-3 mb-4">
                    {pub.description || "Document AEBC."}
                  </p>

                  {/* BOUTONS */}
                  {pub.fileUrl && (
                    <div className="flex gap-3 mt-4">

                      {/* Ouvrir si PDF */}
                      {pub.fileUrl.toLowerCase().endsWith(".pdf") && (
                        <Link
                          to={`/publication/view/${encodeURIComponent(pub.fileUrl)}`}
                          className="px-4 py-2 bg-primary text-white rounded-lg shadow hover:bg-primary/90 transition"
                        >
                          Ouvrir
                        </Link>
                      )}

                      {/* Télécharger */}
                      <a
                        href={pub.fileUrl}
                        download
                        className="px-4 py-2 bg-gray-700 text-white rounded-lg shadow hover:bg-gray-800 transition"
                      >
                        Télécharger
                      </a>

                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Publications;
