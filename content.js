// Bridges messages from background.js to the Focus Garden webpage
chrome.runtime.onMessage.addListener((request) => {
  if (request.action === "KILL_PLANT_FROM_EXTENSION") {
    window.postMessage({
      type: "FOCUS_GARDEN_KILL",
      reason: request.reason
    }, "*");
  }
});

// Bridges blocker start/stop commands from app.js to background.js
window.addEventListener("message", (event) => {
  if (event.source !== window) return;
  if (event.data && event.data.type === "FOCUS_GARDEN_BLOCKER") {
    chrome.runtime.sendMessage(event.data).catch(() => {});
  }
});