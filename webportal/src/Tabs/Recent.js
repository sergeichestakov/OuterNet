import React, { Component } from 'react';
import { card } from 'bootstrap-css';
import Article from '../Article.js';
import '../App.css';

export default class RecentView extends Component {


    constructor(props) {
        super(props)

        this.state =
        {
          articles: this.props.articles
        }
    }

    generateArticles(){
        let articles = [];
        for(let i = 0; i < 50; i++){
          let title = "Article" + i;
          let article =
          {
            "title": title,
            "category": "Politics",
            "month": "January",
            "description": "This is a one line description of this Article"
          }
          articles.push(article);
        }
        const items = articles.map((article, i) =>
          <Article key={i} title={article.title} category={article.category}
          month={article.month} description={article.description}/>
        );
        return(
          <div>
            {items}
          </div>
        )
    }


    render() {
      return (
        <div class="container">
          {this.generateArticles()}
        </div>
      );
    }
}
