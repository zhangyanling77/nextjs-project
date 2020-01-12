const koa = require('koa');
const Router = require('koa-router');
let next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
// handler是一个处理函数，我们可以把请求和响应传递给它，由它来进行最后的响应，渲染组件
const handler = app.getRequestHandler();
// port
const PORT = 3000;

app.prepare().then(() => {
    const server = new koa();
    let router = new Router();
    // 在这里定义路由
    server.use(router.routes());

    server.use(async (ctx, next) => {
        await handler(ctx.req, ctx.res);
        ctx.response = false;
    });
    server.listen(PORT, () => console.log(`Next.js服务器已经在${PORT}进行启动`));
});