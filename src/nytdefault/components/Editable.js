import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Editor from './Editor'

const Editable = Wrapped => {
  class Wrapper extends Component {
    state = { editing: false }

    static propTypes = {
      contents: PropTypes.string,
      onSave: PropTypes.func.isRequired,
      onCancel: PropTypes.func.isRequired,
    }

    static defaultProps = {
      contents: '',
    }

    toggleEdit = () => {
      const editing = !this.state.editing
      this.setState({ editing })
    }

    render = () => {
      const props = {
        ...this.props,
        toggleEdit: this.toggleEdit,
      }
      
      return this.state.editing ? <Editor {...props} /> : <Wrapped {...props} />
    }
  }

  return Wrapper
}

export default Editable
