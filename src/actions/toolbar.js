export const COMPOSE_MESSAGE = 'COMPOSE_MESSAGE'
export const DELETE_SELECTED = 'DELETE_SELECTED'
export const TOGGLE_SELECT_ALL = 'TOGGLE_SELECT_ALL'
export const MARK_READ_SELECTED = 'MARK_READ_SELECTED'
export const MARK_UNREAD_SELECTED = 'MARK_UNREAD_SELECTED'
export const ADD_LABELS_SELECTED = 'ADD_LABELS_SELECTED'
export const REMOVE_LABELS_SELECTED = 'REMOVE_LABELS_SELECTED'

const updateState =  (property) => {
  return (dispatch) => { dispatch({type: property}) }
}

export const composeMessage = () => updateState(COMPOSE_MESSAGE)
export const deleteMessages = () => updateState(DELETE_SELECTED)
export const toggleSelectAll = () => updateState(TOGGLE_SELECT_ALL)
export const markReadSelected = () => updateState(MARK_READ_SELECTED)
export const markUnreadSelected = () => updateState(MARK_UNREAD_SELECTED)

export const addLabelToMessages = (labels) => {
  return (dispatch) => { dispatch({type: ADD_LABELS_SELECTED, labels}) }
}

export const removeLabelToMessages = (labels) => {
  return (dispatch) => { dispatch({type: REMOVE_LABELS_SELECTED, labels}) }
}
