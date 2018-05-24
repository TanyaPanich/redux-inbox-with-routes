export const TOGGLE_COMPOSE_MESSAGE = 'TOGGLE_COMPOSE_MESSAGE'
export const DELETE_SELECTED = 'DELETE_SELECTED'
export const TOGGLE_SELECT_ALL = 'TOGGLE_SELECT_ALL'
export const MARK_READ_SELECTED = 'MARK_READ_SELECTED'
export const MARK_UNREAD_SELECTED = 'MARK_UNREAD_SELECTED'
export const ADD_LABEL_TO_SELECTED = 'ADD_LABEL_TO_SELECTED'
export const REMOVE_LABEL_FROM_SELECTED = 'REMOVE_LABEL_FROM_SELECTED'

const updateState =  (property) => {
  return (dispatch) => { dispatch({ type: property }) }
}

export const composeMessage = () => updateState(TOGGLE_COMPOSE_MESSAGE)
export const deleteMessages = () => updateState(DELETE_SELECTED)
export const toggleSelectAll = () => updateState(TOGGLE_SELECT_ALL)
export const markReadSelected = () => updateState(MARK_READ_SELECTED)
export const markUnreadSelected = () => updateState(MARK_UNREAD_SELECTED)

export const addLabelToMessages = (label) => {
  return (dispatch) => { dispatch({type: ADD_LABEL_TO_SELECTED, label}) }
}

export const removeLabelFromMessages = (label) => {
  return (dispatch) => { dispatch({type: REMOVE_LABEL_FROM_SELECTED, label}) }
}
