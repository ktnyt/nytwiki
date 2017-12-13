import React, { Component } from 'react'
import PropTypes from 'prop-types'

import AppFrame from './AppFrame'
import NewPage from './NewPage'

class Template extends Component {
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

  render = () => {
    const { page } = this.context

    return (
       <AppFrame>
         {page.response.status === 200 ? (
           <div></div>
         ) : page.response.status === 404 ? (
           <NewPage page={page} />
         ) : (
           <div>Unknown Error</div>
         )}
       </AppFrame>
    )
  }
}

export default Template
