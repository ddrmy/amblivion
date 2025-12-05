"use server";

import { cookies } from "next/headers";

export async function testAction() {
  cookies().set("test", "ok", {
    maxAge: 60,
  });

  return { ok: true };
}
