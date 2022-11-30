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
    title: 'How to solve the Rubik\'s Cube?',
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
  expect(contents).toContain('How to solve the Rubik\'s Cube?')
})

test('If the likes property is missing from the request, it will default to the value 0', async () => {
  const newBlog = {
    title: 'How to solve the Rubik\'s Cube?',
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
  expect(contents).toContain('How to solve the Rubik\'s Cube?')

  response.body.forEach((blog) => {
    if (blog.title === 'How to solve the Rubik\'s Cube?') {
      expect(blog.likes).toBe(0)
    }
  })
})

test('If title or url are missing, backend responds with 400 Bad Request', async () => {
  const missingUrl = {
    title: 'How to solve the Rubik\'s Cube?',
    author: 'Denes Ferenc',
    likes: 42,
  }

  const missingTitle = {
    author: 'Denes Ferenc',
    url: 'https://ruwix.com/the-rubiks-cube/how-to-solve-the-rubiks-cube-beginners-method/',
    likes: 42,
  }

  const missingBoth = {
    author: 'Denes Ferenc',
    likes: 42,
  }

  await api.post('/api/blogs').send(missingUrl).expect(400)
  await api.post('/api/blogs').send(missingTitle).expect(400)
  await api.post('/api/blogs').send(missingBoth).expect(400)

  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(helper.initialBlogs.length)
}, 10000)

test('Deleting a blog post', async () => {
  const notesAtStart = await helper.blogsInDb()
  const blogToDelete = notesAtStart[0]

  await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)

  const notesAtEnd = await helper.blogsInDb()

  expect(notesAtEnd).toHaveLength(helper.initialBlogs.length - 1)

  const contents = notesAtEnd.map((r) => r.title)

  expect(contents).not.toContain(blogToDelete.title)
})

test('Updating a blog post', async () => {
  const notesAtStart = await helper.blogsInDb()
  const blogToUpdate = notesAtStart[0]

  const updatedBlog = {
    title: 'Have no clue how to this project!',
    author: 'Erik Mende',
    url: 'https:/erikpeik.fi',
    likes: 42,
  }

  await api.put(`/api/blogs/${blogToUpdate.id}`).send(updatedBlog).expect(200)

  const notesAtEnd = await helper.blogsInDb()

  expect(notesAtEnd).toHaveLength(helper.initialBlogs.length)
  expect(notesAtEnd[0].title).toBe('Have no clue how to this project!')
  expect(notesAtEnd[0].author).toBe('Erik Mende')
  expect(notesAtEnd[0].url).toBe('https:/erikpeik.fi')
  expect(notesAtEnd[0].likes).toBe(42)
})
