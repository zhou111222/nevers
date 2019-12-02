/*
 * @Tips: 可自行添加
 * @Description: node使用的公共函数
 * @Author: zhoupengfei
 * @Date: 2019-11-27 15:52:31
 */
const colors = require('colors');
const readline = require('readline');
const fs = require('fs');
const path = require("path");
const request = require("request");
const adm_zip = require('adm-zip');
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
/*
 * @Description: 创建文件夹
 * @params fileName <string>
 * @Author: zhoupengfei
 */
function createFolder(fileName) {
    var dirPath = path.join(__dirname, fileName);
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath);
    } else {
        console.log("文件夹已存在");
        process.exit(1);
    }
}
/*
 * @Description: 判断文件或者文件夹是否存在
 * @params path <string>
 * @Author: zhoupengfei
 */
function exitFolder(path) {
    try {
        fs.access(path, fs.constants.F_OK, (err) => {
            if (err) {
                return false;
            } else {
                return true;
            }
        });
    } catch (e) {
        return false;
    }
}
/*
 * @Description: 下载cdn上的文件
 * @params url <path> fileName <string>
 * @Author: zhoupengfei
 */
function downFile(url, fileName) {
    return new Promise((resolve, reject) => {
        const stream = fs.createWriteStream(`./${fileName}.zip`);
        request(url).pipe(stream).on('close', () => {
            const unzip = new adm_zip(`./${fileName}.zip`);
            unzip.extractAllTo("./", /*overwrite*/ true);
            resolve();
        }).on('error', (error) => {
            reject(error)
        })
    });
}
exports.downFile = downFile;
exports.Progress = Progress;
exports.exitFolder = exitFolder;