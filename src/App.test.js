/**
 * @jest-environment node
 */

import React from 'react'
import { MemoryRouter } from 'react-router'
import ReactDOM from 'react-dom'
import thunk from 'redux-thunk'
import { shallow } from 'enzyme'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import fetchMock from 'fetch-mock'
import renderer from 'react-test-renderer'
import App from './App'
const { JSDOM } = require('jsdom')

const jsdom = new JSDOM('<!doctype html><html><body></body></html>')
const { window } = jsdom
function copyProps(src, target) {
  const props = Object.getOwnPropertyNames(src)
    .filter(prop => typeof target[prop] === 'undefined')
    .reduce((result, prop) => ({
      ...result,
      [prop]: Object.getOwnPropertyDescriptor(src, prop),
    }), {})
  Object.defineProperties(target, props)
}

global.window = window
global.document = window.document
global.navigator = {
  userAgent: 'node.js',
}
copyProps(window, global)

const fakeMessages =
   [
     {message:
       {
         id: 11,
         subject: "Hey",
         starred: true,
         read: false,
         labels: [
           "dev",
           "personal"
         ]
        }
      }
    ]

 const middlewares = [ thunk ]
 const mockStore = configureMockStore(middlewares)
 const store = mockStore({
   messagesState:
   {
     messages: fakeMessages,
     allSelected: 'NONE',
     unreadCount: 0}
   }
 )

describe('App', () => {
  afterEach(() => {
    fetchMock.restore()
  })

  beforeEach(() => {
    fetchMock.get('/', fakeMessages)
  })

  it('renders without crashing', () => {
    shallow(<App />)
  })

  it('renders the same way every time', () => {
    const tree = renderer.create(
      <Provider store={store}>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </Provider>,
      document.getElementById('root')
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
