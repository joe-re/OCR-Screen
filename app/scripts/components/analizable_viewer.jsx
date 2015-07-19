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
      ocrResult: ''
    };
    this.analyzing = false;
  }
  handlePosChanged(pos) {
    this.setState({pos: pos});
  }
  handleImageClicked(pos) {
    if (this.analyzing) { return; }
    Promise.resolve().then(()=> {
      this.analyzing = true;
      let ocrResult = this.state.analizableImage.analizeOcr(pos);
      return ocrResult;
    }).then((ocrResult)=> {
      this.setState({ocrResult: ocrResult});
    }).catch(()=> {
      this.setState({analizableImage: new AnalizableImage(this.state.image), ocrResult: ''});
      window.alert('OCR failed. Please try again after triming image.');
    }).then(()=>{
      this.analyzing = false;
    });
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
        <OcrResultView ocrResault={this.state.ocrResult}></OcrResultView>
        <ColorPicker analizableImage={this.state.analizableImage} pos={this.state.pos}></ColorPicker>
        <ImageView image={this.state.image} handleImageChanged={this.handleImageChanged.bind(this)} handlePosChanged={this.handlePosChanged.bind(this)} handleImageClicked={this.handleImageClicked.bind(this)}></ImageView>
      </div>
    );
  }
}

export default AnalizableViewer;
