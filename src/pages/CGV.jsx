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

export default function CGV() {
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
            <span style={{ color: '#c97efd' }}>Conditions</span> générales de prestation de services
          </h1>
          <p className="font-inter text-white/35 text-sm mb-12">Dernière mise à jour : 23 juillet 2026</p>

          <div
            className="h-px mb-12"
            style={{
              background:
                'linear-gradient(90deg, transparent, rgba(201,126,253,0.4), rgba(255,142,6,0.4), transparent)',
            }}
          />

          <Section title="1. Objet et champ d'application">
            <p>
              Les présentes conditions générales de prestation de services (ci-après « CGPS ») encadrent les
              relations entre <strong className="text-white/75">Thomas Marinho</strong>, entrepreneur individuel
              (SIREN 107 814 113), ci-après « le Prestataire », et toute personne physique ou morale souhaitant
              bénéficier de ses services de création et de développement de sites web, ci-après « le Client ».
            </p>
            <p>
              Toute commande implique l'acceptation pleine et entière des présentes CGPS. Elles prévalent sur tout
              autre document, sauf conditions particulières convenues par écrit entre les parties.
            </p>
          </Section>

          <Section title="2. Devis et commande">
            <p>
              Chaque prestation fait l'objet d'un devis détaillé et gratuit. Le devis est valable{' '}
              <strong className="text-white/75">30 jours</strong> à compter de son émission.
            </p>
            <p>
              La commande est considérée comme ferme à réception du devis daté, signé et accompagné de la mention
              « bon pour accord », ainsi que du versement de l'acompte prévu à l'article 4.
            </p>
          </Section>

          <Section title="3. Prix">
            <p>
              Les prix sont indiqués en euros et s'entendent nets de taxe :{' '}
              <strong className="text-white/75">TVA non applicable, article 293 B du Code général des impôts</strong>.
            </p>
            <p>
              Le prix convenu au devis est ferme et définitif. Toute prestation supplémentaire non prévue au devis
              initial fera l'objet d'un devis complémentaire soumis à l'accord préalable du Client.
            </p>
          </Section>

          <Section title="4. Modalités de paiement">
            <p>
              Un acompte de <strong className="text-white/75">40 % du montant total</strong> est exigible à la
              commande. Le solde, soit 60 %, est payable{' '}
              <strong className="text-white/75">à 30 jours</strong> à compter de la date de la facture émise à la
              livraison.
            </p>
            <p>
              Les paiements s'effectuent par virement bancaire. Les coordonnées bancaires figurent sur le devis et
              la facture.
            </p>
          </Section>

          <Section title="5. Retard de paiement">
            <p>
              Tout retard de paiement entraîne de plein droit l'application de pénalités de retard égales à trois
              fois le taux d'intérêt légal en vigueur, ainsi qu'une indemnité forfaitaire pour frais de
              recouvrement de <strong className="text-white/75">40 €</strong> (articles L.441-10 et D.441-5 du Code
              de commerce), sans qu'un rappel soit nécessaire.
            </p>
            <p>
              En cas de retard de paiement, le Prestataire se réserve le droit de suspendre la prestation en cours
              jusqu'à complet règlement.
            </p>
          </Section>

          <Section title="6. Délais d'exécution">
            <p>
              Les délais indiqués au devis sont donnés à titre indicatif. Ils courent à compter de l'encaissement
              de l'acompte et de la réception de l'ensemble des éléments nécessaires (contenus, textes, images,
              accès techniques) que le Client s'engage à fournir.
            </p>
            <p>
              Tout retard imputable au Client dans la fourniture de ces éléments ou dans la validation des étapes
              décale d'autant les délais, sans que la responsabilité du Prestataire puisse être engagée.
            </p>
          </Section>

          <Section title="7. Obligations du Client">
            <p>
              Le Client s'engage à fournir l'ensemble des éléments et informations nécessaires à la bonne
              réalisation de la prestation, et à répondre aux demandes de validation dans des délais raisonnables.
            </p>
            <p>
              Le Client garantit détenir les droits sur les contenus (textes, images, logos, marques) qu'il
              transmet et demeure seul responsable de leur contenu.
            </p>
          </Section>

          <Section title="8. Révisions">
            <p>
              Chaque étape validée du projet (maquette, intégration, etc.) inclut{' '}
              <strong className="text-white/75">deux séries de modifications</strong>. Au-delà, toute demande de
              révision supplémentaire fera l'objet d'un devis complémentaire.
            </p>
          </Section>

          <Section title="9. Livraison et réception">
            <p>
              À la livraison, le Client dispose d'un délai de 7 jours pour signaler d'éventuelles non-conformités
              par écrit. Passé ce délai, ou en cas de mise en ligne du site par le Client, la prestation est
              réputée acceptée.
            </p>
          </Section>

          <Section title="10. Propriété intellectuelle">
            <p>
              Le Prestataire conserve l'intégralité des droits de propriété sur les livrables (code, design,
              fichiers sources) <strong className="text-white/75">jusqu'au paiement intégral</strong> du prix
              convenu.
            </p>
            <p>
              La cession des droits d'exploitation au profit du Client n'intervient qu'au règlement complet de la
              prestation. Le Prestataire se réserve le droit de mentionner la réalisation dans son portfolio, sauf
              demande contraire écrite du Client.
            </p>
          </Section>

          <Section title="11. Droit de rétractation (clients particuliers)">
            <p>
              Conformément aux articles L.221-18 et suivants du Code de la consommation, le Client{' '}
              <strong className="text-white/75">consommateur (particulier)</strong> dispose d'un délai de 14 jours
              pour se rétracter, sans avoir à justifier de motif.
            </p>
            <p>
              Le Client peut toutefois demander expressément le démarrage de la prestation avant la fin de ce
              délai. Dans ce cas, il reconnaît que l'exécution commencée avec son accord fait obstacle à
              l'exercice du droit de rétractation pour la partie déjà réalisée. Cette clause ne s'applique pas aux
              clients professionnels.
            </p>
          </Section>

          <Section title="12. Responsabilité">
            <p>
              Le Prestataire est tenu à une obligation de moyens. Sa responsabilité ne saurait être engagée pour
              les dommages indirects, ni pour les dysfonctionnements imputables à des services tiers (hébergement,
              nom de domaine, services externes) ou à une utilisation non conforme du livrable par le Client.
            </p>
          </Section>

          <Section title="13. Données personnelles">
            <p>
              Le traitement des données personnelles est décrit dans nos{' '}
              <Link to="/mentions-legales" className="text-purple-400 hover:text-purple-300 transition-colors">
                mentions légales
              </Link>
              . Pour toute question, contactez {mail}.
            </p>
          </Section>

          <Section title="14. Litiges et droit applicable">
            <p>
              Les présentes CGPS sont soumises au droit français. En cas de litige, les parties s'efforceront de
              trouver une solution amiable avant toute action judiciaire.
            </p>
            <p>
              À défaut d'accord amiable, les tribunaux français seront seuls compétents.
            </p>
            {/*
              RAPPEL CONFORMITÉ — Médiation de la consommation :
              Dès le premier client PARTICULIER (B2C), l'adhésion à un médiateur de la consommation devient
              obligatoire. Ajouter ici le nom, l'adresse postale et le site web du médiateur choisi, avec la
              mention du droit du consommateur d'y recourir gratuitement.
            */}
          </Section>
        </motion.div>
      </div>
    </div>
  )
}
