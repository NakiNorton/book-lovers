import React from 'react'
import { NavLink } from 'react-router-dom'
import bookIcon from '../../assets/book.png'
import './Nav.css'  

const Nav = () => {
  return (
    <nav className='Nav'>
      <img className='icon' alt='book icon' src={bookIcon} />
      <label className='app-logo'>Book Lovers</label>
      <ul>
        <li><NavLink to='/' className='nav-link active' aria-label='navigate to home page'>HOME</NavLink></li>
        <li><NavLink to='/favorites' className='nav-link active' aria-label='navigate to reading list'>READING LIST</NavLink></li>
      </ul>
    </nav>
  )
}

export default Nav

