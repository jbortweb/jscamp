import { useState } from 'react'
import Header from './components/Header'
import Resultados from './components/Resultados'
import Search from './components/search/Search'
import Footer from './components/Footer'
import Pagination from './components/pagination/Pagination'
import data from './data.json'

const RESULT_PER_PAGE = 4

function App() {
  const [filters, setFilters] = useState({
    location: '',
    experience: '',
    technology: '',
  })
  const [textToFilter, setTextToFilter] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  const jobsFilteredByFilters = data.filter((job) => {
    if (filters.location && job.data.modalidad !== filters.location) return false
    if (filters.experience && job.data.nivel !== filters.experience) return false
    if (filters.technology && job.data.technology !== filters.technology) return false
    return true
  })

  const jobsWirthTextFilter =
    textToFilter === ''
      ? jobsFilteredByFilters
      : jobsFilteredByFilters.filter((job) => {
          return job.titulo.toLowerCase().includes(textToFilter.toLowerCase())
        })

  const totalPages = Math.ceil(jobsWirthTextFilter.length / RESULT_PER_PAGE)

  const pageResults = jobsWirthTextFilter.slice(
    (currentPage - 1) * RESULT_PER_PAGE,
    currentPage * RESULT_PER_PAGE,
  )

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  const handleSearch = (filters) => {
    setFilters(filters)
    setCurrentPage(1)
  }

  const handleTextFilter = (text) => {
    setTextToFilter(text)
    setCurrentPage(1)
  }
  return (
    <>
      <Header />
      <main>
        <Search onSearch={handleSearch} onTextFilter={handleTextFilter} />
        <Resultados jobs={pageResults} />
        <Pagination
          onPageChange={handlePageChange}
          currentPage={currentPage}
          totalPages={totalPages}
        />
      </main>
      <Footer />
    </>
  )
}

export default App
