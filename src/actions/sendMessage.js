export const SEND_MESSAGE = 'SEND_MESSAGE'

export const sendMessage = (subject, body) => {
  return async (dispatch) => {
    const composedMsg = {'subject': subject, 'body': body}
    const newMsg = await fetch(`/api/messages`, {
      method: 'POST',
      body: JSON.stringify(composedMsg),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })
    if(newMsg.status === 200) {
      const messageJSON = await newMsg.json()
      console.log('newMsg-->', messageJSON)
      dispatch({type: SEND_MESSAGE, message: messageJSON})
    }
  }
}
