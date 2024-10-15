"use server";

import { signIn } from "@/auth";

export async function doSocialLogin({
  socialMethod,
}: {
  socialMethod: string;
}) {
  await signIn(socialMethod.toLowerCase(), { redirectTo: "/" });
}