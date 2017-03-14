import React, { PropTypes, Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import Dialog from 'material-ui/Dialog'
import LinearProgress from 'material-ui/LinearProgress'
import PageBase from './PageBase'
import { shareActions, userActions } from '../actions'

class CreateUserPage extends Component {
  constructor(props, context) {
    super(props, context)
    this.onChangeName = this.onChangeName.bind(this)
    this.onChangePassword = this.onChangePassword.bind(this)
    this.submit = this.submit.bind(this)
    this.openConfirm = this.openConfirm.bind(this)
    this.closeConfirm = this.closeConfirm.bind(this)
    this.openError = this.openError.bind(this)
    this.closeError = this.closeError.bind(this)
    this.state = { openConfirm: false, openError: false }
  }

  onChangeName(e) {
    const { target: { value } } = e
    this.setState({ loginId: value, errEmptyLoginId: '' })
  }

  onChangePassword(e) {
    const { target: { value } } = e
    this.setState({ password: value, errEmptyPassword: '' })
  }

  submit() {
    const { userActions: { createUser } } = this.props
    const { loginId, password } = this.state

    this.closeConfirm()

    const stateErr = {}
    if (!loginId) stateErr.errEmptyLoginId = 'loginId is empty'
    if (!password) stateErr.errEmptyPassword = 'password is empty'
    if (Object.keys(stateErr).length) {
      this.setState(stateErr)
      this.openError()
      return
    }

    createUser({ loginId, password })
  }

  openConfirm() { this.setState({ openConfirm: true }) }
  closeConfirm() { this.setState({ openConfirm: false }) }

  openError() { this.setState({ openError: true }) }
  closeError() {
    const { shareActions: { clearError } } = this.props
    clearError()
    this.setState({ openError: false })
  }

  render() {
    const { share: { err } } = this.props
    const errorMessage = err ? err.message : ''

    const actionsConfirm = [
      <RaisedButton
        label="Cancel"
        onTouchTap={this.closeConfirm}
      />,
      <RaisedButton
        label="Save"
        primary
        keyboardFocused
        onTouchTap={this.submit}
        style={{ marginLeft: 10 }}
      />,
    ]

    const actionsError = [
      <RaisedButton
        label="Close"
        onTouchTap={this.closeError}
      />,
    ]

    return (
      <div>
        <PageBase title="Create User" navigation="top / create">
          <div style={{ marginTop: 10 }}>
            <TextField
              floatingLabelText="Login Id"
              onChange={this.onChangeName}
              errorText={this.state.errEmptyLoginId}
            /><br />
            <TextField
              floatingLabelText="Password"
              type="password"
              onChange={this.onChangePassword}
              errorText={this.state.errEmptyPassword}
            /><br />
          </div>
        </PageBase>

        <RaisedButton label="Save" primary onTouchTap={this.openConfirm} style={{ margin: '30px 10%', width: '80%' }} />

        <Dialog
          title="Confirm"
          actions={actionsConfirm}
          modal={false}
          open={this.state.openConfirm}
          onRequestClose={this.closeConfirm}
        >
          Are you sure to save this user?
        </Dialog>

        <Dialog
          title="Error"
          actions={actionsError}
          modal={false}
          open={!!errorMessage || this.state.openError}
          onRequestClose={this.closeError}
        >
          { errorMessage || 'invalid inputs' }
        </Dialog>

        <Dialog title="processing..." modal={false} open={this.props.share.loading}>
          <LinearProgress />
        </Dialog>
      </div>
    )
  }
}

CreateUserPage.propTypes = {
  share: PropTypes.shape({
    loading: PropTypes.bool,
  }).isRequired,
  shareActions: PropTypes.shape({
    clearError: PropTypes.func,
  }).isRequired,
  userActions: PropTypes.shape({
    createUser: PropTypes.func,
  }).isRequired,
}

export default connect(
  state => ({
    share: state.share,
  }),
  dispatch => ({
    shareActions: bindActionCreators(shareActions, dispatch),
    userActions: bindActionCreators(userActions, dispatch),
  }),
)(CreateUserPage)
