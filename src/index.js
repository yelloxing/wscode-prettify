

let prettify = null;


// 对外暴露调用接口

if (typeof module === "object" && typeof module.exports === "object") {
    module.exports = prettify;
} else {
    window.prettify = prettify;
}  