import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import _ from 'lodash'

import BackendProvider from './components/BackendProvider'
import Page from './components/Page'

import Backend from './backends/S3Backend'

const region = 'ap-northeast-1'
const bucket = 'mikupedia.org'
const id = 'ap-northeast-1:ed152117-c16c-4972-a445-28d59729438f'

const backend = new Backend(region, bucket, id)

class App extends Component {
  render = () => {
    return (
      <BackendProvider backend={backend}>
        <Router>
          <Route path='*' render={({ match }) => {
            const paths = match.url.slice(1).split('/')
            const edit = _.last(paths) === 'edit'
            const path = (edit ? _.dropRight(paths) : paths).join('/')
            return <Page path={path} edit={edit} />
          }} />
        </Router>
      </BackendProvider>
    )
  }
}

export default App
