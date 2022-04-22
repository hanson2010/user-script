// ==UserScript==
// @name        Hide Ad on Youtube
// @namespace   work.pythoner
// @match       *://*youtube*/*
// @grant       none
// @version     1.0
// @author      Hanson Hu
// @description 3/2/2021, 9:18:38 AM
// @homepage    https://blog.pythoner.work
// @icon        https://blog.pythoner.work/favicon.ico
// @license     MIT
// ==/UserScript==

function appendStyle () {
    let styleElem = document.createElement('style');
    styleElem.innerHTML = `
        #__bs_notify__ {
            display: none !important;
        }
    `;
    document.body.appendChild(styleElem);
}
