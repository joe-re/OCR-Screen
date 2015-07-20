import AppDispatcher from '../dispatcher/app_dispatcher';
import AnalyzableViewerConstants from '../constants/analyze_viewer_constants';

class AnalizableViewerAction {
  updateImage(dataUrl) {
    AppDispatcher.dispatch({
      actionType: AnalyzableViewerConstants.UPDATE_IMAGE,
      dataUrl: dataUrl
    });
  }
  changePos(pos) {
    AppDispatcher.dispatch({
      actionType: AnalyzableViewerConstants.CHANGE_POS,
      pos: pos
    });
  }
  analyzeOcr(pos) {
    AppDispatcher.dispatch({
      actionType: AnalyzableViewerConstants.ANALYZE_OCR,
      pos: pos
    });
  }
}

export default AnalizableViewerAction;
