// recupera solo el primer boton que encuentre
// const boton = document.querySelector('.button-apply-job')
// console.log(boton) // null si no lo encuentra

// if (boton !== null) {
//   boton.addEventListener('click', function() {
//     boton.textContent = '¡Aplicado!'
//     boton.classList.add('is-applied')
//     boton.disabled = true
//   })
// }

// const botones = document.querySelectorAll('.button-apply-job')
// // devuelve un NodeList (array-like) con todos los botones que encuentre
// // o una lista vacia [] si no encuentra ninguno

// botones.forEach(boton => {
//   boton.addEventListener('click', function() {
//     boton.textContent = '¡Aplicado!'
//     boton.classList.add('is-applied')
//     boton.disabled = true
//   })
// })

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

const jobsListingSection = document.querySelector('.jobs-listings')

jobsListingSection.addEventListener('click', function (event) {
  const element = event.target

  if (element.classList.contains('button-apply-job')) {
    element.textContent = '¡Aplicado!'
    element.classList.add('is-applied')
    element.disabled = true
  }
})


const locationFilters = document.querySelector('#filter-location')
const mensaje = document.querySelector('#filter-selected-value')
const jobs = document.querySelectorAll('.job-listing-card')

locationFilters.addEventListener('change', (event) => {
  const selectedValue = locationFilters.value

  if (selectedValue) {
    mensaje.textContent = `Has seleccionado: ${selectedValue}`
  } else {
    mensaje.textContent = ''
  }


  jobs.forEach((job) => {
    const modalidad = job.dataset.modalidad
    const isShow = selectedValue === '' || modalidad === selectedValue
    job.classList.toggle('is-hidden', !isShow)
  })
})
