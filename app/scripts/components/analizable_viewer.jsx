import React from 'react';
import ImageView from './analize_viewer/image_view';
import ColorPicker from './analize_viewer/color_picker';
import AnalizableImage from '../models/analizable_image';
window.AnalizableImage = AnalizableImage;

class AnalizableViewer extends React.Component {
  constructor(props) {
    super(props);
    let image = new Image();
    image.src = this.props.initialImageUrl;
    this.state = {
      imageUrl: this.props.initialImageUrl,
      analizableImage: new AnalizableImage(image)
    };
  }
  handleImageChanged(imageUrl) {
    let image = new Image();
    image.src = imageUrl;
    this.setState({
      imageUrl: imageUrl,
      analizableImage: image
    });
  }
  render() {
    return (
      <div>
        <ColorPicker></ColorPicker>
        <ImageView imageUrl={this.state.imageUrl} handleImageChanged={this.handleImageChanged.bind(this)}></ImageView>
      </div>
    )
  }
}

export default AnalizableViewer;
