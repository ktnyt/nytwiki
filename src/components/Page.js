import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Template from '../nytdefault'

class Page extends Component {
  state = { response: false }

  static propTypes = {
    path: PropTypes.string.isRequired,
    edit: PropTypes.bool.isRequired,
  }

  static contextTypes = {
    wiki: PropTypes.object,
    router: PropTypes.object,
  }

  componentWillMount = () => {
    const { path } = this.props
    const { wiki } = this.context

    wiki.read(path).then(response => this.setState({ response }))
  }

  componentWillReceiveProps = (nextProps, nextContext) => {
    const { path } = nextProps
    const { wiki } = nextContext

    wiki.read(path).then(response => this.setState({ response }))
  }

  render = () => {
    const { path, edit } = this.props
    const { wiki, router } = this.context
    const { response } = this.state

    const readPage = () => router.history.push(`/${path}`)

    const makePage = data => wiki.create(path, data).then(response => {
      this.setState({ response })
      router.history.push(`/${path}/edit`)
    })

    const editPage = () => router.history.push(`/${path}/edit`)

    const savePage = data => wiki.update(path, data).then(response => {
      this.setState({ response })
      router.history.push(`/${path}`)
    })

    return !response ? null : (
      <Template
        response={response}
        edit={edit}
        readPage={readPage}
        makePage={makePage}
        editPage={editPage}
        savePage={savePage}
      />
    )
  }
}

export default Page