
/*!
* wscode-prettify - 为 Web Studio Cdoe 提供的通用代码着色插件
* https://github.com/yelloxing/wscode-prettify
* 
* author 心叶
*
* version 0.0.0
* 
* build Fri Sep 04 2020
*
* Copyright 心叶
* Released under the MIT license
* 
* Date:Sat Sep 05 2020 16:54:11 GMT+0800 (GMT+08:00)
*/
        
(function () {
  'use strict';

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  var prettify = null; // 对外暴露调用接口

  if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && _typeof(module.exports) === "object") {
    module.exports = prettify;
  } else {
    window.prettify = prettify;
  }

}());