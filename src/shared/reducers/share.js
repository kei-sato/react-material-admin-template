import { types } from '../constants'

const initialState = {
  loading: false,
  err: null,
}

export default function share(state = initialState, action) {
  switch (action.type) {
    case types.SHOW_LOADING:
      return { ...state, loading: true }
    case types.HIDE_LOADING:
      return { ...state, loading: false }
    case types.SHOW_ERROR: {
      const { err } = action
      return { ...state, loading: false, err }
    }
    case types.CLEAR_ERROR:
      return { ...state, err: null }
    default:
      return state
  }
}
