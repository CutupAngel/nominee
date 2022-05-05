import { render } from '@testing-library/react'
import { fireEvent } from '@testing-library/dom'
import SubmitModal from './'
import { mockData } from '../../mock-data'
import { SelectedNominee } from '../../pages'

describe('Category component', () => {
  const selectedNominees: SelectedNominee = mockData.selectedNominees
  const handleModalClose = jest.fn()

  test('renders correctly', () => {
    const { container, getByRole, getByText } = render(
      <SubmitModal
        isOpen={true}
        selectedNominees={selectedNominees}
        handleModalClose={handleModalClose}
      />
    )

    expect(container).toBeInTheDocument()
    expect(getByText('Success')).toBeInTheDocument()

    Object.keys(selectedNominees).forEach((categoryId) => {
      const re = new RegExp(categoryId as string, 'i')
      expect(getByText(re)).toBeInTheDocument()

      expect(getByText(selectedNominees[categoryId].title)).toBeInTheDocument()
    })

    const closeButton = getByRole('button')

    expect(closeButton).toBeInTheDocument()

    fireEvent.click(closeButton)

    expect(handleModalClose).toHaveBeenCalled()
    expect(handleModalClose).toHaveBeenCalledTimes(1)
  })
})
