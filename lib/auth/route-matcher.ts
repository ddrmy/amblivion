// src/lib/auth/route-matcher.ts

import { RouteRule } from "./route-config";

export function matchRoute(pathname: string, route: RouteRule): boolean {
  if (route.match === "exact") {
    return pathname === route.path;
  }

  if (route.match === "startsWith") {
    return pathname.startsWith(route.path);
  }

  return false;
}
