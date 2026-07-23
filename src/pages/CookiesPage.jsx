import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

const Section = ({ title, children }) => (
  <div className="mb-10">
    <h2 className="font-grotesk font-semibold text-lg text-white mb-3">{title}</h2>
    <div className="font-inter text-white/55 text-sm leading-relaxed space-y-2">{children}</div>
  </div>
)

const CookieRow = ({ name, purpose, duration }) => (
  <div
    className="grid grid-cols-4 gap-4 py-3 border-b text-sm"
    style={{ borderColor: 'rgba(255,255,255,0.06)' }}
  >
    <span className="font-mono text-purple-400 break-words">{name}</span>
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
          <p className="font-inter text-white/35 text-sm mb-12">Dernière mise à jour : 23 juillet 2026</p>

          <div
            className="h-px mb-12"
            style={{
              background:
                'linear-gradient(90deg, transparent, rgba(201,126,253,0.4), rgba(255,142,6,0.4), transparent)',
            }}
          />

          <Section title="Qu'est-ce qu'un cookie ?">
            <p>
              Un cookie — ou une technologie similaire comme le stockage local — est une petite information
              enregistrée sur votre appareil lors de la visite d'un site web. Il permet de mémoriser certains
              éléments relatifs à votre navigation.
            </p>
          </Section>

          <Section title="Notre approche">
            <p>
              Ce site n'utilise <strong className="text-white/75">aucun cookie publicitaire</strong> ni traceur à
              des fins marketing. Seuls deux éléments sont utilisés, décrits ci-dessous. La mesure d'audience n'est
              activée <strong className="text-white/75">qu'après votre consentement explicite</strong>.
            </p>

            <div
              className="rounded-xl overflow-hidden mt-4"
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
                  name="cookie_consent"
                  purpose="Mémorise votre choix concernant la mesure d'audience (accepté / refusé), afin de ne pas réafficher le bandeau à chaque visite. Stocké en local sur votre navigateur."
                  duration="Jusqu'à effacement"
                />
                <CookieRow
                  name="Vercel Web Analytics"
                  purpose="Mesure d'audience anonyme (pages vues, pays, type d'appareil). Ne dépose aucun cookie et n'identifie pas les visiteurs. Chargé uniquement si vous cliquez sur « Accepter »."
                  duration="—"
                />
              </div>
            </div>
          </Section>

          <Section title="Votre consentement">
            <p>
              À votre première visite, un bandeau vous permet d'
              <strong className="text-white/75">accepter</strong> ou de{' '}
              <strong className="text-white/75">refuser</strong> la mesure d'audience.
            </p>
            <p>
              Si vous refusez, aucun outil d'analyse n'est chargé : seule votre préférence de consentement est
              conservée. Vous pouvez modifier votre choix à tout moment en effaçant les données de site de votre
              navigateur : le bandeau réapparaîtra à la visite suivante.
            </p>
          </Section>

          <Section title="Gérer les cookies depuis votre navigateur">
            <p>
              Vous pouvez configurer votre navigateur pour bloquer ou supprimer les cookies et données de site. La
              suppression de la préférence de consentement peut entraîner le réaffichage du bandeau.
            </p>
            <p>
              Pour toute question, contactez :{' '}
              <a
                href="mailto:contact@thomasmvrinho.com"
                className="text-orange-400 hover:text-orange-300 transition-colors"
              >
                contact@thomasmvrinho.com
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
