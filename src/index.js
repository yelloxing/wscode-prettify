
import specialWord from './special-word';
import colors from './colors';

let prettify = function (codeStr) {

    // 当前判断的位置
    let index = 0;

    // 着色后的内容
    let words = [];

    // 当前关注的字符串
    let template = "";

    // 获取往后num个值
    let nextNValue = function (num) {
        return codeStr.substring(index, num + index > codeStr.length ? codeStr.length : num + index);
    };

    // 后移num个值
    let goNextN = function (num) {
        template += codeStr.substring(index, num + index > codeStr.length ? codeStr.length : num + index);
        index += num;
    };

    // 登记
    let pushWord = function (color) {
        if (template != '') {
            words.push({
                color,
                content: template
            });
            template = "";
        }
    };

    while (true) {

        // 注释
        if (["//", '/*'].indexOf(nextNValue(2)) > -1 || ["<!--"].indexOf(nextNValue(4)) > -1) {
            pushWord(colors.nml);

            // 寻找结束标记
            let endInfo = {
                "//": [1, '\n'],
                "/*": [2, '*/']
            }[nextNValue(2)] || {
                "<!--": [3, '-->']
            }[nextNValue(4)];

            do {
                template += codeStr[index++];
            } while (nextNValue(endInfo[0]) != endInfo[1] && index < codeStr.length)

            goNextN(endInfo[0]);

            pushWord(colors.com);

        }

        // 字符串
        else if (["'", '"', '`'].indexOf(nextNValue(1)) > -1) {
            pushWord(colors.nml);

            let endCode = nextNValue(1);
            do {
                template += codeStr[index++];
            } while (nextNValue(1) != endCode && index < codeStr.length);

            goNextN(1);

            pushWord(colors.str);

        }

        // 关键字
        else if ((nextNValue(1) == ' ' || specialWord.bdr.indexOf(nextNValue(1)) > -1) && specialWord.kwd.indexOf(template.trim()) > -1) {

            pushWord(colors.kwd);
            template += codeStr[index++];

        }

        // 数字
        else if ((nextNValue(1) == ' ' || specialWord.bdr.indexOf(nextNValue(1)) > -1) && (!/\d/.test(nextNValue(1))) && /^\d{1,}$/.test(template.trim())) {

            pushWord(colors.num);
            template += codeStr[index++];

        }

        // 边界
        else if (specialWord.bdr.indexOf(nextNValue(1)) > -1) {
            pushWord(colors.nml);

            template += codeStr[index++];
            pushWord(colors.bdr);
        }



        // 如果过界了
        else if (index >= codeStr.length) {

            pushWord(colors.nml);
            break;

        }

        // 不然的话，追加
        else {
            template += codeStr[index++];
        }

    }

    // 最后，我们需要变成wscode需要的着色器格式

    let resultData = [[]], lineNum = 0;

    words.forEach(word => {

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

};


// 对外暴露调用接口

if (typeof module === "object" && typeof module.exports === "object") {
    module.exports = prettify;
} else {
    window.prettify = prettify;
}  