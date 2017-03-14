import React, { PropTypes, Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import ThemeDefault from './theme-default'
import { userActions } from '../actions'

const styles = {
  container: {
    textAlign: 'center',
    paddingTop: 120,
  },
}

class Login extends Component {
  constructor(props, context) {
    super(props, context)
    this.onChangeUsername = this.onChangeUsername.bind(this)
    this.onChangePassword = this.onChangePassword.bind(this)
    this.submit = this.submit.bind(this)
    this.state = {}
  }

  onChangeUsername(e) {
    const { target: { value } } = e
    this.setState({ loginId: value, errorTextUserId: '' })
  }

  onChangePassword(e) {
    const { target: { value } } = e
    this.setState({ password: value, errorTextPassword: '' })
  }

  submit() {
    const { userActions: { login } } = this.props
    const { loginId, password } = this.state

    if (!loginId) return this.setState({ errorTextUserId: 'ID is empty' })
    if (loginId.length < 3) return this.setState({ errorTextUserId: 'ID is too short' })
    if (!password) return this.setState({ errorTextPassword: 'Password is empty' })
    if (password.length < 3) return this.setState({ errorTextPassword: 'Password is too short' })

    login(loginId, password)
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={ThemeDefault}>
        <div style={styles.container}>
          <TextField
            hintText="3 or more characters"
            floatingLabelText="ID"
            onChange={this.onChangeUsername}
            errorText={this.state.errorTextUserId}
          /><br />
          <TextField
            hintText="3 or more characters"
            floatingLabelText="Password"
            type="password"
            onChange={this.onChangePassword}
            errorText={this.state.errorTextPassword}
          /><br />
          <RaisedButton
            label="Login"
            primary
            style={{ margin: 30 }}
            onTouchTap={this.submit}
          />
        </div>
      </MuiThemeProvider>
    )
  }
}

Login.propTypes = {
  userActions: PropTypes.shape({
    login: PropTypes.func,
  }).isRequired,
}

export default connect(
  () => ({}),
  dispatch => ({ userActions: bindActionCreators(userActions, dispatch) }),
)(withRouter(Login))
