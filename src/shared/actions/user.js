import { push } from 'react-router-redux'
import { types } from '../constants'
import { makeRequest } from './common'

// @param dispatch : dispatch of redux
// @param err : message or Error (object which has message as its property)
function handleError(dispatch, err) {
  if (!err) return
  const message = err.message || err
  return dispatch({ type: types.SHOW_ERROR, err: { ...err, message } })
}

function handleResponse(dispatch, res) {
  return new Promise((resolve, reject) => {
    if (res.status === 200) {
      res.json()
      .then(resolve)
      .catch(reject)
    } else {
      res.json()
      .then(reject)
      .catch(() => res.text().then(reject))
    }
  })
}

export function createUser({ loginId, password }) {
  return (dispatch) => {
    const handleErr = handleError.bind(this, dispatch)
    const handleRes = handleResponse.bind(this, dispatch)

    dispatch({ type: types.SHOW_LOADING })

    return makeRequest('post', '/user/create', { loginId, password })
      .then((res) => {
        // wait for better ux
        setTimeout(() => {
          dispatch({ type: types.HIDE_LOADING })

          handleRes(res).then((user) => {
            dispatch({ type: types.CREATE_USER_SUCCESS, user })
            dispatch(push(`/userDetail/${user.id}`))
          }).catch(handleErr)
        }, 1000)
      }).catch(handleErr)
  }
}

export function updateUser({ id, name, measureName, clientName, rawData, ppData }) {
  return (dispatch) => {
    const handleErr = handleError.bind(this, dispatch)
    const handleRes = handleResponse.bind(this, dispatch)

    dispatch({ type: types.SHOW_LOADING })

    return makeRequest('post', `/user/update/${id}`, { name, measureName, clientName, rawData, ppData })
      .then((res) => {
        // wait for better ux
        setTimeout(() => {
          dispatch({ type: types.HIDE_LOADING })

          handleRes(res).then((user) => {
            dispatch({ type: types.CREATE_USER_SUCCESS, user })
            dispatch(push('/'))
          }).catch(handleErr)
        }, 1000)
      }).catch(handleErr)
  }
}

export function fetchUser() {
  return (dispatch) => {
    const handleErr = handleError.bind(this, dispatch)
    const handleRes = handleResponse.bind(this, dispatch)

    dispatch({ type: types.SHOW_LOADING })

    return makeRequest('get', '/user/read')
      .then((res) => {
        dispatch({ type: types.HIDE_LOADING })

        handleRes(res).then((users) => {
          dispatch({ type: types.READ_USER_SUCCESS, users })
        }).catch(handleError)
      }).catch(handleErr)
  }
}

export function fetchUserOne({ id }) {
  return (dispatch) => {
    const handleErr = handleError.bind(this, dispatch)
    const handleRes = handleResponse.bind(this, dispatch)

    if (!id) return handleErr(new Error('id is empty'))

    dispatch({ type: types.SHOW_LOADING })

    return makeRequest('get', `/user/read/${id}`)
      .then((res) => {
        dispatch({ type: types.HIDE_LOADING })

        handleRes(res).then((user) => {
          dispatch({ type: types.READ_USER_ONE_SUCCESS, user })
        }).catch(handleError)
      }).catch(handleErr)
  }
}

export function deleteUser({ id }) {
  return (dispatch) => {
    const handleErr = handleError.bind(this, dispatch)
    const handleRes = handleResponse.bind(this, dispatch)

    if (!id) return handleErr(new Error('id is empty'))

    dispatch({ type: types.SHOW_LOADING })

    return makeRequest('delete', `/user/delete/${id}`)
      .then((res) => {
        dispatch({ type: types.HIDE_LOADING })

        handleRes(res).then(() => {
          dispatch({ type: types.DELETE_USER_SUCCESS })
          dispatch(push('/'))
        }).catch(handleError)
      }).catch(handleErr)
  }
}

export const clearUserOne = () => dispatch => dispatch({ type: types.CLEAR_USER_ONE })

export function login(loginId, password) {
  return dispatch => makeRequest('post', '/user/login', { loginId, password })
    .then((res) => {
      if (res.status === 200) {
        res.json().then((user) => {
          dispatch({ type: types.LOGIN_SUCCESS, user })
          dispatch(push('/'))
        })
      } else {
        return dispatch({ type: types.LOGIN_FAILED })
      }
    })
}

export function logout() {
  return dispatch => makeRequest('post', '/user/logout')
    .then((res) => {
      if (res.status === 200) {
        dispatch({ type: types.LOGOUT_SUCCESS })
        return dispatch(push('/login'))
      }
      return dispatch({ type: types.LOGOUT_FAILED })
    })
}
