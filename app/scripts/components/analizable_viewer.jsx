import React from 'react'

class AnalizableViewer extends React.Component {
  render() {
    return (
      <img src={this.props.imageUrl}></img>
    )
  }
}

export default AnalizableViewer;
