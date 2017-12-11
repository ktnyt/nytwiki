import React, { Component } from 'react'
import PropTypes from 'prop-types'

class BackendProvider extends Component {
  state = { backend: false }

  static propTypes = {
    backend: PropTypes.object.isRequired,
    children: PropTypes.node.isRequired,
  }

  static contextTypes = {
    backend: PropTypes.object,
  }

  static childContextTypes = {
    backend: PropTypes.object.isRequired,
  }

  getChildContext = () => {
    const { backend } = this.props
    return {
      ...this.context,
      backend,
    }
  }

  componentWillMount = () => {
    this.props.backend.ready.then(backend => this.setState({ backend }), console.error)
  }

  render = () => {
    return this.state.backend ? React.Children.only(this.props.children) : null
  }
}

export default BackendProvider