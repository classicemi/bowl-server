import React from 'react'
import {
  MemoryRouter as Router,
  Route
} from 'react-router'
import Home from './components/home'

const router = function() {
  return (
    <Router>
      <div>
        <Route path="/" component={ Home } />
      </div>
    </Router>
  )
}

export default router