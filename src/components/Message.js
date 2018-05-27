import React, {Component} from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { toggleSelect,
         toggleStarred,
         markAsRead
       } from '../actions/message.js'
import { Route, withRouter } from 'react-router-dom'

class ExpandedMessage extends Component {
  state = { body: null }
  async componentDidMount() {
    let body = null
    let id = this.props.location.pathname.split('/').pop()
    const responseMsgBody = await fetch(`/api/messages/${id}`)
    if (responseMsgBody.status === 200) {
      const jsonMsgBody = await responseMsgBody.json()
      body = jsonMsgBody.body
    }
    this.setState({ body: body})
  }

  render() {
    return (<div className="row message-body">
              <div className="col-xs-11 col-xs-offset-1">
                { this.state.body }
              </div>
            </div>)
  }
}

const Message = ({message,toggleSelect,
                toggleStarred,
                markAsRead, history, location }) => {

  const isRead = message.message.read ? 'read' : 'unread'
  const isSelected = message.selected ? 'selected' : ''
  const isChecked = message.selected ? 'checked' : ''
  const isStarred = message.message.starred ? 'star fa fa-star' : 'star fa fa-star-o'
  const expandedPath = `/messages/${message.message.id}`
  return (
    <div>
      <div className={`row message ${isRead} ${isSelected}`}>
        <div className="col-xs-1">
          <div className="row">
            <div className="col-xs-2">
            <input type="checkbox" checked={isChecked}
              onChange = {(e) => {
                e.stopPropagation()
                toggleSelect(message.message.id)
              }} />
            </div>
            <div className={`col-xs-2 ${isStarred}`}
              onClick = {(e) => {
                e.stopPropagation()
                toggleStarred(message.message.id)
              }}>
              <i></i>
            </div>
          </div>
        </div>
        <div className="col-xs-11">
          {message.message.labels.map((label, idx) =>
            <span key={ idx }
              className="label label-warning">{ label }
            </span>)}

          <a onClick = {(e) => {
            e.preventDefault()
            if(location.pathname === expandedPath) {
              history.push('/')
            } else {
              history.push(expandedPath)
              markAsRead(message.message.id)
            }
            }} >
            { message.message.subject }
          </a>

        </div>
      </div>
      <Route path={ expandedPath } component={ ExpandedMessage }/>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  toggleSelect,
  toggleStarred,
  markAsRead
}, dispatch)

export default withRouter(connect(
  null,
  mapDispatchToProps
)(Message))
