import React from 'react';
let $;
window.jQuery = $ = require('jquery');
require('jcrop');

class ImageView extends React.Component {
  trimStart() {
    let jcropApi = null;
    let showCoords = (c) => {
      jcropApi.destroy();
      let canvas = document.createElement('canvas');
      canvas.height = c.h;
      canvas.width = c.w;
      let context = canvas.getContext('2d');
      context.drawImage(this.props.image, c.x, c.y, c.w, c.h, 0, 0, c.w, c.h);
      this.props.handleImageChanged(canvas.toDataURL());
    };
    let image = React.findDOMNode(this.refs.image);
    $(image).Jcrop(
      { onSelect: showCoords }, function() { jcropApi = this; }
    );
  }
  mouseMoveHandler(e) {
    e = e.nativeEvent;
    let pos = { x: parseInt(e.offsetX), y: parseInt(e.offsetY) };
    this.props.handlePosChanged(pos);
  }
  clickHandler(e) {
    e = e.nativeEvent;
    let pos = { x: parseInt(e.offsetX), y: parseInt(e.offsetY) };
    this.props.handleImageClicked(pos);
  }
  render() {
    let style = {
      width: `${this.props.image.width}`,
      height: `${this.props.image.height}`
    };
    return (
      <div>
        <div className='message'>Please Click on Character!</div>
        <button className='trim-button' onClick={this.trimStart.bind(this)}>Trim Image</button>
        <div className='image-view'>
          <img src={this.props.image.src} onMouseMove={this.mouseMoveHandler.bind(this)} onClick={this.clickHandler.bind(this)} style={style} ref="image"></img>
        </div>
      </div>
    );
  }

}

export default ImageView;
