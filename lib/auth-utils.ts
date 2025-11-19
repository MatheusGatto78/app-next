import { authClient } from "./auth-client";

export async function getCurrentUser() {
  try {
    const session = await authClient.getSession();
    return session?.data?.user || null;
  } catch (error) {
    console.error("Erro ao obter usuário atual:", error);
    return null;
  }
}

export async function requireAuth() {
  const user = await getCurrentUser();
  if (!user) {
    return null;
  }
  return user;
}
