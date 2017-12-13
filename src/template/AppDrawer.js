import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { withStyles } from 'material-ui/styles'
import Drawer from 'material-ui/Drawer'
import Hidden from 'material-ui/Hidden'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'

const styles = theme => ({
  paper: {
    width: 250,
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    color: theme.palette.text.secondary,
    '&:hover': {
      color: theme.palette.primary[500],
    },
  },
  // https://github.com/philipwalton/flexbugs#3-min-height-on-a-flex-container-wont-apply-to-its-flex-items
  toolbarIe11: {
    display: 'flex',
  },
  toolbar: {
    flexGrow: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  anchor: {
    color: theme.palette.text.secondary,
  },
})

class AppDrawer extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    className: PropTypes.string,
    mobileOpen: PropTypes.bool.isRequired,
    onRequestClose: PropTypes.func.isRequired,
  }

  static contextTypes = {
    wiki: PropTypes.object.isRequired,
  }

  static childContextTypes = {
    wiki: PropTypes.object.isRequired,
  }

  getChildContext = () => {
    return {
      ...this.context,
    }
  }

  render = () => {
    const { classes, className, mobileOpen, onRequestClose } = this.props

    return (
      <div className={className}>
        <Hidden lgUp>
          <Drawer
            classes={{
              paper: classNames(classes.paper, 'algolia-drawer'),
            }}
            type='temporary'
            open={mobileOpen}
            onRequestClose={onRequestClose}
            ModalProps={{
              keepMounted: true,
            }}
          >
            {null}
          </Drawer>
        </Hidden>
        <Hidden lgDown implementation='css'>
          <Drawer
            classes={{
              paper: classes.paper,
            }}
            type='permanent'
            open
          >
            <div className={classes.nav}>
              <div className={classes.toolbarIe11}>
                <Toolbar className={classes.toolbar}>
                  <Typography type='title' gutterBottom className={classes.title}>
                    Mikupedia
                  </Typography>
                </Toolbar>
              </div>
            </div>
          </Drawer>
        </Hidden>
      </div>
    )
  }
}

export default withStyles(styles)(AppDrawer)
