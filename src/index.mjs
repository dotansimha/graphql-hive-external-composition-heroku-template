import { createServer } from "node:http";
import process from "node:process";
import { resolveEnv } from "./environment.mjs";
import { createRequestListener } from "./server.mjs";

// eslint-disable-next-line no-process-env
const env = resolveEnv(process.env);
const server = createServer(createRequestListener(env));

server.listen(env.http.port, "::", () => {
  console.log(`Listening on http://localhost:${env.http.port}`);
});

process.on("SIGINT", () => {
  server.close((err) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
  });
});
