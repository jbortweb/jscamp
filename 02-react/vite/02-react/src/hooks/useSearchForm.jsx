import { useState } from 'react'

export default function useSearchForm({ onSearch, onTextFilter }) {
  const [searchText, setSearchText] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
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
    onTextFilter(text)
  }

  return { searchText, handleSubmit, handleTextChange }
}
