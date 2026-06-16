const ImageGrid = ({ images, cols = 3 }) => {
  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  }

  return (
    <div className={`grid ${gridCols[cols]} gap-6`}>
      {images.map((img, idx) => (
        <div
          key={idx}
          className="overflow-hidden rounded-lg shadow-md hover:shadow-xl transition bg-white"
        >
          <img
            src={img.url}
            alt={img.alt || img.title || 'Image AEBC'}
            className="w-full h-64 object-cover hover:scale-105 transition duration-300"
          />

          <div className="p-4">
            {img.title && (
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {img.title}
              </h3>
            )}

            {img.description && (
              <p className="text-gray-600 text-sm leading-relaxed">
                {img.description}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

export default ImageGrid
