import React from 'react'
import { withStyles } from 'material-ui/styles'
import { CardMedia } from 'material-ui/Card'
import Ruler from '../../components/Ruler'

const ResizableCardMedia = props => (
  <Ruler>
    {width => {
      const Wrapped = withStyles(theme => ({
        media: {
          height: width * 0.5625,
        },
      }))(({ classes }) => (
        <CardMedia className={classes.media} {...props} />
      ))
      return <Wrapped />
    }}
  </Ruler>
)

export default ResizableCardMedia
