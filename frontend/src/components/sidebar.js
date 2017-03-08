import React, { Component } from 'react'
import { observer } from 'mobx-react'

import Domains from './domain/domains'

@observer
class Sidebar extends Component {
  render() {
    return (
      <aside id="sidebar">
        <div>
          <Domains />
        </div>
      </aside>
    )
  }
}

export default Sidebar