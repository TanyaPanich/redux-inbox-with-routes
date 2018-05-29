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
    this.props.initialize()
  }
  render() {
      return (<div className='App container'>
        <h1>Redux Inbox With Routes</h1>
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
