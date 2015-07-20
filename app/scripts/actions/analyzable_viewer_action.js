import AppDispatcher from '../dispatcher/app_dispatcher';
import AnalyzableViewerConstants from '../constants/analyze_viewer_constants';

const AnalizableViewerAction = {
  updateImage: function(imageUrl) {
    AppDispatcher.dispatch({
      actionType: AnalyzableViewerConstants.UPDATE_IMAGE,
      imageUrl: imageUrl
    });
  },

  cropImage: function(srcImageUrl, c) {
    AppDispatcher.dispatch({
      actionType: AnalyzableViewerConstants.CROP_IMAGE,
      srcImageUrl: srcImageUrl,
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

export default AnalizableViewerAction;
