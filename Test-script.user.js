// ==UserScript==
// @name        Test script
// @namespace   work.pythoner
// @match       *://*.baidu.com/*
// @grant       none
// @version     1.0
// @author      Hanson Hu
// @description 3/1/2021, 11:07:05 PM
// @require     https://cdn.bootcdn.net/ajax/libs/jquery/3.5.1/jquery.min.js
// ==/UserScript==
(function() {
    'use strict';
    let $ = $ || window.$;
    $(function() {
        $(document).attr('title', '暴力猴');
    });
})();
