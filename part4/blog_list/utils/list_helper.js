const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => {
    const total = sum + blog.likes
    return total
  }, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  let favorite = blogs[0]
  for (let i = 1; i < blogs.length; i++) {
    if (blogs[i].likes > favorite.likes) {
      favorite = blogs[i]
    }
  }
  return favorite
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return null
  }
  const count = {}
  for (let i = 0; i < blogs.length; i++) {
    const author = blogs[i].author

    if (count[author] === undefined) {
      count[author] = 1
    } else {
      count[author] += 1
    }
  }

  let topAuthor = ''
  let maxBlogs = 0

  for (const author in count) {
    if (count[author] > maxBlogs) {
      topAuthor = author
      maxBlogs = count[author]
    }
  }

  return {
    author: topAuthor,
    blogs: maxBlogs
  }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return null
  }
  const count = {}
  for (let i = 0; i < blogs.length; i++) {
    const author = blogs[i].author

    if (count[author] === undefined) {
      count[author] = blogs[i].likes
    } else {
      count[author] += blogs[i].likes
    }
  }

  let topAuthor = ''
  let maxLikes = 0

  for (const author in count) {
    if (count[author] > maxLikes) {
      topAuthor = author
      maxLikes = count[author]
    }
  }

  return {
    author: topAuthor,
    likes: maxLikes
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
