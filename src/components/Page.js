import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Template from '../nytdefault'

class Page extends Component {
  state = {
    response: undefined,
    error: undefined,
  }

  static propTypes = {
    path: PropTypes.string,
  }

  static contextTypes = {
    wiki: PropTypes.object,
  }

  componentWillMount = () => {
    const { path } = this.props
    const { wiki } = this.context

    wiki.read(path).then(response => this.setState({ response }))
  }

  componentWillReceiveProps = (nextProps, nextContext) => {
    if(this.props.path === nextProps.path) return

    const { path } = nextProps
    const { wiki } = nextContext

    wiki.read(path).then(response => this.setState({ response }))
  }

  update = response => this.setState({ response })

  render = () => {
    const { path } = this.props
    const { wiki } = this.context
    const { response } = this.state

    return !this.state.response ? null : <Template page={{
      path,
      response,
      create: data => wiki.create(path, data).then(this.update),
      read:   ()   => wiki.read(path).then(this.update),
      update: data => wiki.update(path, data).then(this.update),
      delete: ()   => wiki.delete(path).then(this.update),
    }} />
  }
}

export default Page
