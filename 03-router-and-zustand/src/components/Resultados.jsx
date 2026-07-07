import { JobCard } from './jobCard/JobCard.jsx'

const Resultados = ({ jobs }) => {
  return (
    <>
      <section>
        <div className="jobs-listings">
          {jobs.length === 0 && (
            <p style={{ textAlign: 'center' }}>No se encontraron empleos</p>
          )}
          {jobs.map((job) => (
            <JobCard key={job.id} job={job}></JobCard>
          ))}
        </div>
      </section>
    </>
  )
}
export default Resultados
