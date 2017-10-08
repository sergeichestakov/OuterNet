import React, { Component } from 'react';
import { Tab, Tabs } from 'react-mdl';
import BrowseView from './Tabs/Browse.js';
import RecentView from './Tabs/Recent.js';
import axios from 'axios';
import './App.css';

export default class TabView extends Component {

  constructor(props) {
      super(props)
      this.state =
      {
        activeTab: 0,
        articles: []
      };
  }

  componentDidMount(){

      /* Make a request for the updated articles
      axios.get('/load')
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

    return fetch('')
      .then((response) => response.json())
      .then((responseJson) => {
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.setState({
          isLoading: false,
          dataSource: ds.cloneWithRows(responseJson.movies),
        }, function() {
          // do something with new state
        });
      })
      .catch((error) => {
        console.error(error);
      });*/
  }

  renderContent(index){
      if(index === 0){
        return(<RecentView articles={this.state.articles}/>);
      } else {
        return(<BrowseView articles={this.state.articles}/>);
      }
  }

  render() {
    return (
      <div className="demo-tabs">
        <Tabs activeTab={this.state.activeTab} onChange={(tabId) => this.setState({ activeTab: tabId })} ripple>
            <Tab>Recent Articles</Tab>
            <Tab>Browse</Tab>
        </Tabs>
        <section>
            <div className="content">{this.renderContent(this.state.activeTab)}</div>
        </section>
      </div>
    );
  }
}
