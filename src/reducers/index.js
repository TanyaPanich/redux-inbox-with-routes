//step 4: Create /reducers + default state Using combineReducers

import { combineReducers } from 'redux'
import { messagesState } from './messagesState'

export default combineReducers({
  messagesState
})
