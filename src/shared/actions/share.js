import { types } from '../constants'

export function clearError() {
  return { type: types.CLEAR_ERROR }
}

export function push(params) {
  return dispatch => dispatch(push(params))
}
