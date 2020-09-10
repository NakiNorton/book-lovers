import React from 'react'
import { NavLink } from 'react-router-dom'
import './Nav.css'


const Nav = () => {
  return (
    <nav className='Nav'>
      <label className='app-logo'>Book Lovers</label>
      <ul>
        <li><NavLink to='/' className='nav-link active' aria-label='navigate to home page'>HOME</NavLink></li>
        <li><NavLink to='/' className='nav-link active' aria-label='navigate to reading list'>READING LIST</NavLink></li>
      </ul>
    </nav>
  )
}

export default Nav

