import { useNavigate } from 'react-router-dom'
import { Card, CardContent, Typography, IconButton, Link, Box } from '@mui/material'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import DeleteIcon from '@mui/icons-material/Delete'

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
    <Card sx={{ maxWidth: 600, marginTop: 3 }}>
      <CardContent>
        <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold' }}>
          {blog.title}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
          by {blog.author}
        </Typography>
        <Typography variant="body2" sx={{ mt: 1 }}>
          <Link href={blog.url} target="_blank" rel="noreferrer">
            {blog.url}
          </Link>
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Added by {blog.user?.name}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 2 }}>
          <Typography variant="body2">{blog.likes} likes</Typography>
          {currentUser && (
            <IconButton size="small" color="primary" onClick={handleLike}>
              <ThumbUpIcon />
            </IconButton>
          )}
          {showRemoveButton && (
            <IconButton size="small" color="error" onClick={handleRemove}>
              <DeleteIcon />
            </IconButton>
          )}
        </Box>
      </CardContent>
    </Card>
  )
}

export default BlogView
