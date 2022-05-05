import React from 'react'
import { act, render, RenderResult } from '@testing-library/react'
import axios from 'axios'

import Home from './'
import { mockData } from '../mock-data'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>
const res = {
  items: mockData.categories,
}

describe('Page component', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('renders correctly', async () => {
    mockedAxios.get.mockImplementationOnce(() => Promise.resolve({ data: res }))

    let renderedComponent: RenderResult

    await act(async () => {
      renderedComponent = render(<Home />)
    })

    expect(renderedComponent!.container).toBeInTheDocument()
    expect(renderedComponent!.container).toMatchSnapshot()
    const heading = renderedComponent!.getByText('Awards 2021')
    expect(heading).toBeInTheDocument()

    res.items.map((category) => {
      const re = new RegExp(category.id, 'i')
      const categoryHeading = renderedComponent!.getByText(re)
      expect(categoryHeading).toBeInTheDocument()
      expect(categoryHeading).toHaveClass('capitalize')
      expect(categoryHeading).toHaveClass('text-2xl')
      expect(categoryHeading).toHaveClass('mmd:text-3xl')
    })
  })
})
