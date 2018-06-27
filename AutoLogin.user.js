// ==UserScript==
// @name         Canvas UX: Auto Login
// @namespace    http://github.com/tidusx18
// @version      0.1
// @description  Automatically clicks "Login" button.
// @author       Daniel Victoriano <victoriano518@gmail.com>
// @match        https://auth.fiu.edu/cas/login?service=*fiu.instructure.com*login*
// @run-at       default
// @grant        none
// ==/UserScript==

(function() {

		setTimeout( () => {
			let usernameInput = document.querySelector('#username');
			let loginButton = document.querySelector('#login_form input.btn-submit');

			usernameInput.focus();
			loginButton.click();

		}, 2000);

})();