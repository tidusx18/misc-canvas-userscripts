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
	input.setAttribute('type', 'text');
	input.setAttribute('style', 'margin: 0 0 0 10px');
	input.setAttribute('autofocus', '');

	let button = document.createElement('button');
	button.setAttribute('class', 'btn btn-primary');
	button.innerText = 'Filter';

	header.appendChild(button);
	header.appendChild(input);

	button.addEventListener('click', filter);
	input.addEventListener('keypress', filter);

	function filter(event) {

		if(event.type !== 'click' && event.key !== 'Enter') { return; }

		rows.forEach( (row) => {

			let regex = new RegExp(input.value, 'i');
			let isDisplayNone = row.style.display;

			if(!regex.test(row.innerText)) { row.style.display = 'none'; }
			if(regex.test(row.innerText) && isDisplayNone) { row.removeAttribute('style'); }

		});

	}

})();