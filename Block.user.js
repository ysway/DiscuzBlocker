// ==UserScript==
// @name            Block
// @author          tokimekiol
// @version         1.01
// @lastmodified    2016-10-14 20:38:24
// @run-at          document-end
// @noframes        yes
// @description     屏蔽指定用户的帖子
// @namespace       Rin Satsuki
// @downloadURL     http://tokimekiol.cc/userscript/block.user.js
// @include         http://*/*
// ==/UserScript==

(function($) {
    'use strict';
    function Block(el) {
        return new Block.prototype.init(el);
    }
    Block.prototype = {
        constructor: Block,
        init: function(el) {
            this.el = el;
            this.start(true);
        },
        start: function(first) {
            var o = this;
            o.blacklist = localStorage.blacklist;
            o.blacklist = o.blacklist ? o.blacklist.trim().split('\n') : [];
            o.self = document.body.innerHTML.match(/我的空间"[^>]*>(\S+)<\/a>/);
            o.self = o.self ? o.self[1] : null;
            Array.prototype.forEach.call($(o.el), function(e) {
                if (first) {
                    o.button(e);
                }
                o.check(e);
            });
        },
        check: function(e) {
            var others, o = this;
            others = e.querySelector('.xw1') || e.querySelector('.by a');
            others = others ? others.textContent : null;
            if (others !== o.self && o.blacklist.indexOf(others) !== -1) {
                e.parentNode.removeChild(e);
            }
        },
        append: function(name) {
            if (this.blacklist.indexOf(name) === -1) {
                this.blacklist.push(name);
                localStorage.blacklist = this.blacklist.join('\n');
                this.start();
            }
        },
        button: function(e) {
            var card, name, a, o = this;
            card = e.querySelector('.imicn');
            name = e.querySelector('.xw1');
            if (!card || !name || name.textContent === o.self) {
                return;
            }
            a = document.createElement('a');
            a.href = 'javascript:;';
            a.textContent = '屏蔽此人';
            a.onclick = function() {
                if (confirm('确认要屏蔽 ' + name.textContent + '？')) {
                    o.append(name.textContent);
                }
                return false;
            };
            card.appendChild(a);
        },
    };
    Block.prototype.init.prototype = Block.prototype;
    Block('#postlist>div');
    Block('#moderate>table>tbody');
} (function(s) {
    return document.querySelectorAll(s);
}));
