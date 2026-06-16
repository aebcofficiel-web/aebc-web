// src/components/sections/SocialLinks.jsx
import {
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaEnvelope,
  FaPhone,
  FaLinkedin
} from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'

const AEBC_GREEN = '#6c8d3f'

const socials = [
  { name: 'Facebook', icon: FaFacebook, url: 'https://www.facebook.com/profile.php?id=61589455181284', color: '#1877F2' },
  { name: 'Instagram', icon: FaInstagram, url: 'https://www.instagram.com/aebcofficiel', color: '#E4405F' },
  { name: 'X (Twitter)', icon: FaXTwitter, url: 'https://x.com/AEBC_Officiel', color: '#000000' },
  { name: 'YouTube', icon: FaYoutube, url: 'https://www.youtube.com/@aebcOfficiel', color: '#FF0000' },
]

const SocialLinks = ({ showContact = false, showFooterLinkedin = false }) => {
  return (
    <div className="flex flex-wrap justify-center gap-6">
      {socials.map((social) => (
        <a
          key={social.name}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={social.name}
          className="transition-transform duration-300 transform hover:scale-125 active:scale-95"
          style={{ color: AEBC_GREEN }}
          onMouseEnter={(e) => (e.currentTarget.style.color = social.color)}
          onMouseLeave={(e) => (e.currentTarget.style.color = AEBC_GREEN)}
        >
          <social.icon size={26} />
        </a>
      ))}

      {showFooterLinkedin && (
        <a
          href="https://www.linkedin.com/in/aebc-officiel-2970b040b"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-transform duration-300 transform hover:scale-125 active:scale-95"
          style={{ color: AEBC_GREEN }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#0A66C2')}
          onMouseLeave={(e) => (e.currentTarget.style.color = AEBC_GREEN)}
        >
          <FaLinkedin size={26} />
        </a>
      )}
      {/* ... reste du code identique pour showContact */}
    </div>
  )
}

export default SocialLinks;