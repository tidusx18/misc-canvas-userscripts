// ==UserScript==
// @name         Add Default Grade Scheme
// @namespace    https://github.com/tidusx18
// @version      0.1
// @description  Adds a grading scheme with preset values
// @author       Daniel Victoriano <victorianowebdesign@gmail.com>
// @match        https://fiu.instructure.com/courses/*/grading_standards
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function addDefaultScheme() {

    let endPoint = window.location.href;
    let csrf_token = document.cookie.split('csrf_token=')[1];
    let _method = 'POST';
    let request = new XMLHttpRequest();

    request.open(_method, endPoint);

    request.setRequestHeader('Accept', 'application/json, text/javascript, application/json+canvas-string-ids, */*; q=0.01');
    request.setRequestHeader('Accept-Language', 'en-US,en;q=0.9');
    request.setRequestHeader('Cache-Control', 'no-cache');
    request.setRequestHeader('Content-Type', 'application/json');
    request.setRequestHeader('Pragma', 'no-cache');
    request.setRequestHeader('x-Requested-With', 'XMLHttpRequest');
    request.setRequestHeader('X-CSRF-Token', decodeURIComponent(csrf_token));

    request.onload = () => {

    	if(request.status === 200) {

    		alert('Grading Scheme Added');
    		document.location.reload()
    	}

    	if(request.status !== 200) { alert('There was an error, please try again.'); }
    };

    request.send(JSON.stringify({ "grading_standard": { "permissions": { "manage": true }, "title": 'Default Grading Scheme', "data": [
                ["A", 0.935],
                ["A-", 0.895],
                ["B+", 0.865],
                ["B", 0.835],
                ["B-", 0.795],
                ["C+", 0.765],
                ["C", 0.695],
                ["D", 0.595],
                ["F", 0]
            ] } }));
}

function makeMenu() {

	let header = document.querySelector('.pull-right');

	let button = document.createElement('a');
	button.setAttribute('class', 'Button pull-right add_standard_button');
	button.setAttribute('style', 'margin-right: 5px;');
	button.innerText = 'Add Default Scheme';

	return header.appendChild(button);
}

function init() {

	makeMenu().addEventListener( 'click', addDefaultScheme );
}

init();

})();