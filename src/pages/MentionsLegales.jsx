import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

const Section = ({ title, children }) => (
  <div className="mb-10">
    <h2 className="font-grotesk font-semibold text-lg text-white mb-3">{title}</h2>
    <div className="font-inter text-white/55 text-sm leading-relaxed space-y-2">{children}</div>
  </div>
)

const mail = (
  <a
    href="mailto:contact@thomasmvrinho.com"
    className="text-purple-400 hover:text-purple-300 transition-colors"
  >
    contact@thomasmvrinho.com
  </a>
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
          <p className="font-inter text-white/35 text-sm mb-12">Dernière mise à jour : 23 juillet 2026</p>

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
              <strong className="text-white/75">Thomas Marinho</strong> — Entrepreneur individuel
              <br />
              Activité : développement et création de sites web (code APE 62.01Z — Programmation informatique)
              <br />
              SIREN : 107 814 113
              <br />
              Adresse : 27 rue Lazare Carnot, 77177 Brou-sur-Chantereine, France
              <br />
              Téléphone : 07 82 64 21 08
              <br />
              Email : {mail}
            </p>
            <p className="text-white/40">
              TVA non applicable, article 293 B du Code général des impôts (franchise en base de TVA).
            </p>
          </Section>

          <Section title="2. Directeur de la publication">
            <p>Thomas Marinho, en qualité d'éditeur du site.</p>
          </Section>

          <Section title="3. Hébergement">
            <p>Le site est hébergé par :</p>
            <p>
              <strong className="text-white/75">Vercel Inc.</strong>
              <br />
              340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis
              <br />
              Site :{' '}
              <a
                href="https://vercel.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-400 hover:text-purple-300 transition-colors"
              >
                vercel.com
              </a>
              {' '}— Contact : privacy@vercel.com
            </p>
          </Section>

          <Section title="4. Propriété intellectuelle">
            <p>
              L'ensemble du contenu de ce site (textes, images, visuels, code source) est la propriété exclusive
              de Thomas Marinho, sauf mention contraire.
            </p>
            <p>
              Toute reproduction, distribution ou utilisation sans autorisation écrite préalable est strictement
              interdite.
            </p>
          </Section>

          <Section title="5. Responsabilité">
            <p>
              Thomas Marinho s'efforce de maintenir les informations de ce site à jour et exactes. Il ne saurait
              être tenu responsable des erreurs ou omissions, ni des dommages résultant de l'utilisation du site.
            </p>
          </Section>

          <Section title="6. Protection des données personnelles (RGPD)">
            <p>
              <strong className="text-white/75">Responsable de traitement :</strong> Thomas Marinho (coordonnées
              indiquées à l'article 1).
            </p>
            <p>
              <strong className="text-white/75">Données collectées :</strong> via le formulaire de contact / devis,
              sont recueillis votre nom, votre adresse email, votre numéro de téléphone (facultatif), vos réponses
              au questionnaire de projet et, le cas échéant, votre message.
            </p>
            <p>
              <strong className="text-white/75">Finalités :</strong> traiter votre demande de devis, vous
              recontacter et assurer le suivi de notre échange commercial.
            </p>
            <p>
              <strong className="text-white/75">Base légale :</strong> votre consentement et l'exécution de mesures
              précontractuelles prises à votre demande (article 6 du RGPD).
            </p>
            <p>
              <strong className="text-white/75">Destinataires :</strong> pour assurer ce service, vos données
              transitent par des prestataires techniques (sous-traitants) :
            </p>
            <ul className="list-disc list-inside space-y-1 text-white/50">
              <li>Vercel — hébergement du site</li>
              <li>Anthropic — génération d'une réponse personnalisée (traitement aux États-Unis)</li>
              <li>Resend — envoi des emails</li>
              <li>Supabase — stockage sécurisé des demandes</li>
            </ul>
            <p>
              Vos données ne sont ni vendues, ni cédées, ni utilisées à des fins publicitaires.
            </p>
            <p>
              <strong className="text-white/75">Transfert hors Union européenne :</strong> certains prestataires
              (notamment Anthropic) sont situés aux États-Unis. Ces transferts sont encadrés par des garanties
              appropriées, telles que les clauses contractuelles types de la Commission européenne.
            </p>
            <p>
              <strong className="text-white/75">Durée de conservation :</strong> vos données sont conservées 3 ans
              à compter de notre dernier contact, puis supprimées.
            </p>
            <p>
              <strong className="text-white/75">Vos droits :</strong> vous disposez d'un droit d'accès, de
              rectification, d'effacement, d'opposition, de limitation et de portabilité de vos données. Pour les
              exercer, contactez {mail}. Vous pouvez également introduire une réclamation auprès de la CNIL (
              <a
                href="https://www.cnil.fr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-400 hover:text-purple-300 transition-colors"
              >
                www.cnil.fr
              </a>
              ).
            </p>
          </Section>

          <Section title="7. Cookies">
            <p>
              Ce site utilise un stockage local pour mémoriser votre choix de consentement, ainsi qu'une mesure
              d'audience anonyme chargée uniquement après votre accord. Consultez notre{' '}
              <Link to="/cookies" className="text-purple-400 hover:text-purple-300 transition-colors">
                politique de cookies
              </Link>{' '}
              pour le détail.
            </p>
          </Section>

          <Section title="8. Droit applicable">
            <p>
              Les présentes mentions légales sont soumises au droit français. En cas de litige, les tribunaux
              français seront seuls compétents.
            </p>
          </Section>

          {/*
            RAPPEL CONFORMITÉ — Médiation de la consommation :
            Dès le premier client PARTICULIER (B2C), l'adhésion à un médiateur de la consommation
            devient obligatoire (art. L.612-1 du Code de la consommation). Ajouter alors une section
            "Médiation" avec le nom, l'adresse et le site web du médiateur choisi.
          */}
        </motion.div>
      </div>
    </div>
  )
}
