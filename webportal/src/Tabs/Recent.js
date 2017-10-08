import React, { Component } from 'react';
import { card } from 'bootstrap-css';
import Article from '../Article.js';
import '../App.css';
import $ from 'jquery';
window.jQuery = $;
window.$ = $;
global.jQuery = $;
const bootstrap = require('bootstrap');

require("jsdom").env("", function(err, window) {
    if (err) {
        console.error(err);
        return;
    }
    var $ = require("jquery")(window);
});

export default class RecentView extends Component {


    constructor(props) {
        super(props)
        this.state = { articles: [] };
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
