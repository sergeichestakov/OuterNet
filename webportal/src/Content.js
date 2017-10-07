import React, { Component } from 'react';
import { Tab, Tabs } from 'react-mdl';
import BrowseView from './Tabs/Browse.js';
import RecentView from './Tabs/Recent.js';
import SearchView from './Tabs/Search.js';
import './App.css';

export default class TabView extends Component {

  constructor(props) {
      super(props)
      this.state = { activeTab: 2 };
  }

  renderContent(index){
      if(index == 0){
        return(<RecentView />);
      } else if (index == 1){
        return(<BrowseView />);
      } else {
        return(<SearchView />);
      }
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
            <div className="content">{this.renderContent(this.state.activeTab)}</div>
        </section>
      </div>
    );
  }
}
