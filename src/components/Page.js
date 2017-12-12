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
    wiki: PropTypes.object,
  }

  static childContextTypes = {
    wiki: PropTypes.object.isRequired,
  }

  getChildContext = () => {
    return {
      ...this.context,
    }
  }

  componentWillMount = () => {
    this.setup(this.props, this.context)
  }

  componentWillReceiveProps = (nextProps, nextContext) => {
    this.setup(nextProps, nextContext)
  }

  setup = (props, context) => {
    const { path } = props
    const { wiki } = context

    wiki.handlers.read(path).then(([contents, metadata]) => {
      this.setState({ contents, metadata })
    }, error => {
      this.setState({ error })
    })
  }

  update = (contents, metadata) => {
    const { path } = this.props
    const { wiki } = this.context

    return wiki.handlers.update(path, contents, metadata).then(() => {
      return wiki.handlers.read(path).then(([contents, metadata]) => {
        this.setState({ contents, metadata })
      }, error => {
        this.setState({ error })
      })
    }, error => {
      this.setState({ error })
    })
  }

  delete = () => {
    const { path } = this.props
    const { wiki } = this.context

    return wiki.handlers.delete(path)
  }

  render = () => {
    const { contents, metadata, error } = this.state

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
        {
          metadata,
          contents,
          update: this.update,
          delete: this.delete,
        },
        null,
      )
    )
  }
}

export default Page
