import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router'
import { Link } from '../../components/Link'
import snarkdown from 'snarkdown'
import styles from './Details.module.css'
import { useAuthStore } from '../../store/authStore'
import { useFavoritesStore } from '../../store/favoritesStore'

function JobSection({ title, content }) {
  const html = snarkdown(content)

  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>{title}</h2>

      <div
        className={`${styles.sectionContent} prose`}
        dangerouslySetInnerHTML={{
          __html: html,
        }}
      />
    </section>
  )
}

function DetailPageBreadCrumb({ job }) {
  return (
    <div className={styles.container}>
      <nav className={styles.breadcrumb}>
        <Link href="/search" className={styles.breadcrumbButton}>
          Empleos
        </Link>
        <span className={styles.breadcrumbSeparator}>/</span>
        <span className={styles.breadcrumbCurrent}>{job.titulo}</span>
      </nav>
    </div>
  )
}

function DetailPageHeader({ job }) {
  return (
    <>
      <header className={styles.header}>
        <h1 className={styles.title}>{job.titulo}</h1>
        <p className={styles.meta}>
          {job.empresa} · {job.ubicacion}
        </p>
      </header>

      <DetailApplyButton />
      <DetailFavoriteButton jobId={job.id} />
    </>
  )
}

function DetailApplyButton() {
  const { isLoggedIn } = useAuthStore()

  return (
    <button disabled={!isLoggedIn} className={styles.applyButton}>
      {isLoggedIn ? 'Aplicar ahora' : 'Inicia sesión para aplicar'}
    </button>
  )
}

function DetailFavoriteButton({ jobId }) {
  const { isFavorite, toggleFavorite } = useFavoritesStore()

  return (
    <button
      onClick={() => toggleFavorite(jobId)}
      aria-label={
        isFavorite(jobId) ? 'Remove from favorites' : 'Add to favorites'
      }
    >
      {isFavorite(jobId) ? '❤️' : '🤍'}
    </button>
  )
}

export default function Details() {
  const { jobId } = useParams()
  const navigate = useNavigate()

  const [job, setJob] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!jobId) return

    const controller = new AbortController()

    setLoading(true)
    setError(null)

    fetch(`https://jscamp-api.vercel.app/api/jobs/${jobId}`, {
      signal: controller.signal,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Job not found')
        }
        return response.json()
      })
      .then((data) => {
        setJob(data)
      })
      .catch((error) => {
        if (error.name === 'AbortError') return
        setError(error.message)
        setJob(null)
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      })

    return () => {
      controller.abort()
    }
  }, [jobId])

  if (loading) {
    return (
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1rem' }}>
        <div className={styles.loading}>
          <p className={styles.loadingText}>Cargando...</p>
        </div>
      </div>
    )
  }

  if (error || !job) {
    return (
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1rem' }}>
        <div className={styles.error}>
          <h2 className={styles.errorTitle}>Oferta no encontrada</h2>
          <button onClick={() => navigate('/')} className={styles.errorButton}>
            Volver al inicio
          </button>
        </div>
      </div>
    )
  }

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1rem' }}>
      <DetailPageBreadCrumb job={job} />
      <DetailPageHeader job={job} />

      <JobSection
        title="Descripción del puesto"
        content={job.content.description}
      />
      <JobSection
        title="Responsabilidades"
        content={job.content.responsibilities}
      />
      <JobSection title="Requisitios" content={job.content.requirements} />
      <JobSection title="Acerca de la empresa" content={job.content.about} />
    </div>
  )
}
