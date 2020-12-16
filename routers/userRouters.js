const Router = require('koa-router');
const uerRouter = new Router();
const userSql = require('../sql/userSql');
const tokenUtils = require('../utils/token');


uerRouter.get('/getUserList', async (ctx) => {
    const result = await userSql.getUserList();
    ctx.body = {
        data: result,
        code :1,
        message:'查询成功'
    }
});

uerRouter.post('/login', async (ctx,next) => {
    const {account, password} = ctx.request.body;
    const results = await userSql.login(account);
    console.log('token', tokenUtils.getToken());
    console.log('results', results);
    if (results && results.length > 0) {
        const result = results[0];
        if (result.password === password) {
            ctx.body = {
                code: 1,
                token: tokenUtils.getToken(),
                data: result,
                message: '验证成功'
            }
        } else {
            ctx.body = {
                code: 0,
                message: '用户名或密码错误'
            }
        }
    } else {
        ctx.body = {
            code: 0,
            message: '用户名或密码错误'
        }
    }

});

module.exports = uerRouter;
