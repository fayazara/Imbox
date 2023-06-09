import Mailjs from "~/services/mail";

chrome.runtime.onInstalled.addListener(async (): Promise<void> => {
  try {
    const mailjs: Mailjs = new Mailjs();
    const account = await mailjs.createOneAccount();
    if (account.status) {
      await mailjs.login(account.data.username, account.data.password);
      await chrome.storage.sync.set({
        imboxAccount: {
          email: account.data.username,
          password: account.data.password,
          token: mailjs.token
        }
      });
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error);
    } else {
      console.error(new Error("Unknown error occurred"));
    }
  }
});
