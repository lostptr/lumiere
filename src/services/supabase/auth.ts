import client from "./client";

async function loginWithEmail(email: string, password: string) {
  return await client.auth.signInWithPassword({ email, password });
}

async function logoutFromAuth() {
  return await client.auth.signOut();
}

async function createAccount(email: string, password: string, name: string) {
  return client.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
      }
    }
  });
}

async function getUser() {
  const session = await client.auth.getSession();
  return session;
}

const authService = {
  loginWithEmail,
  logoutFromAuth,
  createAccount,
  getUser,
};

export default authService;