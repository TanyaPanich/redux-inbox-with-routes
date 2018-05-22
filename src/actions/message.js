export const TOGGLE_SELECT = 'TOGGLE_SELECT'
export const TOGGLE_EXPAND = 'TOGGLE_EXPAND'
export const TOGGLE_STARRED = 'TOGGLE_STARRED'

const toggleProperty =  (id, property) => {
  return (dispatch) => {
    dispatch({type: property, id: id})
  }
}

export const toggleSelect = id => toggleProperty(id, TOGGLE_SELECT)
export const toggleExpand = id => toggleProperty(id, TOGGLE_EXPAND)
export const toggleStarred = id => toggleProperty(id, TOGGLE_STARRED)
