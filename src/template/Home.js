import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { withStyles } from 'material-ui/styles'

import Grid from 'material-ui/Grid'

import IconButton from 'material-ui/IconButton'
import Tooltip from 'material-ui/Tooltip'

import ModeEditIcon from 'material-ui-icons/ModeEdit'
import SaveIcon from 'material-ui-icons/Save'
import UndoIcon from 'material-ui-icons/Undo'

import ReactMarkdown from 'react-markdown'

import DocumentTitle from 'react-document-title'

import Frame from './Frame'
import Editable from './Editable'
import Editor from './Editor'

const ButtonGroup = withStyles({
  root: {
    width: '100%',
  },
})(({ children, classes }) => (
  <Grid
  container
  className={classes.root}
  direction='row'
  justify='flex-end'
  alignItems='center'>
  {React.Children.map(children, (button, i) => (
    <Grid key={i} item>
      {button}
    </Grid>
  ))}
  </Grid>
))

class Home extends Component {
  constructor(props, context) {
    super(props, context)
    const { contents, metadata } = this.props
    this.state = { contents, metadata }
  }

  static propTypes = {
    contents: PropTypes.string,
    metadata: PropTypes.object,
    update: PropTypes.func,
    editing: PropTypes.bool,
    toggleEdit: PropTypes.func,
  }

  render = () => {
    const { contents, update, editing, toggleEdit } = this.props

    return (
      <DocumentTitle title='Home'>
        <Frame>
          {editing ? (
            <div>
              <ButtonGroup>
                <Tooltip title='元に戻す' placement='bottom'>
                  <div>
                    <IconButton onClick={toggleEdit}>
                      <UndoIcon />
                    </IconButton>
                  </div>
                </Tooltip>
                <Tooltip title='保存する' placement='bottom'>
                  <div>
                    <IconButton onClick={event => {
                      update(this.state.contents, this.state.metadata).then(toggleEdit, toggleEdit)
                    }}>
                      <SaveIcon />
                    </IconButton>
                  </div>
                </Tooltip>
              </ButtonGroup>
              <Editor contents={contents} onChange={contents => this.setState({ contents })} />
            </div>
          ) : (
            <div>
              <ButtonGroup>
                <Tooltip title='編集する' placement='bottom'>
                  <div>
                    <IconButton onClick={toggleEdit}>
                      <ModeEditIcon />
                    </IconButton>
                  </div>
                </Tooltip>
              </ButtonGroup>
              <ReactMarkdown source={contents} />
            </div>
          )}
        </Frame>
      </DocumentTitle>
    )
  }
}

export default Editable(Home)
