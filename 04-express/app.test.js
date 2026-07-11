import { test, describe, before, after } from 'node:test'
import assert from 'node:assert'
import app from './app.js'

let server
const PORT = 3456
const BASE_URL = `http://localhost:${PORT}`

// antes de todos los tests, se ejecuta UNA vez, para levantar el servidor
before(async () => {
  return new Promise((resolve, reject) => {
    server = app.listen(PORT, () => resolve())
    server.on('error', reject)
  })
})

// después de todos los tests, se ejecuta UNA vez, para cerrar el servidor
after(async () => {
  return new Promise((resolve, reject) => {
    server.close((err) => {
      if (err) return reject(err)
      resolve()
    })
  })
})

describe('GET /jobs', () => {
  test('debe responder con 200 y un array de trabajos', async () => {
    const response = await fetch(`${BASE_URL}/jobs`)
    assert.strictEqual(response.status, 200)

    const json = await response.json()
    assert.ok(Array.isArray(json.data), 'La respuesta debe ser un array')
  })

  test('debe filtrar trabajos por tecnología', async () => {
    const tech = 'react'
    const response = await fetch(`${BASE_URL}/jobs?technology=${tech}`)
    assert.strictEqual(response.status, 200)

    const json = await response.json()
    console.log(json)
    assert.ok(
      json.data.every(job => job.data.technology.includes(tech)),
      `Todos los trabajos deben incluir la tecnología ${tech}`
    )
  })

  test('debe filtrar trabajos por nivel', async () => {
    const level = 'junior'
    const response = await fetch(`${BASE_URL}/jobs?level=${level}`)
    assert.strictEqual(response.status, 200)

    const json = await response.json()
    assert.ok(
      json.data.every(job => job.data.nivel === level),
      `Todos los trabajos deben ser de nivel ${level}`
    )
  })

  test('debe añadir un nuevo trabajo y responder con 201', async () => {
    const newJob = {
      titulo: 'Desarrollador de Software Senior',
      empresa: 'Tech Solutions Inc.',
      ubicacion: 'Remoto',
      descripcion: 'Buscamos un ingeniero de software con experiencia en desarrollo web y conocimientos en JavaScript, React y Node.js. El candidato ideal debe ser capaz de trabajar en equipo y tener buenas habilidades de comunicación.',
      data: {
        technology: ['react', 'node', 'javascript'],
        modalidad: 'remoto',
        nivel: 'senior'
      },
      content: {
        description: 'Tech Solutions Inc. está buscando un Ingeniero de Software Senior altamente motivado y experimentado para unirse a nuestro equipo remoto. El candidato ideal tendrá una sólida formación en desarrollo de software, con experiencia en el diseño, desarrollo e implementación de soluciones de software escalables y de alto rendimiento. Como Ingeniero de Software Senior, usted será responsable de liderar proyectos de desarrollo, mentorizar a ingenieros junior y colaborar con equipos multifuncionales para entregar productos de software de alta calidad.',
        responsibilities: '- Diseñar, desarrollar y mantener aplicaciones web utilizando tecnologías modernas.\n- Colaborar con equipos de producto y diseño para definir y entregar nuevas características.\n- Escribir código limpio, eficiente y bien documentado.\n- Realizar revisiones de código y proporcionar retroalimentación constructiva a los miembros del equipo.\n- Mentorizar ingenieros junior y guiar su desarrollo profesional.\n- Participar en reuniones de planificación y retrospectivas del equipo.\n- Mantenerse actualizado con las últimas tendencias y mejores prácticas en desarrollo de software.',
        requirements: '- Licenciatura en Informática o campo relacionado.\n- Mínimo de 5 años de experiencia en desarrollo de software.\n- Experiencia con frameworks de JavaScript (por ejemplo, React, Angular, Vue.js).\n- Familiaridad con metodologías ágiles y herramientas de control de versiones (por ejemplo, Git).\n- Excelentes habilidades de comunicación y capacidad para trabajar en equipo.\n- Capacidad demostrada para resolver problemas complejos y pensar de manera crítica.',
        about: 'Tech Solutions Inc. es una empresa de tecnología innovadora que se centra en la creación de soluciones de software de vanguardia para diversas industrias. Estamos comprometidos con el fomento de un entorno de trabajo colaborativo e inclusivo donde cada empleado pueda prosperar y crecer profesionalmente. Ofrecemos salarios competitivos, beneficios integrales y oportunidades de desarrollo profesional continuo.'
      }
    }

    const response = await fetch(`${BASE_URL}/jobs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newJob)
    })

    assert.strictEqual(response.status, 201)

    const json = await response.json()
    assert.ok(json.id, 'La respuesta debe contener un ID para el nuevo trabajo')
  })
})

describe('PUT /jobs/:id', () => {
  test('debe actualizar un trabajo existente', async () => {
    const { data: jobs } = await fetch(`${BASE_URL}/jobs`).then(r => r.json())
    const firstJob = jobs[0]

    const updatedData = {
      titulo: 'Título actualizado',
      empresa: firstJob.empresa,
      ubicacion: firstJob.ubicacion,
      data: firstJob.data
    }

    const response = await fetch(`${BASE_URL}/jobs/${firstJob.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedData)
    })

    assert.strictEqual(response.status, 200)

    const json = await response.json()
    assert.strictEqual(json.titulo, 'Título actualizado')
  })

  test('debe devolver 404 si el trabajo no existe', async () => {
    const response = await fetch(`${BASE_URL}/jobs/999`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ titulo: 'Test', empresa: 'Test', ubicacion: 'Test', data: {} })
    })

    assert.strictEqual(response.status, 404)
  })
})

describe('DELETE /jobs/:id', () => {
  test('debe eliminar un trabajo existente', async () => {
    const createResponse = await fetch(`${BASE_URL}/jobs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        titulo: 'Temporal',
        empresa: 'Test',
        ubicacion: 'Test',
        data: { technology: [], modalidad: 'remoto', nivel: 'junior' }
      })
    })
    const created = await createResponse.json()

    const deleteResponse = await fetch(`${BASE_URL}/jobs/${created.id}`, {
      method: 'DELETE'
    })

    assert.strictEqual(deleteResponse.status, 200)

    const checkResponse = await fetch(`${BASE_URL}/jobs/${created.id}`)
    assert.strictEqual(checkResponse.status, 404)
  })

  test('debe devolver 404 si el trabajo no existe', async () => {
    const response = await fetch(`${BASE_URL}/jobs/999`, {
      method: 'DELETE'
    })

    assert.strictEqual(response.status, 404)
  })
})

