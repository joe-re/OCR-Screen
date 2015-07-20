import React from 'react';

class ColorPicker extends React.Component {
  render() {
    let {r, g, b, colorStyle} = '';
    if (this.props.analyzableImage) {
      r = this.props.analyzableImage.r(this.props.pos.x, this.props.pos.y);
      g = this.props.analyzableImage.g(this.props.pos.x, this.props.pos.y);
      b = this.props.analyzableImage.b(this.props.pos.x, this.props.pos.y);
      colorStyle = { backgroundColor: `rgb(${r},${g},${b})` };
    }
    return (
      <div>
        <input type={'text'} size={'3'} value={r}></input>
        <input type={'text'} size={'3'} value={g}></input>
        <input type={'text'} size={'3'} value={b}></input>
        <div className='color-box' style={colorStyle}></div>
      </div>
    );
  }
}

export default ColorPicker;
