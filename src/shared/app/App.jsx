/**
 * In this file, we create a React component
 * which incorporates components provided by Material-UI.
 */
import React, { PropTypes, Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import ViewList from 'material-ui/svg-icons/action/view-list'
import ContentCreate from 'material-ui/svg-icons/content/create'
import withWidth, { LARGE, SMALL } from 'material-ui/utils/withWidth'

import Header from './Header'
import LeftDrawer from './LeftDrawer'
import ThemeDefault from './theme-default'
import { userActions } from '../actions'

class App extends Component {

  constructor(props) {
    super(props)
    this.handleChangeRequestNavDrawer = this.handleChangeRequestNavDrawer.bind(this)
    this.state = {
      navDrawerOpen: false,
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.width !== nextProps.width) {
      this.setState({ navDrawerOpen: nextProps.width === LARGE })
    }
  }

  handleChangeRequestNavDrawer() {
    this.setState({
      navDrawerOpen: !this.state.navDrawerOpen,
    })
  }

  render() {
    const { navDrawerOpen } = this.state
    const { user, userActions } = this.props
    const paddingLeftDrawerOpen = 236

    const styles = {
      header: {
        paddingLeft: navDrawerOpen ? paddingLeftDrawerOpen : 0,
      },
      container: {
        margin: '80px 20px 20px 15px',
        paddingLeft: navDrawerOpen && this.props.width !== SMALL ? paddingLeftDrawerOpen : 0,
      },
    }

    const menus = [
      { text: 'List', icon: <ViewList />, link: '/list' },
      { text: 'Create', icon: <ContentCreate />, link: '/createUser' },
    ]

    return (
      <MuiThemeProvider muiTheme={ThemeDefault}>
        <div>
          <Header
            styles={styles.header}
            logout={userActions.logout}
            handleChangeRequestNavDrawer={this.handleChangeRequestNavDrawer}
          />

          <LeftDrawer
            navDrawerOpen={navDrawerOpen}
            menus={menus}
            username={user && user.loginUser && user.loginUser.name ? user.loginUser.name : 'User Admin'}
          />

          <div style={styles.container}>
            {this.props.children}
          </div>
        </div>
      </MuiThemeProvider>
    )
  }
}

App.propTypes = {
  children: PropTypes.element.isRequired,
  userActions: PropTypes.shape({
    logout: PropTypes.func,
  }).isRequired,
  user: PropTypes.shape({
    loginUser: PropTypes.shape({
      name: PropTypes.string,
    }),
  }),
  width: PropTypes.number,
}

App.defaultProps = {
  user: undefined,
  width: undefined,
}

export default connect(
  state => ({ user: state.user }),
  dispatch => ({ userActions: bindActionCreators(userActions, dispatch) }),
)(withWidth()(App))
