import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

const Section = ({ title, children }) => (
  <div className="mb-10">
    <h2 className="font-grotesk font-semibold text-lg text-white mb-3">{title}</h2>
    <div className="font-inter text-white/55 text-sm leading-relaxed space-y-2">{children}</div>
  </div>
)

const CookieRow = ({ name, purpose, duration, type }) => (
  <div
    className="grid grid-cols-4 gap-4 py-3 border-b text-sm"
    style={{ borderColor: 'rgba(255,255,255,0.06)' }}
  >
    <span className="font-mono text-purple-400">{name}</span>
    <span className="text-white/55 col-span-2">{purpose}</span>
    <span className="text-white/35">{duration}</span>
  </div>
)

export default function CookiesPage() {
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
            <span style={{ color: '#ff8e06' }}>Politique</span> de cookies
          </h1>
          <p className="font-inter text-white/35 text-sm mb-12">Dernière mise à jour : juillet 2026</p>

          <div
            className="h-px mb-12"
            style={{
              background:
                'linear-gradient(90deg, transparent, rgba(201,126,253,0.4), rgba(255,142,6,0.4), transparent)',
            }}
          />

          <Section title="Qu'est-ce qu'un cookie ?">
            <p>
              Un cookie est un petit fichier texte déposé sur votre appareil lors de la visite d'un site web. Il
              permet de mémoriser des informations sur votre navigation.
            </p>
          </Section>

          <Section title="Cookies utilisés sur ce site">
            <p className="mb-4">
              Ce site utilise uniquement des cookies <strong className="text-white/75">strictement nécessaires</strong> à
              son fonctionnement. Aucun cookie publicitaire ou de tracking tiers n'est déposé.
            </p>

            <div
              className="rounded-xl overflow-hidden"
              style={{ border: '1px solid rgba(255,255,255,0.07)' }}
            >
              <div
                className="grid grid-cols-4 gap-4 px-4 py-3 text-xs font-semibold text-white/30 uppercase tracking-wider"
                style={{ background: 'rgba(255,255,255,0.03)' }}
              >
                <span>Nom</span>
                <span className="col-span-2">Finalité</span>
                <span>Durée</span>
              </div>
              <div className="px-4">
                <CookieRow
                  name="session"
                  purpose="Maintien de la session utilisateur (fonctionnement du formulaire de contact)"
                  duration="Session"
                />
                <CookieRow
                  name="theme"
                  purpose="Mémorisation des préférences d'affichage"
                  duration="1 an"
                />
              </div>
            </div>
          </Section>

          <Section title="Cookies tiers">
            <p>
              Le formulaire de contact utilise{' '}
              <strong className="text-white/75">EmailJS</strong>, un service d'envoi d'email. Ce service peut
              déposer ses propres cookies techniques. Nous vous invitons à consulter leur politique de
              confidentialité pour plus d'informations.
            </p>
          </Section>

          <Section title="Vos droits">
            <p>
              Vous pouvez à tout moment désactiver les cookies via les paramètres de votre navigateur. La
              désactivation des cookies strictement nécessaires peut affecter le bon fonctionnement du site.
            </p>
            <p>
              Pour toute question, contactez :{' '}
              <a
                href="mailto:thomasmvrinho@outlook.com"
                className="text-orange-400 hover:text-orange-300 transition-colors"
              >
                thomasmvrinho@outlook.com
              </a>
            </p>
          </Section>

          <Section title="Modifications">
            <p>
              Cette politique peut être mise à jour à tout moment. La date de dernière mise à jour est indiquée
              en haut de cette page.
            </p>
            <p>
              Consultez également nos{' '}
              <Link to="/mentions-legales" className="text-purple-400 hover:text-purple-300 transition-colors">
                mentions légales
              </Link>
              .
            </p>
          </Section>
        </motion.div>
      </div>
    </div>
  )
}
