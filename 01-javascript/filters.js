const locationFilters = document.querySelector('#filter-location')
const mensaje = document.querySelector('#filter-selected-value')

locationFilters.addEventListener('change', (event) => {

  const jobs = document.querySelectorAll('.job-listing-card')
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