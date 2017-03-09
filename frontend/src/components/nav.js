import React from 'react'
import {
  NavLink
} from 'react-router-dom'

const Nav = (props) => (
  <div id="main-nav">
    <ul>
      {props.children.map((link, i) => (
        <li key={i}>{link}</li>
      ))}
    </ul>
  </div>
)

export default Nav