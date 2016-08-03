import * as types from '../constants/action-types'

export function addStat(name, value) {
  return {
    type: types.ADD_STAT,
    name,
    value
  }
}