import React from 'react'

import { CardContent } from 'material-ui/Card'
import Grid from 'material-ui/Grid'
import List, { ListItem, ListItemText } from 'material-ui/List'
import Typography from 'material-ui/Typography'

const CGSSCardContent = ({ data }) => (
  <div>
    <CardContent>
      <Typography type='title'>ステータス</Typography>
      <Grid container>
        <Grid item xs={6}>
          <List>
            <ListItem>
              <ListItemText primary={data.stats.life} secondary='ライフ' />
            </ListItem>
            <ListItem>
              <ListItemText primary={data.stats.dance} secondary='ダンス' />
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={6}>
          <List>
            <ListItem>
              <ListItemText primary={data.stats.vocal} secondary='ボーカル' />
            </ListItem>
            <ListItem>
              <ListItemText primary={data.stats.visual} secondary='ビジュアル' />
            </ListItem>
          </List>
        </Grid>
      </Grid>
    </CardContent>
  </div>
 
)

export default CGSSCardContent
