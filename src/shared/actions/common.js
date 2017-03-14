// Including es6-promise so isomorphic fetch will work
import 'es6-promise'
import fetch from 'isomorphic-fetch'

// eslint-disable-next-line import/prefer-default-export
export const makeRequest = (method = 'post', api = '/', data = {}) =>
  fetch(api, {
    method,
    credentials: 'same-origin',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: method !== 'get' && JSON.stringify(data),
  })
