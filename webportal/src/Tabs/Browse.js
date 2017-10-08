import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import SortableTree from 'react-sortable-tree';
import '../App.css';

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]

export default class BrowseView extends Component {

  constructor(props) {
    super(props);

    this.state = {
      articles: this.props.articles,
      searchString: '',
      searchFocusIndex: 0,
      searchFoundCount: null,
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

  generateArticles = (month, currYear = false) => {
    //Title and subtitle which is the description
    let items = [];
    if(currYear){
      //Find all articles from that month
      items.push({title: <a href='#'>Article</a>, subtitle: "It is 2017"})

    } else {
      //Return bs
      items.push({title: "Article", subtitle: "This is an article about things"})
    }
    return items;
  }

  generateMonths = (currYear = false) => {
    let items = [];
    let that = this;
    if(!currYear){
      months.forEach(function(month){
        items.push({title: month, children: that.generateArticles(month, currYear)})
      });
    } else {
      //Up to September
      for(let m = 0; m < 9; m++){
        items.push({title: months[m], children: that.generateArticles(months[m], currYear)})
      }
    }
    return items;
  }

  //TODO: Query for all unique categories
  generateCategories = () => {

  }

  render() {

    const { searchString, searchFocusIndex, searchFoundCount } = this.state;

   // Case insensitive search of `node.title`
   const customSearchMethod = ({ node, searchQuery }) =>
     searchQuery &&
     node.title.toLowerCase().indexOf(searchQuery.toLowerCase()) > -1;

   const selectPrevMatch = () =>
     this.setState({
       searchFocusIndex:
         searchFocusIndex !== null
           ? (searchFoundCount + searchFocusIndex - 1) % searchFoundCount
           : searchFoundCount - 1,
     });

   const selectNextMatch = () =>
     this.setState({
       searchFocusIndex:
         searchFocusIndex !== null
           ? (searchFocusIndex + 1) % searchFoundCount
           : 0,
     });

    return (
      <div style={styles.content}>
        <form
            style={{ display: 'inline-block' }}
            onSubmit={event => {
              event.preventDefault();
            }}
          >
            <input
              id="find-box"
              type="text"
              placeholder="Search Articles"
              style={styles.searchBar}
              value={searchString}
              onChange={event =>
                this.setState({ searchString: event.target.value })}
            />

            <button
              type="button"
              disabled={!searchFoundCount}
              onClick={selectPrevMatch}
              style={styles.button}
            >
              &lt;
            </button>

            <button
              type="submit"
              disabled={!searchFoundCount}
              onClick={selectNextMatch}
              style={styles.button}
            >
              &gt;
            </button>

            <span>
              &nbsp;
              {searchFoundCount > 0 ? searchFocusIndex + 1 : 0}
              &nbsp;/&nbsp;
              {searchFoundCount || 0}
            </span>
          </form>
        <SortableTree
          treeData={this.state.treeData}
          onChange={treeData => this.setState({ treeData })}
          //Search methods
            searchMethod={customSearchMethod}
            searchQuery={searchString}
            searchFocusOffset={searchFocusIndex}
            searchFinishCallback={matches =>
              this.setState({
                searchFoundCount: matches.length,
                searchFocusIndex:
                  matches.length > 0 ? searchFocusIndex % matches.length : 0,
              })}
        />
      </div>
    );
  }
}

const styles = {
    content: {
      height: 1000,
      paddingLeft: "10%",
      paddingRight: "10%"
    },
    searchBar: {
      fontSize: '1rem',
      height: 40,
      width: 300
    },
    button: {
      height: 40,
      width: 40
    }
}
