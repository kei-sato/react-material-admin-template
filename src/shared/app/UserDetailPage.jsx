import React, { PropTypes, Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import Dialog from 'material-ui/Dialog'
import LinearProgress from 'material-ui/LinearProgress'
import PageBase from './PageBase'

import { shareActions, userActions } from '../actions'

class UserDetailPage extends Component {
  constructor(props, context) {
    super(props, context)
    this.onChangeName = this.onChangeName.bind(this)
    this.submit = this.submit.bind(this)
    this.delete = this.delete.bind(this)
    this.openConfirm = this.openConfirm.bind(this)
    this.closeConfirm = this.closeConfirm.bind(this)
    this.openConfirmDelete = this.openConfirmDelete.bind(this)
    this.closeConfirmDelete = this.closeConfirmDelete.bind(this)
    this.openError = this.openError.bind(this)
    this.closeError = this.closeError.bind(this)
    this.state = { openConfirm: false, openConfirmDelete: false, openError: false }
  }

  componentDidMount() {
    const { params: { id }, userActions: { fetchUserOne } } = this.props
    fetchUserOne({ id })
  }

  componentWillReceiveProps(props) {
    const { user: { user } } = props
    if (!user) return
    const { name } = user
    if (name) this.setState({ name })
  }

  componentWillUnmount() {
    const { userActions: { clearUserOne } } = this.props
    clearUserOne()
  }

  onChangeName(e) {
    const { target: { value } } = e
    this.setState({ name: value, errEmptyName: '' })
  }

  submit() {
    const { params: { id }, userActions: { updateUser } } = this.props
    const { name, measureName, clientName, chartDatas, ppData } = this.state

    this.closeConfirm()

    const stateErr = {}
    if (!name) stateErr.errEmptyName = 'name is empty'
    if (Object.keys(stateErr).length) {
      this.setState(stateErr)
      this.openError()
      return
    }

    updateUser({ id, name, measureName, clientName, rawData: chartDatas, ppData })
  }

  delete() {
    const { params: { id }, userActions: { deleteUser } } = this.props
    this.closeConfirmDelete()
    deleteUser({ id })
  }

  openConfirm() { this.setState({ openConfirm: true }) }
  closeConfirm() { this.setState({ openConfirm: false }) }

  openConfirmDelete() { this.setState({ openConfirmDelete: true }) }
  closeConfirmDelete() { this.setState({ openConfirmDelete: false }) }

  openError() { this.setState({ openError: true }) }
  closeError() {
    const { shareActions: { clearError } } = this.props
    clearError()
    this.setState({ openError: false })
  }

  render() {
    const { params: { id }, share: { err } } = this.props
    const { name } = this.state
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

    const actionsConfirmDelete = [
      <RaisedButton
        label="Cancel"
        onTouchTap={this.closeConfirmDelete}
      />,
      <RaisedButton
        label="Delete"
        secondary
        keyboardFocused
        onTouchTap={this.delete}
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
        <PageBase title="User Detail" navigation={`Top / List / ${id}`}>
          { name &&
            <div style={{ marginTop: 10 }}>
              <TextField
                floatingLabelText="name"
                defaultValue={name}
                onChange={this.onChangeName}
                errorText={this.state.errEmptyName}
              /><br />
            </div>
          }
        </PageBase>

        <RaisedButton label="Save" primary onTouchTap={this.openConfirm} style={{ margin: '30px 10%', width: '80%' }} />

        <RaisedButton label="Delete" secondary onTouchTap={this.openConfirmDelete} style={{ margin: '0 25%', width: '50%' }} />

        <div style={{ height: 30 }} />

        <Dialog
          title="Confirm"
          actions={actionsConfirm}
          modal={false}
          open={this.state.openConfirm}
          onRequestClose={this.closeConfirm}
        >
          Are you sure to save？
        </Dialog>

        <Dialog
          title="Confirm"
          actions={actionsConfirmDelete}
          modal={false}
          open={this.state.openConfirmDelete}
          onRequestClose={this.closeConfirmDelete}
        >
          Are you sure to delete this user？
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

UserDetailPage.propTypes = {
  share: PropTypes.shape({
    loading: PropTypes.bool,
  }).isRequired,
  user: PropTypes.shape({
    user: PropTypes.shape({}),
  }).isRequired,
  shareActions: PropTypes.shape({
    clearError: PropTypes.func,
  }).isRequired,
  userActions: PropTypes.shape({
    updateUser: PropTypes.func,
    deleteUser: PropTypes.func,
    fetchUserOne: PropTypes.func,
    clearUserOne: PropTypes.func,
  }).isRequired,
  params: PropTypes.shape({
    id: PropTypes.string,
  }).isRequired,
}

export default connect(
  state => ({
    share: state.share,
    user: state.user,
  }),
  dispatch => ({
    shareActions: bindActionCreators(shareActions, dispatch),
    userActions: bindActionCreators(userActions, dispatch),
  }),
)(UserDetailPage)

