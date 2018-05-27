import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import './App.css'
import Messages from './components/Messages'
import Toolbar from './components/Toolbar'
import { initialize } from './actions/app.js'
import { withRouter } from 'react-router-dom'

class App extends Component {

  async componentDidMount() {
    console.log('componentDidMount ', this.props)
    this.props.initialize()
  }
  render() {
    console.log('app render ', this.props)
      return (<div className='App container'>
        <h1>Redux Inbox</h1>
        <Toolbar />
        <Messages />
      </div>)
  }
}

const mapStateToProps = (state) => {
  return {messagesState: state.messagesState}
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  initialize
}, dispatch)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))

// class App extends Component {
//   constructor() {
//     super()
//     this.state = {
//       messages: [],
//       expandedMsgId: null,
//       msgBodyDiv: null
//     }
//     this.sendMsg = this.sendMsg.bind(this)
//   }
//
//   async componentDidMount() {
//     const messagesResponse = await fetch(`/api/messages`)
//     if (messagesResponse.status === 200) {
//       const messagesJSON = await messagesResponse.json()
//       const newMessages = messagesJSON._embedded.messages
//       this.setState({
//         ...this.state,
//         messages: newMessages
//       })
//     }
//   }
//
//   making changes to be peristed
//   async storeState(ids, cmd, prop, val) {
//     let info = {'messageIds':ids, 'command':cmd }
//     if (val !== null) {
//       info[prop] = val
//     }
//     console.log("storeState:", info)
//
//     await fetch(`/api/messages`, {
//       method: 'PATCH',
//       body: JSON.stringify(info),
//       headers: {
//         'Content-Type': 'application/json',
//         'Accept': 'application/json',
//       }
//     })
//   }
//
//   toggleClass = (message, nameOfClass) => {
//     const index = this.state.messages.indexOf(message)
//      eslint-disable-next-line
//     this.state.messages[index][nameOfClass] = !this.state.messages[index][nameOfClass]
//     this.setState({ messages: this.state.messages })
//
//     if (nameOfClass === 'starred') {
//       const id = this.state.messages[index].id
//       this.storeState([id], 'star', 'star', this.state.messages[index][nameOfClass])
//     }
//   }
//
//   expandMsg = (message, msgBodyDiv) => {
//     const index = this.state.messages.indexOf(message)
//      eslint-disable-next-line
//     this.state.messages[index]['read'] = true
//     this.setState({ expandedMsgId: message.id,  msgBodyDiv: msgBodyDiv })
//     this.storeState([message.id], 'read', 'read', true)
//   }
//
//   countMsgProps = (property) => {
//      eslint-disable-next-line
//     let count = 0
//      eslint-disable-next-line
//     this.state.messages.forEach(message => {
//       if (message[property])
//         count++
//     })
//     console.log('count of', property, 'is', count)
//     return count
//   }
//
//   bulkSelectUnselect = () => {
//        eslint-disable-next-line
//     if (this.countMsgProps('selected') < this.state.messages.length) {
//        eslint-disable-next-line
//       this.state.messages.forEach(message => {
//         message.selected = true
//       })
//        eslint-disable-next-line
//       this.setState({ messages: this.state.messages })
//     } else {
//        eslint-disable-next-line
//       this.state.messages.forEach(message => {
//         message.selected = false
//       })
//        eslint-disable-next-line
//       this.setState({ messages:this.state.messages })
//     }
//   }
//
//   markReadUnread = (booleanValue) => {
//     console.log('I am here')
//      eslint-disable-next-line
//     let ids = []
//     this.state.messages.forEach((message, idx) => {
//       if (message.selected) {
//         message.read = booleanValue
//         ids.push(message.id)
//       }
//     })
//      eslint-disable-next-line
//     this.setState({ messages:this.state.messages })
//     this.storeState(ids, 'read', 'read', booleanValue)
//   }
//
//   updateMsgLabels = (label, booleanValue) => {
//      eslint-disable-next-line
//     let ids = []
//     this.state.messages.forEach(message => {
//       if (message.selected) {
//         ids.push(message.id)
//         if (booleanValue && !message.labels.includes(label)) {
//           message.labels.push(label)
//         }
//         else if (!booleanValue) {
//           message.labels = message.labels.filter(l => l !== label)
//         }
//       }
//     })
//     this.setState({ messages:this.state.messages })
//     this.storeState(ids, booleanValue ? 'addLabel' : 'removeLabel', 'label', label)
//   }
//
//   deleteMsg = () => {
//      eslint-disable-next-line
//     let ids = []
//     this.state.messages.forEach((message,idx) => {
//       if (message.selected) {
//         this.state.messages.splice(this.state.messages.indexOf(message), 1)
//         ids.push(message.id)
//       }
//     })
//     this.setState({ messages:this.state.messages })
//     this.storeState(ids, 'delete')
//   }
//
//   clickComposeMsg = () => {
//     this.setState ({
//       composeCliked: !this.state.composeCliked,
//       expandedMsgId: null,
//       msgBodyDiv: null
//     })
//   }
//
//   async sendMsg (subject, body) {
//     const composedMsg = {'subject': subject, 'body': body}
//     console.log('composedMsg:', composedMsg)
//     const composedMsgResponse =
//     await fetch(`/api/messages`, {
//       method: 'POST',
//       body: JSON.stringify(composedMsg),
//       headers: {
//         'Content-Type': 'application/json',
//         'Accept': 'application/json',
//       }
//     })
//
//      or instead of this in ComposeForm.js in handleSubmit remove event
//      and event.preventDefault (message will be taken only from server then,
//      now if server creates a bug - message is created but not persisted,
//      will be inconsistense.)
//
//     if (composedMsgResponse.status === 200) {
//       const postedMsg = await composedMsgResponse.json()
//        this.setState({
//          messages: [...this.state.messages, postedMsg]
//        })
//     }
//   }
//
//   render() {
//     if (this.state.messages.length === 0) {
//       return <div>Loading...</div>
//     } else {
//       return (
//          <div className='App container'>
//           <h1>React Inbox</h1>
//           <Toolbar
//             messages={ this.state.messages }
//             countMsgProps={ this.countMsgProps }
//             bulkSelectUnselect={ this.bulkSelectUnselect }
//             markReadUnread={ this.markReadUnread }
//             updateMsgLabels={ this.updateMsgLabels }
//             deleteMsg={ this.deleteMsg }
//             clickComposeMsg={ this.clickComposeMsg } />
//           <Messages
//             messages={ this.state.messages }
//             expandedMsgId={ this.state.expandedMsgId }
//             msgBodyDiv={ this.state.msgBodyDiv }
//             toggleClass={ this.toggleClass }
//             composeCliked={ this.state.composeCliked }
//             sendMsg={ this.sendMsg }
//             expandMsg={ this.expandMsg } />
//         </div>
//       )
//     }
//   }
// }
