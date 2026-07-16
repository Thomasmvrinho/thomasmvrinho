import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'

const projects = [
  {
    title: 'ADMARKETING',
    tags: ['Vitrine', "Apporteur d'Affaires"],
    img: '/admarketing.webp',
    link: 'https://admarketing-ten.vercel.app/',
    accent: '#c97efd',
  },
  {
    title: 'En développement',
    tags: [],
    img: null,
    link: null,
    accent: '#ff8e06',
  },
  {
    title: 'En développement',
    tags: [],
    img: null,
    link: null,
    accent: '#c97efd',
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

        <div className="grid md:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={`${project.title}-${i}`}
              className="rounded-2xl"
              style={{
                padding: '2px',
                background: `linear-gradient(135deg, ${project.accent === '#c97efd' ? '#c97efd' : '#ff8e06'}, ${project.accent === '#c97efd' ? '#ff8e06' : '#c97efd'})`,
                boxShadow: '0 4px 24px rgba(0,0,0,0.12)',
              }}
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.09 }}
              whileHover={{ y: -5, boxShadow: '0 20px 55px rgba(0,0,0,0.22)' }}
            >
              <div className="rounded-[14px] overflow-hidden bg-white h-full">
                {/* Zone image */}
                <div className={`relative overflow-hidden h-52 ${project.img ? 'bg-[#f5f5f7]' : 'bg-[#0a0a0a]'}`}>
                  {project.img ? (
                    <>
                      <img
                        src={project.img}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                      />
                      {project.link && (
                        <div className="absolute inset-0 bg-ink/80 opacity-0 hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                          <motion.a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-5 py-2.5 rounded-full font-inter font-semibold text-sm text-white flex items-center gap-2"
                            style={{ background: 'linear-gradient(135deg, #c97efd, #ff8e06)' }}
                            whileHover={{ scale: 1.06 }}
                          >
                            <ExternalLink size={15} />
                            Voir le projet
                          </motion.a>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center gap-3">
                      <span className="text-4xl">🚧</span>
                      <span className="font-inter text-white/40 text-sm">En développement</span>
                    </div>
                  )}
                </div>

                {/* Zone info */}
                <div
                  className="p-5"
                  style={{ borderTop: '1px solid rgba(0,0,0,0.06)' }}
                >
                  <h3 className="font-grotesk font-bold text-ink mb-3">{project.title}</h3>
                  {project.tags.length > 0 && (
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
                  )}
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
          <motion.a
            href="#contact"
            className="px-8 py-4 rounded-full font-inter font-semibold text-brand border-2 border-brand hover:bg-brand hover:text-white transition-all duration-300 inline-block"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            Démarrer un projet →
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
