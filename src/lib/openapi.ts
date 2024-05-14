import type { paths } from "@/types/openapi";
import { env } from "@/utils/env";
import createClient, { type Middleware } from "openapi-fetch";

let accessToken: string | undefined;

const middleware: Middleware = {
  async onRequest(req) {
    // TODO check accessToken
    // TODO (optional) refresh token

    req.headers.set("Authorization", `Bearer ${accessToken}`);
    return req;
  },
};

export const fetcher = createClient<paths>({
  baseUrl: env.VITE_BASE_URL,
});

fetcher.use(middleware);
