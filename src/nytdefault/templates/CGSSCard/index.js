import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { withStyles } from 'material-ui/styles'
import Button from 'material-ui/Button'
import Card from 'material-ui/Card'
import Grid from 'material-ui/Grid'
import Tabs, { Tab } from 'material-ui/Tabs'

import ModeEditIcon from 'material-ui-icons/ModeEdit'

import ReactMarkdown from 'react-markdown'

import CGSSCardContent from './CGSSCardContent'
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

class CGSSCard extends Component {
  state = { tab: 0 }

  static propTypes = {
    classes: PropTypes.object.isRequired,
    contents: PropTypes.string.isRequired,
    metadata: PropTypes.object.isRequired,
    handleEdit: PropTypes.func.isRequired,
  }

  render = () => {
    const {
      classes,
      contents,
      metadata,
      handleEdit,
    } = this.props

    const {
      cardname,
      idolname,
      skill,
      before,
      after,
    } = metadata

    const { tab } = this.state

    const handleTab = (event, value) => this.setState({ tab: value })

    return (
      <AppContent>
        <div className={classes.root}>
          <Card>
            <Tabs value={tab} onChange={handleTab} fullWidth centered>
              <Tab label='特訓前' />
              <Tab label='特訓後' />
            </Tabs>
            {tab === 0 && <CGSSCardContent cardname={cardname} idolname={idolname} skill={skill} data={before} />}
            {tab === 1 && <CGSSCardContent cardname={cardname} idolname={idolname} skill={skill} data={after} />}
          </Card>
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
  name: 'スターライトステージ：カード',
  component: withStyles(styles)(CGSSCard),
  schema,
}

