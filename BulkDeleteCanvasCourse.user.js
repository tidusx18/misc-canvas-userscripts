// ==UserScript==
// @name         Bulk Delete Canvas Course
// @namespace    http://github.com/tidusx18
// @version      0.1
// @description  Bulk deletes modules and module items in a Canvas course.
// @author       Daniel Victoriano <victoriano518@gmail.com>
// @match        https://fiu.instructure.com/courses/*/modules
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Use from home page

let courseID = window.ENV.COURSE_ID;
let baseURL = `${document.location.origin}/courses/${courseID}`;

const endpoints = {
	'modules': '/modules',
	'assignments': '/assignments',
	'quizzes': '/quizzes',
	'pages': '/pages',
	'discussions': '/discussion_topics'
};

function goto(url) {
	return window.open(url);
}

function bulkDeleteModules() {
	let page = goto(`${baseURL}${endpoints.modules}`);
	console.log(`${baseURL}${endpoints.modules}`);

	page.addEventListener('load', () => {

		let modules = page.document.querySelectorAll('.context_module');

		modules.forEach( function(module) {
			let itemId = module.id.replace('context_module_', '');

			let queryURL = `${page.document.location.href}/${itemId}`;
			makeRequest(queryURL);
			console.log('Delete module...');
		});

		page.document.location.reload();
	});
}

function bulkDeleteAssignments() {
	let page = goto(`${baseURL}${endpoints.assignments}`);
	console.log(`${baseURL}${endpoints.assignments}`);

	page.addEventListener('load', () => {

		let assignments = page.document.querySelectorAll('.assignment > div');

		assignments.forEach( function(assignment) {
			let itemId = assignment.id.replace('assignment_', '');

			let queryURL = `${page.document.location.href}/${itemId}`;
			makeRequest(queryURL);
			console.log('Delete assignment...');
		});

		page.document.location.reload();
	});
}

function bulkDeleteQuizzes() {
	let page = goto(`${baseURL}${endpoints.quizzes}`);

	page.addEventListener('load', () => {

		let quizzes = page.document.querySelectorAll('.quiz > div');

		quizzes.forEach( function(quiz) {
			let itemId = quiz.id.replace('summary_quiz_', '');

			let queryURL = `${page.document.location.href}/${itemId}`;
			makeRequest(queryURL);
			console.log('Delete quiz...');
		});

		page.document.location.reload();
	});
}

function bulkDeletePages() {
	let page = goto(`${baseURL}${endpoints.pages}`);

	page.addEventListener( 'load', () => {
		setTimeout( () => {

			let pages = page.document.querySelectorAll('.batch-delete');
			let deleteButton = page.document.querySelector('.btn-danger');

			if(!deleteButton) {

				console.warn('Install "Batch Delete" userscript to bulk delete pages.');
				return;
			}

			for(let item of pages) {
			  item.click();
			}

			deleteButton.click();
			console.log('Deleting pages...');
		}, 4000);
	});
}

function bulkDeleteDiscussions() {
	let page = goto(`${baseURL}${endpoints.discussions}`);

	page.addEventListener('load', () => {

		let discussions = page.document.querySelectorAll('.discussion > div');

		discussions.forEach( function(discussion) {
			let itemId = discussion.id.replace('_discussion_content', '');

			let queryURL = `${page.document.location.href}/${itemId}`;
			makeRequest(queryURL);
			console.log('Delete discusion...');
		});

		page.document.location.reload();
	});
}

function makeRequest(url) {
	let csrf_token = document.cookie.split('csrf_token=')[1];
	let _method = 'DELETE';
	let queryURL = `${url}?_method=${_method}&authenticity_token=${csrf_token}`;
	let request = new XMLHttpRequest();

	request.open(_method, queryURL);

	request.setRequestHeader('Accept', 'application/json, text/javascript, application/json+canvas-string-ids, */*; q=0.01');
	request.setRequestHeader('Accept-Language', 'en-US,en;q=0.9');
	request.setRequestHeader('Cache-Control', 'no-cache');
	request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
	request.setRequestHeader('Pragma', 'no-cache');
	request.setRequestHeader('x-Requested-With', 'XMLHttpRequest');

	request.send();
}

function makeMenu() {

	let header = document.querySelector('.header-bar-right__buttons');

	let button = document.createElement('a');
	button.setAttribute('class', 'btn btn-danger');
	button.setAttribute('style', 'margin-right: 5px;');
	button.innerText = 'Bulk Delete Course';

	return header.appendChild(button);
}

function init() {

	bulkDeleteModules();
	bulkDeleteAssignments();
	bulkDeleteQuizzes();
	bulkDeletePages();
	bulkDeleteDiscussions();
}

makeMenu().addEventListener( 'click', init );

})();