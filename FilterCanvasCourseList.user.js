// ==UserScript==
// @name         Canvas Util: Filter Course List
// @namespace    https://github.com/tidusx18
// @version      0.0.1
// @description  Filters courses based on user input in course list page
// @author       Daniel Victoriano <victoriano518@gmail.com>
// @match        https://fiu.instructure.com/courses
// @grant        none
// ==/UserScript==

(function() {

	let rows = document.querySelectorAll('#content table tbody tr');
	let header = document.querySelector('.header-bar');
	let input = document.createElement('input');
	let button = document.createElement('button');

	button.innerText = 'Submit';

	header.appendChild(input);
	header.appendChild(button);

	button.addEventListener('click', filter);

	function filter() {

		rows.forEach( (row) => {

			let regex = new RegExp(input.value);

			if(!regex.test(row.innerText)) { row.style = 'display: none;' }

		});

	}

})();