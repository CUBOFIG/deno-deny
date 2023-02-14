import { Application } from "https://deno.land/x/oak@v11.1.0/mod.ts";
import { oakCors } from "https://deno.land/x/cors@v1.2.2/mod.ts";
import { green, yellow } from "https://deno.land/std@0.53.0/fmt/colors.ts";
import kirbyRouter from "./routes/serverKirby.ts";
import notFound from './middlewares/notFound.ts';
import logger from './middlewares/logger.ts';

const app = new Application();
const port = 8081;

app.use(logger.logger);
app.use(logger.responseTime);

app.use(oakCors()); 
app.use(kirbyRouter.routes());
app.use(kirbyRouter.allowedMethods());
app.use(notFound);

app.addEventListener("listen", ({ secure, port }) => {
  const protocol = secure ? "https://" : "http://";
  const url = `${protocol}${"localhost"}:${port}`;
  console.log(`${yellow("Listening on:")} ${green(url)}`);
});

await app.listen({ port });
