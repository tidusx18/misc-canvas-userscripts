// ==UserScript==
// @name         Download PageViews
// @namespace    http://github.com/tidusx18
// @version      0.0.1
// @description
// @author       Daniel Victoriano <victoriano518@gmail.com>
// @match        https://fiu.instructure.com/accounts/*/users/*
// @require      https://cdnjs.cloudflare.com/ajax/libs/PapaParse/5.0.0/papaparse.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/1.3.8/FileSaver.min.js
// @run-at       default
// @noframes
// @grant        none
// ==/UserScript==

(function() {

	let url = `https://fiu.instructure.com/api/v1/users/${ENV.USER_ID}/page_views?per_page=100`
	let nextURL = ''
	let pageviews = []
	let count = 0

	function clickListener() {

		document.querySelector('.icon-ms-excel').addEventListener( 'click', event => {
			event.preventDefault()
			event.stopPropagation()
			getPageViews(url)
		})

	}

	function parseLinks(links) {

		let results = {}

		let split = links.split(',')

		split.forEach( item => {
			results[item.match(/rel="(.*)"/i)[1]] = item.match(/<(.*)>/i)[1]
		})

		return results

	}

	function getPageViews(url) {

		fetch(url, { credentials: 'include' })
			.then( res => {
			nextURL = parseLinks(res.headers.get('Link'))

			return res.text()
		})
			.then( res => {
				let json = JSON.parse( res.replace('while(1);', '') )
				pageviews = pageviews.concat(json)
				count++
				if(count > 15) { // increase to get more records (1 = 100 recirds)
					pageviews = pageviews.map( item => {
						let newOrder = {}
						newOrder.request_id = item.id
						newOrder.user_id = item.links.user
						newOrder.url = item.url
						newOrder.context_id = item.links.context
						newOrder.context_type = item.context_type
						newOrder.asset_id = item.links.asset
						newOrder.asset_type = item.asset_type
						newOrder.controller = item.controller
						newOrder.action = item.action
						newOrder.interaction_seconds = item.interaction_seconds
						newOrder.created_at = new Date(item.created_at).toLocaleString().replace(',', ' -')
						newOrder.user_request = item.user_request
						newOrder.render_time = item.render_time
						newOrder.user_agent = item.user_agent
						newOrder.participated = item.participated
						newOrder.account_id = item.links.account
						newOrder.real_user_id = item.links.real_user
						newOrder.http_method = item.http_method
						newOrder.remote_ip = item.remote_ip
						return newOrder
					})
					let parsedCSV = Papa.unparse(pageviews)
					downloadCSV(parsedCSV)

					return null
				}
				getPageViews(nextURL.next)
		})

	}

	function downloadCSV(csvFile) {

		let blob = new Blob([csvFile], {type: 'text/csv;charset=utf-8'})
		saveAs(blob, `Pageviews for ${ENV.CONTEXT_USER_DISPLAY_NAME}.csv`)

	}

	clickListener()

})();