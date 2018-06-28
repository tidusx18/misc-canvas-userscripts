// ==UserScript==
// @name         Canvas UX: Window Title
// @description  Prepends course name to document title on edit pages.
// @namespace    http://github.com/tidusx18
// @author       Daniel Victoriano <victoriano518@gmail.com>
// @version      0.1
// @match        https://fiu.instructure.com/courses/*/edit*
// @grant        none
// ==/UserScript==

(function() {

	let courseEndpoint = document.location.href.match(/https.+\/courses\/\d{1,6}/i)[0].replace('.com', '.com/api/v1');

	fetch(courseEndpoint, {credentials: 'include'})
		.then(data => data.text())
		.then(data => { document.title = `${JSON.parse(data.replace('while(1);', '')).name} - ${document.title}` })
})();