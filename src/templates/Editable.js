import React, { Component } from 'react'

const Editable = (Wrapped) => {
  class Wrapper extends Component {
    state = { editing: false }

    toggleEdit = () => {
      const editing = !this.state.editing
      this.setState({ editing })
    }

    render = () => {
      const props = {
        ...this.props,
        editing: this.state.editing,
        toggleEdit: this.toggleEdit,
      }
      
      return (
        <Wrapped {...props} />
      )
    }
  }

  return Wrapper
}

export default Editable
