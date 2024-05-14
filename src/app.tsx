import { Route, Router } from "@solidjs/router";
import { SignIn } from "./pages/auth/sign-in";
import { Home } from "./pages/home";
import { RouteGuard } from "./route-guard";

export function App() {
  return (
    <Router>
      <Route path="/login" component={SignIn} />
      <Route path="/" component={RouteGuard}>
        <Route component={Home} />
      </Route>
      <Route path="*" component={() => <div>Page Not found!!!</div>} />
    </Router>
  );
}
