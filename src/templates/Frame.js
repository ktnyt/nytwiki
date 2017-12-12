import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { withStyles } from 'material-ui/styles'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'

const styles = {
  root: {
    width: '100%',
  },
  flex: {
    flex: 1,
  },
}

class Frame extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  }

  render = () => {
    const { children, classes } = this.props

    return (
      <div className={classes.root}>
        <AppBar position='static'>
          <Toolbar>
            <Typography type='title' color='inherit' className={classes.flex}>
              Mikupedia
            </Typography>
          </Toolbar>
        </AppBar>
        {children}
      </div>
    )
  }
}

export default withStyles(styles)(Frame)
