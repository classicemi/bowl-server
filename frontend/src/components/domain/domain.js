import React, { Component } from 'react'

class Domain extends Component {
  render() {
    const props = this.props
    return (
      <li>{ props.name }</li>
    )
  }
}

export default Domain