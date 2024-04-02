import { AutoRouter, error, withParams } from "itty-router";
import create from "./routes/create";
import read from "./routes/read";
import stat from "./routes/stat";
import { auth } from "./utils";

const router = AutoRouter();

const whiteLists = ["/r"];

const withAuthenticated = (request) => {
  const url = new URL(request.url);
  if (!whiteLists.find((pathname) => url.pathname.startsWith(pathname))) {
    if (!auth(request)) {
      return error(401, "INVALID USER");
    }
  }
};

router
  .all("*", withParams, withAuthenticated)
  .get("/create", async ({ query }, env) => {
    return await create(query, env.MapRandom);
  })
  .get("/r/:random_code", async ({ random_code }, env) => {
    return await read(random_code, env.MapRandom);
  })
  .get("/s/:random_code", async ({ random_code }, env) => {
    return await stat(random_code, env.MapRandom);
  });

export default { ...router };
