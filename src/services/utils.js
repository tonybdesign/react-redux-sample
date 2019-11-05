import {getLocalStorageAuth} from './localStorage'
import store from '../store'
import { SET_AUTH_FAILURE, SET_LOGUT_SUCCESS } from '../actions/actionTypes'

export const requester = (url, options = {}) => {
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }
  const customOptions = {
    ...options,
    headers: {
      ...headers,
      ...options.headers
    }
  }

  return fetch(url, customOptions);
}