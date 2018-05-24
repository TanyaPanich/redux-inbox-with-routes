import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { toggleSelect,
         toggleStarred,
         toggleExpand } from '../actions/message.js'


const constructBodyDiv = (body) => {
  return <div className="row message-body">
            <div className="col-xs-11 col-xs-offset-1">
              { body }
            </div>
          </div>
}

const Message = ({message,toggleSelect,
                toggleStarred,
                toggleExpand}) => {

  console.log("Message:", message)
  const isRead = message.message.read ? 'read' : 'unread'
  const isSelected = message.selected ? 'selected' : ''
  const isChecked = message.selected ? 'checked' : ''
  const isStarred = message.message.starred ? 'star fa fa-star' : 'star fa fa-star-o'
  const msgBodyDiv = message.body && message.expanded ? constructBodyDiv(message.body) : null
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
            toggleExpand(message.message.id, message.expanded)
            }} >
            { message.message.subject }
          </a>

        </div>
      </div>
      { msgBodyDiv }
    </div>
  )
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  toggleSelect,
  toggleStarred,
  toggleExpand
}, dispatch)

export default connect(
  null,
  mapDispatchToProps
)(Message)
