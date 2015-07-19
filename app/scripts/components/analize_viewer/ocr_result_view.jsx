import React from 'react';

class OcrResultView extends React.Component {
  filter(image, r, g, b) {
    let canvas = this.createCanvas(image);
    let context = canvas.getContext('2d');
    context.drawImage(image, 0, 0);
    let src = context.getImageData(0, 0, canvas.width, canvas.height);
    let dst = context.createImageData(canvas.width, canvas.height);
    let i = 0;
    let whiteCount = 0;
    let blackCount = 0;
    while(i < src.data.length) {
      if((src.data[i] > r - 25 && src.data[i] < r + 25) &&
         (src.data[i + 1] > g - 25 && src.data[i + 1] < g + 25) &&
        (src.data[i + 2] > b - 25 && src.data[i + 2] < b + 25)) {
        dst.data[i]     = 0;  // R
        dst.data[i + 1] = 0;  // G
        dst.data[i + 2] = 0;  // B
        dst.data[i + 3] = src.data[i + 3];        // A
        whiteCount++;
      } else {
        dst.data[i]     = 255;
        dst.data[i + 1] = 255;
        dst.data[i + 2] = 255;
        dst.data[i + 3] = src.data[i + 3];        // A
        blackCount++;
      }
      i += 4;
    }
    context.putImageData(dst, 0, 0);
    image.src = canvas.toDataURL();
    return image;
  }

  createCanvas(image) {
    let canvas = document.createElement('canvas');
    canvas.height = image.height;
    canvas.width = image.width;
    return canvas;
  }
  render() {
    let r = this.props.analizableImage.r(this.props.selectedPos.x, this.props.selectedPos.y);
    let g = this.props.analizableImage.g(this.props.selectedPos.x, this.props.selectedPos.y);
    let b = this.props.analizableImage.b(this.props.selectedPos.x, this.props.selectedPos.y);
    let filteredImage = this.filter(this.props.analizableImage.getImage(), r, g, b);
    let style = { display: 'none' };
    return (
      <img src={filteredImage.src} style={style}></img>
    );
  }
}

export default FilteredView;
