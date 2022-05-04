// ==UserScript==
// @name        Show Markdown
// @namespace   work.pythoner
// @match       *://*acwing.com/*
// @match       *://*jisuanke.com/*
// @match       *://*/*post*
// @match       *://*/*problem*
// @require     https://cdn.jsdelivr.net/npm/jquery@3/dist/jquery.min.js
// @require     https://cdn.jsdelivr.net/npm/turndown@7.1.1/dist/turndown.js
// @run-at      document-end
// @grant       GM_setClipboard
// @version     1.0
// @author      Hanson Hu
// @description 5/4/2022, 6:12:01 PM
// @homepage    https://blog.pythoner.work
// @icon        https://blog.pythoner.work/icons/markdown.png
// @license     MIT
// ==/UserScript==

(function() {

    function getTargets() {
        let ret = [], old = null;
        $('p,pre').each(function() {
          console.log(this);
            let parent = $(this).parent();
            if ((!old || $.data(parent) == $.data(old)) &&
                parent.children('p,pre').length >= 2) {
                ret.push(parent);
                old = parent;
            }
        });
        return ret;
    }

    function getMarkdown(html) {
        let title = $('title').text().trim(),
            md = turndownService.turndown(html);
        return md + '\n';
    }

    let turndownService = new TurndownService();

    turndownService.addRule('pre', {
        filter: 'pre',
        replacement: function (content, node) {
            let classes = $(node).attr('class');
            if (classes) {
                let t = classes.split(/\s+/).slice(-1);
                if (t == 'hljs') t = '';
                return '```' + t + '\n' + content.trim() + '\n```';
            } else {
                return '```\n' + content.trim() + '\n```';
            }
        }
    });

    turndownService.addRule('remove_script', {
        filter: function (node, options) {
            return node.nodeName.toLowerCase() == 'script' &&
                node.getAttribute('type') == 'math/tex';
        },
        replacement: function (content, node) {
            return '';
        }
    });

    turndownService.addRule('inline_math', {
        filter: function (node, options) {
            return node.nodeName.toLowerCase() == 'span' &&
                node.getAttribute('class') == 'MathJax';
        },
        replacement: function (content, node) {
            return '$' + $(node).next().text() + '$';
        }
    });

    turndownService.addRule('block_math', {
        filter: function (node, options) {
            return node.nodeName.toLowerCase() == 'div' &&
                node.getAttribute('class') == 'MathJax_Display';
        },
        replacement: function (content, node) {
            return '\n$$\n' + $(node).next().text() + '\n$$\n';
        }
    });

    getTargets().forEach(function(elem) {
        $(elem).after(
            '<div style="position: absolute; top: 10px; right: 20px;">' +
            '<button id="btn-show">显示Markdown</button></div>' +
            '<div style="position: absolute; top: 40px; right: 20px;">' +
            '<button id="btn-copy">复制</button></div>'
        );
    });

    $('#btn-show').click(function() {
        let target = $(this).parent().prev().get(0);
        if (target.viewmd) {
            target.viewmd = false;
            $(this).text('显示Markdown');
            $(target).html(target.orig);
        } else {
            target.viewmd = true;
            if (!target.orig)
                target.orig = $(target).html();
            if (!target.md)
                target.md = getMarkdown($(target).html());
            $(this).text('显示HTML');
            $(target).html(
                '<pre style="margin: 1rem; white-space: pre-wrap; ' +
                'word-wrap: break-word; font-family: Consolas, monospace; ' +
                'font-size: 16px;"><code class="nohighlight">' +
                target.md +
                '</code></pre>'
            );
        }
    });

    $('#btn-copy').click(function() {
        let target = $(this).parent().prev().prev().get(0);
        if (!target.md)
            target.md = getMarkdown($(target).html());
        GM_setClipboard(target.md);
    });

})();
