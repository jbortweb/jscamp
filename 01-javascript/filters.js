const searchForm = document.querySelector('#empleos-search-input')
const locationFilters = document.querySelector('#filter-location')
const nivelFilters = document.querySelector('#filter-experience')
const technologyFilters = document.querySelector('#filter-technology')
const mensaje = document.querySelector('#filter-selected-value')

// Función que aplica todos los filtros
function applyAllFilters() {
  const jobs = document.querySelectorAll('.job-listing-card')

  const searchValue = searchForm.value.toLowerCase().trim()
  const locationValue = locationFilters.value
  const nivelValue = nivelFilters.value
  const technologyValue = technologyFilters.value

  jobs.forEach((job) => {
    const title = job.querySelector("h3").textContent.toLowerCase()
    const modalidad = job.dataset.modalidad
    const nivel = job.dataset.nivel
    const technologies = job.dataset.technology

    // Verificar si cumple con TODOS los filtros activos
    const matchesSearch = searchValue === '' || title.includes(searchValue)
    const matchesLocation = locationValue === '' || modalidad === locationValue
    const matchesNivel = nivelValue === '' || nivel === nivelValue
    const matchesTechnology = technologyValue === '' || technologies.includes(technologyValue)

    // Solo mostrar si cumple con TODOS los filtros
    const isShow = matchesSearch && matchesLocation && matchesNivel && matchesTechnology
    job.classList.toggle('is-hidden', !isShow)
  })
}

// BUSCADOR
searchForm.addEventListener('keydown', () => {
  applyAllFilters()
})

// LOCALIZACIÓN
locationFilters.addEventListener('change', (event) => {
  const selectedValue = locationFilters.value

  if (selectedValue) {
    mensaje.textContent = `Ubicación: ${selectedValue}`
  } else {
    mensaje.textContent = ''
  }

  applyAllFilters()
})

// NIVEL
nivelFilters.addEventListener('change', (event) => {
  const selectedValue = nivelFilters.value

  if (selectedValue) {
    mensaje.textContent = `Nivel: ${selectedValue}`
  } else {
    mensaje.textContent = ''
  }

  applyAllFilters()
})

//TECNOLOGÍA

technologyFilters.addEventListener('change', (event) => {
  const selectedValue = technologyFilters.value

  if (selectedValue) {
    mensaje.textContent = `Tecnología: ${selectedValue}`
  } else {
    mensaje.textContent = ''
  }

  applyAllFilters()
})

/*  BUSCADOR
const searchInput = document.querySelector('#empleos-search-input')

searchInput.addEventListener('input', () => {
  console.log(searchInput.value)
})

const searchForm = document.querySelector('#empleos-search-form')

searchForm.addEventListener('submit', (event) => {
  event.preventDefault()
  console.log('Formulario enviado con valor:', searchInput.value)
})

searchForm.addEventListener('keydown', (event) => {
  console.log('Tecla presionada en el formulario de búsqueda', event.key)
})
   */