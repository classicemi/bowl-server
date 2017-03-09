import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  NavLink
} from 'react-router-dom'
import routeMap from './routeMap'

import Header from './components/header'
import Sidebar from './components/sidebar'

const router = (props) => (
  <Router>
    <div className="wrapper">
      <Header>
        {routeMap.map((page, i) =>
          <NavLink exact key={i} to={page.link} activeClassName="active">{page.name}</NavLink>
        )}
      </Header>
      <Sidebar />
      <div className="main">
        {routeMap.map((page, i) => 
          <Route exact key={i} path={page.link} component={page.component} />
        )}
      </div>
    </div>
  </Router>
)

export default router