import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { withStyles } from 'material-ui/styles'
import Button from 'material-ui/Button'
//import Card, { CardContent } from 'material-ui/Card'
import Grid from 'material-ui/Grid'
//import Tabs, { Tab } from 'material-ui/Tabs'
import Typography from 'material-ui/Typography'

import ModeEditIcon from 'material-ui-icons/ModeEdit'

import ReactMarkdown from 'react-markdown'

import AppContent from '../../components/AppContent'

import schema from './schema'

const styles = theme => ({
  root: {
    width: '100%',
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
})

class Home extends Component {
  state = { pages: [] }

  static propTypes = {
    classes: PropTypes.object.isRequired,
    contents: PropTypes.string.isRequired,
    metadata: PropTypes.object.isRequired,
    handleEdit: PropTypes.func.isRequired,
  }

  static contextTypes = {
    wiki: PropTypes.object,
  }

  componentWillMount = () => {
    this.context.wiki.list().then(r => r.json()).then(pages => this.setState({ pages }))
  }

  render = () => {
    const { classes, contents, metadata, handleEdit } = this.props
    const { pages } = this.state

    const sorted = pages.sort((a, b) => new Date(b.LastModified) - new Date(a.LastModified))

    console.log(metadata)

    return (
      <AppContent>
        <div className={classes.root}>
          <Grid container direction='row' justify='flex-end' alignItems='center'>
            <Grid item>
              <Button color='primary' onClick={handleEdit}>
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

export default {
  name: 'ホーム画面',
  component: withStyles(styles)(Home),
  schema,
}
