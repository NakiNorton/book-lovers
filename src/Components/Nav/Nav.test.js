import React from 'react';
import { screen, render, fireEvent } from '@testing-library/react';
import Nav from './Nav'
import { MemoryRouter } from 'react-router-dom';

describe('Nav component', () => {
  it('should have the correct content when rendered', () => {

    render(
      <MemoryRouter>
        <Nav />
      </MemoryRouter>
    )

    const homeLink = screen.getByText('HOME')
    const readingListLink = screen.getByText('READING LIST')

    expect(homeLink).toBeInTheDocument();
    expect(readingListLink).toBeInTheDocument();
  })


  // TESTS TO BE FINISHED ONCE COMPONENTS ARE CONNECTED AND RENDERING ----
  it('should take the user to the homepage when the home button is clicked', () => {

    render(
      <MemoryRouter>
        <Nav />
      </MemoryRouter>
    )

    // const homeLink = screen.getByText('HOME')
    // fireEvent.click(homeLink)

    // const homeHeading = screen.getByText('Hiyas')
    //  expect(homeHeading).toBeInTheDocument()

  })

  it('should take the user to the reading list page when the reading list button is clicked', () => {

    render(
      <MemoryRouter>
        <Nav />
      </MemoryRouter>
    )

    // const readingListLink = screen.getByText('READING LIST')

    // const readingListHeading = screen.getByText('')
    // expect(readingListHeading).toBeInTheDocument()
  })
})