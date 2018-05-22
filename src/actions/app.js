export const INITIALIZE = 'INITIALIZE'

export const initialize = () => {
  return (dispatch) => {
    const messagesResponse = await fetch(`/api/messages`)
    if (messagesResponse.status === 200) {
      const messagesJSON = await messagesResponse.json()
      const newMessages = messagesJSON._embedded.messages
      dispatch({
        type: INITIALIZE,
        messages: newMessages
      })
    }
  }
}
