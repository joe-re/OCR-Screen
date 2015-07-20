import React from 'react';
import ImageView from './analize_viewer/image_view';
import ColorPicker from './analize_viewer/color_picker';
import AnalizableImage from '../models/analizable_image';
import OcrResultView from './analize_viewer/ocr_result_view';
import AnalyzableViewerStore from '../stores/analyzable_viewer_store';
import AnalyzableViewerAction from '../actions/analyzable_viewer_action';

function getState() {
  return AnalyzableViewerStore.getState();
}

class AnalizableViewer extends React.Component {
  componentDidMount() {
    AnalyzableViewerStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    AnalyzableViewerStore.removeChangeListener(this._onChange);
  }

  _onChange() {
    this.setState(getState());
  }

  constructor(props) {
    super(props);
    this.state = getState();
    AnalyzableViewerAction.updateImage(this.props.initialImageUrl);
  }

  handlePosChanged(pos) {
    this.setState({pos: pos});
  }

  handleImageClicked(pos) {
    if (this.analyzing) { return; }
    Promise.resolve().then(()=> {
      this.analyzing = true;
      let ocrResult = this.state.analyzableImage.analizeOcr(pos);
      return ocrResult;
    }).then((ocrResult)=> {
      this.setState({ocrResult: ocrResult});
    }).catch(()=> {
      window.alert('OCR failed. Please try again after triming image.');
      window.location.reload(); // This is to resolve OCRAD of memory leak error.I haven't been able to find the cause and solution...
    }).then(()=>{
      this.analyzing = false;
    });
  }

  handleImageChanged(imageUrl) {
    let image = new Image();
    image.src = imageUrl;
    this.setState({
      image: image,
      analyzableImage: new AnalizableImage(image)
    });
  }

  render() {
    return (
      <div>
        <OcrResultView ocrResault={this.state.ocrResult}></OcrResultView>
        <ColorPicker analyzableImage={this.state.analyzableImage} pos={this.state.pos}></ColorPicker>
        <ImageView image={this.state.image} handleImageChanged={this.handleImageChanged.bind(this)} handlePosChanged={this.handlePosChanged.bind(this)} handleImageClicked={this.handleImageClicked.bind(this)}></ImageView>
      </div>
    );
  }
}

export default AnalizableViewer;
