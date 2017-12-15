import React, { Component } from 'react'
import PropTypes from 'prop-types'

import AppFrame from './components/AppFrame'
import Editable from './components/Editable'
import Editor from './components/Editor'
import NewPage from './pages/NewPage'
import templates from './templates'

class Root extends Component {
  state = { data: false }

  static propTypes = {
    page: PropTypes.object.isRequired,
  }

  componentWillMount = () => {
    const { page } = this.props
    if(page.response.status === 200) {
      page.response.json().then(data => this.setState({ data }))
    }
  }

  componentWillReceiveProps = (nextProps) => {
    const { page } = nextProps
    if(page.response.status === 200) {
      page.response.json().then(data => this.setState({ data }))
    }
  }

  render = () => {
    const { page } = this.props
    const { data } = this.state

    const renderTemplate = ({ template, contents, metadata }) => {
      const { component } = templates[template]
      const Wrapped = Editable(component, Editor)
      return <Wrapped
        contents={contents}
        metadata={metadata}
        onSave={data => page.update(data)}
        onCancel={datat => page.read()}
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
