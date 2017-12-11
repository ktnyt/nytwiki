import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import { withStyles } from 'material-ui/styles'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'

import Window from './components/Window'
import BackendProvider from './components/BackendProvider'
import Home from './pages/Home'

import Backend from './backends/S3Backend'

const region = 'ap-northeast-1'
const bucket = 'mikupedia.org'
const id = 'ap-northeast-1:ed152117-c16c-4972-a445-28d59729438f'

const backend = new Backend(region, bucket, id)

const styles = {
  root: {
    width: '100%',
  },
  flex: {
    flex: 1,
  },
}

class App extends Component {
  render = () => {
    const { classes } = this.props

    return (
      <BackendProvider backend={backend}>
        <Window>
          <Router>
            <div className={classes.root}>
              <AppBar position='static'>
                <Toolbar>
                  <Typography type='title' color='inherit' className={classes.flex}>
                    Mikupedia
                  </Typography>
                </Toolbar>
              </AppBar>
              <Route exact path='/' component={Home} />
            </div>
          </Router>
        </Window>
      </BackendProvider>
    )
  }
}

export default withStyles(styles)(App)
