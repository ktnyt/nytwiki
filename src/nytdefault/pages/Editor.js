
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

import { withStyles } from 'material-ui/styles'
import Button from 'material-ui/Button'
import Card, { CardActions, CardContent } from 'material-ui/Card'
import Collapse from 'material-ui/transitions/Collapse'
import Grid from 'material-ui/Grid'
import Input, { InputLabel } from 'material-ui/Input'
import List, { ListItem, ListItemText } from 'material-ui/List'
import { MenuItem } from 'material-ui/Menu'
import { FormControl } from 'material-ui/Form'
import Select from 'material-ui/Select'

import SaveIcon from 'material-ui-icons/Save'
import DeleteIcon from 'material-ui-icons/Delete'
import ExpandMoreIcon from 'material-ui-icons/ExpandMore'
import ExpandLessIcon from 'material-ui-icons/ExpandLess'

import SimpleMDE from 'react-simplemde-editor'
import SchemaForm from 'react-jsonschema-form'

import AppContent from '../components/AppContent'
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

const literalTypes = ['boolean', 'number', 'string', 'null']

const instantiate = schema => schema.hasOwnProperty('type') ? (
  literalTypes.includes(schema.type) ? (
    schema.type === 'boolean' ? (
      false
    ) : schema.type === 'number' ? (
      0
    ) : schema.type === 'string' ? (
      ''
    ) : null
  ) : (
    schema.type === 'object' ? (
      _.fromPairs(Object.keys(schema.properties).map(key => ([key, instantiate(schema.properties[key])])))
    ) : schema.type === 'array' ? (
      []
    ) : null
  )
) : null

const cleanInstance = (schema, object) => {
  const instance = instantiate(schema)
  return _.pick({ ...instance, ...object }, _.paths(instance))
}

_.mixin({
  paths: (obj, path=[]) => _.isObject(obj) ? (
    _.flatMap(_.keys(obj).map(key => _.paths(obj[key], [...path, key])))
  ) : [path]
})

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

    const { template, contents, metadata } = props

    this.state = {
      template,
      contents,
      metadata,
      expand: true,
    }
  }

  static propTypes = {
    classes: PropTypes.object.isRequired,
    template: PropTypes.string.isRequired,
    contents: PropTypes.string.isRequired,
    metadata: PropTypes.object.isRequired,
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
  }

  componentWillReceiveProps = nextProps => {
    const { template, contents, metadata } = nextProps

    this.setState({
      template,
      contents,
      metadata,
    })
  }

  render = () => {
    const {
      classes,
      onSave,
      onCancel,
    } = this.props

    const {
      template,
      contents,
      metadata,
    } = this.state

    const templateOptions = Object.keys(templates).map(key => (
      <MenuItem key={key} value={key}>{templates[key].name}</MenuItem>
    ))

    return (
      <AppContent>
        <div className={classes.root}>
        <Grid container direction='row' justify='flex-end' alignItems='center'>
            <Grid item>
              <Button raised color='accent' onClick={event => onCancel(this.state)}>
                <DeleteIcon className={classes.leftIcon} />
                取消
              </Button>
            </Grid>
            <Grid item>
              <Button raised color='primary' onClick={event => onSave(this.state)}>
                <SaveIcon className={classes.leftIcon} />
                保存
              </Button>
            </Grid>
          </Grid>

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

            <Card>
              <CardActions disableActionSpacing>
                <List>
                  <ListItem button onClick={event => this.setState({ expand: !this.state.expand })}>
                    <ListItemText primary='メタデータ編集' />
                    {this.state.expand ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                  </ListItem>
                </List>
              </CardActions>
              <Collapse in={this.state.expand}>
                <CardContent>
                  <SchemaForm
                    schema={templates[template].schema}
                    formData={cleanInstance(templates[template].schema, metadata)}
                    onChange={type => this.setState({ metadata: type.formData })}
                  >
                    <div></div>
                  </SchemaForm>
                </CardContent>
              </Collapse>
            </Card>
          </div>

          <SimpleMDE
            value={contents}
            options={options}
            onChange={contents => this.setState({ contents })}
          />

          <Grid container direction='row' justify='flex-end' alignItems='center'>
            <Grid item>
              <Button raised color='accent' onClick={event => onCancel(this.state)}>
                <DeleteIcon className={classes.leftIcon} />
                取消
              </Button>
            </Grid>
            <Grid item>
              <Button raised color='primary' onClick={event => onSave(this.state)}>
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
