import Anthropic from '@anthropic-ai/sdk'
import { Resend } from 'resend'

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
const resend = new Resend(process.env.RESEND_API_KEY)

const LABELS = {
  type: { vitrine: 'Site Vitrine', ecommerce: 'Site E-commerce', app: 'Application Web & Mobile', autre: 'Autre' },
  secteur: { commerce: 'Commerce & Retail', restauration: 'Restauration & Food', 'sante-beaute': 'Santé & Beauté', tech: 'Tech & Startup', services: 'Services professionnels', 'art-mode': 'Art, Mode & Créatif' },
  situation: { creation: 'Création from scratch', refonte: 'Refonte complète', amelioration: 'Amélioration ciblée' },
  objectif: { visibilite: 'Gagner en visibilité', credibilite: 'Asseoir ma crédibilité', ventes: 'Booster mes ventes', lancement: 'Lancer mon activité' },
  budget: { 'moins-1k': '< 1 000€', '1k-3k': '1 000 – 3 000€', '3k-8k': '3 000 – 8 000€', '8k+': '8 000€+', unknown: 'À définir ensemble' },
  delai: { urgent: 'Urgent (< 1 mois)', '1-3': '1 à 3 mois', '3-6': '3 à 6 mois', flexible: 'Flexible' },
  preparation: { 'tout-pret': 'Tout est prêt', partiel: 'Partiellement prêt', rien: 'Rien de prêt' },
}

function label(answers, key) {
  return LABELS[key]?.[answers[key]] ?? answers[key] ?? 'Non précisé'
}

function buildPrompt(answers, form) {
  const prenom = form.name.split(' ')[0]
  return `Tu es Thomas Marinho, développeur web freelance basé en Île-de-France. Tu viens de recevoir une demande de devis via ton site. Rédige un email de réponse personnalisé en français pour ce prospect.

PROFIL DU PROSPECT :
- Nom : ${form.name}
- Type de projet : ${label(answers, 'type')}
- Secteur d'activité : ${label(answers, 'secteur')}
- Situation actuelle : ${label(answers, 'situation')}
- Objectif principal : ${label(answers, 'objectif')}
- Budget : ${label(answers, 'budget')}
- Délai : ${label(answers, 'delai')}
- Préparation : ${label(answers, 'preparation')}
${form.message ? `- Message libre : "${form.message}"` : ''}

CONSIGNES :
- Commence par "Bonjour ${prenom}," et remercie-le chaleureusement
- Montre que tu as lu sa demande : cite son secteur, sa situation et son objectif de façon naturelle
- Si situation = "Création from scratch" : rassure-le, c'est le meilleur moment pour bien partir
- Si situation = "Refonte" : valorise sa démarche, la refonte est souvent la meilleure décision
- Si objectif = "Visibilité" : mentionne brièvement ton approche SEO/performance
- Si objectif = "Ventes" : parle conversion et expérience utilisateur
- Si préparation = "Rien de prêt" : propose un accompagnement de A à Z sans le faire culpabiliser
- Si délai = "Urgent" : confirme que tu prends ça en compte dès le départ
- Si budget = "À définir ensemble" ou "< 1 000€" : reste positif, dis qu'on trouve toujours une solution adaptée
- Propose systématiquement un appel de 20 min pour échanger (sans donner de lien)
- Termine avec : "Bonne journée,\n\nThomas Marinho\nDéveloppeur Web Freelance\ncontact@thomasmvrinho.com"
- Entre 150 et 230 mots, ton chaleureux et professionnel
- Ne génère PAS de ligne "Objet :", juste le corps de l'email`
}

