import { useEffect, useState } from 'react'

const RESULT_PER_PAGE = 4

export const useFilters = () => {
  const [filters, setFilters] = useState({
    location: '',
    experience: '',
    technology: '',
  })
  const [textToFilter, setTextToFilter] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [jobs, setJobs] = useState([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fecthJobs() {
      try {
        setLoading(true)
        const response = await fetch('https://jscamp-api.vercel.app/api/jobs')
        const json = await response.json()
        setJobs(json.data)
        setTotal(json.total)
      } catch (error) {
        console.error('Error fetching jobs:', error)
      } finally {
        setLoading(false)
      }
    }
    fecthJobs()
  }, [])

  const totalPages = Math.ceil(total / RESULT_PER_PAGE)

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

  return {
    jobs,
    total,
    loading,
    totalPages,
    handlePageChange,
    handleSearch,
    handleTextFilter,
    currentPage,
  }
}
