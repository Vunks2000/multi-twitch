import React, { Component } from 'react';

class Viewer extends Component {
  render() {
    return (
      <p>{this.props.name}</p>
    );
  }
}

export default Viewer;
