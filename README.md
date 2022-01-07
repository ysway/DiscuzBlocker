# DiscuzBlocker 油猴脚本
屏蔽Discuz类论坛用户的发帖

## 版本

- [Block.user.js](https://github.com/ysway/DiscuzBlocker/blob/master/Block.user.js)
> 原版，作者为tokimekiol
 
- [DiscuzBlocker.user.js](https://github.com/ysway/DiscuzBlocker/blob/master/DiscuzBlocker.user.js)
> 修改版，可兼容更多论坛

## 修改黑名单
在对应论坛打开控制台

- 清空屏蔽列表
> localStorage.removeItem("blacklist");
>
> localStorage.blacklist = '';

- 移除特定用户
> localStorage.getItem("blacklist");
> 
> 自行修改字符串（\n分隔用户）
> 
> localStorage.blacklist = 修改后的字符串
