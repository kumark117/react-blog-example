import React from "react";
import ListGroup from 'react-bootstrap/ListGroup';
import {Link} from "react-router-dom";

export default class ArticleList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: []
    }
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(rawData => rawData.json())
      .then(data => this.setState({ articles: data }));
  }

  render() {
    const { articles } = this.state;
    return (
      <ListGroup>
        {articles.map(article =>
          <ListGroup.Item>
            <Link to={'/posts/' + article.id}>{article.title}
            </Link>
          </ListGroup.Item>
        )}
      </ListGroup>
    );
  }
}