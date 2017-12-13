import React, { Component } from 'react'
import PropTypes from 'prop-types'

import AppFrame from './AppFrame'
import NewPage from './NewPage'

class Template extends Component {
  static contextTypes = {
    wiki: PropTypes.object.isRequired,
    page: PropTypes.object.isRequired,
  }

  static childContextTypes = {
    wiki: PropTypes.object.isRequired,
    page: PropTypes.object.isRequired,
  }

  getChildContext = () => {
    return {
      ...this.context,
    }
  }

  render = () => {
    const { response } = this.context.page

    return (
       <AppFrame>
         {response.status === 200 ? <div></div> : (
           <NewPage />
         )}
       </AppFrame>
    )
  }
}

export default Template
