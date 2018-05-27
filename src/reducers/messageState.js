import {TOGGLE_SELECT, TOGGLE_STARRED, MARK_AS_READ}  from '../actions/message.js'
import {MARK_READ_SELECTED, MARK_UNREAD_SELECTED, ADD_LABEL_TO_SELECTED,
        REMOVE_LABEL_FROM_SELECTED}  from '../actions/toolbar.js'

const addMsgLabels = (currentLabels, newLabel) => {
  if (!currentLabels.includes(newLabel)) {
    return [...currentLabels, newLabel]
  }
  return currentLabels
}

const removeMsgLabels = (currentLabels, labelToRemove) => {
  return currentLabels.filter(label => label !== labelToRemove)
}

export const messageState = (state, action) => {
  switch (action.type) {
    case TOGGLE_SELECT:
      if (action.id !== state.message.id) {
        return state
      }
      return {...state, selected: !state.selected}
    case MARK_AS_READ:
      if (action.id !== state.message.id) {
        return state
      }
      return {...state, message: {...state.message, read: true}}
    case TOGGLE_STARRED:
      if (action.id !== state.message.id) {
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
    case ADD_LABEL_TO_SELECTED:
      if (!state.selected) {
        return state
      }
      return {...state, message:
                {...state.message,
                  labels: addMsgLabels(state.message.labels, action.label)
                }
              }
    case REMOVE_LABEL_FROM_SELECTED:
      if (!state.selected) {
        return state
      }
      return {...state, message:
                {...state.message,
                  labels: removeMsgLabels(state.message.labels, action.label)
                }
              }
    default:
     return state
  }
}
