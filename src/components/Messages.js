import React from 'react'
import { Route, withRouter } from 'react-router-dom'
import Message from './Message'
import ComposeForm from './ComposeForm'
import { connect } from 'react-redux'

const Messages = ({ messagesState }) => {
  return (<div className="Messages">
    <Route path="/compose" component={ ComposeForm }/>
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

export default withRouter(connect(mapStateToProps)(Messages))
