import jobs from '../jobs.json' with { type: 'json' }

export class JobModel {
  static async getAll({ text, title, level, type, limit = 10, technology, offset = 0 }) {
    let filteredJobs = jobs

    if (text) {
      const searchTerm = text.toLowerCase()
      filteredJobs = filteredJobs.filter(job =>
        job.titulo.toLowerCase().includes(searchTerm) || job.descripcion.toLowerCase().includes(searchTerm)
      )
    }

    if (technology) {
      filteredJobs = filteredJobs.filter(job =>
        job.data.technology.includes(technology)
      )
    }

    if (type) {
      filteredJobs = filteredJobs.filter(job => job.data.modalidad === type)
    }

    if (level) {
      filteredJobs = filteredJobs.filter(job => job.data.nivel === level)
    }

    const limitNumber = Number(limit) 
    const offsetNumber = Number(offset)

    const paginatedJobs = filteredJobs.slice(offsetNumber, offsetNumber + limitNumber)

    return paginatedJobs
  }

  static async getById(id) {
    const job = jobs.find(job => job.id === id)
    return job
  }

  static async create ({ titulo, empresa, ubicacion, data }) {
    const newJob = {
      id: crypto.randomUUID(),
      titulo,
      empresa,
      ubicacion,
      data
    }

    jobs.push(newJob) // lo haremos en una base de datos con un INSERT

    return newJob
  }

  static async update(id, { titulo, empresa, ubicacion, data }) {
    const index = jobs.findIndex(job => job.id === id)
    if (index === -1) return null

    const updatedJob = {
      ...jobs[index],
      titulo,
      empresa,
      ubicacion,
      data
    }

    jobs[index] = updatedJob
    return updatedJob
  }

  static async delete(id) {
    const index = jobs.findIndex(job => job.id === id)
    if (index === -1) return null

    const deleted = jobs.splice(index, 1)
    return deleted[0]
  }
}