import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Window extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  }

  static contextTypes = {
    window: PropTypes.object,
  }

  static childContextTypes = {
    window: PropTypes.object.isRequired,
  }

  getChildContext = () => {
    return {
      ...this.context,
      window,
    }
  }

  componentWillMount = () => {
    window.onresize = event => this.forceUpdate()
  }

  render = () => {
    return React.Children.only(this.props.children)
  }
}

export default Window