const express = require('express');
const cors = require('cors');

const { uuid } = require('uuidv4');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get('/repositories', (request, response) => {
  return response.status(200).json(repositories)
});

app.post('/repositories', (request, response) => {
  const { title, url, techs } = request.body

  const repository = { id: uuid(), title, url, techs, likes: 0 }

  repositories.push(repository)

  return response.status(200).json(repository)
});

app.put('/repositories/:id', (request, response) => {
  const { id } = request.params
  const { title, url, techs } = request.body

  const repositoryIdx = repositories.findIndex(el => el.id === id)  

  if (repositoryIdx < 0) {
    return response.status(400).json({ error: 'Register not found.' })
  }

  const repository = { ...repositories[repositoryIdx], ...{ id, title, url, techs }}

  repositories[repositoryIdx] = repository

  return response.status(200).json(repositories[repositoryIdx])

});

app.delete('/repositories/:id', (request, response) => {
  const { id } = request.params
  const repositoryIdx = repositories.findIndex(el => el.id === id)
  

  if (repositoryIdx < 0) {
    return response.status(400).json({ error: 'Register not found.' })
  }

  repositories.splice(repositoryIdx, 1)
  return response.status(204).send()
});

app.post('/repositories/:id/like', (request, response) => {
  const { id } = request.params

  const repositoryIdx = repositories.findIndex(el => el.id === id)  

  if (repositoryIdx < 0) {
    return response.status(400).json({ error: 'Register not found.' })
  }

  repositories[repositoryIdx].likes++
 
  return response.status(200).json({ likes: repositories[repositoryIdx].likes }) 


});

module.exports = app;
 