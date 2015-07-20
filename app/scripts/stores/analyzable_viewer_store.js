import AppDispatcher from '../dispatcher/app_dispatcher';
import AnalyzableViewerConstants from '../constants/analyze_viewer_constants';
import {EventEmitter} from 'event';

let _state = {};
const CHANGE_EVENT = 'change';

function cropImage(srcImageUrl, c) {
}

function changePos(pos) {
}

function analyzeOcr(pos) {
}

class AnalyzeViewerStore extends EventEmitter {
  getState() {
    return _state;
  }

  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
}

AppDispatcher.register(function(action) {
  switch(action.actionType) {
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
