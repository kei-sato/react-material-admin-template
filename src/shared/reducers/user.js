import { types } from '../constants'

const initialState = {
  // for auth
  isAuthenticated: false,
  loginUser: undefined,

  // for list page
  users: [],

  // for detail page
  user: undefined,
}

export default function user(state = initialState, action) {
  switch (action.type) {
    case types.CREATE_USER_SUCCESS: {
      const { user } = action
      return { ...state, user }
    }
    case types.READ_USER_SUCCESS: {
      const { users } = action
      return { ...state, users }
    }
    case types.READ_USER_ONE_SUCCESS: {
      const { user } = action
      return { ...state, user }
    }
    case types.DELETE_USER_SUCCESS: {
      return { ...state, user: undefined }
    }
    case types.CLEAR_USER_ONE: {
      return { ...state, user: undefined }
    }

    case types.LOGIN_SUCCESS: {
      const { user } = action
      return { ...state, loginUser: user, isAuthenticated: true }
    }
    case types.LOGOUT_SUCCESS:
      return initialState

    default:
      return state
  }
}
