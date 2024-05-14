import { Route, Router } from "@solidjs/router";
import { SignIn } from "./pages/auth/sign-in";
import { Home } from "./pages/home";
import { RouteGuard } from "./route-guard";
import { AuthProvider } from "./shared/auth-provider";

export function App() {
  return (
    <AuthProvider>
      <Router>
        <Route path="/login" component={SignIn} />
        <Route path="/" component={RouteGuard}>
          <Route component={Home} />
        </Route>
        <Route path="*" component={() => <div>Page Not found!!!</div>} />
      </Router>
    </AuthProvider>
  );
}
