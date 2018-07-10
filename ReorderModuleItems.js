// ==UserScript==
// @name         Canvas UTIL - Batch Move Module Items
// @namespace    https://github.com/tidusx18
// @version      0.0.1
// @description  Batch move module items.
// @author       Daniel Victoriano <victoriano518@gmail.com>
// @match        https://fiu.instructure.com/courses/*/modules
// @run-at       default
// @noframes
// ==/UserScript==

(function() {
    'use strict';

    function getModuleItems(moduleId) {

        let endPoint = `${window.location.href.replace('.com', '.com/api/v1')}/${moduleId}/items?per_page=80`;

        return fetch(endPoint, { credentials: 'include' });

    }

    function reorderModuleItems() {

        // console.log('value of this: ', this.id);

        getModuleItems(this.id)
            .then(response => response.text())
            .then(data => {

            let items = JSON.parse(data.replace('while(1);', ''));

            let itemIds = items.map(item => item.id);

            document.querySelectorAll('.ig-info').forEach((item) => {
                item.querySelector('.module-item-title').style.borderBottom ? itemIds.push(item.querySelector('.item_name a[class*="title"]').href.split('/').pop()) : '';
            });

            itemIds.join();

            console.log('items IDs', itemIds);

            let endPoint = `${window.location.href}/${this.id}/reorder`;
            let csrf_token = document.cookie.split('csrf_token=')[1];

            fetch(endPoint, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                    'X-CSRF-Token': csrf_token
                },
                body: `order=${itemIds}&_method=POST&authenticity_token=${csrf_token}`
            })
                .then(() => {

                items = document.querySelectorAll('.ig-info');

                items.forEach(item => {

                    item.querySelector('.module-item-title').style.borderBottom = '';
                    document.location.reload();

                });
            });

        });

    }


    let items = document.querySelectorAll('.ig-info');

    items.forEach(item => {
        item.addEventListener('click', (e) => {
            e.target.style.borderBottom ? e.target.style.borderBottom = '' : e.target.style.borderBottom = '1px solid #008312'
        });
    });


    let moduleHeaders = document.querySelectorAll('#context_modules .ig-header');

    moduleHeaders.forEach((moduleHeader) => {

        let moduleHeaderId = { id: moduleHeader.id };
        let optionsMenu = moduleHeader.querySelector('.al-options');

        let listItem = document.createElement('li');
        listItem.setAttribute('class', 'ui-menu-item');

        let link = document.createElement('a');
        link.setAttribute('class', 'ui-corner-all');
        link.setAttribute('style', 'cursor: pointer');
        link.innerText = 'Move Selected Items Here';
        link.addEventListener('click', reorderModuleItems.bind(moduleHeaderId));

        listItem.appendChild(link);
        optionsMenu.appendChild(listItem);

    });
})();