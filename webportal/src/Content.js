import React, { Component } from 'react';
import { Tab, Tabs } from 'react-mdl';
import './App.css';

export default class TabView extends Component {

  constructor(props) {
      super(props)
      this.state = { activeTab: 2 };
  }

  render() {
    return (
      <div className="demo-tabs">
        <Tabs activeTab={this.state.activeTab} onChange={(tabId) => this.setState({ activeTab: tabId })} ripple>
            <Tab>Recent Articles</Tab>
            <Tab>Browse</Tab>
            <Tab>Search</Tab>
        </Tabs>
        <section>
            <div className="content">Content for the tab: {this.state.activeTab}</div>
        </section>
      </div>
    );
  }
}
