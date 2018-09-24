import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { createStore, combineReducers } from './diyux/index'

const counter = (state = 0, action) => {
  switch (action.type) {
  case 'INCREMENT':
    return state + 1
  case 'DECREMENT':
    return state - 1
  default:
    return state
  }
}

const todos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return state.concat([action.text])
    default:
      return state
  }
}

let store = createStore(combineReducers({counter, todos}))

class App extends Component {
  state = {
    count: null
  }

  componentDidMount () {
    store.subscribe(() => {
      this.setState({ count: store.getState().counter })
    })
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">{this.state.count}</h1>
        </header>
        <button onClick={() => store.dispatch({ type: "INCREMENT"})}>Increment store</button>
        <button onClick={() => store.dispatch({ type: "DECREMENT"})}>Decrement store</button>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
