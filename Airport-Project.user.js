// ==UserScript==
// @name         Airport Project
// @namespace    http://pythoner.work/
// @version      0.1
// @description  Show project info card by hovering over it
// @author       Haisheng HU
// @match        http://*/*
// @grant        GM_getResourceText
// @grant        GM_addStyle
// @require      http://code.jquery.com/ui/1.12.1/jquery-ui.js
// @resource     jquicss http://code.jquery.com/ui/1.12.1/themes/smoothness/jquery-ui.css
// ==/UserScript==

(function() {
    var newCSS = GM_getResourceText('jquicss');
    GM_addStyle(newCSS);
    GM_addStyle('.ui-tooltip {font-size:10pt;font-family:Calibri;}');

    var reg = /ABD-\d{4,}/;
    var titles = {};
    $('div#body').on('mouseover', 'td, div, p, span, a', function(evt) {
    	var project = evt.target;
        var href = project.href;
        if (!reg.test($(project).text())) return;
        if (titles[href]) return;
        // open tooltip
        project.title = '';
        titles[href] = true;
        $.get(href, null, function(data) {
            project.title = data;
            $(project).tooltip({content: function() {
                return $(this).prop('title');
            }});
            $(project).tooltip('open');
        });
    });
})();
