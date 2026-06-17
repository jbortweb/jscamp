import { useState, useRef, useId } from 'react'

export default function useSearchForm({ onSearch, onTextFilter, initialText = '' }) {
  const [searchText, setSearchText] = useState(initialText)
  const timeOutId = useRef(null)

  const idTechnology = useId()
  const idLocation = useId()
  const idExperience = useId()

  const handleSubmit = (event) => {
    event.preventDefault()
    const form = event.target.form
    const formData = new FormData(form)
    const filters = {
      technology: formData.get('filter-technology'),
      location: formData.get('filter-location'),
      experience: formData.get('filter-experience'),
    }
    onSearch(filters)
  }

  const handleTextChange = (event) => {
    const text = event.target.value
    setSearchText(text)

    if (timeOutId.current) {
      clearTimeout(timeOutId.current)
    }

    timeOutId.current = setTimeout(() => {
      onTextFilter(text)
    }, 500)
  }

  return {
    searchText,
    handleSubmit,
    handleTextChange,
    idTechnology,
    idLocation,
    idExperience,
  }
}
