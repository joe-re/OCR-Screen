import React from 'react';
import ImageView from './analize_viewer/image_view';
import ColorPicker from './analize_viewer/color_picker';
import AnalizableImage from '../models/analizable_image';
import OcrResultView from './analize_viewer/ocr_result_view';

class AnalizableViewer extends React.Component {
  constructor(props) {
    super(props);
    let image = new Image();
    image.src = this.props.initialImageUrl;
    this.state = {
      image: image,
      analizableImage: new AnalizableImage(image),
      pos: {x: 0, y: 0},
      selectedPos: {x: -1, y: -1}
    };
  }
  handlePosChanged(pos) {
    this.setState({pos: pos});
  }
  handleImageClicked(pos) {
    this.setState({selectedPos: pos});
  }
  handleImageChanged(imageUrl) {
    let image = new Image();
    image.src = imageUrl;
    this.setState({
      image: image,
      analizableImage: new AnalizableImage(image)
    });
  }
  render() {
    return (
      <div>
        <OcrResultView filteredImage={this.state.analizableImage} selectedPos={this.state.selectedPos}></OcrResultView>
        <ColorPicker analizableImage={this.state.analizableImage} pos={this.state.pos}></ColorPicker>
        <ImageView image={this.state.image} handleImageChanged={this.handleImageChanged.bind(this)} handlePosChanged={this.handlePosChanged.bind(this)} handleImageClicked={this.handleImageClicked.bind(this)}></ImageView>
      </div>
    );
  }
}

export default AnalizableViewer;
