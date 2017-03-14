import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import Paper from 'material-ui/Paper'
import List from 'material-ui/List/List'
import ListItem from 'material-ui/List/ListItem'
import { typography } from 'material-ui/styles'
import { grey800 } from 'material-ui/styles/colors'
import { push } from 'react-router-redux'

import GlobalStyles from '../styles'

const styles = {
  title: {
    fontSize: 20,
    fontWeight: typography.fontWeightLight,
    color: grey800,
    padding: 10,
    display: 'block',
  },
  paper: {
    minHeight: 145,
    padding: 10,
  },
  paperHover: {
    cursor: 'pointer',
    backgroundColor: 'rgba(0, 0, 0, 0.0980392)',
  },
  labelImage: {
    height: 115,
  },
  hCenter: {
    textAlign: 'center',
  },
}

function fillLeft(s, n, c) {
  let str = s
  str = String(str)
  while (str.length < n) str = c + str
  return str
}

function formatDate(dateStr) {
  const date = new Date(dateStr)
  const year = date.getFullYear()
  const month = fillLeft(date.getMonth() + 1, 2, 0)
  const day = fillLeft(date.getDate(), 2, 0)
  const hour = fillLeft(date.getHours(), 2, 0)
  const minutes = fillLeft(date.getMinutes(), 2, 0)
  return `${[year, month, day].join('/')} ${[hour, minutes].join(':')}`
}

class UserOverview extends Component {
  constructor(props, context) {
    super(props, context)
    this.onTouch = this.onTouch.bind(this)
    this.state = { hover: false }
  }

  onTouch() {
    const { dispatch, data: { id } } = this.props
    if (id) dispatch(push(`/userDetail/${id}`))
  }

  render() {
    const { data } = this.props
    const { hover } = this.state
    const styleHover = hover ? styles.paperHover : {}

    return (
      <Paper
        style={{ ...styles.paper, ...styleHover }}
        onMouseEnter={() => this.setState({ hover: true })}
        onMouseLeave={() => this.setState({ hover: false })}
        onTouchTap={this.onTouch}
      >
        <div style={GlobalStyles.clear} />

        <h3 style={styles.title}>{data.name}</h3>

        <div className="row v-align-center">
          <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
            <List>
              <ListItem disabled secondaryText={'Name'} style={{ padding: '6px 16px' }}>
                {data.name}
              </ListItem>
              <ListItem disabled secondaryText="Last update" style={{ padding: '6px 16px' }}>
                {data.updatedAt && formatDate(data.updatedAt)}
              </ListItem>
            </List>
          </div>
        </div>
      </Paper>
    )
  }
}

UserOverview.propTypes = {
  dispatch: PropTypes.func.isRequired,
  data: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
}

export default connect()(UserOverview)
