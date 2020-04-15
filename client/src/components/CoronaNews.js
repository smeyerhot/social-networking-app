import React, { Component } from "react";
import { Grid, Card, Icon, Image, Button } from "semantic-ui-react";
import './Corona.css'

export default class CoronaCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      news: []
    };
  }

  componentDidMount() {
    const url =
      "https://newsapi.org/v2/top-headlines?country=us&apiKey=d5cf45043cd34b59b432df10e3cef274";

    fetch(url)
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState({
          news: data.articles
        });
        console.log(data);
      })
      .catch(error => {
        console.log("error while trying to retrieve data");
      });
  }
  render() {
    return <Grid.Row>{this.renderItems()}</Grid.Row>;
  }

  renderItems = () => {
    return (
      <Card.Group>
        {this.state.news.map(card => (
          <Card
            key={card.id} // Make sure you use a unique key identifier for React
            image={card.urlToImage} // This is the url of the image for the current object inside this.state.news.YOUR_CURRENT_OBJECT
            header={card.title}
            meta={card.type}
            description={card.description}
          />
        ))}
      </Card.Group>
    );
  };
}
