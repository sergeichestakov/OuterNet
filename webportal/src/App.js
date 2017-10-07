import React, { Component } from 'react';
import { Tab, Tabs } from 'react-mdl';
import TabView from './Content.js'
import './App.css';

class App extends Component {

  constructor(props) {
      super(props)
      this.state = { activeTab: 2 };
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to the OuterNet. Uncensored Information.</h1>
        </header>
        <TabView />
      </div>
    );
  }
}


export default App;
