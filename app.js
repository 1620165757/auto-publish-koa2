const uerRouter = require('./routers/userRouters');
const Koa = require('koa');
const koa_jwt = require('koa-jwt');
const app = new Koa();
const bodyParser = require('koa-bodyparser');


app.use(async (ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.set("Access-Control-Allow-Headers", " Origin, X-Requested-With, Content-Type, Accept,Authorization");
    ctx.set('Content-Type', 'application/json;charset=UTF-8');
    if (ctx.method === 'OPTIONS') {
        ctx.status = 204;
    } else {
        await next();
    }
});

app.use((ctx, next) => {
    return next().catch(err => {
        if (err.status === 401) {
            ctx.status = 401;
            ctx.body = {
                code: 401,
                message: '认证失效'
            }
        }
    });
});

app.use(koa_jwt({secret: 'auto-publish'}).unless({
    path: [/^\/login/]
}));

app.use(bodyParser());

app.use(uerRouter.routes()).use(uerRouter.allowedMethods());

app.listen(3000);
console.log('服务启动成功：3000');

