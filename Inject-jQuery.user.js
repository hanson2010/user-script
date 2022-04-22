// ==UserScript==
// @name        Inject jQuery script
// @namespace   Violentmonkey Scripts
// @match       *://*.acwing.com/*
// @grant       none
// @version     1.0
// @author      Hanson Hu
// @description 3/29/2022, 2:20:04 PM
// @homepage    https://blog.pythoner.work
// @icon        https://blog.pythoner.work/favicon.ico
// @license     MIT
// ==/UserScript==

/*
function injectJQuery(callback) {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://cdn.jsdelivr.net/npm/jquery@3/dist/jquery.min.js';
    if (script.readyState) {
        // ie
        script.onreadystatechange = function () {
            if (script.readyState == 'loaded' || script.readyState == 'complete') {
                script.onreadystatechange = null;
                callback();
            };
        }
    } else {
        script.onload = function () {
            callback();
        };
    };
    document.body.appendChild(script);
}
*/

function injectJQuery(callback) {
    var script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/jquery@3/dist/jquery.min.js';
    document.getElementsByTagName('head')[0].appendChild(script);
    script.addEventListener('load', function() {
        jQuery = unsafeWindow['jQuery'];
        jQuery.noConflict();
        callback();
    }, false);
}

function callback() {
    alert('called');
}

injectJQuery(callback);
