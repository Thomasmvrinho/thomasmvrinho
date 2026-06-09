import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'

const projects = [
  {
    title: 'E-commerce Mode',
    tags: ['E-commerce', 'Shopify'],
    img: 'https://placehold.co/800x450/12121a/c97efd?text=Projet+1',
  },
  {
    title: 'Site Vitrine Restaurant',
    tags: ['Vitrine', 'React'],
    img: 'https://placehold.co/800x450/1a1208/ff8e06?text=Projet+2',
  },
  {
    title: 'Boutique Bijoux',
    tags: ['E-commerce', 'WordPress'],
    img: 'https://placehold.co/800x450/0e0e1a/c97efd?text=Projet+3',
  },
  {
    title: 'Agence Immobilière',
    tags: ['Vitrine', 'Next.js'],
    img: 'https://placehold.co/800x450/1a0e1a/ff8e06?text=Projet+4',
  },
  {
    title: 'Studio de Tatouage',
    tags: ['Vitrine', 'WordPress'],
    img: 'https://placehold.co/800x450/141414/c97efd?text=Projet+5',
  },
  {
    title: 'Spa & Bien-être',
    tags: ['Vitrine', 'React'],
    img: 'https://placehold.co/800x450/0e1a18/ff8e06?text=Projet+6',
  },
]

export default function Portfolio() {
  return (
    <section id="portfolio" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="font-syne font-semibold text-xs uppercase tracking-widest text-brand mb-3 block">
            Portfolio
          </span>
          <h2 className="font-grotesk font-bold text-3xl md:text-4xl text-ink mb-4">
            Quelques-unes de mes réalisations
          </h2>
          <div
            className="mx-auto w-20 h-1 rounded-full"
            style={{ background: 'linear-gradient(90deg, #c97efd, #ff8e06)' }}
          />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              className="group relative rounded-2xl overflow-hidden bg-white"
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.09 }}
              whileHover={{ y: -5, boxShadow: '0 20px 55px rgba(0,0,0,0.12)' }}
              style={{ boxShadow: '0 2px 16px rgba(0,0,0,0.07)', border: '1px solid rgba(0,0,0,0.06)' }}
            >
              {/* Image area */}
              <div className="relative overflow-hidden h-52">
                <img
                  src={project.img}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-ink/80 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                  <motion.button
                    className="px-5 py-2.5 rounded-full font-inter font-semibold text-sm text-white flex items-center gap-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300"
                    style={{ background: 'linear-gradient(135deg, #c97efd, #ff8e06)' }}
                    whileHover={{ scale: 1.06 }}
                  >
                    <ExternalLink size={15} />
                    Voir le projet
                  </motion.button>
                </div>
              </div>

              {/* Info */}
              <div className="p-5">
                <h3 className="font-grotesk font-bold text-ink mb-3">{project.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full font-inter text-xs font-semibold"
                      style={{
                        background: tag === 'E-commerce' ? 'rgba(255,142,6,0.1)' : 'rgba(201,126,253,0.1)',
                        color: tag === 'E-commerce' ? '#ff8e06' : '#c97efd',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <motion.button
            className="px-8 py-4 rounded-full font-inter font-semibold text-brand border-2 border-brand hover:bg-brand hover:text-white transition-all duration-300"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            Voir tous les projets →
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
