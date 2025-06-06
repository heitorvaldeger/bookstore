import { test as setup } from "@playwright/test";

const authFile = "playwright/.auth/user.json";

setup("authenticate", async ({ request }) => {
  await request.post(`${process.env.VITE_API_URL}/api/auth/login`, {
    data: {
      email: "mail@mail.com",
      password: "1234",
    },
  });

  await request.storageState({ path: authFile });
});
