import AnalyzableViewer from './components/analyzable_viewer';
import React from 'react';
import jQuery from 'jquery';

// jcrop require global jQuery Object.
if(!window.jQuery) { window.jQuery = window.$ = jQuery; }
require('jcrop');

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
  React.render(
    <AnalyzableViewer id={parseInt(getQueryParams().id)}/>,
    document.getElementById('content')
  );
};
