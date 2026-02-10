import { cookies } from "next/headers";

export function requireAdminAuth() {
  const isAuthed = cookies().get("m4u-admin-auth")?.value === "1";
  return isAuthed;
}
