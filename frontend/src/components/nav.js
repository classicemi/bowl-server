import React, { Component } from 'react'
import {
  NavLink
} from 'react-router-dom'

const nav = [{
  name: 'Home',
  link: '/'
}, {
  name: 'Domains',
  link: '/domains'
}, {
  name: 'Privilege',
  link: '/privilege'
}]

class Nav extends Component {
  constructor(props) {
    super(props);
    this.nav = nav
  }

  render() {
    return (
      <div id="main-nav">
        <ul>
          {this.nav.map(o =>
            <li><NavLink exact to={o.link} activeClassName="active">{o.name}</NavLink></li>
          )}
        </ul>
      </div>
    )
  }
}

export default Nav