export const SEND_MESSAGE = 'SEND_MESSAGE'

export const sendMessage = (subject, body) => {
  return async (dispatch) => {
    const composedMsg = {'subject': subject, 'body': body}
    console.log('composedMsg:', composedMsg)

    await fetch(`/api/messages`, {
      method: 'POST',
      body: JSON.stringify(composedMsg),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })
    dispatch({type: SEND_MESSAGE})
  }
}
