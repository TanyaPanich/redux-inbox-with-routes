export const TOGGLE_SELECT = 'TOGGLE_SELECT'
export const TOGGLE_STARRED = 'TOGGLE_STARRED'
export const MARK_AS_READ = 'MARK_AS_READ'

const updateProperty =  (id, property) => {
  return (dispatch) => {
    dispatch({type: property, id: id})
  }
}

export const toggleSelect = id => updateProperty(id, TOGGLE_SELECT)
export const toggleStarred = id => updateProperty(id, TOGGLE_STARRED)
export const markAsRead = id => updateProperty(id, MARK_AS_READ)
