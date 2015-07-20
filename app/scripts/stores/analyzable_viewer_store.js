import AppDispatcher from '../dispatcher/app_dispatcher';
import AnalyzableViewerConstants from '../constants/analyze_viewer_constants';
import {EventEmitter} from 'events';
import AnalizableImage from '../models/analizable_image';
import assign from 'object-assign';

let _state = {
  image: null,
  analyzable_image: null,
  pos: {x: 0, y: 0},
  ocrResult: ''
};

const CHANGE_EVENT = 'change';

function updateImage(imageUrl) {
  let image = new Image();
  image.src = imageUrl;
  _state.image = image;
  _state.analyzable_image = new AnalizableImage(image);
}

function cropImage(srcImageUrl, c) {
}

function changePos(pos) {
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
    cropImage(action.srcImageUrl, action.c);
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
