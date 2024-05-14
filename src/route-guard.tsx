import { useNavigate } from "@solidjs/router";
import { type ParentComponent, createEffect } from "solid-js";

export const RouteGuard: ParentComponent = (props) => {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");

  createEffect(() => {
    if (!token) {
      navigate("/login", { replace: true });
    }
  });

  return <>{props.children}</>;
};
