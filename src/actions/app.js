export const INITIALIZE = 'INITIALIZE'

export const initialize = () => {
  return async (dispatch) => {
    console.log('1. we are in initialize action')
    let newMessages = []
    const messagesResponse = await fetch(`/api/messages`)
    if (messagesResponse.status === 200) {
      const messagesJSON = await messagesResponse.json()
      newMessages = messagesJSON._embedded.messages
    }
    dispatch({
      type: INITIALIZE,
      messages: newMessages
    })
  }
}
