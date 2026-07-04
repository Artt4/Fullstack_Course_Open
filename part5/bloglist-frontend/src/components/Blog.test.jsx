import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import BlogView from './BlogView'

const testBlog = {
  title: 'This is a test',
  author: 'Test author',
  url: 'test.com',
  likes: 5,
  user: {
    name: 'tester',
    username: 'tester',
    id: '1234'
  }
}

test('blog information and the number of likes are displayed to unauthenticated users, buttons are not displayed', () => {
  render(
    <MemoryRouter>
      <BlogView blog={testBlog} />
    </MemoryRouter>
  )

  expect(screen.getByText(testBlog.title)).toBeDefined()
  expect(screen.getByText(testBlog.url)).toBeDefined()
  expect(screen.getByText(`${testBlog.likes} likes`)).toBeDefined()
  expect(screen.getByText(`added by ${testBlog.user.name}`)).toBeDefined()

  expect(screen.queryByText('like')).toBeNull()
  expect(screen.queryByText('remove')).toBeNull()
})

test('authenticated users who are not the blog creator are shown only the like button', () => {
  const otherUser = {
    name: 'other',
    username: 'other',
    id: '5678'
  }

  render(
    <MemoryRouter>
      <BlogView blog={testBlog} currentUser={otherUser} />
    </MemoryRouter>
  )

  expect(screen.getByText('like')).toBeDefined()
  expect(screen.queryByText('remove')).toBeNull()
})

test('the blog creator is also shown the delete button', () => {
  const creator = {
    name: 'tester',
    username: 'tester',
    id: '1234'
  }

  render(
    <MemoryRouter>
      <BlogView blog={testBlog} currentUser={creator} />
    </MemoryRouter>
  )

  expect(screen.getByText('like')).toBeDefined()
  expect(screen.getByText('remove')).toBeDefined()
})
