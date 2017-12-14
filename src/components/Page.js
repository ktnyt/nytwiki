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

  static childContextTypes = {
    wiki: PropTypes.object.isRequired,
    page: PropTypes.object.isRequired,
  }

  getChildContext = () => {
    const { path } = this.props
    const { wiki } = this.context
    const { response } = this.state

    return {
      ...this.context,
      page: {
        path,
        response,
        create: data => wiki.create(path, data).then(this.update),
        read: data => wiki.read(path).then(this.update),
        update: data => wiki.update(path, data).then(this.update),
        delete: data => wiki.delete(path, data).then(this.update),
      },
    }
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
    return !this.state.response ? null : <Template />
  }
}

export default Page
