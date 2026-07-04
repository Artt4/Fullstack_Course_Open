import Blog from './Blog'

const BlogList = ({ blogs, user, updateBlog, removeBlog }) => {
  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

  return (
    <div>
      <h2>blogs</h2>
      {sortedBlogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          updateBlog={updateBlog}
          removeBlog={removeBlog}
          currentUser={user}
        />
      )}
    </div>
  )
}

export default BlogList
