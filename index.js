'use strict';
const inquirer = require('inquirer');
const shell = require('shelljs');
const program = require('commander');
const fs = require('fs');
const path = require('path');
const Progress = require('./lib/untils.js').Progress;

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
            const remote = 'https://github.com/zhou111222/secoo-h5.git';
            const curName = 'secoo-h5';
            const tarName = projectName;
            shell.exec(`
                git clone ${remote} --depth=1
                mv ${curName} ${tarName}
                cd ${tarName}
                npm i
            `, (error, stdout, stderr) => {
                if (error) {
                    console.error(`exec error: ${error}`);
                    return
                } else {
                    let url = path.join(__dirname, '/user-config.json');
                    fs.writeFile(url, JSON.stringify(answers, "", "\t"), 'utf-8', (err) => {
                        if (err) {
                            console.log('项目初始化失败！');
                        } else {
                            Progress("项目正在初始化...".brightYellow, "项目初始化完成".brightGreen, 100);
                        }
                    });
                }
            });
        }
    })
}

function neves() {
    program.version(require('./package.json').version);
    program.command('init [projectName]').description('创建项目')
        .action((projectName) => {
            create(projectName)
        });
    program.parse(process.argv);
}
neves()