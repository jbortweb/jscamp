import { useEffect } from 'react'
import Resultados from '../components/Resultados'
import Search from '../components/search/Search'
import Pagination from '../components/pagination/Pagination'
import { useFilters } from '../hooks/useFilters'

const SearchPage = () => {
  const {
    jobs,
    loading,
    total,
    totalPages,
    handlePageChange,
    handleSearch,
    handleTextFilter,
    currentPage,
    textToFilter,
    filters,
  } = useFilters()

  const title = `Resultados: ${total}, Pagina: ${currentPage} - DevJobs`

  return (
    <main>
      <title>{title}</title>
      <Search
        initialText={textToFilter}
        filters={filters}
        onSearch={handleSearch}
        onTextFilter={handleTextFilter}
      />
      <section>
        <h2 className="search-result">Resultados de búsqueda</h2>
        {loading ? <p>Cargando empleos</p> : <Resultados jobs={jobs} />}
        <Pagination
          onPageChange={handlePageChange}
          currentPage={currentPage}
          totalPages={totalPages}
        />
      </section>
    </main>
  )
}

export default SearchPage
