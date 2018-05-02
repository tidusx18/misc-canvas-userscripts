// ==UserScript==
// @name         Canvas UX: Submit/Save Hotkey (Ctrl + s)
// @namespace    https://github.com/tidusx18
// @version      0.0.2
// @description  Overrides browser default action for "Ctrl + s" hotkey to submit/save the current form/page in Canvas.
// @match        https://fiu.instructure.com/*edit*
// @grant        none
// ==/UserScript==

(function() {
	'use strict';
	function submitPage(e) {
		var selectors = [
			'button[type="submit"]', // General 'Save' buttons
			'\.button_type_submit', // Module Item Edit
			'\.add_item_button', // Add Module Item
			'\.create_assignment', // Edit Assignment Item
			'.save_quiz_button', // Edit Quiz
			'\.submit' // Pages
		];

		if (e.keyCode === 83 && (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)) {
			e.preventDefault();
			for(let selector of selectors) {
				let selected = document.querySelector(selector);
				if(selected) {
					console.log('Button Clicked: ', selected);
					selected.click();
				} else {
					console.log('No matching Submit button found for: ', selector);
				}
			}
		}
	}

	document.addEventListener("keydown", function(event) {
		submitPage(event);
	}, false);

	// NOTE: Does not work with TinyMCE editors that are initialized via AJAX without page reload
	window.addEventListener('load', function(event) {
		if(tinymce) {
			let editors = tinymce.editors;

			for(let editor of editors) {
				console.log(`(Save/Submit Hotkey) - Listener added to: ${editor.id}`);
				// console.log(editor);
				editor.contentDocument.addEventListener( "keydown", function(event) {
					console.log('Event caught');
					submitPage(event);
				});
			}
		}

	});
})();