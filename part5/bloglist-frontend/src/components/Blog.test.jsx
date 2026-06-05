import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

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

test('renders content', () => {

  const { container } = render(<Blog blog={testBlog} />)

  const div = container.querySelector('.blog-summary')
  expect(div).toHaveTextContent('This is a test')
  expect(div).toHaveTextContent('Test author')

  const url = screen.getByText('test.com')
  expect(url).not.toBeVisible()

  const likes = screen.getByText('likes 5')
  expect(likes).not.toBeVisible()
})

test('clicking view button shows url and likes', async () => {

  render(<Blog blog={testBlog} />)

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  const url = screen.getByText('test.com')
  expect(url).toBeVisible()

  const likes = screen.getByText('likes 5')
  expect(likes).toBeVisible()
})

test('clicking like button twice calls updateBlog twice', async () => {

  const mockHandler = vi.fn()

  render(<Blog blog={testBlog} updateBlog={mockHandler} />)

  const user = userEvent.setup()

  const viewButton = screen.getByText('view')
  await user.click(viewButton)

  const likeButton = screen.getByText('like')
  await user.click(likeButton)
  await user.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)
})
