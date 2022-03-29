// ==UserScript==
// @name        Printer friendly AcWing
// @namespace   work.pythoner
// @match       *://*.acwing.com/*
// @grant       GM_registerMenuCommand
// @version     1.0
// @author      Hanson Hu
// @description 3/28/2022, 2:18:11 PM
// @homepage    https://pythoner.work
// @icon        https://pythoner.work/favicon.ico
// @license     MIT
// ==/UserScript==

GM_registerMenuCommand('Amend the page', onClick);

function getToday() {
    let ret = new Date().toISOString().slice(0, 10);
    return ret;
}

function onClick() {
    $('.navbar').remove();
    $('.nav').remove();
    $('.base_body').css('padding-top', '0');
    $('.panel').css('border', '0');
    $('.fs-gui-taskbar').remove();
    $('#code_tool_bar').remove();
    $('#code_editor').remove();
    $('#submit_code_btn').remove();
    $('#run_code_btn').remove();
    $('#acwing_footer').remove();
    $('br').remove();
    $('hr').remove();

    $('#1024-activity').remove();

    let elem = $('<div style='position: absolute; top: 12px; right: 12px;'>' + getToday() + '</div>');
    $('body').append(elem);
}
