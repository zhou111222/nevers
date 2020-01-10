![neves.png](https://github.com/zhou111222/images/blob/master/neves.png)
# 项目开发说明

## 项目开发文档

[Neves脚手架开发项目文档](https://github.com/zhou111222/secoo_app_vue)

![文档.png](https://github.com/zhou111222/images/blob/master/%E6%96%87%E6%A1%A3.png)

## Neves
一个基于 Node、express、Vue.js、webpack 的深度定制化寺库前端工程化统一方案，帮助你快速构建H5页面应用。

## 目录结构及说明

```

|-- bin                // 存放内部命令对应的可执行文件
|-- lib                // 用于存放javascript代码
|-- node_modules       // 用于存放下载的npm包
|-- .gitignore         // 控制哪些文件不需要上传到git上
|-- .npmignore         // 控制哪些文件不需要上传到npm上
|-- index.js           // 项目的入口主文件
|-- package-lock.json  // 当前项目npm包的依赖树的文件，锁定整个依赖树进行版本固定
|-- package.json       // 定义了这个项目所需要的各种模块，以及项目的配置信息
|-- README.md          // 项目的文档
|-- user-config.json   // erp创建页面需要的参数

```

## 使用方法
1. `npm install neves -g` //全局安装Neves脚手架
2. `neves init <projectName>` //执行命令。如neves init myapp初始化项目
3. `npm run start` 开发时使用，将启动本地服务
4. `npm run build` 构建项目，用于生产环境代码打包
5. `npm run create` 开发时使用，用于新建楼层
6. `npm run upload` 构建项目，用于将代码部署到erp上(仅限寺库员工使用)

## 未来规划
1. 整个项目使用express开发，增加、完善功能
2. 页面模板中的node代码与脚手架代码整合到一起

## 有疑问有bug联系
email:zhoupengfei@secoo.com
微信：zhoupengfei1996


