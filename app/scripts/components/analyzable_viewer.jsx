import React from 'react';
import ImageView from './analyze_viewer/image_view';
import ColorPicker from './analyze_viewer/color_picker';
import AnalyzableImage from '../models/analyzable_image';
import OcrResultView from './analyze_viewer/ocr_result_view';
import AnalyzableViewerStore from '../stores/analyzable_viewer_store';
import AnalyzableViewerAction from '../actions/analyzable_viewer_action';

function getState() {
  return AnalyzableViewerStore.getState();
}

class AnalyzableViewer extends React.Component {
  componentDidMount() {
    AnalyzableViewerStore.addChangeListener(this._onChange.bind(this));
    AnalyzableViewerStore.addFailOcrListener(this._onFailOcr.bind(this));
  }

  componentWillUnmount() {
    AnalyzableViewerStore.removeChangeListener(this._onChange.bind(this));
    AnalyzableViewerStore.removeFailOcrListener(this._onFailOcr.bind(this));
  }

  _onChange() {
    this.setState(getState());
  }

  _onFailOcr() {
    window.alert('OCR failed. Please try again after triming image.');
    window.location.reload(); // This is to resolve OCRAD of memory leak error.I haven't been able to find the cause and solution...
  }

  constructor(props) {
    super(props);
    this.state = getState();
    Promise.resolve().then(() => this.getImage(this.props.id));
  }

  getImage(id) {
    chrome.runtime.sendMessage(id, (response) => {
      if(response === null) {
        window.setTimeout(() => {
          this.getImage(id)
        }, 1000);
      } else {
        AnalyzableViewerAction.updateImage(response.url);
      }
    });
  }

  render() {
    return (
      <div>
        <OcrResultView ocrResault={this.state.ocrResult}></OcrResultView>
        <ColorPicker color={this.state.color}></ColorPicker>
        <ImageView image={this.state.image}></ImageView>
      </div>
    );
  }
}

export default AnalyzableViewer;
