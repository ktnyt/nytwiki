import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { withStyles } from 'material-ui/styles'
import Button from 'material-ui/Button'
import Typography from 'material-ui/Typography'

import AppContent from './AppContent'
import img404 from './img/404.jpg'

const styles = theme => ({
  root: {
    flex: '1 0 100%',
  },
  hero: {
    width: '100%',
    background: `url(${img404}) no-repeat center center fixed`,
    backgroundSize: 'cover',
    minHeight: '100vh', // Makes the hero full height until we get some more content.
    //flex: '0 0 auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: theme.palette.getContrastText(theme.palette.primary[500]),
  },
  content: {
    paddingTop: theme.spacing.unit * 8,
    paddingBottom: theme.spacing.unit * 8,
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing.unit * 16,
      paddingBottom: theme.spacing.unit * 16,
    },
    background: 'rgba(0, 0, 0, 0.4)',
  },
  text: {
    paddingLeft: theme.spacing.unit * 4,
    paddingRight: theme.spacing.unit * 4,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headline: {
    maxWidth: 500,
    textAlign: 'center',
  },
  button: {
    marginTop: theme.spacing.unit * 3,
  },
})

class NewPage extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  }

  static contextTypes = {
    wiki: PropTypes.object.isRequired,
    page: PropTypes.object.isRequired,
  }

  render = () => {
    const { classes } = this.props
    const { wiki, page } = this.context

    return (
      <div className={classes.hero}>
        <AppContent>
          <div className={classes.content}>
            <div className={classes.text}>
              <Typography type='display2' component='h1' color='inherit' gutterBottom>
                {'404 Not Found'}
              </Typography>
              <Typography type='headline' component='h2' color='inherit' className={classes.headline}>
                {'このページはまだ存在しません'}
              </Typography>
              <Button
                className={classes.button}
                raised
                onClick={event => wiki.create(page.path, {})}
              >
                {'ページを作る'}
              </Button>
            </div>
          </div>
        </AppContent>
      </div>
    )
  }
}

export default withStyles(styles)(NewPage)
