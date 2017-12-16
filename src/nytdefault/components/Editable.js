import React, { Component } from 'react'
import PropTypes from 'prop-types'

import PageEditor from './PageEditor'

const Editable = Wrapped => {
  class Wrapper extends Component {
    state = { editing: false }

    static propTypes = {
      template: PropTypes.string,
      contents: PropTypes.string,
      metadata: PropTypes.object,
      onSave: PropTypes.func.isRequired,
      onCancel: PropTypes.func.isRequired,
    }

    static defaultProps = {
      template: 'default',
      contents: '',
      metadata: {},
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

      return this.state.editing ? <PageEditor {...props} /> : <Wrapped {...props} />
    }
  }

  return Wrapper
}

export default Editable
