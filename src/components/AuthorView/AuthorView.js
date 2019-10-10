import React from "react";
import Jumbotron from 'react-bootstrap/Jumbotron';

export default class AuthorView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      "id": parseInt(this.props.match.params.authorId),
      "name": "",
      "username": "",
      "email": "",
      "address": {
        "geo": {}
      },
      "phone": "",
      "website": "",
      "company": {}
    }
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users/' + this.props.match.params.authorId)
      .then(rawData => rawData.json())
      .then(authorData => this.setState({...authorData}))
  }

  render() {
    const author  = this.state;
    console.log(this.state)
    return (
      <Jumbotron>
        <h4>{author.username} ({author.name}) (User # {author.id})</h4>
        <h6><a href={"mailto:" + author.email}>Email User</a> | {author.phone} | {author.website} </h6>
        <h6>{author.company.name}, {author.company.catchPhrase} - {author.company.bs}</h6>
        <h6>{author.address.street}, {author.address.suite}, {author.address.city} {author.address.zipcode}</h6>
        <h6>{author.address.geo.lat}, {author.address.geo.lng}</h6>
      </Jumbotron>
    );
  }
}