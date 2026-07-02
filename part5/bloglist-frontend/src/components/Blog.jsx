import { useState } from 'react'
import { Link } from 'react-router-dom'

const Blog = ({ blog, updateBlog, removeBlog, currentUser }) => {
  const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
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
    removeBlog(blog.id, blog.title, blog.author)
  }

  const showRemoveButton = blog.user && currentUser && blog.user.username === currentUser.username

  return (
    <div style={blogStyle} className='blog'>
      <div style={hideWhenVisible} className='blog-summary'>
        <Link to={`/blogs/${blog.id}`}>{blog.title}</Link> {blog.author} <button onClick={toggleVisibility}>view</button>
      </div>
      <div style={showWhenVisible} className='blog-detailed'>
        <div>
          <Link to={`/blogs/${blog.id}`}>{blog.title}</Link> {blog.author} <button onClick={toggleVisibility}>hide</button>
        </div>
        <div>{blog.url}</div>
        <div>
          likes {blog.likes}
          {currentUser && (
            <button onClick={handleLike}>like</button>
          )}
        </div>
        <div>{blog.user?.name}</div>
        {showRemoveButton && (
          <button onClick={handleRemove}>remove</button>
        )}
      </div>
    </div>
  )
}

export default Blog
