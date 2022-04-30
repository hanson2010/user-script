// ==UserScript==
// @name        AcWing Helper
// @namespace   work.pythoner
// @match       *://*.acwing.com/*
// @require     https://cdn.jsdelivr.net/npm/showdown@2.1.0/dist/showdown.min.js
// @run-at      document-end
// @grant       GM_registerMenuCommand
// @grant       GM_setClipboard
// @version     1.0
// @author      Hanson Hu
// @description 4/29/2022, 1:09:11 PM
// @homepage    https://blog.pythoner.work
// @icon        https://blog.pythoner.work/favicon.ico
// @license     MIT
// ==/UserScript==

(function() {

    function getToday() {
        // local tz
        let ret = new Date().toLocaleString('sv').slice(0, 10);
        return ret;
    }

    function onClickPrint() {
        $('.navbar').remove();
        $('.nav').remove();
        $('.base_body').css('padding-top', '0');
        $('.panel').css('border', '0');
        $(".file-explorer-main-field-item").remove();
        $('.fs-gui-taskbar').remove();
        $('#code_tool_bar').remove();
        $('#code_editor').remove();
        $('#submit_code_btn').remove();
        $('#run_code_btn').remove();
        $('#acwing_footer').remove();
        $('br').remove();
        $('hr').remove();

        $('#1024-activity').remove();

        let elem = $('<div style="position: absolute; top: 2px; right: 2px; ' +
                     'font-family: Bahnschrift, Trebuchet MS, sans-serif; ' +
                     'font-weight: lighter; font-stretch: condensed; ' +
                     'font-size: 24px;">' +
                     getToday() +
                     '</div>');
        $('body').append(elem);
    }


    function onClickMarkdown() {
        let temp = '# ' + title + '\n\n' + md;
        GM_setClipboard(temp);
        let elem = $('<div style="padding: 1rem; color: red;">Copied to clipboard.' +
                     '</div><pre style="margin: 1rem; white-space: pre-wrap; ' +
                     'word-wrap: break-word; font-family: Consolas, monospace; ' +
                     'font-size: 16px;"><code class="nohighlight">' +
                     temp +
                     '</code></pre>');
        $('.section-martor').append(elem);
    }

    GM_registerMenuCommand('Prepare to print', onClickPrint);
    GM_registerMenuCommand('Show Markdown', onClickMarkdown);

    let title = 'AcWing-' + $('.problem-content-title').html().trim(),
        text = $('.martor-preview').html().trim();
    text = text
               // Avoid the bug of showdown dealing with <br />
               // https://github.com/showdownjs/showdown/issues/649
               .replace(/<br[ ]?[/]?>\s*/g, '{line-break}')
               .replace(/[ ]class=".*?"/g, '')
               .replace(/<span.*?>/g, '')
               .replace(/<\/span>/g, '');
    let converter = new showdown.Converter();
    converter.setOption('simpleLineBreaks', true);
    let md = converter.makeMarkdown(text);
    md = md.replace(/{line-break}/g, '  \n');

})();
