import styles from './Search.module.css'
import { useId } from 'react'
import useSearchForm from '../../hooks/useSearchForm'

export default function Search({ onSearch, onTextFilter }) {
  const idTechnology = useId()
  const idLocation = useId()
  const idExperience = useId()

  const { searchText, handleSubmit, handleTextChange } = useSearchForm({
    onSearch,
    onTextFilter,
  })

  return (
    <>
      <section className={styles.jobsSearch}>
        <h1>Encuentra tu proximo trabajo</h1>
        <p>Explora miles de oportunidades en el sector tecnologico.</p>

        <form onSubmit={handleSubmit} onChange={handleSubmit} id="empleos-search-form" role="search">
          <div className={styles.searchBar}>
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
              name="text"
              id="empleos-search-input"
              type="text"
              placeholder="Buscar trabajos, empresas o habilidades"
              onChange={handleTextChange}
              value={searchText}
            />
          </div>

          <div className={styles.searchFilters}>
            <select name="filter-technology" id={idTechnology}>
              <option value="">Tecnologia</option>
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
              <option value="vue">Vue</option>
              <option value="react">React</option>
              <option value="nodejs">Node.js</option>
            </select>

            <select name="filter-location" id={idLocation}>
              <option value="">Ubicacion</option>
              <option value="remoto">Remoto</option>
              <option value="cdmx">Ciudad de Mexico</option>
              <option value="guadalajara">Guadalajara</option>
              <option value="madrid">Madrid</option>
              <option value="barcelona">Barcelona</option>
            </select>

            <select name="filter-experience" id={idExperience}>
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