function buildClientHtml(name, bodyText) {
  const prenom = name.split(' ')[0]
  const lines = bodyText.split('\n').map(l => `<p style="margin:0 0 12px 0;">${l}</p>`).join('')
  return `<!DOCTYPE html>
<html lang="fr">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f9f9f9;font-family:'Helvetica Neue',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f9f9f9;padding:40px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.08);">
        <!-- Header -->
        <tr>
          <td style="background:linear-gradient(135deg,#c97efd,#ff8e06);padding:32px 40px;">
            <p style="margin:0;font-size:22px;font-weight:700;color:#fff;letter-spacing:-0.3px;">Thomas Marinho</p>
            <p style="margin:4px 0 0;font-size:13px;color:rgba(255,255,255,0.8);">Développeur Web Freelance</p>
          </td>
        </tr>
        <!-- Body -->
        <tr>
          <td style="padding:40px 40px 32px;color:#1a1a1a;font-size:15px;line-height:1.7;">
            ${lines}
          </td>
        </tr>
        <!-- Footer -->
        <tr>
          <td style="padding:0 40px 32px;">
            <div style="border-top:1px solid #eee;padding-top:24px;font-size:12px;color:#999;">
              Vous recevez cet email car vous avez soumis une demande de devis sur <a href="https://www.thomasmvrinho.com" style="color:#c97efd;text-decoration:none;">thomasmvrinho.com</a>.
            </div>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`
}

function buildNotifHtml(answers, form, autoReply) {
  const row = (key, val) => `<tr><td style="padding:6px 12px;font-weight:600;color:#555;white-space:nowrap;width:140px;">${key}</td><td style="padding:6px 12px;color:#111;">${val}</td></tr>`
  return `<!DOCTYPE html>
<html lang="fr">
<body style="font-family:'Helvetica Neue',Arial,sans-serif;background:#f5f5f5;padding:32px;">
  <div style="max-width:640px;margin:0 auto;background:#fff;border-radius:12px;padding:32px;box-shadow:0 2px 8px rgba(0,0,0,0.07);">
    <h2 style="margin:0 0 24px;color:#1a1a1a;">🔔 Nouveau devis reçu</h2>
    <table style="width:100%;border-collapse:collapse;border:1px solid #eee;border-radius:8px;overflow:hidden;">
      ${row('Nom', form.name)}
      ${row('Email', `<a href="mailto:${form.email}" style="color:#c97efd;">${form.email}</a>`)}
      ${row('Téléphone', form.phone || 'Non renseigné')}
      ${row('Type', label(answers, 'type'))}
      ${row('Secteur', label(answers, 'secteur'))}
      ${row('Situation', label(answers, 'situation'))}
      ${row('Objectif', label(answers, 'objectif'))}
      ${row('Budget', label(answers, 'budget'))}
      ${row('Délai', label(answers, 'delai'))}
      ${row('Préparation', label(answers, 'preparation'))}
      ${form.message ? row('Message', form.message) : ''}
    </table>
    <div style="margin-top:32px;padding:20px;background:#faf5ff;border-left:4px solid #c97efd;border-radius:0 8px 8px 0;">
      <p style="margin:0 0 12px;font-weight:600;color:#c97efd;font-size:13px;text-transform:uppercase;letter-spacing:0.5px;">Email envoyé automatiquement à ${form.name}</p>
      <div style="color:#333;font-size:14px;line-height:1.7;">${autoReply.replace(/\n/g, '<br>')}</div>
    </div>
  </div>
</body>
</html>`
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { answers, form } = req.body ?? {}

  if (!form?.name || !form?.email) {
    return res.status(400).json({ error: 'Nom et email requis.' })
  }

  try {
    // 1. Générer la réponse personnalisée avec Claude
    const message = await anthropic.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 700,
      messages: [{ role: 'user', content: buildPrompt(answers, form) }],
    })
    const autoReply = message.content[0].text.trim()

    // 2 & 3. Envoi des deux emails en parallèle
    const [{ error: err1 }, { error: err2 }] = await Promise.all([
      resend.emails.send({
        from: 'Thomas Marinho <contact@thomasmvrinho.com>',
        to: form.email,
        subject: `Re : Votre demande — ${label(answers, 'type')}`,
        html: buildClientHtml(form.name, autoReply),
        text: autoReply,
      }),
      resend.emails.send({
        from: 'Site Portfolio <contact@thomasmvrinho.com>',
        to: 'contact@thomasmvrinho.com',
        subject: `🔔 Nouveau devis — ${label(answers, 'type')} | ${form.name}`,
        html: buildNotifHtml(answers, form, autoReply),
      }),
    ])
    if (err1) throw new Error(`Resend client: ${err1.message}`)
    if (err2) throw new Error(`Resend notif: ${err2.message}`)

    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error('[contact] erreur :', err)
    return res.status(500).json({ error: 'Erreur serveur. Réessayez ou contactez-moi directement.' })
  }
}
