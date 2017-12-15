import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { withStyles } from 'material-ui/styles'
import Button from 'material-ui/Button'
import Grid from 'material-ui/Grid'

import ModeEditIcon from 'material-ui-icons/ModeEdit'

import ReactMarkdown from 'react-markdown'

import AppContent from '../components/AppContent'

const styles = theme => ({
  root: {
    width: '100%',
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
})

class Default extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    contents: PropTypes.string.isRequired,
    metadata: PropTypes.object.isRequired,
    toggleEdit: PropTypes.func.isRequired,
  }

  render = () => {
    const { classes, contents, toggleEdit } = this.props

    return (
      <AppContent>
        <div className={classes.root}>
          <Grid container direction='row' justify='flex-end' alignItems='center'>
            <Grid item>
              <Button color='primary' onClick={toggleEdit}>
                <ModeEditIcon className={classes.leftIcon} />
                ページを編集する
              </Button>
            </Grid>
          </Grid>
          <ReactMarkdown source={contents} />
        </div>
      </AppContent>
    )
  }
}

export default withStyles(styles)(Default)
