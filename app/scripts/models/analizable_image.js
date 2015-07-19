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

  getFilteredImage(pos) {
    const r = this.r(pos.x, pos.y);
    const g = this.g(pos.x, pos.y);
    const b = this.b(pos.x, pos.y);
    let image = this.getImage();

    let canvas = this.createCanvas(image);
    let context = canvas.getContext('2d');
    context.drawImage(image, 0, 0);
    const src = context.getImageData(0, 0, canvas.width, canvas.height);
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

  analizeOcr(pos) {
    const filteredImage = this.getFilteredImage(pos);
    let canvas = this.createCanvas(filteredImage);
    let context = canvas.getContext('2d');
    context.drawImage(filteredImage, 0, 0);
    return Promise.resolve()
    .then(()=> {
      return OCRAD(canvas);
    });
  }
}

export default AnalizableImage;
