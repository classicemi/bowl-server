import React from 'react'
import Nav from './nav'

const Header = (props) => (
  <header>
    <a className="brand" href="JavaScript:">Bowl</a>
    <Nav {...props} />
  </header>
)

export default Header