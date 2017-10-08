import React, { Component } from 'react';
import './App.css';


export default class Article extends Component {

    constructor(props) {
        super(props)
        this.state = { articles: [] };
    }


    render() {
      return (
        <div class="card">
          <div class="card-block">
            <h4 class="card-title">{this.props.title}</h4>
            <h6 class="card-subtitle mb-2 text-muted">{this.props.category}</h6>
            <p class="card-text">{this.props.description}</p>
            <p class="card-text"><small class="text-muted">{this.props.month}</small></p>
          </div>
        </div>
      );
    }
}
