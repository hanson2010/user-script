// ==UserScript==
// @name        Show Markdown
// @namespace   work.pythoner
// @match       *://*acwing.com/*
// @match       *://*jisuanke.com/*
// @match       *://*/*post*
// @match       *://*/*problem*
// @require     https://cdn.jsdelivr.net/npm/jquery@3/dist/jquery.min.js
// @require     https://cdn.jsdelivr.net/npm/showdown@2.1.0/dist/showdown.min.js
// @run-at      document-idle
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
        $('h1,h2,h3,h4,p,pre').each(function() {
            let parent = $(this).parent();
            if ((!old || parent.get(0) != old.get(0)) &&
                parent.children('h1,h2,h3,h4,p,pre').length >= 2) {
                ret.push(parent);
                old = parent;
            }
        });
        return ret;
    }

    function getMarkdown(src, escape = false) {
        // Clean up
        let doc = document.createElement('div');
        doc.innerHTML = src;
        // MathJax (AcWing)
        for (const e of doc.querySelectorAll('.MathJax_Preview,.MathJax'))
            e.remove();
        // KaTeX (计蒜客)
        for (const e of doc.querySelectorAll('mrow,.katex-html'))
            e.remove();
        let text = cleanDomTree(doc, escape);
        // Remove redundant tags and "copy" buttons
        text = text.replace(/<span.*?>/gi, '')
                   .replace(/<\/span>/gi, '')
                   .replace(/\s*<button.*?<\/button>\s*/gi, '');
        // MathJax
        text = text.replace(/<script.*?>/gi, '$')
                   .replace(/<\/script>/gi, '$');
        // KaTeX
        text = text.replace(/<math.*?<annotation.*?>/gi, '$')
                   .replace(/<\/annotation>.*?<\/math>/gi, '$');
        // Avoid the bug of showdown dealing with <br />
        // https://github.com/showdownjs/showdown/issues/649
        text = text.replace(/<br[ ]?[/]?>\s*/gi, '%line-break%');
        let md = converter.makeMarkdown(text);
        // Extra comment added with <ol> and <ul>
        // https://github.com/showdownjs/showdown/issues/700
        // Image URL
        // https://github.com/showdownjs/showdown/issues/925
        // And restore line breaks
        md = md.trim()
               .replace(/\s*<!--\s*-->\s*/gi, '\n\n')
               .replace(/]\(<(.+?)>\)/gi, ']($1)')
               .replace(/%line-break%/gi, '  \n');
        return md + '\n';
    }

    function cleanDomTree(doc, escape) {
        let nodes = doc.childNodes,
            ret = '';
        for (let i = 0; i < nodes.length; i ++ ) {
            let node = nodes[i];
            if (node.nodeType === 1) {
                if (node.nodeName.toLowerCase() === 'pre') {
                    let c = node.firstChild;
                    if (c.nodeType === 1 && c.nodeName.toLowerCase() === 'code') {
                        let cls = node.getAttribute('class');
                        if (cls && cls.search(/^hljs /) != -1) {
                            let ls = cls.split(' ');
                            node.firstChild.setAttribute('data-language', ls[ls.length - 1]);
                        }
                        if (escape)
                            node.firstChild.textContent = escapeHtml(node.textContent);
                        else
                            node.firstChild.textContent = node.textContent;
                        ret += node.outerHTML + '\n';
                    } else {
                        // 计蒜客
                        ret += '<pre><code>' + node.textContent + '<\/pre><\/code>\n';
                    }
                } else {
                    ret += node.outerHTML + '\n';
                }
            }
        }
        return ret;
    }

    function escapeHtml(unsafe) {
        return unsafe.replace(/&/g, "&amp;")
                     .replace(/</g, "&lt;")
                     .replace(/>/g, "&gt;")
                     .replace(/"/g, "&quot;")
                     .replace(/'/g, "&#039;");
    }

    let converter = new showdown.Converter();
    converter.setFlavor('github');

    let targets = getTargets();
    targets.forEach(function(elem, index) {
        // Prevent overlapping
        let offset = index * 60 + 10,
            offset2 = offset + 30;
        $(elem).after(
            '<div style="position: absolute; top: ' + offset + 'px; right: 20px;">' +
            '<button class="btn-show" style="color: red; opacity: 0.2;">显示Markdown</button></div>' +
            '<div style="position: absolute; top: ' + offset2 + 'px; right: 20px;">' +
            '<button class="btn-copy" style="color: red; opacity: 0.2;">复制</button></div>'
        );
    });

    $('.btn-show').click(function() {
        let target = $(this).parent().prev().get(0);
        if (target.flag) {
            target.flag = false;
            $(this).text('显示Markdown');
            $(target).html(target.orig);
        } else {
            target.flag = true;
            if (!target.orig)
                target.orig = $(target).html();
            if (!target.md_html)
                target.md_html = getMarkdown($(target).html(), true);
            $(this).text('显示HTML');
            $(target).html(
                '<pre style="white-space: pre-wrap; word-wrap: break-word; ' +
                'font-family: Consolas, monospace;">' +
                '<code class="nohighlight" style="white-space: pre-wrap;">' +
                target.md_html +
                '</code></pre>'
            );
        }
    });

    $('.btn-copy').click(function() {
        let target = $(this).parent().prev().prev().get(0);
        if (target.flag) {
            if (!target.md)
                target.md = getMarkdown(target.orig);
        } else {
            if (!target.md)
                target.md = getMarkdown($(target).html());
        }
        GM_setClipboard(target.md);
    });

})();
