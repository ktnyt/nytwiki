import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Encoding from 'encoding-japanese'

import AppFrame from './components/AppFrame'
import Editor from './pages/Editor'
import NewPage from './pages/NewPage'
import templates from './templates'

const empty = {
  template: 'default',
  contents: '',
  metadata: {},
}

class Root extends Component {
  state = { data: empty }

  static propTypes = {
    response: PropTypes.object.isRequired,
    edit: PropTypes.bool.isRequired,
    readPage: PropTypes.func.isRequired,
    makePage: PropTypes.func.isRequired,
    editPage: PropTypes.func.isRequired,
    savePage: PropTypes.func.isRequired,
  }

  componentWillMount = () => {
    this.handleResponse(this.props.response)
  }

  componentWillReceiveProps = nextProps => {
    this.handleResponse(nextProps.response)
  }

  handleResponse = response => {
    if(response.status === 200 && !response.bodyUsed) {
      response.text().then(text => {
        const encoding = Encoding.detect(text)
        if(encoding !== 'UNICODE') {
          return Encoding.convert(text, {
            from: encoding,
            to: 'UNICODE',
            type: 'string',
          })
        }
        return text
      }).then(text => JSON.parse(text)).then(data => this.setState({ data }))
    }
  }

  render = () => {
    const {
      response,
      edit,
      readPage,
      makePage,
      editPage,
      savePage,
    } = this.props

    const { template, contents, metadata } = this.state.data

    return (
      <AppFrame>
        {edit ? (
          <Editor
            template={template}
            contents={contents}
            metadata={metadata}
            onSave={savePage}
            onCancel={readPage}
          />
        ) : (
          response.status === 200 ? (
            React.createElement(templates[template].component, {
              contents,
              metadata,
              handleEdit: event => editPage(),
            }, null)
          ) : response.status === 404 ? (
            <NewPage handleCreate={event => makePage(empty)} />
          ) : (
            <div>Unknown Error</div>
          )
        )}
      </AppFrame>
    )
  }
}

export default Root
