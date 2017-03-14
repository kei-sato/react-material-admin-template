import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import { routerMiddleware } from 'react-router-redux'
import rootReducer from '../reducers'

export default function configureStore(initialState, history) {
  const middleware = [thunkMiddleware, createLogger(), routerMiddleware(history)]

  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(...middleware),
  )

  return store
}
