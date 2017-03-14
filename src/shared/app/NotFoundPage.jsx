import React from 'react'
import { Link } from 'react-router'

const style = {
  margin: 120,
  fontSize: '1.5em',
  lineHeight: '1.5em',
}

const NotFoundPage = () => (
  <div style={style}>
    404 Page Not Found<br />
    Go to <Link to="/">Home</Link>
  </div>
)

export default NotFoundPage
