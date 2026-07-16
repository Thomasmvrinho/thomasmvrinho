import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

const Section = ({ title, children }) => (
  <div className="mb-10">
    <h2 className="font-grotesk font-semibold text-lg text-white mb-3">{title}</h2>
    <div className="font-inter text-white/55 text-sm leading-relaxed space-y-2">{children}</div>
  </div>
)

export default function MentionsLegales() {
  return (
    <div className="min-h-screen bg-pitch text-white">
      <div className="max-w-3xl mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-white/40 hover:text-white/80 transition-colors text-sm mb-12"
          >
            <ArrowLeft size={15} />
            Retour
          </Link>

          <h1 className="font-grotesk font-bold text-4xl mb-2">
            <span style={{ color: '#c97efd' }}>Mentions</span> légales
          </h1>
          <p className="font-inter text-white/35 text-sm mb-12">Dernière mise à jour : juillet 2026</p>

          <div
            className="h-px mb-12"
            style={{
              background:
                'linear-gradient(90deg, transparent, rgba(201,126,253,0.4), rgba(255,142,6,0.4), transparent)',
            }}
          />

          <Section title="1. Éditeur du site">
            <p>Le présent site est édité par :</p>
            <p>
              <strong className="text-white/75">Thomas Marinho</strong>
              <br />
              Freelance — Création de sites web
              <br />
              Email :{' '}
              <a
                href="mailto:thomasmvrinho@outlook.com"
                className="text-purple-400 hover:text-purple-300 transition-colors"
              >
                thomasmvrinho@outlook.com
              </a>
            </p>
          </Section>

          <Section title="2. Hébergement">
            <p>
              Le site est hébergé par un prestataire tiers. Les coordonnées de l'hébergeur sont disponibles sur
              demande à l'adresse email ci-dessus.
            </p>
          </Section>

          <Section title="3. Propriété intellectuelle">
            <p>
              L'ensemble du contenu de ce site (textes, images, visuels, code source) est la propriété exclusive
              de Thomas Marinho, sauf mention contraire.
            </p>
            <p>
              Toute reproduction, distribution ou utilisation sans autorisation écrite préalable est strictement
              interdite.
            </p>
          </Section>

          <Section title="4. Responsabilité">
            <p>
              Thomas Marinho s'efforce de maintenir les informations de ce site à jour et exactes. Il ne saurait
              être tenu responsable des erreurs ou omissions, ni des dommages résultant de l'utilisation du site.
            </p>
          </Section>

          <Section title="5. Données personnelles">
            <p>
              Les informations collectées via le formulaire de contact (nom, email, message) sont utilisées
              exclusivement pour répondre à vos demandes et ne sont jamais transmises à des tiers.
            </p>
            <p>
              Conformément au RGPD, vous disposez d'un droit d'accès, de rectification et de suppression de vos
              données. Pour exercer ce droit, contactez :{' '}
              <a
                href="mailto:thomasmvrinho@outlook.com"
                className="text-purple-400 hover:text-purple-300 transition-colors"
              >
                thomasmvrinho@outlook.com
              </a>
            </p>
          </Section>

          <Section title="6. Cookies">
            <p>
              Ce site utilise un nombre limité de cookies techniques nécessaires à son bon fonctionnement.
              Consultez notre{' '}
              <Link to="/cookies" className="text-purple-400 hover:text-purple-300 transition-colors">
                politique de cookies
              </Link>{' '}
              pour plus de détails.
            </p>
          </Section>

          <Section title="7. Droit applicable">
            <p>
              Les présentes mentions légales sont soumises au droit français. En cas de litige, les tribunaux
              français seront seuls compétents.
            </p>
          </Section>
        </motion.div>
      </div>
    </div>
  )
}
