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

test('Notes are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
}, 100000)

test('All notes are returned', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('Verifying the unique identifier property of the blog posts is named id', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body[0].id).toBeDefined()
})

test('Making an HTTP POST request to /api/blogs successfully creates a new blog post', async () => {
  const newBlog = {
    title: "How to solve the Rubik's Cube?",
    author: 'Denes Ferenc',
    url: 'https://ruwix.com/the-rubiks-cube/how-to-solve-the-rubiks-cube-beginners-method/',
    likes: 42,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  const contents = response.body.map((r) => r.title)

  expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
  expect(contents).toContain("How to solve the Rubik's Cube?")
})

test('If the likes property is missing from the request, it will default to the value 0', async () => {
  const newBlog = {
    title: "How to solve the Rubik's Cube?",
    author: 'Denes Ferenc',
    url: 'https://ruwix.com/the-rubiks-cube/how-to-solve-the-rubiks-cube-beginners-method/',
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  const contents = response.body.map((r) => r.title)
  expect(contents).toContain("How to solve the Rubik's Cube?")

  response.body.forEach((blog) => {
    if (blog.title === "How to solve the Rubik's Cube?") {
      expect(blog.likes).toBe(0)
    }
  })
})

test('If title or url are missing, backend responds with 400 Bad Request', async () => {
  const missingUrl = {
    title: "How to solve the Rubik's Cube?",
    author: 'Denes Ferenc',
  }

  await api
    .post('/api/blogs')
    .send(missingUrl)
    .expect(400)
}, 10000)
