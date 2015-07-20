import React from 'react';

class OcrResultView extends React.Component {
  copyText() {
    chrome.runtime.sendMessage({
        text: this.props.ocrResault
    });
  }

  render() {
    let style = { display: 'none' };
    return (
      <div>
        <div className='head-content'>
          <div className='head-line'>OCR Result</div>
          <button className='button copy-button' onClick={this.copyText.bind(this)}>Copy</button>
        </div>
        <input className='ocr-result' type='text' value={this.props.ocrResault} readOnly></input>
      </div>
    );
  }
}

export default OcrResultView;
