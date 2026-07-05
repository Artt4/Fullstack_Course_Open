import { TextField, Button } from '@mui/material'

const LoginForm = ({
  handleLogin,
  username,
  password,
  handleUsernameChange,
  handlePasswordChange

}) => {
  return (
    <div>
      <h2 style={{ marginTop: 30 }}>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          <TextField
            label="username"
            variant="standard"
            margin="normal"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          <TextField
            label="password"
            type="password"
            variant="standard"
            margin="normal"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <Button type="submit" variant="contained" sx={{ mt: 1 }}>
          LOGIN
        </Button>
      </form>
    </div>

  )
}

export default LoginForm
