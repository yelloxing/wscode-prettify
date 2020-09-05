
/*!
* wscode-prettify - 为 Web Studio Cdoe 提供的通用代码着色插件
* https://github.com/yelloxing/wscode-prettify
* 
* author 心叶
*
* version 0.0.0-alpha
* 
* build Fri Sep 04 2020
*
* Copyright 心叶
* Released under the MIT license
* 
* Date:Sun Sep 06 2020 01:15:06 GMT+0800 (GMT+08:00)
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

  var colors = {
    // 普通文本
    nml: "#065b9f",
    // 字符串
    str: "#080",
    // 关键字
    kwd: "#919f06",
    // 注释
    com: '#9E9E9E'
  };

  var prettify = function prettify(codeStr) {
    // 当前判断的位置
    var index = 0; // 着色后的内容

    var words = []; // 当前关注的字符串

    var template = ""; // 获取往后num个值

    var nextNValue = function nextNValue(num) {
      return codeStr.substring(index, num + index > codeStr.length ? codeStr.length : num + index);
    }; // 后移num个值


    var goNextN = function goNextN(num) {
      template += codeStr.substring(index, num + index > codeStr.length ? codeStr.length : num + index);
      index += num;
    }; // 登记


    var pushWord = function pushWord(color) {
      if (template != '') {
        words.push({
          color: color,
          content: template
        });
        template = "";
      }
    };

    while (true) {
      // 注释
      if (["//", '/*'].indexOf(nextNValue(2)) > -1) {
        pushWord(colors.nml); // 寻找结束标记

        var endInfo = {
          "//": [1, '\n'],
          "/*": [2, '*/']
        }[nextNValue(2)];

        do {
          template += codeStr[index++];
        } while (nextNValue(endInfo[0]) != endInfo[1] && index < codeStr.length);

        goNextN(endInfo[0]);
        pushWord(colors.com);
      } // 字符串
      else if (["'", '"', '`'].indexOf(nextNValue(1)) > -1) {
          pushWord(colors.nml);
          var endCode = nextNValue(1);

          do {
            template += codeStr[index++];
          } while (nextNValue(1) != endCode && index < codeStr.length);

          goNextN(1);
          pushWord(colors.str);
        } // 如果过界了
        else if (index >= codeStr.length) {
            pushWord(colors.nml);
            break;
          } // 不然的话，追加
          else {
              template += codeStr[index++];
            }
    } // 最后，我们需要变成wscode需要的着色器格式


    var resultData = [[]],
        lineNum = 0;
    words.forEach(function (word) {
      var codeArray = word.content.split(/\n/);
      resultData[lineNum].push({
        color: word.color,
        content: codeArray[0]
      });

      for (var index = 1; index < codeArray.length; index++) {
        lineNum += 1;
        resultData.push([]);
        resultData[lineNum].push({
          color: word.color,
          content: codeArray[index]
        });
      }
    });
    return resultData;
  }; // 对外暴露调用接口


  if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && _typeof(module.exports) === "object") {
    module.exports = prettify;
  } else {
    window.prettify = prettify;
  }

}());
