// ==UserScript==
// @name         Canvas UX: Moderate Quizzes
// @namespace    http://github.com/tidusx18
// @version      0.1
// @description  Opens moderate quiz page for all published quizzes, with the student name provided pre-filtered.
// @author       Daniel Victoriano <victoriano518@gmail.com>
// @match        https://fiu.instructure.com/courses/*/quizzes
// @grant        none
// ==/UserScript==

(function() {

    function init() {

        const quizzes = document.querySelectorAll('#content li.quiz');
        let studentName = prompt('Enter Student Name');

        quizzes.forEach((quiz) => {

            let isPublished = quiz.querySelector('.publish-icon-published ') ? true : false;
            let title = quiz.querySelector('.ig-info .ig-title');

            if (isPublished === false) { return; }

            let page = window.open(title.href);

            page.addEventListener('DOMContentLoaded', moderateQuiz.bind(this, page, studentName));
        });
    }

    function moderateQuiz(page, studentName) {

    	console.log(studentName);

        // let timeLimit = page.document.querySelector(' #content .control-group:nth-child(5)').innerText.replace('Time Limit', '').trim();
        let timeLimit = page.ENV.QUIZ.time_limit;
        let moderateBtn = page.document.querySelector('ul.page-action-list a[href*="moderate"]');

        if (!timeLimit) { return page.close(); }

        page.document.location = `${page.document.location}/moderate?utf8=✓&search_term=${studentName}&commit=Filter`;
    }

    function makeMenu() {

        let header = document.querySelector('.header-bar .header-bar-right');
        let headerFirstChild = document.querySelector('.new-quiz-form');

        let button = document.createElement('button');
        button.setAttribute('class', 'btn btn-primary');
        button.innerText = 'Moderate Quizzes';

        return header.insertBefore(button, headerFirstChild);
    }

    makeMenu().addEventListener('click', init);
})();
