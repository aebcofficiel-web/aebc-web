// src/components/Card.jsx
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

const Card = ({ title, description, image, date, linkTo, linkText = "En savoir plus" }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition flex flex-col h-full">
      {image && (
        <img
          src={image}
          alt={title}
          className="w-full h-84 object-cover"
        />
      )}
      <div className="p-5 flex flex-col flex-grow">
        {date && <p className="text-sm text-gray-500 mb-2">{date}</p>}
        <h3 className="text-xl font-bold mb-2 text-primary">{title}</h3>
        <p className="text-gray-600 mb-4 flex-grow">{description}</p>
        {linkTo && (
          <Link
            to={linkTo}
            className="inline-flex items-center text-secondary font-semibold hover:underline"
          >
            {linkText} <ArrowRight size={14} className="ml-1" />
          </Link>
        )}
      </div>
    </div>
  )
}

export default Card
