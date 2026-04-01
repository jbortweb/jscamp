const Search = () => {
  return (
    <>
      <section className="jobs-search">
        <h1>Encuentra tu próximo trabajo</h1>
        <p>Explora miles de oportunidades en el sector tecnológico.</p>

        <form id="empleos-search-form" role="search">
          <div className="search-bar">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="icon icon-tabler icons-tabler-outline icon-tabler-search"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
              <path d="M21 21l-6 -6" />
            </svg>

            <input
              id="empleos-search-input"
              required
              type="text"
              placeholder="Buscar trabajos, empresas o habilidades"
            />
          </div>

          <div className="search-filters">
            <select name="technology" id="filter-technology">
              <option value="">Tecnología</option>
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
              <option value="vue">Vue</option>
              <option value="react">React</option>
              <option value="nodejs">Node.js</option>
            </select>

            <select name="location" id="filter-location">
              <option value="">Ubicación</option>
              <option value="remoto">Remoto</option>
              <option value="cdmx">Ciudad de México</option>
              <option value="guadalajara">Guadalajara</option>
              <option value="madrid">Madrid</option>
              <option value="barcelona">Barcelona</option>
            </select>
            {/* <!-- 
          <select name="contract-type" id="contract-type">
            <option value="">Tipo de contrato</option>
            <option value="remoto">Jornada Completa</option>
            <option value="cdmx">Jornada Partida</option>
            <option value="guadalajara">Freelance</option>
          </select> --> */}

            <select name="experience" id="filter-experience">
              <option value="">Nivel de experiencia</option>
              <option value="junior">Junior</option>
              <option value="mid-level">Mid-level</option>
              <option value="senior">Senior</option>
              <option value="lead">Lead</option>
            </select>
          </div>
        </form>
        <p id="filter-selected-value"></p>
      </section>
    </>
  )
}
export default Search
