import express from 'express';
import jobs from './jobs.json' with { type: 'json' };

const PORT = process.env.PORT || 3000;

const app = express();

app.use((req, res, next) => {
  const timeString = new Date().toLocaleTimeString();
  console.log(`${timeString} - ${req.method} ${req.url}`);
  next();
});

app.listen(PORT, () => {
  console.log(`Server is running on http:/localhost:${PORT}`);
});

app.get('/', (req, res) => {
  return res.send('Hello, World!');
});

app.get('/health', (req, res) => {
  return res.json({
    status: 'ok',
    uptime: process.uptime(),
  });
});

app.get('/jobs', (req, res) => {
  return res.json(jobs);
});

app.get('/jobs/:id', (req, res) => {
  const { id } = req.params;
  const job = jobs.find((job) => job.id === id);

  if (!job) {
    return res.status(404).json({ error: 'Job not found' });
  }

  return res.json(job);
});


app.post('/jobs', (req, res) => {
  const { titulo, empresa, description, ubicacion, data } = req.body;

  const newJob = {
    id: crypto.randomUUID(),
    titulo,
    empresa,
    description,
    ubicacion,
    data,
  };

  jobs.push(newJob);

  return res.status(201).json(newJob);
});