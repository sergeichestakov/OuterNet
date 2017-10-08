import React, { Component } from 'react';
import './App.css';


export default class Article extends Component {

    constructor(props) {
        super(props)
    }

    //TODO: redirect to proper url
    redirect = (title, category) => {

    }

    render() {
      return (
        <div style={styles.card} class="card" onClick={() => this.redirect(this.props.title, this.props.category)}>
          <div class="card-block">
            <h4 class="card-title">{this.props.title}</h4>
            <h6 class="card-subtitle mb-2 text-muted">{this.props.category}</h6>
            <p class="card-text">{this.props.description}</p>
            <p style={styles.date} class="card-text"><small class="text-muted">Last updated: {this.props.month} 2017</small></p>
          </div>
        </div>
      );
    }
}


const styles = {
  date: {
    display: "inline-block"
  }
}
