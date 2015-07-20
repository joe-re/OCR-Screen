import React from 'react';

class OcrResultView extends React.Component {
  render() {
    let style = { display: 'none' };
    return (
      <div>
        <div>
          <div className='head-line'>OCR Result</div>
          <input className='ocr-result' type='text' value={this.props.ocrResault}></input>
        </div>
      </div>
    );
  }
}

export default OcrResultView;
