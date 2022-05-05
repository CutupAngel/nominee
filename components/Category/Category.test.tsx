import { render } from '@testing-library/react'
import Category from './'
import { mockData } from '../../mock-data'

describe('Category component', () => {
  const categoryData = mockData.categories[0]
  const updateItems = jest.fn()

  test('renders correctly', () => {
    const { container, getByRole, getByText } = render(
      <Category categoryData={categoryData} selecteItems={updateItems} />
    )

    expect(container).toBeInTheDocument()

    const categoryHeading = getByRole('heading', { level: 2 })
    expect(categoryHeading).toBeInTheDocument()

    expect(categoryHeading.nextSibling).toHaveClass('grid')
    expect(categoryHeading.nextSibling).toHaveClass('sm:grid-cols-2')

    categoryData.items.forEach(({ title }) => {
      const cardHeading = getByText(title)
      expect(cardHeading).toBeInTheDocument()
    })
  })
})
