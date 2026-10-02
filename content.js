// Bridges messages from your website directly into background.js
window.addEventListener("message", (event) => {
  if (event.source !== window) return;

  if (event.data && event.data.type === "FOCUS_GARDEN_BLOCKER") {
    chrome.runtime.sendMessage(event.data);
  }
});