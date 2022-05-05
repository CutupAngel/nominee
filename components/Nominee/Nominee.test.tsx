import { render } from '@testing-library/react'
import { fireEvent } from '@testing-library/dom'
import Nominee from '.'
import { mockData } from '../../mock-data'

describe('Nominee component', () => {
  const nominee = mockData.categories[0].items[0]
  const updateItems = jest.fn()

  test('renders correctly', () => {
    const { container, getByRole, getByText } = render(
      <Nominee
        nominee={nominee}
        selecteItems={updateItems}
        categoryId={mockData.categories[0].id}
      />
    )

    expect(container).toBeInTheDocument()

    expect(getByText(nominee.title)).toBeInTheDocument()

    const nomineeImage = getByRole('img')

    expect(nomineeImage).toBeInTheDocument()
    expect(nomineeImage).toHaveAttribute('alt', nominee.title)
  })

  test('fires callback on button click', () => {
    const { getByRole } = render(
      <Nominee
        nominee={nominee}
        selecteItems={updateItems}
        categoryId={mockData.categories[0].id}
      />
    )

    const button = getByRole('button')

    fireEvent.click(button)

    expect(updateItems).toHaveBeenCalled()
    expect(updateItems).toHaveBeenCalledTimes(1)
    expect(updateItems).toHaveBeenCalledWith('best-picture', {
      title: 'Nomadland',
      photoUrL: 'https://variety.com/wp-content/uploads/2020/12/nomadland_ver2.jpg',
      id: 'nomadland',
    })
  })

  test('changes styles on hover Nominee', () => {
    const { container, getByText } = render(
      <Nominee
        nominee={nominee}
        selecteItems={updateItems}
        categoryId={mockData.categories[0].id}
      />
    )

    fireEvent.mouseOver(container)

    expect(container.firstElementChild).toHaveStyle({
      'background-color': 'rgba(52, 172, 156, var(--tw-bg-opacity))',
    })
    expect(getByText(nominee.title)).toHaveStyle(
      'color: rgba(255, 255, 255, var(--tw-text-opacity))'
    )
  })
})
