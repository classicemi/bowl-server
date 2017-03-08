import React, { Component } from 'react'
import { domainStore } from '../../stores/domain_store'

import Domain from './domain'

class Domains extends Component {
  componentWillMount() {
    this.domainStore = domainStore
  }

  componentWillUnmount() {
    this.domainStore = null
  }

  render() {
    return (
      <ul>
        { domainStore.getStores().map(domain =>
            <Domain name={domain.name} id={domain.id} />
          )
        }
      </ul>
    )
  }
}

export default Domains