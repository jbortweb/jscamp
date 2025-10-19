const jobsContainer = document.querySelector('.jobs-listings')

fetch('./data.json')
  .then((response) => response.json())
  .then((jobs) => {
    jobs.forEach((job) => {
      const article = document.createElement('article')
      article.classList.add('job-listing-card')
      article.dataset.modalidad = job.data.modalidad
      article.dataset.technology = job.data.technology
      article.dataset.nivel = job.data.nivel
      article.innerHTML = `<div>
            <h3>${job.titulo}</h3>
            <small>${job.empresa} | ${job.ubicacion}</small>
            <p>${job.descripcion}</p>
          </div>
          <button class="button-apply-job">Aplicar</button>`
      jobsContainer.appendChild(article)
    })
  })
  .catch((error) => {
    console.error('Error al obtener los datos:', error)
  })