import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Default extends Component {
  static propTypes = {
    page: PropTypes.object.isRequired,
  }

  render = () => {
    return (
      <div></div>
    )
  }
}

export default Default
