import React, { useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import * as pdfjsLib from "pdfjs-dist";
import "pdfjs-dist/web/pdf_viewer.css";

pdfjsLib.GlobalWorkerOptions.workerSrc =
  `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

export default function PublicationViewer() {
  const { id } = useParams();
  const fileUrl = id ? decodeURIComponent(id) : null;
  const viewerRef = useRef(null);

  useEffect(() => {
    if (!fileUrl) return;

    const container = viewerRef.current;
    container.innerHTML = "";

    const loadingTask = pdfjsLib.getDocument(fileUrl);

    loadingTask.promise.then(pdf => {
      for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
        pdf.getPage(pageNum).then(page => {
          const viewport = page.getViewport({ scale: 1.3 });
          const canvas = document.createElement("canvas");
          const context = canvas.getContext("2d");

          canvas.height = viewport.height;
          canvas.width = viewport.width;

          container.appendChild(canvas);

          page.render({
            canvasContext: context,
            viewport: viewport
          });
        });
      }
    });
  }, [fileUrl]);

  if (!fileUrl) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold text-primary mb-4">Document introuvable</h1>
        <Link
          to="/publications"
          className="px-4 py-2 bg-primary text-white rounded-lg shadow hover:bg-primary/90 transition"
        >
          ← Retour aux publications
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10">

      <div className="container-custom mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-primary tracking-wide">
          Document AEBC
        </h1>

        <Link
          to="/publications"
          className="px-4 py-2 bg-primary text-white rounded-lg shadow hover:bg-primary/90 transition"
        >
          ← Retour
        </Link>
      </div>

      <div className="container-custom bg-white rounded-xl shadow-lg p-6 border border-gray-200">

        <div className="flex gap-4 mb-4">
          <a
            href={fileUrl}
            download
            className="px-4 py-2 bg-gray-700 text-white rounded-lg shadow hover:bg-gray-800 transition"
          >
            Télécharger
          </a>
        </div>

        <div
          ref={viewerRef}
          className="w-full min-h-[80vh] overflow-auto bg-gray-50 p-4 rounded-lg"
        ></div>
      </div>
    </div>
  );
}
