import type { paths } from "@/types/openapi";
import { env } from "@/utils/env";
import createClient, { type Middleware } from "openapi-fetch";

const middleware: Middleware = {
  async onRequest(req) {
    // TODO check accessToken
    const accessToken = req.headers.get("Authorization")?.split(" ")[1];

    if (!accessToken) {
      // TODO Redirect to login page (or handle as needed)
      throw new Error("No access token provided");
    }

    try {
      await validateAccessToken(accessToken); // TODO Make validation request
    } catch (error) {
      if (error instanceof Error && error.message === "Invalid access token") {
        const newAccessToken = await refreshTokenIfNeeded();

        req.headers.set("Authorization", `Bearer ${newAccessToken}`);
      } else {
        // TODO Handle other validation errors (e.g., network issues)
        throw error;
      }
    }

    req.headers.set("Authorization", `Bearer ${accessToken}`);
    return req;
  },
};

async function validateAccessToken(accessToken: string) {}

async function refreshTokenIfNeeded() {
  const refreshToken = localStorage.getItem("token:refreshToken");

  if (!refreshToken) {
    throw new Error("No refresh token available");
  }

  const response = await fetch(`${env.VITE_BASE_URL}/auth/refresh`, {
    method: "POST",
    body: JSON.stringify({
      refreshToken,
    }),
  });

  if (!response.ok) {
    // TODO Redirect to login page (or handle as needed)
    throw new Error("Refresh token failed");
  }

  const data = await response.json();
  localStorage.setItem("token:accessToken", data.accessToken);
  return data.accessToken;
}

export const fetcher = createClient<paths>({
  baseUrl: env.VITE_BASE_URL,
});

fetcher.use(middleware);
