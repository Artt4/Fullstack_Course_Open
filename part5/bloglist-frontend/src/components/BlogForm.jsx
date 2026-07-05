import { useState } from 'react'
import { TextField, Button } from '@mui/material'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: title,
      author: author,
      url: url,
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2 style={{ marginTop: 30 }}>Create new</h2>
      <form onSubmit={addBlog}>
        <div>
          <TextField
            label="title"
            margin="normal"
            size="small"
            sx={{ width: '400px' }}
            value={title}
            onChange={event => setTitle(event.target.value)}
          />
        </div>
        <div>
          <TextField
            label="author"
            margin="normal"
            size="small"
            sx={{ width: '400px' }}
            value={author}
            onChange={event => setAuthor(event.target.value)}
          />
        </div>
        <div>
          <TextField
            label="url"
            margin="normal"
            size="small"
            sx={{ width: '400px' }}
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <Button type="submit" variant="contained" sx={{ mt: 1 }}>
          CREATE
        </Button>
      </form>
    </div>
  )
}

export default BlogForm
