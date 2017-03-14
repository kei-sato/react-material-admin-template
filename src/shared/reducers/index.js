import { combineReducers } from 'redux'
import share from './share'
import user from './user'

const rootReducer = combineReducers({
  share,
  user,
})

export default rootReducer
