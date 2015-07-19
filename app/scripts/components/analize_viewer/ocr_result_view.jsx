import React from 'react';

class OcrResultView extends React.Component {
  analizeOcr(filteredImage) {
    let canvas = this.createCanvas(filteredImage);
    let context = canvas.getContext('2d');
    context.drawImage(filteredImage, 0, 0);
    return OCRAD(canvas);
  }
  createCanvas(image) {
    let canvas = document.createElement('canvas');
    canvas.height = image.height;
    canvas.width = image.width;
    return canvas;
  }
  render() {
    let filteredImage, ocrResault;
    if (this.props.selectedPos.x > 0 && this.props.selectedPos.y) {
      filteredImage = this.props.filteredImage.getFilteredImage(this.props.selectedPos);
      ocrResault = this.analizeOcr(filteredImage);
    } else {
      filteredImage = this.props.filteredImage.getImage();
      ocrResault = '';
    }
    let style = { display: 'none' };
    return (
      <div>
        <div>OCR Result: {ocrResault}</div>
        <img src={filteredImage.src} style={style}></img>
      </div>
    );
  }
}

export default OcrResultView;
