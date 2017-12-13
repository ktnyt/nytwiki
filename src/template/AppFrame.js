import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { withStyles } from 'material-ui/styles'

import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import Toolbar from 'material-ui/Toolbar'

import MenuIcon from 'material-ui-icons/Menu'

import AppDrawer from './AppDrawer'

const styles = theme => ({
  '@global': {
    html: {
      background: theme.palette.background.default,
      WebkitFontSmoothing: 'antialiased', // Antialiasing.
      MozOsxFontSmoothing: 'grayscale', // Antialiasing.
      boxSizing: 'border-box',
      '@media print': {
        background: theme.palette.common.white,
      },
    },
    '*, *:before, *:after': {
      boxSizing: 'inherit',
    },
    body: {
      margin: 0,
    },
    '#nprogress': {
      pointerEvents: 'none',
      '& .bar': {
        position: 'fixed',
        background:
          theme.palette.type === 'light' ? theme.palette.common.black : theme.palette.common.white,
        borderRadius: 1,
        zIndex: theme.zIndex.tooltip,
        top: 0,
        left: 0,
        width: '100%',
        height: 2,
      },
      '& dd, & dt': {
        position: 'absolute',
        top: 0,
        height: 2,
        boxShadow: `${
          theme.palette.type === 'light' ? theme.palette.common.black : theme.palette.common.white
        } 1px 0 6px 1px`,
        borderRadius: '100%',
        animation: 'nprogress-pulse 2s ease-out 0s infinite',
      },
      '& dd': {
        opacity: 0.6,
        width: 20,
        right: 0,
        clip: 'rect(-6px,22px,14px,10px)',
      },
      '& dt': {
        opacity: 0.6,
        width: 180,
        right: -80,
        clip: 'rect(-6px,90px,14px,-6px)',
      },
    },
    '@keyframes nprogress-pulse': {
      '30%': {
        opacity: 0.6,
      },
      '60%': {
        opacity: 0,
      },
      to: {
        opacity: 0.6,
      },
    },
  },
  root: {
    display: 'flex',
    alignItems: 'stretch',
    minHeight: '100vh',
    width: '100%',
  },
  grow: {
    flex: '1 1 auto',
  },
  title: {
    marginLeft: 24,
    flex: '0 1 auto',
  },
  appBar: {
    transition: theme.transitions.create('width'),
    '@media print': {
      position: 'absolute',
    },
  },
  appBarHome: {
    boxShadow: 'none',
  },
  appBarShift: {
    [theme.breakpoints.up('lg')]: {
      width: 'calc(100% - 250px)',
    },
  },
  drawer: {
    [theme.breakpoints.up('lg')]: {
      width: 250,
    },
  },
  navIconHide: {
    [theme.breakpoints.up('lg')]: {
      display: 'none',
    },
  },
})

class AppFrame extends Component {
  state = { mobileOpen: false }

  static propTypes = {
    children: PropTypes.node.isRequired,
  }

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen })
  }

  render = () => {
    const { children, classes } = this.props

    return (
      <div className={classes.root}>
        <AppBar className={classNames(classes.appBar, classes.appBarShift)}>
          <Toolbar>
            <IconButton
              color='contrast'
              onClick={this.handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <AppDrawer
          className={classes.drawer}
          onRequestClose={this.handleDrawerToggle}
          mobileOpen={this.state.mobileOpen}
        />
        {children}
      </div>
    )
  }
}

export default withStyles(styles)(AppFrame)
