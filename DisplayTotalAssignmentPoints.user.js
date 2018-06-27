// ==UserScript==
// @name         Canvas UX: Assignmnets Total Points
// @namespace    http://github.com/tidusx18
// @version      0.1
// @description  Displays the total points for all assignments (regardless if included in graded total).
// @author       Daniel Victoriano <victoriano518@gmail.com>
// @include      /https:\/\/fiu\.instructure\.com/courses/\d{1,8}\/assignments$/
// @run-at       document-idle
// @noframes
// ==/UserScript==

(function() {

	function calculateTotal() {

		let total = 0;

		document.querySelectorAll('.ig-details__item.js-score .non-screenreader').forEach( (value) => {
			total += new Number(value.innerText.replace(' pts', ''));
		});

		displayTotal(total)

	}


	function displayTotal(total) {

		let header = document.querySelector('.header-bar .header-bar-right');
		let headerFirstChild = document.querySelector('.header-bar .header-bar-right')[0];

		let div = document.createElement('div');
		div.setAttribute('style', 'display: inline; float: left; margin: 8px 20px 0 0; font-weight: bold;');
		div.innerText = `Total Points: ${total}`;

		header.insertBefore(div, headerFirstChild);

	}


	window.addEventListener('load', calculateTotal);

})();