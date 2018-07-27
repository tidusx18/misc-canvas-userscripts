// ==UserScript==
// @name         Canvas UI: Link to CreatorPro Syllabus Search
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

	const menuItems = [
		{
			title: 'Edit Syllabus',
			url: buildCreatorProUrl(),
			addToTop: true
		}
	];

	function buildMenu() {
		const menuEl = document.querySelector( '#section-tabs' );

		menuEl.appendChild( document.createElement( 'hr' ) );

		for ( let i = 0; i < menuItems.length; i++ ) {
			let itemEl = makeMenuItem( menuItems[ i ].title, menuItems[ i ].url, menuItems[ i ].method );
			menuEl.appendChild( itemEl );
		}
	}

	function makeMenuItem( title, url, method ) {
		const baseUrl = window.location.href.split( '/courses/' )[ 0 ];
		const courseID = window.location.href.split( '/' )[ 4 ];
		const itemEl = document.createElement( 'li' );
		const linkEl = document.createElement( 'a' );

		itemEl.classList.add( 'section' );
		linkEl.setAttribute( 'href', `${url}` );
		linkEl.setAttribute('target', '_blank');

		if ( method ) {
			// Unsure if other methods work. Currently only tested post
			linkEl.setAttribute( 'data-method', method );
		}

		linkEl.innerHTML = title;
		itemEl.appendChild( linkEl );

		return itemEl;
	}

	function buildCreatorProUrl() {

	let url = document.location.href.match(/https:\/\/fiu.instructure.com\/courses\/\d+/i)[0];
	url = document.location.href.replace('.com', '.com/api/v1');

        fetch(`${url}?per_page=80`, { credentials: 'include' })
            .then(data => data.text())
            .then(data => {

			let course = JSON.parse(data.replace('while(1);', ''));

			// menuItems[0].url = `${course.sis_course_id}`;
			menuItems[0].url = `https://cp.fiu.edu/?filter=all&q=${course.sis_course_id}&lms=&term=all&status=all`;

			buildMenu();

            });

	}

})();
