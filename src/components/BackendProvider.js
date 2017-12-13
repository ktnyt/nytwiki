import React, { Component } from 'react'
import PropTypes from 'prop-types'

class BackendProvider extends Component {
  static propTypes = {
    backend: PropTypes.object.isRequired,
    children: PropTypes.node.isRequired,
  }

  static contextTypes = {
    wiki: PropTypes.object,
  }

  static childContextTypes = {
    wiki: PropTypes.object.isRequired,
  }

  getChildContext = () => {
    return {
      ...this.context,
      wiki: this.props.backend,
    }
  }

  render = () => {
    return React.Children.only(this.props.children)
  }
}

export default BackendProvider
