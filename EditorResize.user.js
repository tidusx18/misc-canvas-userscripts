// ==UserScript==
// @name         Canvas UX: Editor Resize
// @namespace    http://github.com/tidusx18
// @version      0.0.1
// @description  Maintains active editor height of 60% of the parent window's inner (content) height.
// @author       Daniel Victoriano <victoriano518@gmail.com>
// @match        https://fiu.instructure.com/courses/*/edit
// @run-at       default
// @grant        none
// ==/UserScript==

(function() {

	window.addEventListener('load', function(event) {
		let activeEditor = tinymce.activeEditor
		activeEditor.on('ResizeEditor', e => {
			activeEditor.editorContainer.style.height = `${window.innerHeight*.6}px`
		})
	})

})();