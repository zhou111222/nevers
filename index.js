'use strict';
const inquirer = require('inquirer');
const shell = require('shelljs');
const program = require('commander');
const fs = require('fs');
const path = require('path');
const Progress = require('./lib/untils.js').Progress;
const downFile = require('./lib/untils.js').downFile;
const exitFolder = require('./lib/untils').exitFolder;

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
        type: "password", // 密码为密文输入
        message: "请输入密码：",
        name: "password"
    }]).then((answers) => {
        if (answers.password == 'secoo') {
            const cdnUrl = 'https://nodejs.org/dist/v8.9.4/node-v8.9.4-win-x64.zip';
            downFile(cdnUrl, projectName).then(function() {
                fs.writeFile(path.join(__dirname, projectName, 'user-config.json'), JSON.stringify(answers, "", "\t"), 'utf-8', (err) => {
                    if (err) {
                        console.log('项目初始化失败！');
                    } else {
                        Progress("项目正在初始化...".brightYellow, "项目初始化完成".brightGreen, 100);
                    }
                });
            }).catch((err) => {
                console.error(err);
                process.exit(1);
            });
        }
    })
}

module.exports = function neves() {
    program.version(require('./package.json').version);
    program.command('init [projectName]').description('使用neves创建项目')
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