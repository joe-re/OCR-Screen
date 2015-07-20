let _white, _black = null;

class Color {
  constructor(r = 0, g = 0, b = 0){
    this.r = r;
    this.g = g;
    this.b = b;
  }

  isSimilar(comparedColor) {
    return ((comparedColor.r > this.r - 25 && comparedColor.r < this.r + 25) &&
         (comparedColor.g > this.g - 25 && comparedColor.g < this.g + 25) &&
         (comparedColor.b > this.b - 25 && comparedColor.b < this.b + 25));
  }

  static get WHITE() {
    if (!_white) { _white = new Color(255, 255, 255); }
    return _white;
  }

  static get BLACK() {
    if (!_black) { _black = new Color(0, 0, 0); }
    return _black;
  }
}

export default Color;
