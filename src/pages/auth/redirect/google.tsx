import { Button } from "@/components/ui/button";
import { fetcher } from "@/lib/openapi";
import { useSearchParams } from "@solidjs/router";
import { createEffect } from "solid-js";

export function GoogleAuth() {
  const searchParam = useSearchParams();
  const code = searchParam[0].code ?? "";

  async function getAuthSession() {
    try {
      const { data } = await fetcher.POST("/auth/google", {
        body: {
          code,
          originUrl: `${window.location.origin}/auth/google`,
        },
      });

      if (data?.accessToken && data.refreshToken) {
        sessionStorage.setItem("token:accessToken", data.accessToken);
        sessionStorage.setItem("token:refreshToken", data.refreshToken);

        // ? navigate("/home", { replace: true });
      } else {
        // ? navigate("/login", { replace: true });
      }
    } catch (e) {
      console.error("Error exchanging code for tokens:", e);
      // ? navigate("/login", { replace: true });
    }
  }

  createEffect(() => {
    getAuthSession();
  });

  function copyCode() {
    navigator.clipboard.writeText(code);
  }

  return (
    <div class="w-full h-screen flex flex-col items-center justify-center gap-4">
      <div>{code}</div>
      {/* <Icons.logo class="animate-spin" /> */}
      <div>
        <Button onClick={copyCode}>Copy code</Button>
      </div>
    </div>
  );
}
