import React, { Component } from 'react'
import PropTypes from 'prop-types'

class CGSSCard extends Component {
  static propTypes = {
    contents: PropTypes.string.isRequired,
    metadata: PropTypes.object.isRequired,
  }

  render = () => {
    return (
      <div></div>
    )
  }
}

export default CGSSCard