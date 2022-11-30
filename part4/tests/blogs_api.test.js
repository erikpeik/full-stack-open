// const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')

beforeEach(async () => {
  await Blog.deleteMany({})

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})

test('notes are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
}, 100000)

test('all notes are returned', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

// test('a specific note is within the returned notes', async () => {
//   const response = await api.get('/api/blogs')

//   const contents = response.body.map((r) => r.title)
//   expect(contents).toContain('Canonical string reduction')
// })

// test('a valid note can be added', async () => {
//   const newBlog = {
//     title: 'How to solve the Rubik\'s Cube?',
//     author: 'Denes Ferenc',
//     url: 'https://ruwix.com/the-rubiks-cube/how-to-solve-the-rubiks-cube-beginners-method/',
//     likes: 0,
//   }

//   await api
//     .post('/api/blogs')
//     .send(newBlog)
//     .expect(201)
//     .expect('Content-Type', /application\/json/)

//   const response = await api.get('/api/blogs')
//   const contents = response.body.map((r) => r.title)

//   expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
//   expect(contents).toContain('How to solve the Rubik\'s Cube?')
// })

// test('empty note is not added', async () => {
//   await api.post('/api/blogs').send({}).expect(400)

//   const response = await api.get('/api/blogs')
//   expect(response.body).toHaveLength(helper.initialBlogs.length)
// })
