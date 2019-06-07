// ==UserScript==
// @name         Canvas UX: Availability/Due Times
// @namespace    http://github.com/tidusx18
// @version      0.0.1
// @description
// @author       Daniel Victoriano <victoriano518@gmail.com>
// @match        https://fiu.instructure.com/courses/*/assignments/*/edit*
// @match        https://fiu.instructure.com/courses/*/quizzes/*/edit*
// @match        https://fiu.instructure.com/courses/*/discussion_topics/*/edit*
// @run-at       default
// @noframes
// @grant        none
// ==/UserScript==

(function() {

    let start = document.querySelector('.from .UnlockLockInput');
    let until = document.querySelector('.to .UnlockLockInput');
    let due = document.querySelector('.DueDateInput');

    start.removeAttribute('title');
    until.removeAttribute('title');
    due.removeAttribute('title');

    function replaceTime() {
        start.value = start.value.replace('12am', '5am');
        start.dispatchEvent(new Event('focus', { bubbles: true }));
        start.dispatchEvent(new Event('change', { bubbles: true }));

        until.value = until.value.replace('59pm', '55pm');
        until.dispatchEvent(new Event('focus', { bubbles: true }));
        until.dispatchEvent(new Event('change', { bubbles: true }));

        due.value = due.value.replace('59pm', '55pm');
        due.dispatchEvent(new Event('focus', { bubbles: true }));
        due.dispatchEvent(new Event('change', { bubbles: true }));
    }

    start.addEventListener('blur', replaceTime, false);
    until.addEventListener('blur', replaceTime, false);
    due.addEventListener('blur', replaceTime, false);

})();