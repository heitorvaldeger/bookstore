import { api } from "@/lib/axios";
import type { User } from "@/models/user";

export const fetchUser = async () => {
  const response = await api.get<User>("/auth/me");
  return response.data;
};
