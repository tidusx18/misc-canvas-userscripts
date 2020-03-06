// ==UserScript==
// @name         Canvas Admin Util: My Sanboxes Shortcut
// @namespace    http://github.com/tidusx18
// @version      0.0.1
// @description  Adds a global Canvas navigation menu item that open Canva Admin > Courses with search results for the user's PID.
// @author       Daniel Victoriano <victoriano518@gmail.com>
// @match        https://fiu.instructure.com/*
// @run-at       default
// @noframes
// @grant        none
// ==/UserScript==

(function() {

	const canvasGlobalNav = document.querySelector('ul#menu')
	const canvasUserID = ENV.current_user.id

	function buildNavItem() {
		let li = document.createElement('li')
		let a = document.createElement('a')
		let div = document.createElement('div')

		li.setAttribute('class', 'menu-item ic-app-header__menu-list-item')
		a.setAttribute('id', 'global_nav_my_sandboxes_link')
		a.setAttribute('class', 'ic-app-header__menu-list-link')
		a.setAttribute('target', '_blank')
		div.setAttribute('class', 'menu-item__text')
		div.innerText = 'My Sandboxes'

		li.appendChild(a)
		a.appendChild(div)

		return li
	}

	fetch(`https://fiu.instructure.com/api/v1/users/${canvasUserID}`)
	.then( res => res.text() )
	.then( res => {
		let userSISID = JSON.parse(res.replace('while(1);', '')).sis_user_id.replace('E', '')
		let navItem = buildNavItem()
		navItem.querySelector('a').setAttribute('href', `https://fiu.instructure.com/accounts/1?search_term=${userSISID}`)
		canvasGlobalNav.appendChild(navItem)
	})

})();