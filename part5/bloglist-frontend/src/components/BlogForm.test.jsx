import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('<BlogForm /> updates parent state and calls createBlog with right details', async () => {
  const createBlog = vi.fn()
  const user = userEvent.setup()

  render(<BlogForm createBlog={createBlog} />)

  const titleInput = screen.getByPlaceholderText('enter blog title')
  const authorInput = screen.getByPlaceholderText('enter blog author')
  const urlInput = screen.getByPlaceholderText('enter blog url')

  await user.type(titleInput, 'Testing blog title')
  await user.type(authorInput, 'Test Author')
  await user.type(urlInput, 'test.com')

  const button = screen.getByText('create')
  await user.click(button)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0]).toEqual({
    title: 'Testing blog title',
    author: 'Test Author',
    url: 'test.com'
  })
})
