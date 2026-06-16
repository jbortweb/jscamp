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
  } = useFilters()

  useEffect(() => {
    document.title = `Resultados: ${total}, Pagina: ${currentPage} - DevJobs`
  }, [total, currentPage])

  return (
    <main>
      <Search onSearch={handleSearch} onTextFilter={handleTextFilter} />
      {loading ? <p>Cargando empleos</p> : <Resultados jobs={jobs} />}
      <Pagination
        onPageChange={handlePageChange}
        currentPage={currentPage}
        totalPages={totalPages}
      />
    </main>
  )
}

export default SearchPage
