import React, { Component } from 'react'
import PropTypes from 'prop-types'

class BackendProvider extends Component {
  state = { ready: false, index: false }

  handlers = {
    create: (path, contents, metadata) => {
      const { backend } = this.props

      return backend.create(path, contents, metadata)
      .then(() => backend.list().then(index => this.setState({ index })))
    },

    read: path => {
      const { backend } = this.props

      return backend.read(path)
    },

    update: (path, contents, metadata) => {
      const { backend } = this.props
      
      return backend.update(path, contents, metadata)
      .then(() => backend.list().then(index => this.setState({ index })))
    },

    delete: path => {
      const { backend } = this.props

      return backend.delete(path)
      .then(() => backend.list().then(index => this.setState({ index })))
    }
  }

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
    const handlers = this.handlers
    const { ready, index } = this.state

    return {
      ...this.context,
      wiki: {
        ready,
        index,
        handlers,
      },
    }
  }

  componentWillMount = () => {
    this.props.backend.onReady(backend => {
      backend.list().then(index => this.setState({ index }))
      this.setState({ ready: true })
    })
  }

  render = () => {
    return this.state.ready ? React.Children.only(this.props.children) : null
  }
}

export default BackendProvider