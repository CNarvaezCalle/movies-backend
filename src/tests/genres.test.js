const request = require('supertest');
const app = require('../app');

let id;

test('GET /genres', async () => {
  const res = await request(app).get('/genres');
  expect(res.status).toBe(200);
  expect(res.body).toBeInstanceOf(Array);
});

test('POST /genres', async () => {
  const genre = {
    name: "comedy",
  }
  const res = await request(app).post('/genres').send(genre);
  id = res.body.id;
  expect(res.status).toBe(201);
  expect(res.body.id).toBeDefined();
  expect(res.body.name).toBe(genre.name);
});

test('PUT /genres/:id', async () => {
  const genre = {
    name: "comedy actualizada",
  }
  const res = await request(app).put(`/genres/${id}`).send(genre);
  expect(res.status).toBe(200);
  expect(res.body.name).toBe(genre.name);
});

test('DELETE /genres/:id', async () => {
  const res = await request(app).delete('/genres/'+id);
  expect(res.status).toBe(204);
});