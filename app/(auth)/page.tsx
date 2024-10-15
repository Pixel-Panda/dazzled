"use server";

import { signIn } from "@/auth";

export async function doLinkedInLogin() {
  await signIn("linkedin", { redirectTo: "/" });
}