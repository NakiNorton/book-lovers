import React from 'react';
import { screen, render } from '@testing-library/react';
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
})