// ==UserScript==
// @name        Inject jQuery
// @namespace   work.pythoner
// @match       *://*baidu*/*
// @grant       none
// @version     1.0
// @author      Hanson Hu
// @description 3/2/2021, 9:14:09 AM
// @icon        https://www.pythoner.work/favicon.ico
// ==/UserScript==
function injectJQuery (url, callback) {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    if (script.readyState) {
        // ie
        script.onreadystatechange = function () {
            if (script.readyState == 'loaded' || script.readyState == 'complete') {
                script.onreadystatechange = null;
                callback();
            };
        }
    } else {
        // etc
        script.onload = function () {
            callback();
        };
    };
    script.src = url;
    document.body.appendChild(script);
}
