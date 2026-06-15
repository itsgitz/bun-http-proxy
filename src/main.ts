import { Hono } from "hono";
import { logger } from "hono/logger";
import { proxy } from "hono/proxy";
import services from "../services.json" with { type: "json" };

interface ServiceConfig {
  mountPath: string;
  target: string;
}

const app = new Hono();

app.use(logger());

app.get("/health", (c) => c.json({ status: "ok" }));

for (const svc of services as ServiceConfig[]) {
  app.all(`${svc.mountPath}/*`, (c) => {
    const url = new URL(c.req.url);
    const targetUrl = svc.target + url.pathname.slice(svc.mountPath.length) + url.search;
    return proxy(targetUrl, {
      ...c.req,
      headers: c.req.header(),
    });
  });
}

export default {
  port: Number(process.env.PORT || 8000),
  fetch: app.fetch,
};
