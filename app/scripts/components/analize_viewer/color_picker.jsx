import React from 'react';

class ColorPicker extends React.Component {
  render() {
    let r = this.props.analizableImage.r(this.props.pos.x, this.props.pos.y);
    let g = this.props.analizableImage.g(this.props.pos.x, this.props.pos.y);
    let b = this.props.analizableImage.b(this.props.pos.x, this.props.pos.y);
    let colorStyle = { backgroundColor: `rgb(${r},${g},${b})` };
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
