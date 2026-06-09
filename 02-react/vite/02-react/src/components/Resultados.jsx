import JobCard from './JobCard.jsx'

const Resultados = ({ jobs }) => {
  return (
    <>
      <section>
        <h2 className="search-result">Resultados de búsqueda</h2>

        <div className="jobs-listings">
          {jobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              data-modalidad={job.data.modalidad}
              data-nivel={job.data.nivel}
              data-technology={job.data.technology}
              titulo={job.titulo}
              empresa={job.empresa}
              ubicacion={job.ubicacion}
              descripcion={job.descripcion}
            ></JobCard>
          ))}
        </div>
      </section>
    </>
  )
}
export default Resultados
