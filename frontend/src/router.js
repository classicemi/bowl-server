import React from 'react'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import createBrowserHistory from 'history/createBrowserHistory'

import Header from './components/header'
import Sidebar from './components/sidebar'
import Home from './components/home'
import Domains from './components/domains'
import Privilege from './components/privilege'

const history = createBrowserHistory()

const pages = [{
  path: '/',
  component: Home
}, {
  path: '/domains',
  component: Domains
}, {
  path: '/privilege',
  component: Privilege
}]

const router = function() {
  return (
    <Router history={history}>
      <div className="wrapper">
        <Header></Header>
        <Sidebar></Sidebar>
        <div className="main">
          {pages.map(page => 
            <Route exact path={page.path} component={page.component} />
          )}
        </div>
      </div>
    </Router>
  )
}

export default router