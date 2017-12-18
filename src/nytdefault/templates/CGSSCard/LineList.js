import React from 'react'

import { CardContent } from 'material-ui/Card'
import List, { ListItem, ListItemText } from 'material-ui/List'
import Typography from 'material-ui/Typography'

const process = line => line.replace(/\\\\/gm, '\n')

const Line = ({ line }) => (
  <ListItem>
    <ListItemText primary={process(line.line)} secondary={line.remark} />
  </ListItem>
)

const LineList = ({ lines }) => (
  <div>
    <CardContent>
      <Typography type='title'>セリフ</Typography>
      <CardContent>
        <Typography type='subheading'>プロフィール</Typography>
        <List dense>
          <Line line={lines.profile} />
        </List>
      </CardContent>
      <CardContent>
        <Typography type='subheading'>親愛度</Typography>
        <List dense>
          {lines.engage.map((line, index) => <Line key={index} line={line} />)}
        </List>
      </CardContent>
      <CardContent>
        <Typography type='subheading'>ホーム</Typography>
        <List dense>
          {lines.home.map((line, index) => <Line key={index} line={line} />)}
        </List>
      </CardContent>
      <CardContent>
        <Typography type='subheading'>ルーム</Typography>
        <List dense>
          {lines.room.map((line, index) => <Line key={index} line={line} />)}
        </List>
      </CardContent>
      <CardContent>
        <Typography type='subheading'>ライブ開始前</Typography>
        <List dense>
          {lines.live.before.map((line, index) => <Line key={index} line={line} />)}
        </List>
      </CardContent>
      <CardContent>
        <Typography type='subheading'>特技発動時</Typography>
        <List dense>
          {lines.live.ability.map((line, index) => <Line key={index} line={line} />)}
        </List>
      </CardContent>
      <CardContent>
        <Typography type='subheading'>ライブ終了後</Typography>
        <List dense>
          {lines.live.after.map((line, index) => <Line key={index} line={line} />)}
        </List>
      </CardContent>
    </CardContent>
  </div>
)

export default LineList
