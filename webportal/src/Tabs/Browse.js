import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import SortableTree from 'react-sortable-tree';
import '../App.css';

export default class BrowseView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      treeData: [{ title: 'Chicken', children: [ { title: 'Egg' } ] }],
    };
  }

  render() {
    return (
      <div style={{ height: 400 }}>
        <SortableTree
          treeData={this.state.treeData}
          onChange={treeData => this.setState({ treeData })}
        />
      </div>
    );
  }
}
