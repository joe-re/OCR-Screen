import AppDispatcher from '../dispatcher/app_dispatcher';
import AnalyzableViewerConstants from '../constants/analyze_viewer_constants';
import {EventEmitter} from 'events';
import AnalyzableImage from '../models/analyzable_image';
import Color from '../models/color';
import assign from 'object-assign';

let _state = {
  image: new Image(),
  analyzableImage: new AnalyzableImage(new Image()),
  pos: {x: 0, y: 0},
  ocrResult: '',
  color: new Color()
};

let _analyzing = false;

const CHANGE_EVENT = 'change';
const FAIL_OCR_EVENT = 'fail_ocr';

function updateImage(imageUrl) {
  let image = new Image();
  image.src = imageUrl;
  _state.image = image;
  _state.analyzableImage = new AnalyzableImage(image);
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
  _state.color = _state.analyzableImage.getColor(pos.x, pos.y);
}

function analyzeOcr(pos) {
  if (_analyzing) { return Promise.resolve(); }
  return Promise.resolve().then(()=> {
    _analyzing = true;
    const ocrResult = _state.analyzableImage.analyzeOcr(pos);
    return ocrResult;
  }).then(function (ocrResult) {
    _analyzing = false;
    _state.ocrResult = ocrResult;
  }).catch(function () {
    _analyzing = false;
    return Promise.reject();
  });
}

const AnalyzeViewerStore = assign({}, EventEmitter.prototype, {
  getState: function() {
    return _state;
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  emitFailOcr: function() {
    this.emit(FAIL_OCR_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  addFailOcrListener: function(callback) {
    this.on(FAIL_OCR_EVENT, callback);
  },

  removeFailOcrListener: function(callback) {
    this.removeListener(FAIL_OCR_EVENT, callback);
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
    analyzeOcr(action.pos).then(function() {
      AnalyzeViewerStore.emitChange();
    }).catch(function() {
      AnalyzeViewerStore.emitFailOcr();
    });
    break;

  default:
    // no op
  }
});

export default AnalyzeViewerStore;
