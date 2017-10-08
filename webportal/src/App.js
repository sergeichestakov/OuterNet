import React, { Component } from 'react';
import { Tab, Tabs } from 'react-mdl';
import TabView from './Content.js'
import './App.css';

class App extends Component {

  constructor(props) {
      super(props)
      this.state = { activeTab: 0 };
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to the OuterNet: an uncersored, underground network</h1>
        </header>
        <TabView />
      </div>
    );
  }
}

export default App;
