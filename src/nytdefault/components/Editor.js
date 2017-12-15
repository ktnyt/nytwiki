import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { withStyles } from 'material-ui/styles'
import Button from 'material-ui/Button'
import Grid from 'material-ui/Grid'
import Input, { InputLabel } from 'material-ui/Input'
import { MenuItem } from 'material-ui/Menu'
import { FormControl } from 'material-ui/Form'
import Select from 'material-ui/Select'

import SaveIcon from 'material-ui-icons/Save'
import DeleteIcon from 'material-ui-icons/Delete'

import SimpleMDE from 'react-simplemde-editor'

import AppContent from './AppContent'
import templates from '../templates'

const options = {
  toolbar: [
    // Styles
    'bold', 'italic', 'strikethrough', '|',
    // Blocks
    'heading', 'quote', 'code', '|',
    // Structures
    'unordered-list', 'ordered-list', 'table', '|',
    // Links
    'link', 'image', '|',
    // Miscellaneous
    'guide',
  ],
}

const styles = theme => ({
  root: {
    width: '100%',
  },
  metadata: {
    marginBottom: theme.spacing.unit * 3,
  },
  formElement: {
    width: '100%',
    marginBottom: theme.spacing.unit * 2,
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
})

class Editor extends Component {
  constructor(props) {
    super(props)
    this.state = {
      template: 'default',
      contents: props.contents,
      metadata: {},
    }
  }

  static propTypes = {
    classes: PropTypes.object.isRequired,
    contents: PropTypes.string.isRequired,
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    toggleEdit: PropTypes.func.isRequired,
  }

  render = () => {
    const { classes, contents, onSave, onCancel, toggleEdit } = this.props

    const templateOptions = Object.keys(templates).map(key => (
      <MenuItem key={key} value={key}>{templates[key].name}</MenuItem>
    ))

    return (
      <AppContent>
        <div className={classes.root}>
          <div className={classes.metadata}>
            <FormControl className={classes.formElement}>
              <InputLabel htmlFor='template'>テンプレート</InputLabel>
              <Select
                value={this.state.template}
                onChange={event => this.setState({ template: event.target.value })}
                input={<Input name='template' />}
              >
                {templateOptions}
              </Select>
            </FormControl>
          </div>

          <SimpleMDE
            value={contents}
            options={options}
            onChange={contents => this.setState({ contents })}
          />

          <Grid container direction='row' justify='flex-end' alignItems='center'>
            <Grid item>
              <Button raised color='accent' onClick={event => {
                onCancel(this.state).then(toggleEdit)
              }}>
                <DeleteIcon className={classes.leftIcon} />
                取消
              </Button>
            </Grid>
            <Grid item>
              <Button raised color='primary' onClick={event => {
                onSave(this.state).then(toggleEdit)
              }}>
                <SaveIcon className={classes.leftIcon} />
                保存
              </Button>
            </Grid>
          </Grid>
        </div>
      </AppContent>
    )
  }
}

export default withStyles(styles)(Editor)
