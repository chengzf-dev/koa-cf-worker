import Koa from "koa";
import { httpServerHandler } from "cloudflare:node";

const app = new Koa();

app.use(async (ctx) => {
  ctx.body = "Hello koa worker with vite !";
});

if (import.meta.env.DEV) {
  await new Promise((resolve) => {
    if (globalThis.__httpServer) {
      globalThis.__httpServer.close(resolve);
    } else {
      resolve(true);
    }
  });
  globalThis.__httpServer = app.listen(8080);
} else {
  app.listen(8080);
}

export default httpServerHandler({ port: 8080 });
