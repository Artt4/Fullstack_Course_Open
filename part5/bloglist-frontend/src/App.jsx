import { useState, useEffect } from 'react'
import { Link, Routes, Route, useNavigate, Navigate, useMatch } from 'react-router-dom'
import { Container, AppBar, Toolbar, Button, createTheme, ThemeProvider } from '@mui/material'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import BlogView from './components/BlogView'

const theme = createTheme({
  palette: {
    primary: {
      main: '#006400',
    },
  },
})

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)

  const navigate = useNavigate()

  const match = useMatch('/blogs/:id')
  const blog = match ? blogs.find(b => b.id === match.params.id) : null

  useEffect(() => {
    const fetchBlogs = async () => {
      const initialBlogs = await blogService.getAll()
      setBlogs(initialBlogs)
    }
    fetchBlogs()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async event => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      navigate('/')
    } catch {
      setNotification({ text: 'wrong username or password', type: 'error' })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    blogService.setToken(null)
    navigate('/')
  }

  const addBlog = async blogObject => {
    try {
      const returnedBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(returnedBlog))
      setNotification({ text: `a new blog ${blogObject.title} by ${blogObject.author} added`, type: 'success' })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
      navigate('/')
    } catch (error) {
      setNotification({ text: error.response.data.error, type: 'error' })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  const updateBlog = async (id, blogObject) => {
    try {
      const returnedBlog = await blogService.update(id, blogObject)
      setBlogs(blogs.map(blog => blog.id !== id ? blog : returnedBlog))
    } catch (error) {
      setNotification({ text: error.response.data.error, type: 'error' })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  const removeBlog = async (id, title, author) => {
    if (window.confirm(`Remove blog ${title} by ${author}?`)) {
      try {
        await blogService.remove(id)
        setBlogs(blogs.filter(blog => blog.id !== id))
        setNotification({ text: `Blog ${title} by ${author} removed successfully`, type: 'success' })
        setTimeout(() => {
          setNotification(null)
        }, 5000)
      } catch (error) {
        setNotification({ text: error.response.data.error, type: 'error' })
        setTimeout(() => {
          setNotification(null)
        }, 5000)
      }
    }
  }

  const style = { '&:hover': { bgcolor: 'rgba(255,255,255,0.3)' } }

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <AppBar position="static" sx={{ backgroundColor: 'darkgreen' }}>
          <Toolbar>
            <h2>Blog App</h2>
            <Button color="inherit" component={Link} to="/" sx={{ ...style, marginLeft: 'auto' }}>
              blogs
            </Button>
            <Button color="inherit" component={Link} to="/create" sx={style}>
              new blog
            </Button>
            {user ? (
              <Button color="inherit" onClick={handleLogout} sx={style}>
                logout
              </Button>
            ) : (
              <Button color="inherit" component={Link} to="/login" sx={style}>
                login
              </Button>
            )}
          </Toolbar>
        </AppBar>

        <Notification notification={notification} />

        <Routes>
          <Route path="/" element={
            <BlogList
              blogs={blogs}
              user={user}
              updateBlog={updateBlog}
              removeBlog={removeBlog}
            />
          } />
          <Route path="/login" element={
            user ? <Navigate replace to="/" /> : (
              <LoginForm
                username={username}
                password={password}
                handleUsernameChange={({ target }) => setUsername(target.value)}
                handlePasswordChange={({ target }) => setPassword(target.value)}
                handleLogin={handleLogin}
              />
            )
          } />
          <Route path="/create" element={
            user ? <BlogForm createBlog={addBlog} /> : <Navigate replace to="/login" />
          } />
          <Route path="/blogs/:id" element={
            <BlogView
              blog={blog}
              updateBlog={updateBlog}
              removeBlog={removeBlog}
              currentUser={user}
            />
          } />
        </Routes>
      </Container>
    </ThemeProvider>
  )
}

export default App
