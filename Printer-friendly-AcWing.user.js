// ==UserScript==
// @name        Printer friendly AcWing
// @namespace   work.pythoner
// @match       *://*.acwing.com/*
// @grant       GM_registerMenuCommand
// @version     1.4
// @author      Hanson Hu
// @description 3/28/2022, 2:18:11 PM
// @homepage    https://blog.pythoner.work
// @icon        https://blog.pythoner.work/favicon.ico
// @license     MIT
// ==/UserScript==

GM_registerMenuCommand('Amend the page', onClick);

function getToday() {
    // local tz
    let ret = new Date().toLocaleString('sv').slice(0, 10);
    return ret;
}

function onClick() {
    $('.navbar').remove();
    $('.nav').remove();
    $('.base_body').css('padding-top', '0');
    $('.panel').css('border', '0');
    $(".file-explorer-main-field-item").remove();
    $('.fs-gui-taskbar').remove();
    $('.btn-success').remove();
    $('.btn-default').remove();
    $('#code_tool_bar').remove();
    $('#code_editor').remove();
    $('#submit_code_btn').remove();
    $('#run_code_btn').remove();
    $('#acwing_footer').remove();
    $('br').remove();
    $('hr').remove();

    $('#1024-activity').remove();

    let elem = $('<div style="position: absolute; top: 2px; right: 2px; font-family: Bahnschrift, Trebuchet MS, sans-serif; font-weight: lighter; font-stretch: condensed; font-size: 24px;">' + getToday() + '</div>');
    $("body").append(elem);
}
