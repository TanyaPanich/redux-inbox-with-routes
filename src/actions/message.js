export const TOGGLE_SELECT = 'TOGGLE_SELECT'
export const TOGGLE_EXPAND = 'TOGGLE_EXPAND'
export const TOGGLE_STARRED = 'TOGGLE_STARRED'

const toggleProperty =  (id, property) => {
  return (dispatch) => {
    dispatch({type: property, id: id})
  }
}

export const toggleSelect = id => toggleProperty(id, TOGGLE_SELECT)
export const toggleStarred = id => toggleProperty(id, TOGGLE_STARRED)

export const toggleExpand = (id, isExpanded) => {
  return async (dispatch) => {
    let body = null
    if (!isExpanded) {
      const responseMsgBody = await fetch(`/api/messages/${id}`)
      if (responseMsgBody.status === 200) {
        const jsonMsgBody = await responseMsgBody.json()
        body = jsonMsgBody.body
      }
    }
    dispatch({type: TOGGLE_EXPAND, id: id, body: body})
  }
}
