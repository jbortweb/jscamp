import { Link } from 'react-router'
import styles from './JobCard.module.css'

export function JobCard({ job }) {
  const tags = job.data?.technology || []

  return (
    <Link
      to={`/jobs/${job.id}`}
      className={styles.cardLink}
      aria-label={`Ver detalles de ${job.titulo} en ${job.empresa}`}
    >
      <article className={styles.card}>
        <div className={styles.header}>
          <h3 className={styles.title}>{job.titulo}</h3>
        </div>

        <div className={styles.meta}>
          <p className={styles.company}>
            <span className={styles.icon}>🏢</span>
            {job.empresa}
          </p>
          <p className={styles.location}>
            <span className={styles.icon}>📍</span>
            {job.ubicacion}
          </p>
        </div>

        {tags.length > 0 && (
          <div className={styles.tags}>
            {tags.map((tag) => (
              <span key={tag} className={styles.tag}>
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className={styles.footer}>
          <span className={styles.viewMore}>Ver más →</span>
        </div>
      </article>
    </Link>
  )
}
