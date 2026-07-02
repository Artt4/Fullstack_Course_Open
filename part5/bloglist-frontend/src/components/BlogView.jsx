import { useNavigate } from 'react-router-dom'

const BlogView = ({ blog, updateBlog, removeBlog, currentUser }) => {
  const navigate = useNavigate()

  if (!blog) {
    return null
  }

  const handleLike = () => {
    const updatedBlog = {
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }
    updateBlog(blog.id, updatedBlog)
  }

  const handleRemove = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      removeBlog(blog.id, blog.title, blog.author)
      navigate('/')
    }
  }

  const showRemoveButton = blog.user && currentUser && blog.user.username === currentUser.username

  return (
    <div>
      <h2>{blog.title}</h2>
      <div>
        <a href={blog.url}>{blog.url}</a>
      </div>
      <div>
        {blog.likes} likes
        {currentUser && (
          <button onClick={handleLike}>like</button>
        )}
      </div>
      <div>added by {blog.user?.name}</div>
      {showRemoveButton && (
        <button onClick={handleRemove}>remove</button>
      )}
    </div>
  )
}

export default BlogView
