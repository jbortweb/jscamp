import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router'
import { useRouter } from './useRouter'

const RESULT_PER_PAGE = 4

export const useFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const [filters, setFilters] = useState(() => {
    return {
      location: searchParams.get('type') || '',
      experience: searchParams.get('level') || '',
      technology: searchParams.get('technology') || '',
    }
  })

  const [textToFilter, setTextToFilter] = useState(
    () => searchParams.get('text') || '',
  )

  const [currentPage, setCurrentPage] = useState(() => {
    return parseInt(searchParams.get('page')) || 1
  })

  const [jobs, setJobs] = useState([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)

  const { navigateTo } = useRouter()

  useEffect(() => {
    async function fecthJobs() {
      try {
        setLoading(true)

        const params = new URLSearchParams()
        if (textToFilter) params.append('text', textToFilter)
        if (filters.location) params.append('type', filters.location)
        if (filters.experience) params.append('level', filters.experience)
        if (filters.technology) params.append('technology', filters.technology)

        const offset = (currentPage - 1) * RESULT_PER_PAGE
        params.append('limit', RESULT_PER_PAGE)
        params.append('offset', offset)

        const queryParams = params.toString()

        const response = await fetch(
          `http://localhost:3000/jobs?${queryParams}`,
        )
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
  }, [filters, textToFilter, currentPage])

  useEffect(() => {
    const params = new URLSearchParams()
    if (textToFilter) params.append('text', textToFilter)
    if (filters.location) params.append('type', filters.location)
    if (filters.experience) params.append('level', filters.experience)
    if (filters.technology) params.append('technology', filters.technology)
    if (currentPage > 1) params.append('page', currentPage)

    const newUrl = params.toString()
      ? `${window.location.pathname}?${params.toString()}`
      : window.location.pathname
    navigateTo(newUrl)
  }, [filters, textToFilter, currentPage, navigateTo])

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
    textToFilter,
    filters,
  }
}
