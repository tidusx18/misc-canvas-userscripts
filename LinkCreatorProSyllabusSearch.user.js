// ==UserScript==
// @name         Canvas UI: CreatorPro Edit Quick Link
// @namespace    http://github.com/tidusx18
// @version      0.0.1
// @description
// @author       Daniel Victoriano <victoriano518@gmail.com>
// @match        https://fiu.instructure.com/courses/*
// @run-at       default
// @noframes
// @grant        none
// ==/UserScript==

(function() {

	const menuItem = {
			title: 'Edit Syllabus'
		};

	function makeMenuItem( title, url ) {
		const itemEl = document.createElement( 'li' );
		const linkEl = document.createElement( 'a' );

		itemEl.classList.add( 'section' );
		linkEl.setAttribute( 'href', `${url}` );
		linkEl.setAttribute('target', '_blank');
		linkEl.innerHTML = title;

		itemEl.appendChild( linkEl );

		return itemEl;
	}

	function buildMenu() {
		const menuEl = document.querySelector( '#section-tabs' );
		let itemEl = makeMenuItem( menuItem.title, menuItem.url );

		menuEl.appendChild( document.createElement( 'hr' ) );
		menuEl.appendChild( itemEl );
	}

	function init() {
	let url = document.location.href.match(/https:\/\/fiu.instructure.com\/courses\/\d+/i)[0];
	url = url.replace('.com', '.com/api/v1');

        fetch(url, { credentials: 'include' })
            .then(data => data.text())
            .then(data => {
				let course = JSON.parse(data.replace('while(1);', ''));
				menuItem.url = `https://cp.fiu.edu/?filter=all&q=${course.sis_course_id}&lms=&term=all&status=all`;

				buildMenu();
            });
	}

	init();

})();