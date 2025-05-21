import { api } from "../lib/axios";

interface SignInParams {
  email: string;
  password: string;
}
export const signIn = async ({ email, password }: SignInParams) => {
  await api.post("/auth/login", {
    email,
    password,
  });
};
