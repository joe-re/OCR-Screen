import React from 'react';
import ImageView from './analize_viewer/image_view';

class AnalizableViewer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {imageUrl: this.props.initialImageUrl };
    this.render();
  }
  handleImageChanged(imageUrl) {
    console.log(imageUrl);
    this.setState({imageUrl: imageUrl});
  }
  render() {
    return (
      <div>
        <ImageView imageUrl={this.state.imageUrl} handleImageChanged={this.handleImageChanged.bind(this)}></ImageView>
      </div>
    )
  }
}

export default AnalizableViewer;
