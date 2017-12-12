import React, { Component } from 'react'
import PropTypes from 'prop-types'

import SimpleMDE from 'react-simplemde-editor'

class Editor extends Component {
  state = {
    contents: undefined,
    metadata: undefined,
    error: undefined,
  }

  static propTypes = {
    path: PropTypes.string,
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
      <div>
        <SimpleMDE
        autosave={true}
        value={contents}
        />
      </div>
    )
  }
}

export default Editor