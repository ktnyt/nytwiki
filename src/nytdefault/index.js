import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Encoding from 'encoding-japanese'

import AppFrame from './components/AppFrame'
import Editable from './components/Editable'
import NewPage from './pages/NewPage'
import templates from './templates'

class Root extends Component {
  state = { data: false }

  static propTypes = {
    page: PropTypes.object.isRequired,
  }

  componentWillMount = () => {
    this.handleResponse(this.props.page.response)
  }

  componentWillReceiveProps = nextProps => {
    this.handleResponse(nextProps.page.response)
  }

  handleResponse = response => {
    if(response.status === 200 && !response.bodyUsed) {
      response.text().then(text => {
        const encoding = Encoding.detect(encoding)
        if(encoding !== 'UNICODE') {
          return Encoding.convert(text, { from: encoding, to: 'UNICODE', type: 'string' })
        }
        return text
      }).then(text => JSON.parse(text)).then(data => this.setState({ data }))
    }
  }

  render = () => {
    const { page } = this.props
    const { data } = this.state

    const renderTemplate = ({ template, contents, metadata }) => {
      const { component } = templates[template]
      const Wrapped = Editable(component)
      return <Wrapped
        template={template}
        contents={contents}
        metadata={metadata}
        onSave={data => page.update(data)}
        onCancel={data => page.read()}
      />
    }

    return (
       <AppFrame>
         {page.response.status === 200 ? (
           data ? renderTemplate(data) : <div></div>
         ) : page.response.status === 404 ? (
          <NewPage
            onSave={data => page.create(data)}
            onCancel={data => page.read()}
          />
         ) : (
           <div>Unknown Error</div>
         )}
       </AppFrame>
    )
  }
}

export default Root
