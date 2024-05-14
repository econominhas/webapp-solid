import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/shared/auth-provider";

export function SignIn() {
  const { login } = useAuth();

  async function handleWithGoogleLogin() {
    await login("google");
  }

  return (
    <main>
      <div class="container flex h-screen w-screen flex-col items-center justify-center">
        <div class="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div class="flex flex-col text-center">
            <Icons.logo class="mx-auto h-6 w-6 mb-2" />
            <h1 class="text-2xl font-semibold tracking-tight">
              Welcome to Econominhas
            </h1>
            <p class="text-sm text-muted-foreground">
              Enter your email to sign in to your account
            </p>
          </div>
          <div class="flex items-center gap-2">
            <Button
              onClick={handleWithGoogleLogin}
              variant="outline"
              class="flex-1"
            >
              <Icons.google class="size-4" />
            </Button>
            <Button variant="outline" class="flex-1">
              <Icons.facebook class="size-4" />
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
