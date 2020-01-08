'use strict';
const inquirer = require('inquirer');
const program = require('commander');
const fs = require('fs');
const path = require('path');
const Progress = require('./lib/untils.js').Progress;
const downFile = require('./lib/untils.js').downFile;
const exitFolder = require('./lib/untils').exitFolder;
const ora = require('ora');
const colors = require('colors');
const shell = require('shelljs');


function downLoadFile(cdnUrl, projectName, answers, folderName) {
    const spinner = ora({
        text: '正在下载项目模板...'.yellow,
        color: 'yellow'
    }).start();

    downFile(cdnUrl, projectName).then(function() {
        fs.writeFile(path.join(process.cwd(), projectName, folderName, 'user-config.json'), JSON.stringify(answers, "", "\t"), 'utf-8', (err) => {
            if (err) {
                spinner.text = `配置文件写入失败,失败原因：${err}`.red;
                spinner.fail();
            } else {
                spinner.text = '项目模板初始化完成...'.brightGreen;
                spinner.succeed();
                fs.unlinkSync(path.join(process.cwd(), `./${projectName}.zip`));
            }
        });
    }).catch((err) => {
        spinner.text = `模板下载失败,失败原因：：${err}`.red;
        spinner.fail();
        process.exit(1);
    });
}

function create(projectName) {
    inquirer.prompt([{
        type: 'input',
        name: 'pageId',
        message: '请输入页面Id：'
    }, {
        type: 'input',
        name: 'pageName',
        message: '请输入页面名称：',
        default: 'secoo-app'
    }, {
        type: 'input',
        name: 'url',
        message: '请输入页面路径：'
    }, {
        type: "list", // 开发环境
        name: "latype",
        message: "请选择开发语言：",
        choices: [
            "ES6",
            "ES6+VUE",
        ],
        default: 0
    }]).then((answers) => {
        if (answers.latype == 'ES6') {
            downLoadFile('https://mstatic.secooimg.com/cli/zhoupengfei/secoo_app_h5.zip', projectName, answers, 'secoo_app_h5');
        } else {
            downLoadFile('https://mstatic.secooimg.com/cli/zhoupengfei/secoo_app_vue.zip', projectName, answers, 'secoo_app_vue');
        }
    })
}

module.exports = function neves() {
    program.version(require('./package.json').version);
    //添加命令名称
    program.command('init [projectName]').description('正在使用neves创建项目')
        .action((projectName) => {
            if (!exitFolder(`./${projectName}`)) {
                create(projectName);
            } else {
                console.error(`${projectName}文件夹已存在,请重新创建！`);
                process.exit(1);
            }
        });
    program.parse(process.argv);
}