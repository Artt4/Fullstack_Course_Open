const { test, describe } = require('node:test')
const assert = require('node:assert')
const helper = require('../utils/list_helper')

const emptyList = []
const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
    likes: 5,
    __v: 0
  }
]
const listWithManyBlogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
  }
]

test('dummy returns one', () => {
  const blogs = []

  const result = helper.dummy(blogs)
  assert.strictEqual(result, 1)
})

describe('total likes', () => {
  test('when list has no blogs, equals the likes of that', () => {
    const result = helper.totalLikes(emptyList)
    assert.strictEqual(result, 0)
  })
  test('when list has only one blog, equals the likes of that', () => {
    const result = helper.totalLikes(listWithOneBlog)
    assert.strictEqual(result, 5)
  })
  test('when list has many blogs, equals the likes of that', () => {
    const result = helper.totalLikes(listWithManyBlogs)
    assert.strictEqual(result, 36)
  })
})

describe('most liked', () => {
  test('returns null when list is empty', () => {
    const result = helper.favoriteBlog(emptyList)
    assert.deepStrictEqual(result, null)
  })
  test('returns the only blog when list has one blog', () => {
    const result = helper.favoriteBlog(listWithOneBlog)
    assert.deepStrictEqual(result, {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0
    })
  })
  test('returns the blog with most likes when list has many blogs', () => {
    const result = helper.favoriteBlog(listWithManyBlogs)
    assert.deepStrictEqual(result, {
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      __v: 0
    })
  })
})

describe('most blogs', () => {
  test('returns null when list is empty', () => {
    const result = helper.mostBlogs(emptyList)
    assert.deepStrictEqual(result, null)
  })
  test('when list has one blog, returns that author with blog count 1', () => {
    const result = helper.mostBlogs(listWithOneBlog)
    assert.deepStrictEqual(result, {
      author: 'Edsger W. Dijkstra',
      blogs: 1,
    })
  })
  test('returns the author with most blogs when list has many blogs', () => {
    const result = helper.mostBlogs(listWithManyBlogs)
    assert.deepStrictEqual(result, {
      author: "Robert C. Martin",
      blogs: 3,
    })
  })
})

describe('most likes', () => {
  test('returns null when list is empty', () => {
    const result = helper.mostLikes(emptyList)
    assert.deepStrictEqual(result, null)
  })
  test('when list has one blog, returns that author with likes count 5', () => {
    const result = helper.mostLikes(listWithOneBlog)
    assert.deepStrictEqual(result, {
      author: 'Edsger W. Dijkstra',
      likes: 5,
    })
  })
  test('returns the author with most likes when list has many blogs', () => {
    const result = helper.mostLikes(listWithManyBlogs)
    assert.deepStrictEqual(result, {
      author: "Edsger W. Dijkstra",
      likes: 17,
    })
  })
})
