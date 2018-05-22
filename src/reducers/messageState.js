import {TOGGLE_SELECT, TOGGLE_EXPAND, TOGGLE_STARRED}  from '../actions/message.js'
import {MARK_READ_SELECTED, MARK_UNREAD_SELECTED, ADD_LABELS_SELECTED,
        REMOVE_LABELS_SELECTED}  from '../actions/toolbar.js'

const addMsgLabels = (currentLabels, newLabels) => {
  let reallyNewLabels = newLabels.filter(label => !currentLabels.includes(label))
  return [...currentLabels, ...reallyNewLabels]
}

const removeMsgLabels = (currentLabels, oldLabels) => {
  return currentLabels.filter(label => !oldLabels.includes(label))
}

export const messageState = (state, action) => {
  switch (action.type) {
    case TOGGLE_SELECT:
      if (action.id != state.message.id) {
        return state
      }
      return {...state, selected: !state.selected}
    case TOGGLE_EXPAND:
      if (action.id != state.message.id) {
        return state
      }
      const message = state.message.read ? message : {...state.message, read: true}
      return {...state, expanded: !state.expanded, message: message}
    case TOGGLE_STARRED:
      if (action.id != state.message.id) {
        return state
      }
      return {...state, message: {...state.message, starred: !state.message.starred}}
    case MARK_READ_SELECTED:
      if (!state.selected) {
        return state
      }
      return {...state, message: {...state.message, read: true}}
    case MARK_UNREAD_SELECTED:
      if (!state.selected) {
        return state
      }
      return {...state, message: {...state.message, read: false}}
    case ADD_LABELS_SELECTED:
      if (!state.selected) {
        return state
      }
      return {...state, message: {...state.message, labels: addMsgLabels(state.message.labels, action.labels)}}
    case REMOVE_LABELS_SELECTED:
      if (!state.selected) {
        return state
      }
      return {...state, message: {...state.message, labels: removeMsgLabels(state.message.labels, action.labels)}}
    default:
     return state
  }
}
