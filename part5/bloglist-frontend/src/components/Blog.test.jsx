import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
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

  const { container } = render(<Blog blog={blog} />)

  const div = container.querySelector('.blog-summary')
  expect(div).toHaveTextContent('This is a test')
  expect(div).toHaveTextContent('Test author')

  const url = screen.getByText('test.com')
  expect(url).not.toBeVisible()

  const likes = screen.getByText('likes 5')
  expect(likes).not.toBeVisible()
})
