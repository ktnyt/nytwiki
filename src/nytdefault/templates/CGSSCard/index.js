import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { withStyles } from 'material-ui/styles'
import Button from 'material-ui/Button'
import Card, { CardContent, CardMedia } from 'material-ui/Card'
import Typography from 'material-ui/Typography'
import Grid from 'material-ui/Grid'

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
  media: {
    width: '100%',
    height: 300,
  },
})

class CGSSCard extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    contents: PropTypes.string.isRequired,
    metadata: PropTypes.object.isRequired,
    toggleEdit: PropTypes.func.isRequired,
  }

  render = () => {
    const {
      classes,
      contents,
      metadata,
      toggleEdit,
    } = this.props

    const {
      cardname,
      idolname,
      //skill,
      before,
      after,
    } = metadata

    return (
      <AppContent>
        <div className={classes.root}>
          <Card>
            <CardMedia
              className={classes.media}
              image={before.image}
            />
            <CardContent>
              <Typography type='headline'>［{cardname}］{idolname}</Typography>
              <Typography type='subheading' color='secondary'>{before.rarity} / {after.rarity}</Typography>
            </CardContent>
          </Card>
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

export default {
  name: 'スターライトステージ：カード',
  component: withStyles(styles)(CGSSCard),
  schema,
}

