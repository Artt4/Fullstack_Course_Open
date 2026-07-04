const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        username: 'Artt',
        name: 'Artturi Siven',
        password: '1234'
      }
    })

    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    await page.goto('http://localhost:5173/login')
    await expect(page.getByRole('heading', { name: 'Log in to application' })).toBeVisible()
    await expect(page.getByLabel('username')).toBeVisible()
    await expect(page.getByLabel('password')).toBeVisible()
    await expect(page.getByRole('button', { name: 'login' })).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await page.goto('http://localhost:5173/login')
      await page.getByLabel('username').fill('Artt')
      await page.getByLabel('password').fill('1234')
      await page.getByRole('button', { name: 'login' }).click()

      await expect(page.getByRole('button', { name: 'logout' })).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await page.goto('http://localhost:5173/login')
      await page.getByLabel('username').fill('Artt')
      await page.getByLabel('password').fill('wrong')
      await page.getByRole('button', { name: 'login' }).click()

      await expect(page.getByText('wrong username or password')).toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'Artt', '1234')
    })

    test('a new blog can be created', async ({ page }) => {
      await page.getByRole('link', { name: 'create new' }).click()

      await page.getByPlaceholder('enter blog title').fill('E2E test blog')
      await page.getByPlaceholder('enter blog author').fill('Test Author')
      await page.getByPlaceholder('enter blog url').fill('http://test.com')

      await page.getByRole('button', { name: 'create' }).click()

      await expect(page.getByRole('link', { name: 'E2E test blog' })).toBeVisible()
    })

    describe('and a blog exists', () => {
      beforeEach(async ({ page, request }) => {
        const response = await request.post('http://localhost:3003/api/login', {
          data: { username: 'Artt', password: '1234' }
        })
        const { token } = await response.json()

        await request.post('http://localhost:3003/api/blogs', {
          data: {
            title: 'Test blog for like',
            author: 'Test Author',
            url: 'http://test.com',
            likes: 0
          },
          headers: { Authorization: `Bearer ${token}` }
        })

        await page.goto('http://localhost:5173')
      })

      test('it can be liked', async ({ page }) => {
        await page.getByRole('link', { name: 'Test blog for like' }).click()
        await expect(page.getByText('0 likes')).toBeVisible()
        await page.getByRole('button', { name: 'like' }).click()
        await expect(page.getByText('1 likes')).toBeVisible()
      })

      test('a blog can be deleted by its creator', async ({ page }) => {
        page.on('dialog', dialog => dialog.accept())

        await page.getByRole('link', { name: 'Test blog for like' }).click()
        await page.getByRole('button', { name: 'remove' }).click()

        await expect(page.getByRole('link', { name: 'Test blog for like' })).toHaveCount(0)
      })
    })

    /*
    describe('and several blogs exist', () => {
      beforeEach(async ({ page, request }) => {
        const response = await request.post('http://localhost:3003/api/login', {
          data: { username: 'Artt', password: '1234' }
        })
        const { token } = await response.json()

        const blogs = [
          { title: 'Least liked blog', author: 'Author A', url: 'http://a.com', likes: 1 },
          { title: 'Most liked blog', author: 'Author B', url: 'http://b.com', likes: 10 },
          { title: 'Medium liked blog', author: 'Author C', url: 'http://c.com', likes: 5 }
        ]

        for (const blog of blogs) {
          await request.post('http://localhost:3003/api/blogs', {
            data: blog,
            headers: { Authorization: `Bearer ${token}` }
          })
        }

        await page.goto('http://localhost:5173')
      })

      test('blogs are sorted by likes, most liked first', async ({ page }) => {
        const blogElements = page.locator('.blog-summary')

        await expect(blogElements.nth(0)).toContainText('Most liked blog')
        await expect(blogElements.nth(1)).toContainText('Medium liked blog')
        await expect(blogElements.nth(2)).toContainText('Least liked blog')
      })
    })
    */
  })

  describe('When logged in as a different user', () => {
    beforeEach(async ({ page, request }) => {
      await request.post('http://localhost:3003/api/users', {
        data: {
          username: 'OtherUser',
          name: 'Other User',
          password: '5678'
        }
      })

      const response = await request.post('http://localhost:3003/api/login', {
        data: { username: 'Artt', password: '1234' }
      })
      const { token } = await response.json()

      await request.post('http://localhost:3003/api/blogs', {
        data: {
          title: 'Test blog for ownership',
          author: 'Test Author',
          url: 'http://test.com',
          likes: 0
        },
        headers: { Authorization: `Bearer ${token}` }
      })

      await page.goto('http://localhost:5173')
      await loginWith(page, 'OtherUser', '5678')
    })

    test('only the creator sees the remove button', async ({ page }) => {
      await page.getByRole('link', { name: 'Test blog for ownership' }).click()

      await expect(page.getByRole('button', { name: 'remove' })).toHaveCount(0)
    })
  })
})
