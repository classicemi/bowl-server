import React from 'react'

import Header from './components/header'
import Sidebar from './components/sidebar'
import Router from './router'

const App = () => (
  <div>
    <Header></Header>
    <Sidebar></Sidebar>
    <Router />
  </div>
)

export default App