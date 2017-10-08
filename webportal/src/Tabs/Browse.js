import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import SortableTree from 'react-sortable-tree';
import '../App.css';

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]

export default class BrowseView extends Component {

  generateMonths = (currYear = false) => {
    let items = [];
    if(!currYear){
      months.forEach(function(month){
        items.push({title: month})
      });
    } else {
      //Up to September
      for(let m = 0; m < 9; m++){
        items.push({title: months[m]})
      }
    }
    return items;
  }


  constructor(props) {
    super(props);

    this.state = {
      treeData: [
          { title: 'Category', children: [
            { title: 'Politics' },
            { title: 'Natural Disasters'},
            { title: 'Wars'}
          ] },
          { title: 'Date', children: [
          {title: '2013', children: this.generateMonths()},
          {title: '2014', children: this.generateMonths()},
          {title: '2015', children: this.generateMonths()},
          {title: '2016', children: this.generateMonths()},
          {title: '2017', children: this.generateMonths(true)}
        ] }
      ],
    };
  }

  render() {
    return (
      <div style={{ height: 1000 }}>
        <SortableTree
          treeData={this.state.treeData}
          onChange={treeData => this.setState({ treeData })}
        />
      </div>
    );
  }
}
