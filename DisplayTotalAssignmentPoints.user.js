// ==UserScript==
// @name         Canvas UX: Assignmnets Total Points
// @namespace    http://github.com/tidusx18
// @version      0.2
// @description  Displays the total points for all assignments (regardless if included in graded total).
// @author       Daniel Victoriano <victoriano518@gmail.com>
// @include      /https:\/\/fiu\.instructure\.com/courses/\d{1,8}\/assignments$/
// @run-at       document-idle
// @noframes
// ==/UserScript==

(function() {

    function calculateTotal() {

        let url = document.location.href.replace('.com', '.com/api/v1');

        fetch(url, { credentials: 'include' })
            .then(data => data.text())
            .then(data => {

                let total = 0;
                let assignments = JSON.parse(data.replace('while(1);', ''));

                assignments.forEach((assignment) => {

                    if (assignment.published === false) { return; }
                    if (assignment.omit_from_final_grade === true) { return; }

                    total += assignment.points_possible;

                });

                console.log(`Total Points: ${total}`);
                displayTotal(total);

            });

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