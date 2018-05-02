// ==UserScript==
// @name         Canvas UX: Load 100 Results in "Pages"
// @namespace    http://github.com/tidusx18
// @version      0.0.1
// @description  Loads 100 results per page in Canvas "Pages" section.
// @author       Daniel Victoriano < victoriano518@gmail.com >
// @match        https://fiu.instructure.com/courses/*/pages
// @grant        none
// @noframes
// ==/UserScript==

(function() {

    let open = window.XMLHttpRequest.prototype.open;

    function openReplacement( method, url, async, user, password ) {

		if( url.includes( 'per_page' ) ) { url = url.replace( 'per_page=30', 'per_page=100' ); }

        open.apply( this, arguments );

		window.XMLHttpRequest.prototype.open = open;
    }

	window.XMLHttpRequest.prototype.open = openReplacement;
})();