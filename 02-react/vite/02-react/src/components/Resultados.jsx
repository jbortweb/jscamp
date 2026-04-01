import data from '../data.json'

const Resultados = () => {
  return (
    <>
      <section>
        <h2 className="search-result">Resultados de búsqueda</h2>

        <div className="jobs-listings">
          {data.map((job) => (
            <article
              key={job.id}
              className="job-listing-card"
              modalidad={job.data.modalidad}
              technology={job.data.technology}
              nivel={job.data.nivel}
            >
              <div>
                <h3>{job.titulo}</h3>
                <small>
                  {job.empresa} | {job.ubicacion}
                </small>
                <p>{job.descripcion}</p>
              </div>
              <button className="button-apply-job">Aplicar</button>
            </article>
          ))}
        </div>

        <nav className="pagination">
          <a href="#">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M15 6l-6 6l6 6" />
            </svg>
          </a>
          <a className="is-active" href="#">
            1
          </a>
          <a href="#">2</a>
          <a href="#">3</a>
          <a href="#">4</a>
          <a href="#">5</a>
          <a href="#">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="icon icon-tabler icons-tabler-outline icon-tabler-chevron-right"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M9 6l6 6l-6 6" />
            </svg>
          </a>
        </nav>
      </section>
    </>
  )
}
export default Resultados
