import React, { Component } from 'react'
import PropTypes from 'prop-types'

import AppFrame from './AppFrame'
import NewPage from './NewPage'
import templates from './templates'

class Root extends Component {
  state = { data: false }

  static contextTypes = {
    page: PropTypes.object.isRequired,
  }

  static childContextTypes = {
    page: PropTypes.object.isRequired,
  }

  getChildContext = () => {
    return {
      ...this.context,
    }
  }

  componentWillMount = () => {
    this.context.page.response.json().then(data => this.setState({ data }))
  }

  render = () => {
    const { page } = this.context
    const { data } = this.state

    return (
       <AppFrame>
         {page.response.status === 200 ? (
           data ? (
            (({ template, contents, metadata }) => {
              const Template = templates[template].component
              return <Template
                contents={contents}
                metadata={metadata}
                onSave={data => page.update(data)}
                onCancel={data => page.read()}
              />
             })(data)
           ) : <div></div>
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
