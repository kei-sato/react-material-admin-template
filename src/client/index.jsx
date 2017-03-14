import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { browserHistory, Router, Route, IndexRoute } from 'react-router'
import injectTapEventPlugin from 'react-tap-event-plugin'
import 'font-awesome/css/font-awesome.css'
import 'flexboxgrid/css/flexboxgrid.css'

import configureStore from '../shared/store/configureStore'
import App from '../shared/app/App'
import NotFoundPage from '../shared/app/NotFoundPage'
import CreateUserPage from '../shared/app/CreateUserPage'
import UserDetailPage from '../shared/app/UserDetailPage'
import ListViewPage from '../shared/app/ListViewPage'
import Login from '../shared/app/Login'
import '../shared/styles/styles.scss'

// Needed for React Developer Tools
window.React = React

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin()

// appended during server side rendering
const initialState = window.__INITIAL_STATE__

const store = configureStore(initialState, browserHistory)

function requireAuth(nextState, replace, callback) {
  const { user: { isAuthenticated } } = store.getState()
  if (!isAuthenticated) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname },
    })
  }
  callback()
}

const rootComponent = (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="login" component={Login} />
      <Route exact path="/" component={App} onEnter={requireAuth}>
        <IndexRoute component={ListViewPage} />
        <Route path="list" component={ListViewPage} />
        <Route path="createUser" component={CreateUserPage} />
        <Route path="userDetail/:id" component={UserDetailPage} />
      </Route>
      <Route path="*" component={NotFoundPage} />
    </Router>
  </Provider>
)
const rootElement = document.getElementById('app')

// Render the main app react component into the app div.
// For more details see: https://facebook.github.io/react/docs/top-level-api.html#react.render
render(rootComponent, rootElement)
