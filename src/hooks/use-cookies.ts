"use server";

import { cookies } from "next/headers";

interface CookiesProps {
  name: "token" | "refresh_token" | "role" | "email" | "name" | "avatar";
  data: string;
}

export async function createCookies(props: CookiesProps) {
  (await cookies()).set(props?.name, props?.data, { secure: true });
}

export async function getCookies(name: CookiesProps["name"]) {
  return (await cookies()).get(name);
}

export async function removeCookies(name: CookiesProps["name"]) {
  (await cookies()).delete(name);
}

export async function removeAllCookiesAuth() {
  await removeCookies("token");
  await removeCookies("refresh_token");
}
