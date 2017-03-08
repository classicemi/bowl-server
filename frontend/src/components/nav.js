import React, { Component } from 'react'

import DevTools from 'mobx-react-devtools';

class Nav extends Component {
  render() {
    return (
      <div id="main-nav">
        <ul>
          <li><a href="JavaScript:">Domains</a></li>
          <li><a href="JavaScript:">Privilege</a></li>
        </ul>
      </div>
    )
  }
}

export default Nav