import React from 'react'
import Message from './Message'
import ComposeForm from './ComposeForm'
import { connect } from 'react-redux'

//'messagesState' is a function in /reducers/messagesState.js
//Why we use it but not import it? Or it is different messageState?

const Messages = ({ messagesState }) => {
  let composeMsgForm = ''
  if (messagesState.compose) {
    composeMsgForm = <ComposeForm/>
  }
  return (<div className="Messages">
    {composeMsgForm}
    {messagesState.messages.map((m, idx) =>
      <Message message={ m }
               key={ idx }
      />)
    }
  </div>)
}

const mapStateToProps = (state) => {
  return {messagesState: state.messagesState}
}

export default connect(mapStateToProps)(Messages)
