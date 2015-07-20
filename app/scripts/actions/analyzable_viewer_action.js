import AppDispatcher from '../dispatcher/app_dispatcher';
import AnalyzableViewerConstants from '../constants/analyze_viewer_constants';

const AnalyzableViewerAction = {
  updateImage: function(imageUrl) {
    AppDispatcher.dispatch({
      actionType: AnalyzableViewerConstants.UPDATE_IMAGE,
      imageUrl: imageUrl
    });
  },

  cropImage: function(c) {
    AppDispatcher.dispatch({
      actionType: AnalyzableViewerConstants.CROP_IMAGE,
      c: c
    });
  },

  changePos: function(pos) {
    AppDispatcher.dispatch({
      actionType: AnalyzableViewerConstants.CHANGE_POS,
      pos: pos
    });
  },

  analyzeOcr: function(pos) {
    AppDispatcher.dispatch({
      actionType: AnalyzableViewerConstants.ANALYZE_OCR,
      pos: pos
    });
  }
};

export default AnalyzableViewerAction;
