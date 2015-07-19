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

console.log(getQueryParams());
window.onload = function() {
  chrome.runtime.sendMessage(getQueryParams(),
    function(response) {
      console.log(response);
      for (let item of response) {
        if (item.id === parseInt(getQueryParams().id)) {
          React.render(
            <AnalizableViewer initialImageUrl={item.url}/>,
            document.getElementById('content')
          );
        }
      }
    }
  );
};
