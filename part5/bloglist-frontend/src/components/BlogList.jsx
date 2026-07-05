import Blog from './Blog'

const BlogList = ({ blogs, user, updateBlog, removeBlog }) => {
  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

  return (
    <div>
      <h2>Blogs</h2>
      <ul>
        {sortedBlogs.map(blog =>
          <li key={blog.id}>
            <Blog
              blog={blog}
              updateBlog={updateBlog}
              removeBlog={removeBlog}
              currentUser={user}
            />
          </li>
        )}
      </ul>
    </div>
  )
}

export default BlogList
