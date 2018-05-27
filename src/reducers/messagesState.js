import { INITIALIZE } from '../actions/app.js'
import { SEND_MESSAGE } from '../actions/sendMessage.js'
import { TOGGLE_SELECT, TOGGLE_STARRED, MARK_AS_READ } from '../actions/message.js'
import {
  DELETE_SELECTED,
  TOGGLE_SELECT_ALL,
  MARK_READ_SELECTED,
  MARK_UNREAD_SELECTED,
  ADD_LABEL_TO_SELECTED,
  REMOVE_LABEL_FROM_SELECTED
} from '../actions/toolbar.js'

import { messageState } from './messageState'

const didPersitantStateChanged = (oldState, newState) => {
  if (oldState.messages.length !== newState.messages.length) {
    return true
  }
  for (let idx in oldState.messages) {
    if (oldState.messages[idx].message !== newState.messages[idx].message) {
      return true
    }
  }
  return false
}

const updateMsgsState = async (ids, cmd, prop, val) => {
    let info = {'messageIds': ids, 'command': cmd}
    if (val !== null) {
      info[prop] = val
    }
    console.log("updateMsgsState:", info)
    await fetch(`/api/messages`, {
      method: 'PATCH',
      body: JSON.stringify(info),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
}

// allSelected = 'ALL', 'NONE', 'SOME'
const getAllSelectedState = messages => {
  const selectedCount = messages.filter(m => m.selected).length
  return selectedCount === 0 ? 'NONE': (selectedCount === messages.length ? 'ALL' : 'SOME')
}

const getUnreadCount = messages => {
  return messages.filter(m => !m.message.read).length
}

const wrapMessage = (message) => {
  return {message: message, selected: false}
}


export const messagesState = (state = {
  messages: []
}, action) => {
  console.log('Reducer messagesState: action', action)
  console.log('Reducer messagesState: state', state)

  switch (action.type) {
    case INITIALIZE: // Action fields: type, messages
      {
        const messages = action.messages.map(m => wrapMessage(m))
        console.log('INITIALIZE messages', messages)
        return {
          ...state,
          allSelected: 'NONE',
          unreadCount: getUnreadCount(messages),
          messages: messages
        }
      }
    case TOGGLE_SELECT_ALL: // Action fields: type
      {
        const allSelected = state.allSelected === 'ALL' ? 'NONE' : 'ALL'
        const selected = allSelected === 'ALL'
        console.log('TOGGLE_SELECT_ALL action', action)
        return {
          ...state,
          allSelected: allSelected,
          messages: state.messages.map(m => m.selected === selected ? m :
            {...m, selected: selected})
        }
      }
    case TOGGLE_SELECT: // Action fields: type, id
      {
        const messages = state.messages.map(m => messageState(m, action))
        console.log('TOGGLE_SELECT action', action)
        return {
          ...state,
          allSelected: getAllSelectedState(messages),
          messages: messages
        }
      }
    case SEND_MESSAGE: // Action fields: type, message
      {
        console.log("SEND_MESSAGE action", action)
        return {
          ...state,
          unreadCount: getUnreadCount(state.messages) + 1,
          messages: [...state.messages, wrapMessage(action.message)]
        }
      }
    case DELETE_SELECTED: // Action fields: type
      {
        console.log("DELETE_SELECTED action", action)
        const messagesToKeep = state.messages.filter(m => !m.selected)
        const idsToDelete =
          state.messages.filter(m => m.selected).map(m => m.message.id)
        const newState = {
          ...state,
          allSelected: getAllSelectedState(messagesToKeep),
          messages: messagesToKeep,
          unreadCount: getUnreadCount(messagesToKeep)
        }
        if (didPersitantStateChanged(state, newState)) {
          updateMsgsState(idsToDelete, 'delete')
        }
        return newState
      }
    case MARK_AS_READ: // Action fields: type, id
     {
       console.log("MARK_AS_READ action", action)
       const messages = state.messages.map(m => messageState(m, action))
       const newState = {
         ...state,
         messages: messages,
         unreadCount: getUnreadCount(messages)
       }
       if (didPersitantStateChanged(state, newState)) {
         updateMsgsState([action.id], 'read', 'read', true)
       }
       return newState
     }
    case MARK_READ_SELECTED: // Action fields: type
    case MARK_UNREAD_SELECTED: // Action fields: type
      {
        console.log("MARK_READ/UNREAD action", action)
        const messages = state.messages.map(m => messageState(m, action))
        const ids =
          state.messages.filter(m => m.selected)
               .map(m => m.message.id)

        const newState = {
          ...state,
          messages: messages,
          unreadCount: getUnreadCount(messages)
        }
        if (didPersitantStateChanged(state, newState)) {
          //ids, 'read', 'read', booleanValue
          updateMsgsState(ids, 'read', 'read', action.type === MARK_READ_SELECTED )
        }
        return newState
      }
    case TOGGLE_STARRED: // Action fields: type, id
      {
        console.log("TOGGLE_STARRED action", action)
        const messages = state.messages.map(m => messageState(m, action))

        const newState = {
          ...state,
          messages: messages
        }
        if (didPersitantStateChanged(state, newState)) {
          //ids, 'read', 'read', booleanValue
          const messageStarred = messages.filter(m => m.message.id === action.id)
          console.log('messageStarred', messageStarred)
          if(messageStarred.length === 1) {
            updateMsgsState([action.id], 'star', 'star', messageStarred[0].message.starred)
          }
        }
        return newState
      }
    case ADD_LABEL_TO_SELECTED: // Action fields: type, label
    case REMOVE_LABEL_FROM_SELECTED: // Action fields: type, label
      {
        console.log("ADD/REMOVE_LABEL action", action)
        const messages = state.messages.map(m => messageState(m, action))
        const newState = {
        ...state,
        messages: messages
        }
        if (didPersitantStateChanged(state, newState)) {
          const updatedMessagesIds = messages.filter(m => m.selected)
                                          .map(m => m.message.id)
          console.log('updatedMessagesIds', updatedMessagesIds)
          updateMsgsState(updatedMessagesIds,
                          action.type === ADD_LABEL_TO_SELECTED ? 'addLabel' : 'removeLabel',
                          'label',
                          action.label)
        }
        return newState
      }
    default:
      return state
  }
}
