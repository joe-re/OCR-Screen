import Color from './color';

class AnalyzableImage {
  constructor(img) {
    this.image = img;
    this.canvas = this.createCanvas(img);
    this.colors = this.analyze(this.canvas, img);
  }

  getImage() {
    let image = new Image();
    image.src = this.image.src;
    return image;
  }

  getColor(x, y) {
    return new Color(
      this.colors[this.calcStartPoint(x, y)],
      this.colors[this.calcStartPoint(x, y) + 1],
      this.colors[this.calcStartPoint(x, y) + 2]
    );
  }

  calcStartPoint(x, y) { return ((y * this.canvas.width) + x) * 4; }

  analyze(canvas, img) {
    let context = canvas.getContext('2d');
    context.drawImage(img, 0, 0);
    return context.getImageData(0, 0, img.width, img.height).data;
  }

  createCanvas(img) {
    let canvas = document.createElement('canvas');
    canvas.height = img.height;
    canvas.width = img.width;
    return canvas;
  }

  getFilteredImage(pos) {
    const color = this.getColor(pos.x, pos.y);
    const image = this.getImage();
    const canvas = this.createCanvas(image);

    let context = canvas.getContext('2d');
    context.drawImage(image, 0, 0);
    const src = context.getImageData(0, 0, canvas.width, canvas.height);
    let dst = context.createImageData(canvas.width, canvas.height);

    for (let i = 0; i < src.data.length; i += 4) {
      const compared = new Color(src.data[i], src.data[i + 1], src.data[i + 2]);
      const fillColor = color.isSimilar(compared) ? Color.BLACK : Color.WHITE;
      dst.data[i]     = fillColor.r;
      dst.data[i + 1] = fillColor.g;
      dst.data[i + 2] = fillColor.b;
      dst.data[i + 3] = src.data[i + 3]; // Alpha Property
    }

    context.putImageData(dst, 0, 0);
    const newImage = new Image();
    newImage.src = canvas.toDataURL();
    return newImage;
  }

  analyzeOcr(pos) {
    return Promise.resolve()
    .then(()=> {
      const filteredImage = this.getFilteredImage(pos);
      let canvas = this.createCanvas(filteredImage);
      let context = canvas.getContext('2d');
      context.drawImage(filteredImage, 0, 0);
      return OCRAD(canvas);
    });
  }
}

export default AnalyzableImage;
