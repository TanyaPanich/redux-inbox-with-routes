import {INITIALIZE} from '../actions/app.js'
import {SEND_MESSAGE} from '../actions/compose.js'
import {TOGGLE_SELECT, TOGGLE_EXPAND, TOGGLE_STARRED} from '../actions/message.js'
import {
  COMPOSE_MESSAGE,
  DELETE_SELECTED,
  TOGGLE_SELECT_ALL,
  MARK_READ_SELECTED,
  MARK_UNREAD_SELECTED,
  ADD_LABEL_TO_SELECTED,
  REMOVE_LABEL_FROM_SELECTED
} from '../actions/toolbar.js'

import {messageState} from './messageState'

// const didPersitantStateChanged = (oldState, newState) => {
//   if (oldState.messages.length !== newState.messages.length) {
//     return true
//   }
//   for (let idx in oldState.messages) {
//     if (oldState.messages[idx].message !== newState.messages[idx].message) {
//       return true
//     }
//   }
//   return false
// }

// allSelected = 'ALL', 'NONE', 'SOME'
const getAllSelectedState = messages => {
  const selectedCount = messages.filter(m => m.selected).length
  return selectedCount === 0 ? 'NONE': (selectedCount === messages.length ? 'ALL' : 'SOME')
}

const getUnreadCount = messages => {
  return messages.filter(m => !m.message.read).length
}

export const messagesState = (state = {
  messages: []
}, action) => {
  console.log('messagesState: action', action)
  console.log('messagesState: state', state)

  switch (action.type) {
    case INITIALIZE: // Action fields: type, messages
      {
        const messages = action.messages.map(m => {
          return {message: m, selected: false, expanded: false, body: null}
        })
        console.log('INITIALIZE. messages', messages)
        return {
          ...state,
          allSelected: 'NONE',
          compose: false,
          unreadCount: getUnreadCount(messages),
          messages: messages
        }
      }

    case TOGGLE_SELECT_ALL: // Action fields: type
      //const selectedCount = state.messages.filter(m => m.selected).length
      {
        const allSelected = state.allSelected === 'ALL' ? 'NONE' : 'ALL'
        const selected = allSelected === 'ALL'
        return {
          ...state,
          allSelected: allSelected,
          messages: state.messages.map(
            m => m.selected === selected ? m :
            {
              ...m,
              selected: selected
            })
        }
      }
    case TOGGLE_SELECT: // Action fields: type, id
      {
        const messages = state.messages.map(m => messageState(m, action))
        return {
          ...state,
          allSelected: getAllSelectedState(messages),
          messages: messages
        }
      }
    case COMPOSE_MESSAGE: // Action fields: type
      return {
        ...state,
        compose: true,
        messages: state.messages.map(
          m => !m.expanded ? m : {
            ...m,
            expanded: false
          })
      }
    case SEND_MESSAGE: // Action fields: type
      return {
        ...state,
        compose: false
      }
    case DELETE_SELECTED: // Action fields: type
      {
        const messages = state.messages.filter(m => !m.selected)
        return {
          ...state,
          allSelected: getAllSelectedState(messages),
          messages: messages,
          unreadCount: getUnreadCount(messages)
        }
      }
    case TOGGLE_EXPAND: // Action fields: type, id, body
    case MARK_READ_SELECTED: // Action fields: type
    case MARK_UNREAD_SELECTED: // Action fields: type
      {
        const messages = state.messages.map(m => messageState(m, action))
        return {
          ...state,
          messages: messages,
          unreadCount: getUnreadCount(messages)
        }
      }
    case TOGGLE_STARRED: // Action fields: type, id
    case ADD_LABEL_TO_SELECTED: // Action fields: type, label
    case REMOVE_LABEL_FROM_SELECTED: // Action fields: type, label
      return {
        ...state,
        messages: state.messages.map(m => messageState(m, action))
      }
    default:
      return state
  }
}
