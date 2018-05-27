import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {sendMessage} from '../actions/sendMessage.js'
import { withRouter } from 'react-router-dom'

const handleSubmit = (func, e, history) => {
  console.log("history in Compose message", history)
  e.preventDefault()
  const subject = document.querySelector('#subject').value || ''
  const body = document.querySelector('#body').value || ''
  func(subject, body)
  history.push('/')
}

const ComposeForm = ({sendMessage, history}) =>{
  console.log('in compose form', history)
  return (<form className="form-horizontal well"
         onSubmit={(event) => {
                    handleSubmit(sendMessage, event, history)
                  }}
    >
  <div className="form-group">
    <div className="col-sm-8 col-sm-offset-2">
      <h4>Compose Message</h4>
    </div>
  </div>
  <div className="form-group">
    <label htmlFor="subject" className="col-sm-2 control-label">Subject</label>
    <div className="col-sm-8">
      <input type="text" className="form-control" id="subject" placeholder="Enter a subject" name="subject"/>
    </div>
  </div>
  <div className="form-group">
    <label htmlFor="body" className="col-sm-2 control-label">Body</label>
    <div className="col-sm-8">
      <textarea name="body" id="body" className="form-control"></textarea>
    </div>
  </div>
  <div className="form-group">
    <div className="col-sm-8 col-sm-offset-2">
      <input type="submit" value="Send" className="btn btn-primary"/>
    </div>
  </div>
</form>)
}


const mapDispatchToProps = (dispatch) => bindActionCreators({
  sendMessage
}, dispatch)

//null because here we don't need state
export default withRouter(connect(null, mapDispatchToProps)(ComposeForm))
