import React from 'react'

import { CardContent } from 'material-ui/Card'
import Grid from 'material-ui/Grid'
import List, { ListItem, ListItemText } from 'material-ui/List'
import Typography from 'material-ui/Typography'

import ResizableCardMedia from './ResizableCardMedia'

const CGSSCardContent = ({ cardname, idolname, skill, data }) => (
  <div>
    <ResizableCardMedia image={data.image} />
    <CardContent>
      <Typography type='title'>{cardname}</Typography>
      <Typography type='display1' color='inherit'>{idolname}</Typography>
      <Typography type='subheading' color='secondary'>{data.rarity}</Typography>
    </CardContent>
    <CardContent>
      <Typography type='title'>センター効果</Typography>
      <Typography type='subheading'>{skill.center.name}：{skill.center.effect}</Typography>
    </CardContent>
    <CardContent>
      <Typography type='title'>特技</Typography>
      <Typography type='subheading'>{skill.ability.name}：{skill.ability.effect}</Typography>
    </CardContent>
    <CardContent>
      <Typography type='title'>ステータス</Typography>
      <Grid container>
        <Grid item xs={6}>
          <List>
            <ListItem>
              <ListItemText primary={data.stats.life} secondary='ライフ' />
            </ListItem>
            <ListItem>
              <ListItemText primary={data.stats.vocal} secondary='ボーカル' />
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={6}>
          <List>
            <ListItem>
              <ListItemText primary={data.stats.dance} secondary='ダンス' />
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
