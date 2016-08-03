import {ADD_STAT} from '../constants/action-types'

const initialState = {}

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_STAT:
      return Object.assign({}, state, {[action.name]: action.value})
    default:
      return state
  }
}