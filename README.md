# prettify - 为 Web Studio Cdoe 提供的通用代码着色插件

<p>
  <a href="https://yelloxing.gitee.io/npm-downloads?interval=7&packages=wscode-prettify"><img src="https://img.shields.io/npm/dm/wscode-prettify.svg" alt="downloads"></a>
  <a href="https://packagephobia.now.sh/result?p=wscode-prettify"><img src="https://packagephobia.now.sh/badge?p=wscode-prettify" alt="install size"></a>
  <a href="https://www.jsdelivr.com/package/npm/wscode-prettify"><img src="https://data.jsdelivr.com/v1/package/npm/wscode-prettify/badge" alt="CDN"></a>
  <a href="https://www.npmjs.com/package/wscode-prettify"><img src="https://img.shields.io/npm/v/wscode-prettify.svg" alt="Version"></a>
  <a href="https://github.com/yelloxing/wscode-prettify/blob/master/LICENSE"><img src="https://img.shields.io/npm/l/wscode-prettify.svg" alt="License"></a>
</p>

- 欢迎有任何意见来[Github Issue](https://github.com/yelloxing/wscode-prettify/issues)告诉我们！

## 如何引入

首先，需要引入，你可以选择使用script标签引入：

```html
<script src="https://cdn.jsdelivr.net/npm/wscode-prettify"></script>
```

上面的方式引入以后，通过prettify即可使用。当然，你也可以通过npm的方式引入：

```shell
npm install --save wscode-prettify
```

安装好了以后，在需要的地方引入即可：

```js
import prettify from 'wscode-prettify';
```

## 如何使用

当然是给[Web Studio Code](https://github.com/yelloxing/Web-Studio-Code)使用：

```js
new WSCode({

    // 编辑器挂载点
    el: document.getElementById('wscode'),

    // 着色方法
    shader: prettify

});
```


## 开源协议

[MIT](https://github.com/yelloxing/wscode-prettify/blob/master/LICENSE)

Copyright (c) 2020 走一步 再走一步