import { useNavigate, useSearchParams } from "@solidjs/router";
import { type ParentComponent, createEffect } from "solid-js";

export const RouteGuard: ParentComponent = (props) => {
  const navigate = useNavigate();
  const searchParam = useSearchParams();

  const hasCode = searchParam[0].code;

  createEffect(() => {
    if (!hasCode) {
      navigate("/login", { replace: true });
    }
  });

  return <>{props.children}</>;
};
