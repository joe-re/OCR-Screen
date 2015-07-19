import React from 'react';
let $;
window.jQuery = $ = require('jquery');
require('jcrop');

class ImageView extends React.Component {
  trimStart() {
    var jcropApi = null;
    let showCoords = (c) => {
      console.log(jcropApi);
      jcropApi.destroy();
      let canvas = document.createElement('canvas');
      canvas.height = c.h;
      canvas.width = c.w;
      let context = canvas.getContext('2d');
      let image = new Image();
      image.src = this.props.imageUrl;
      context.drawImage(image, c.x, c.y, c.w, c.h, 0, 0, c.w, c.h);
      this.props.handleImageChanged(canvas.toDataURL());
    };
    $('img').Jcrop(
      { onSelect: showCoords }, function() { jcropApi = this; }
    );
  }
  mouseMoveHandler(e) {
    e = e.nativeEvent;
    let pos = { x: parseInt(e.offsetX), y: parseInt(e.offsetY) };
    this.props.handlePosChanged(pos);
  }
  render() {
    return (
      <img src={this.props.imageUrl} onClick={this.trimStart.bind(this)} onMouseMove={this.mouseMoveHandler.bind(this)}></img>
    );
  }

}

export default ImageView;
