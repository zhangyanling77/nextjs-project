const koa = require('koa');
const Router = require('koa-router');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });

const handler = app.getRequestHandler();
const PORT = 3000;

app.prepare().then(() => {
    const server = new koa();
    const router = new Router();
    server.use(router.routes());

    server.use(async (ctx, next) => {
        await handler(ctx.req, ctx.res);
        ctx.response = false;
    });
    server.listen(PORT, () => console.log(`Next.js服务器已经在${PORT}进行启动`));
});
