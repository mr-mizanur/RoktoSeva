import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  
  baseURL: process.env.NEXT_PUBLIC_APP_URL || "https://rokto-seva.vercel.app", 
});

export const { signIn, signUp, useSession } = authClient;