// ==UserScript==
// @name            Discuz Blocker
// @original author tokimekiol
// @modified by     ysway
// @version         1.01
// @lastmodified    2022-1-7
// @run-at          document-end
// @noframes        yes
// @description     屏蔽指定用户的帖子
// @namespace       Rin Satsuki
// @original ver    http://tokimekiol.cc/userscript/block.user.js
// @include         */thread-*.html
// @include         */forum.php?mod=viewthread&tid=*
// ==/UserScript==

// 在对应论坛打开控制台
// 清空屏蔽列表
// localStorage.removeItem("blacklist");
// localStorage.blacklist = '';
// 移除特定用户
// localStorage.getItem("blacklist");
// 自行修改字符串（\n分隔用户）
// localStorage.blacklist = 修改后的字符串

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
            // 获取自己的用户名，避免屏蔽自己
            o.self = document.body.innerHTML.match(/我的空间"[^>]*>(\S+)<\/a>/);
            o.self = o.self ? o.self[1] : null;
            if (!o.self) {
                o.self = document.body.innerHTML.match(/.html" title="(\S+)" class="userinfo"/);
                o.self = o.self ? o.self[1] : null;
            }
            Array.prototype.forEach.call($(o.el), function(e) {
                if (first) {
                    o.button(e);
                }
                o.check(e);
            });
        },
        check: function(e) {
            var others, o = this;
            // 获取帖子
            others = e.querySelector('.xi2') || e.querySelector('.xw1') || e.querySelector('.by a');
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
            // 获取卡片
            card = e.querySelector('.imicn');
            // 获取用户名（这个类可能被复用，所以要先检测卡片）
            name = e.querySelector('.xi2');
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
