/*
 * @Tips: 可自行添加
 * @Description: node使用的公共函数
 * @Author: zhoupengfei
 * @Date: 2019-11-27 15:52:31
 */
const colors = require('colors');
const readline = require('readline');
const slog = require('single-line-log').stdout;
const unloadChar = '█';
const loadedChar = '█';
/*
 * @Description: 进度条执行函数
 * @Author: zhoupengfei
 */
function Progress(loadingText, endText, time) {
    let i = 0;
    let timer = setInterval(() => {
        if (i > 10) {
            clearInterval(timer);
            process.exit(0);
        } else if (i === 10) {
            renderProgress(`${endText}: `, i);
            i++;
        } else {
            renderProgress(`${loadingText}: `, i);
            i++;
        }
    }, time);
}
/*
 * @Description: 进度条渲染函数
 * @Author: zhoupengfei
 */
function renderProgress(text, step) {
    const PERCENT = Math.round(step * 10);
    const COUNT = 3;
    const unloadStr = new Array(COUNT * (10 - step)).fill(unloadChar).join('');
    const loadedStr = new Array(COUNT * (step)).fill(loadedChar).join('');
    slog(`${text}${PERCENT}%【${loadedStr.brightGreen}${unloadStr.grey}】`);
}

exports.Progress = Progress;