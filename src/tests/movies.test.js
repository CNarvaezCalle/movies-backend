const request = require('supertest');
const app = require('../app');
const Actors = require('../models/Actors');
const Directors = require('../models/Directors');
const Genres = require('../models/Genres');
require('../models');

let id;

test('GET /movies', async () => {
  const res = await request(app).get('/movies/');
  expect(res.status).toBe(200);
  expect(res.body).toBeInstanceOf(Array);
});

test('POST /movies', async () => {
  const movie = {
    name: "Terminator",
    image: "http://terminator.jpg",
    synopsis: "lorem ipsum",
    releaseYear: 1982
  }
  const res = await request(app).post('/movies').send(movie);
  id = res.body.id;
  expect(res.status).toBe(201);
  expect(res.body.id).toBeDefined();
  expect(res.body.name).toBe(movie.name);
});

test('PUT /movies/:id', async () => {
  const movie = {
    name: "Terminator actualizado"
  }
  const res = await request(app).put('/movies/'+id).send(movie);
  expect(res.status).toBe(200);
  expect(res.body.name).toBe(movie.name);
});

test('POST /movies/:id/actors', async () => {
  const actor = await Actors.create({ 
    firstName: "Arnold",
    lastName: "Swartzeneger",
    nationality: "American",
    image: "https://arnold.jpg",
    birthday: "1965-01-01"  
  });
  const res = await request(app)
    .post(`/movies/${id}/actors`)
    .send([actor.id]);
  await actor.destroy();
  expect(res.status).toBe(200);
  expect(res.body).toHaveLength(1);
});

test('POST /movies/:id/directors', async () => {
  const director = await Directors.create({
    firstName: "Stevene",
    lastName: "Spilberge",
    nationality: "Americane",
    image: "https://image.jpg",
    birthday: "1970-01-01"
  });
  const res = await request(app)
    .post(`/movies/${id}/directors`)
    .send([director.id]);
  await director.destroy();
  expect(res.status).toBe(200);
  expect(res.body).toHaveLength(1)  
});

test('POST /movies/:id/genres', async () => {
  const genre = await Genres.create({ name: "Drama" });
  const res = await request(app)
    .post('/movies/'+id+'/genres')
    .send([genre.id]);
  await genre.destroy();
  expect(res.status).toBe(200);
  expect(res.body).toHaveLength(1)  
});

test('DELETE /movies/:id', async () => {
  const res = await request(app).delete(`/movies/${id}`);
  expect(res.status).toBe(204);
});