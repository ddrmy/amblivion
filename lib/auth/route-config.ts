// src/lib/auth/route-config.ts

export type RouteRule = {
  path: string;
  match: "exact" | "startsWith";
  whenAuthenticated: "redirect" | "next";
};

export const publicRoutes: RouteRule[] = [
  {
    path: "/sign-in",
    match: "exact",
    whenAuthenticated: "redirect",
  },
  {
    path: "/register",
    match: "exact",
    whenAuthenticated: "redirect",
  },
  {
    path: "/pricing",
    match: "exact",
    whenAuthenticated: "next",
  },
  {
    path: "/auth",
    match: "startsWith",
    whenAuthenticated: "redirect",
  },
];

export const REDIRECT_WHEN_NOT_AUTHENTICATED = "/sign-in";
export const REDIRECT_WHEN_AUTHENTICATED = "/dashboard";
