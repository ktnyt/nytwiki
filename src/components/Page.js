import React, { Component } from 'react'
import PropTypes from 'prop-types'
import is from 'is_js'

import templates from '../templates'

class Page extends Component {
  state = {
    contents: undefined,
    metadata: undefined,
    error: undefined,
  }

  static propTypes = {
    path: PropTypes.string,
  }

  static contextTypes = {
    backend: PropTypes.object,
  }

  static childContextTypes = {
    backend: PropTypes.object.isRequired,
  }

  getChildContext = () => {
    return {
      ...this.context,
    }
  }

  componentWillMount = () => {
    this.context.backend.pages()
    this.setup(this.props, this.context)
  }

  componentWillReceiveProps = (nextProps, nextContext) => {
    this.setup(nextProps, nextContext)
  }

  setup = (props, context) => {
    const { path } = props
    const { backend } = context

    backend.get(path).then(([contents, metadata]) => {
      this.setState({ contents, metadata })
    }, error => {
      this.setState({ error })
    })
  }

  update = (contents, metadata) => {
    const { path } = this.props
    const { backend } = this.context

    backend.put(path, contents, metadata).then(() => {
      backend.get(path).then(([contents, metadata]) => {
        this.setState({ contents, metadata })
      }, error => {
        this.setState({ error })
      })
    }, error => {
      this.setState({ error })
    })
  }

  render = () => {
    const { contents, metadata, error } = this.state
    const { update } = this

    // TODO: Add comprehensive error handling
    return is.not.undefined(error) ? (
      error.message === 'The specified key does not exist.' ? (
        '404 Not Found'
      ) : (
        error.message
      )

    // TODO: Add loading feature (spinner?)
    ) : is.any.undefined(contents, metadata) ? (
      null

    // TODO: Add missing template handling
    ) : !templates.hasOwnProperty(metadata.template) ? (
      null
    ) : (
      React.createElement(
        templates[metadata.template],
        { metadata, contents, update },
        null,
      )
    )
  }
}

export default Page
