# 小程序后端

使用了腾讯提供的 Wafer2 SDK 和 Koa2 框架，主要用于和运行于腾讯云服务器上的 Beego RESTful API 进行交互，将更为友好的数据送往前端，并处理用户登陆。

> REST API: Beego + PostgreSQL

## 项目结构

- `controllers/`，视图函数目录。
- `middlewares/`，常用的中间件。
- `routes/`，路由函数目录。
- `tools/`，复用函数目录。
- `package.json`
- `app.js`，主入口。
- `config.js`，配置文件。

