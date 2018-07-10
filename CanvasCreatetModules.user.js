// ==UserScript==
// @name         Canvas UTIL - Create Weekly Modules
// @namespace    https://github.com/tidusx18
// @version      0.0.1
// @description  Creates weekly modules with titles such as 'Week 1 | Monday 8/20 - Tuesday 8/28'.
// @author       Daniel Victoriano <victoriano518@gmail.com>
// @match        https://fiu.instructure.com/courses/*/modules
// @run-at       default
// @noframes
// @grant        none
// ==/UserScript==

let endPoint = window.location.href
let csrf_token = document.cookie.split('csrf_token=')[1]
let _method = 'POST'
let utf8 = '%E2%9C%93'
let authenticity_token = csrf_token
// let unlockAt = 'context_module[unlock_at]=2018-06-30T09:00:00.000Z';
// let modulePrereq = ''

let names = [
    'Week 1 | Monday 8/20 - Tuesday 8/28',
    'Week 2 | Monday 8/27 - Tuesday 9/4',
    'Week 3 | Monday 9/3 - Tuesday 9/11',
    'Week 4 | Monday 9/10 - Tuesday 9/18',
    'Week 5 | Monday 9/17 - Tuesday 9/25',
    'Week 6 | Monday 9/24 - Tuesday 10/2',
    'Week 7 | Monday 10/1 - Tuesday 10/9 ',
    'Week 8 | Monday 10/8 - Tuesday 10/16',
    'Week 9 | Monday 10/15 - Tuesday 10/23',
    'Week 10 | Monday 10/22 - Tuesday 10/30',
    'Week 11 | Monday 10/29 - Tuesday 11/6',
    'Week 12 | Monday 11/5 - Tuesday 11/13',
    'Week 13 | Monday 11/12 - Tuesday 11/20',
    'Week 14 | Monday 11/19 - Tuesday 11/27',
    'Week 15 | Monday 11/26 - Tuesday 12/4'
]

function createModules() {

    names.forEach(function(name) {
        let queryString = `${endPoint}?_method=${_method}&utf8=${utf8}&authenticity_token=${authenticity_token}&name=${name}&context_module%5Bname%5D=${name}`

        let request = new XMLHttpRequest();
        request.open('POST', queryString)

        request.setRequestHeader('Accept', 'application/json, text/javascript, application/json+canvas-string-ids, */*; q=0.01')
        request.setRequestHeader('Accept-Language', 'en-US,en;q=0.9')
        request.setRequestHeader('Cache-Control', 'no-cache')
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')
        request.setRequestHeader('Pragma', 'no-cache')
        request.setRequestHeader('x-Requested-With', 'XMLHttpRequest')

        request.send()
    });

}

function makeMenu() {

    let header = document.querySelector('.header-bar .header-bar-right__buttons');
    let headerFirstChild = document.querySelectorAll('.header-bar .header-bar-right__buttons > *')[0];

    let button = document.createElement('button');
    button.setAttribute('class', 'btn btn-primary');
    button.setAttribute('style', 'margin-right: 4px;');
    button.innerText = 'Create Weekly Modules';

    return header.insertBefore(button, headerFirstChild);
}

makeMenu().addEventListener('click', createModules());