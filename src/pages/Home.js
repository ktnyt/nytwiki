import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Home extends Component {
  static propTypes = {
    
  }

  static contextTypes = {
    window: PropTypes.object,
    backend: PropTypes.object,
  }

  static childContextTypes = {
    window: PropTypes.object.isRequired,
    backend: PropTypes.object.isRequired,
  }

  getChildContext = () => {
    return {
      ...this.context,
    }
  }

  componentWillMount = () => {
    this.context.backend.get().then(console.log, () => this.context.backend.put('', {}))
  }

  render = () => {
    return (
      <div>
        home
      </div>
    )
  }
}

export default Home