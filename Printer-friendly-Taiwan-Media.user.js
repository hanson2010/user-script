// ==UserScript==
// @name        Printer friendly Taiwan Media
// @namespace   work.pythoner
// @match       *://*.appledaily.com/*
// @match       *://*.chinatimes.com/*
// @match       *://*.cna.com.tw/*
// @match       *://*.ctitv.com.tw/*
// @match       *://*.ettoday.net/*
// @match       *://*.ltn.com.tw/*
// @match       *://*.moneynet.com.tw/*
// @match       *://*.setn.com/*
// @match       *://*.times.hinet.net/news/*
// @match       *://*.udn.com/news/*
// @match       *://*.yam.com/Article/*
// @match       *://news.pchome.com.tw/*
// @match       *://today.line.me/*
// @match       *://tw.news.yahoo.com/*
// @grant       GM_registerMenuCommand
// @version     0.1
// @author      Hanson Hu
// @description 4/16/2022, 12:13:00 PM
// @homepage    https://blog.pythoner.work
// @icon        https://blog.pythoner.work/favicon.ico
// @license     MIT
// ==/UserScript==

GM_registerMenuCommand('Amend the page', onClick);

function clearCna() {

}

function clearUdn() {
    $('.header>.tools-box').remove();
    $('.header>.navigation-wrapper').remove();
    $('.breaking-news__wrapper').remove();
    $('#ads-index-top--mobile').remove();

    $('.wrapper-left>#ads-superBanner').remove();
    $('.wrapper-left>#news_txtdown').remove();
    $('.wrapper-left>#udn-520x290').remove();
    $('.wrapper-left>#ads-Mobile_300x250--article').remove();
    $('.wrapper-left>.article-content__ads--bd').remove();
    $('.wrapper-left>.more-news').remove();
    $('.wrapper-left>.related-news').remove();
    $('.wrapper-left>.sponsor-ads').remove();
    $('.wrapper-left>.ec-section').remove();
    $('.wrapper-left>.facebook-comment').remove();
    $('.wrapper-left>.discuss-board').remove();

    $('.wrapper-aside').remove();

    $('iframe').remove();
    $('hr').remove();
}

function onClick() {
    var siteName = $('meta[property="og:site_name"]').attr('content');

    if (siteName.indexOf('中時新聞網') !== -1)
        clearCna();

    if (siteName.indexOf('聯合新聞網') !== -1)
        clearUdn();

}
