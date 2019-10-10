import React from "react";
import Jumbotron from 'react-bootstrap/Jumbotron';
import { Link } from "react-router-dom";


export default class ArticleView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      article: {},
      author: {},
      comments: []
    }
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/posts/' + this.props.match.params.postId)
      .then(rawData => rawData.json())
      .then(articleData => {
        fetch('https://jsonplaceholder.typicode.com/users/' + articleData.userId)
          .then(rawData => rawData.json())
          .then(authorData => this.setState({ author: authorData, article: articleData }))
      })

    fetch('https://jsonplaceholder.typicode.com/comments?postId=' + this.props.match.params.postId)
      .then(rawData => rawData.json())
      .then(commentData => this.setState({ comments: commentData}))
  }

  render() {
    const { article, author, comments } = this.state;
    return (
      <article>
        <Jumbotron>
          <h4>{article.title}</h4>
          <h6>By <Link to={"/author/" + author.id}>{author.username}</Link> (<a href={"mailto:" + author.email}>Email Author</a>)</h6>
          <p>{article.body}</p>
        </Jumbotron>
        <Jumbotron>
          <h3>Comments</h3>
          {comments.map(comment =>
            <aside>
              <h6><a href={'mailto:' + comment.email}>{comment.name}</a> says:</h6>
              <p>{comment.body}</p>
              <hr />
            </aside>
          )}
        </Jumbotron>
      </article>
    );
  }
}