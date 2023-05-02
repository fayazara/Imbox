import Mailjs from "~/services/mail"

chrome.runtime.onInstalled.addListener(async (): Promise<void> => {
  try {
    // eslint-disable-next-line no-console
    const mailjs = new Mailjs();
    const account = await mailjs.createOneAccount();
    if (account.status) {
      await mailjs.login(account.data.username, account.data.password);
      await chrome.storage.sync.set({
        imboxAccount: {
          email: account.data.username,
          password: account.data.password,
          token: mailjs.token
        }
      })
    }
  } catch (error) {
    throw new Error(error)
  }
})


let contextMenuItem = {
  id: "pasteTempmailAddress",
  title: "Paste Tempmail Address",
  contexts: ["all"],
};
chrome.contextMenus.create(contextMenuItem);

chrome.contextMenus.onClicked.addListener(function (clickData) {
  console.log(clickData.menuItemId);
  if (clickData.menuItemId !== "pasteTempmailAddress") return;
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(
      tabs[0].id,
      { message: "pasteTempmailAddress" },
      function (response) {
        console.log(response); // Log the response received from the content script
      }
    );
  });
});
