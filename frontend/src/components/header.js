import React from 'react'

import Nav from './nav'

class Header extends React.Component {
  render() {
    return (
      <header>
        <a className="brand" href="JavaScript:">Bowl</a>
        <Nav />
      </header>
    )
  }
}

export default Header