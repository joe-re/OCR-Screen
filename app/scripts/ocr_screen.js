import AnalizableViewer from './components/analizable_viewer';
import React from 'react';

window.setScreenshotUrl = (url) => {
  React.render(
    <AnalizableViewer initialImageUrl={url}/>,
    document.getElementById('content')
  );
}
