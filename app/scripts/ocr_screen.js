import AnalizableViewer from './components/analizable_viewer';
import React from 'react';

function getQueryParams() {
    let params = {};
    const hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(let hash of hashes) {
        let pair = hash.split('=');
        params[pair[0]] = pair[1];
    }
    return params;
}

window.onload = function() {
  console.log('o');
  chrome.runtime.sendMessage(parseInt(getQueryParams().id),
    function(response) {
      if(response === null) {
        window.setTimeout(function() {
          window.location.reload()
        }, 1000);
      } else {
        React.render(
          <AnalizableViewer initialImageUrl={response.url}/>,
          document.getElementById('content')
        );
      }
    }
  );
};
