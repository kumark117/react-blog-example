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

  /* NOTE: no Support in Internet Explorer for Promise.All */

    fetch('https://jsonplaceholder.typicode.com/users')
      .then(urawData => urawData.json())
      .then(udata => this.setState({ users: udata }));

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
            { this.helper_get_user_link(article.userId) }
            Title: <Link to={'/posts/' + article.id}>{article.title}</Link>
            
          </ListGroup.Item>
        )}
      </ListGroup>
    );
  }

  helper_get_user_link(uid) {
    const user = this.state.users && 
                      this.state.users.find(user => user.id===uid);
    //return user.name;
    return <Link to={'/author/' + user.id}>{user.name}</Link>;
  }
}
