const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')


const api = supertest(app)

const initialBlogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5
  }
]

let testUserId

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash('sekret', 10)
  const user = new User({ username: 'root', passwordHash })
  const savedUser = await user.save()
  testUserId = savedUser.id

  let blogObject = new Blog({ ...initialBlogs[0], user: savedUser._id })
  await blogObject.save()
  blogObject = new Blog({ ...initialBlogs[1], user: savedUser._id })
  await blogObject.save()
})

test('blogs are returned as json and correct amount is returned', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
  assert.strictEqual(response.body.length, 2)
})

test('blog identifier is named "id"', async () => {
  const response = await api
    .get('/api/blogs')
  assert.strictEqual(response.body[0].hasOwnProperty('id'), true)
})

test('a valid blog can be added ', async () => {
  const token = await getToken()
  const newBlog = {
    title: 'adding new blog test',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 3
  }

  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await blogsInDb()
  assert.strictEqual(blogsAtEnd.length, initialBlogs.length + 1)

  const titles = blogsAtEnd.map(n => n.title)
  assert(titles.includes('adding new blog test'))
})

test('blogs without likes default to include 0 likes', async () => {
  const token = await getToken()
  const newBlog = {
    title: 'Blog without likes',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
  }
  const response = await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(newBlog)
    .expect(201)

  assert.strictEqual(response.body.likes, 0)
})

test('blog wihtout title returns 400', async () => {
  const token = await getToken()
  const newBlog = {
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 0
  }
  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(newBlog)
    .expect(400)
})

test('blog wihtout url returns 400', async () => {
  const token = await getToken()
  const newBlog = {
    author: 'React patterns',
    title: 'Michael Chan',
    likes: 0
  }
  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(newBlog)
    .expect(400)
})

test('a blog can be deleted', async () => {
  const token = await getToken()
  const blogsAtStart = await blogsInDb()
  const blogToDelete = blogsAtStart[0]

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .set('Authorization', `Bearer ${token}`)
    .expect(204)

  const blogsAtEnd = await blogsInDb()

  const ids = blogsAtEnd.map(n => n.id)
  assert(!ids.includes(blogToDelete.id))

  assert.strictEqual(blogsAtEnd.length, initialBlogs.length - 1)
})

test('deleting a blog fails if user is not the creator', async () => {
  const passwordHash = await bcrypt.hash('salasana', 10)

  const otherUser = new User({ username: 'otheruser', passwordHash })
  await otherUser.save()
  const loginResponse = await api
    .post('/api/login')
    .send({ username: 'otheruser', password: 'salasana' })
  const wrongToken = loginResponse.body.token

  const blogsAtStart = await blogsInDb()
  const blogToDelete = blogsAtStart[0]
  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .set('Authorization', `Bearer ${wrongToken}`)
    .expect(401)

  const blogsAtEnd = await blogsInDb()
  assert.strictEqual(blogsAtEnd.length, blogsAtStart.length)
})

test('a blog can be updated', async () => {
  const blogsAtStart = await blogsInDb()
  const blogToUpdate = blogsAtStart[0]
  const updatedLikes = { likes: blogToUpdate.likes + 10 }

  const response = await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(updatedLikes)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  assert.strictEqual(response.body.likes, blogToUpdate.likes + 10)

  const blogsAtEnd = await blogsInDb()
  const updatedBlog = blogsAtEnd.find(b => b.id === blogToUpdate.id)
  assert.strictEqual(updatedBlog.likes, blogToUpdate.likes + 10)
})

test('adding a blog fails with the proper status code 401 Unauthorized if a token is not provided', async () => {
  const newBlog = {
    title: 'unauthorized blog',
    author: 'me',
    url: 'http://example.com',
    likes: 0
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(401)
})

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const getToken = async () => {
  const response = await api
    .post('/api/login')
    .send({ username: 'root', password: 'sekret' })
  return response.body.token
}

after(async () => {
  await mongoose.connection.close()
})
