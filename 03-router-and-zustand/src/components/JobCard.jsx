import { useState } from 'react'

const JobCard = ({ job }) => {
  const { titulo, empresa, ubicacion, descripcion, data } = job
  const [isApplied, setIsApplied] = useState(false)

  const handleClick = () => {
    setIsApplied(!isApplied)
  }

  const text = isApplied ? 'Aplicado' : 'Aplicar'

  return (
    <article
      className="job-listing-card"
      data-modalidad={data?.modalidad}
      data-nivel={data?.nivel}
      data-technology={data?.technology}
    >
      <div>
        <h3>{titulo}</h3>
        <small>
          {empresa} - {ubicacion}
        </small>
        <p>{descripcion}</p>
      </div>
      <button
        disabled={isApplied}
        className={`button-apply-job ${isApplied ? 'is-applied' : ''}`}
        onClick={handleClick}
      >
        {text}
      </button>
    </article>
  )
}
export default JobCard
