chrome.runtime.onMessage.addListener(onMessageListener);

async function onMessageListener(request, sender, sendResponse) {
  if (request.message === "pasteTempmailAddress") {
    const { imboxAccount } = await chrome.storage.sync.get("imboxAccount");
    const address = imboxAccount.email;
    const element = document.activeElement.tagName;
    if (element === "INPUT" || element === "TEXTAREA") {
      document.activeElement.value = address;
    }
    sendResponse({ status: "ok" }); // Send a response back to the content script
  }
}
