import React, { PropTypes, Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Snackbar from 'material-ui/Snackbar'
import UserOverview from './UserOverview'
import globalStyles from '../styles'
import { userActions } from '../actions'

class ListViewPage extends Component {
  componentDidMount() {
    const { userActions: { fetchUser } } = this.props
    fetchUser()
  }

  render() {
    const { share: { err }, user: { users } } = this.props
    const errorMessage = err ? err.message : ''

    return (
      <div>
        <h3 style={globalStyles.navigation}>Top / List</h3>

        <div className="row">

          { users && users.map(user =>
            <div key={user.id} className="col-xs-12 col-sm-6 col-md-6 col-lg-6 m-b-15 ">
              <UserOverview data={user} />
            </div>)
          }

          <Snackbar
            open={this.props.share.loading}
            message={errorMessage || 'Updating...'}
            autoHideDuration={errorMessage ? 10000 : undefined}
            onRequestClose={this.handleRequestClose}
          />
        </div>
      </div>
    )
  }
}

ListViewPage.propTypes = {
  share: PropTypes.shape({
    loading: PropTypes.bool,
  }).isRequired,
  user: PropTypes.shape({
    users: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
    })),
  }).isRequired,
  userActions: PropTypes.shape({
    fetchUser: PropTypes.func,
  }).isRequired,
}

export default connect(
  state => ({
    share: state.share,
    user: state.user,
  }),
  dispatch => ({
    userActions: bindActionCreators(userActions, dispatch),
  }),
)(ListViewPage)
