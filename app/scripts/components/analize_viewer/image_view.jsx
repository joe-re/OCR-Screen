import React from 'react';
import AnalyzableViewerAction from '../actions/analyzable_viewer_action';

let $;
window.jQuery = $ = require('jquery');
require('jcrop');

class ImageView extends React.Component {

  trimStart() {
    let jcropApi = null;
    let showCoords = (c) => {
      jcropApi.destroy();
      AnalyzableViewerAction.cropImage(c);
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
