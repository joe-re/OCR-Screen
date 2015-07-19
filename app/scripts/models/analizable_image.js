class AnalizableImage {
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
  r(x, y) { return this.colors[this.calcStartPoint(x, y)]; }
  g(x, y) { return this.colors[this.calcStartPoint(x, y) + 1]; }
  b(x, y) { return this.colors[this.calcStartPoint(x, y) + 2]; }
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
}

export default AnalizableImage;
