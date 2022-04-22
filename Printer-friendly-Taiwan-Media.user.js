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

function common() {
    if (typeof jQuery != 'undefined') { 
        console.log(jQuery.fn.jquery);
    }
    
    $('script').remove();
    $('noscript').remove();
    $('iframe').remove();
    $('hr').remove();
}

function clearCna() {
    common();

    $('.nav').remove();
    $('.menu').remove();
    $('.sideMenu').remove();
    $('.instant').remove();
    $('.TemasBlock').remove();
    $('.pageContent').css('overflow', 'hidden');
    $('.wrapper').css('width', '100%');
    $('.overlayidle').remove();
  
    $('.article-feed').attr('data-next-urls-in-topic', []);
    $('.article-feed').children().not(':first-child').remove();
    $('article').css('padding', '0 20px');
    $('article .centralContent').css('max-width', '100%');
    $('article .centralContent .shareSide').remove();
    $('article .centralContent .moreArticle').remove();
    $('article .centralContent .BtnShareGroup').remove();
    $('article .centralContent .appDownload').remove();
    $('article .centralContent .articleADbox').remove();
    $('article [class^="advertise"]').remove();
    $('article .nextline').remove();

    $('.jsADslot').remove();
    $('footer').css('overflow', 'hidden');
    $('footer > .f-wrapper').remove();
  
    window.infiniteScroll = new Function('console.log("abort");');
}

function clearUdn() {
    common();

    $('.udn-overlay').remove();
    $('.udn-ads').remove();
    $('.udn-idle').remove();
    $('header .tools-box').remove();
    $('header .navigation-wrapper').remove();
    $('header .overlay-menu').remove();
    $('header').css('border', 'none');
  
    $('main [class^="breaking-news_"]').remove();

    $('.wrapper-left [id^="ads-"]').remove();
    $('.wrapper-left [class^="article-content__ads-"]').remove();
    $('.wrapper-left .article-content__audio').remove();
    $('.wrapper-left .article-content__plugins').remove();
    $('.wrapper-left .article-content__social').remove();
    $('.wrapper-left .article-content__paragraph div').remove();
    $('.wrapper-left [id^="taboola-"]').remove();
    $('.wrapper-left .more-news').remove();
    $('.wrapper-left .related-news').remove();
    $('.wrapper-left .sponsor-ads').remove();
    $('.wrapper-left .ec-section').remove();
    $('.wrapper-left .facebook-comment').remove();
    $('.wrapper-left .discuss-board').remove();
    $('.wrapper-left').css('width', 'auto');
    $('.wrapper-left .article-content__wrapper').css('padding', '0');
    $('.wrapper-left .article-content__cover').css('--width', 'auto');
    $('.wrapper-left .article-content__cover img').css('height', 'auto');
    $('.wrapper-left .article-content').css('margin', '0');
    $('.wrapper-left .article-content__paragraph').css({
            'padding': '0',
            'width': 'auto',
        });

    $('.wrapper-aside').remove();
  
    $('footer .footer-social').remove();
    $('footer').css('border', 'none');
    $('footer .container').css('padding', '0');
    $('#gotop').remove();
}

function onClick() {
    let host = window.location.host;

    if (host.indexOf('cna') !== -1) {
        clearCna();
    } else if (host.indexOf('udn') !== -1) {
        clearUdn();
    }
}
