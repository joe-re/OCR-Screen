import AppDispatcher from '../dispatcher/app_dispatcher';
import AnalyzableViewerConstants from '../constants/analyze_viewer_constants';
import {EventEmitter} from 'events';
import AnalizableImage from '../models/analizable_image';
import assign from 'object-assign';

let _state = {
  image: null,
  analyzableImage: null,
  pos: {x: 0, y: 0},
  ocrResult: '',
  color: {r: 0, g: 0, b: 0}
};

const CHANGE_EVENT = 'change';

function updateImage(imageUrl) {
  let image = new Image();
  image.src = imageUrl;
  _state.image = image;
  _state.analyzableImage = new AnalizableImage(image);
}

function cropImage(c) {
   let canvas = document.createElement('canvas');
   canvas.height = c.h;
   canvas.width = c.w;
   let context = canvas.getContext('2d');
   context.drawImage(_state.image, c.x, c.y, c.w, c.h, 0, 0, c.w, c.h);
   updateImage(canvas.toDataURL());
}

function changePos(pos) {
  _state.pos = pos;
  _state.color = {
    r: _state.analyzableImage.r(pos.x, pos.y),
    g: _state.analyzableImage.g(pos.x, pos.y),
    b: _state.analyzableImage.b(pos.x, pos.y)
  }
}

function analyzeOcr(pos) {
}

const AnalyzeViewerStore = assign({}, EventEmitter.prototype, {
  getState: function() {
    return _state;
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

AppDispatcher.register(function(action) {
  switch(action.actionType) {
  case AnalyzableViewerConstants.UPDATE_IMAGE:
    updateImage(action.imageUrl);
    AnalyzeViewerStore.emitChange();
    break;

  case AnalyzableViewerConstants.CROP_IMAGE:
    cropImage(action.c);
    AnalyzeViewerStore.emitChange();
    break;

  case AnalyzableViewerConstants.CHANGE_POS:
    changePos(action.pos);
    AnalyzeViewerStore.emitChange();
    break;

  case AnalyzableViewerConstants.ANALYZE_OCR:
    analyzeOcr(action.pos);
    AnalyzeViewerStore.emitChange();
    break;

  default:
    // no op
  }
});

export default AnalyzeViewerStore;
