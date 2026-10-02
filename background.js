// Background Service Worker for Focus Garden / Better Forest
chrome.runtime.onInstalled.addListener(() => {
  // Clear any leftover dynamic rules upon install
  chrome.declarativeNetRequest.getDynamicRules(existingRules => {
    const ids = existingRules.map(r => r.id);
    if (ids.length > 0) {
      chrome.declarativeNetRequest.updateDynamicRules({ removeRuleIds: ids });
    }
  });
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "START_BLOCKING") {
    const mode = request.mode || "blacklist";
    const sites = request.sites || [];

    chrome.declarativeNetRequest.getDynamicRules(existingRules => {
      const removeIds = existingRules.map(r => r.id);
      const newRules = [];

      if (mode === "blacklist") {
        // Block only designated distraction domains
        sites.forEach((site, index) => {
          newRules.push({
            id: index + 1,
            priority: 1,
            action: { type: "block" },
            condition: {
              urlFilter: `||${site}`,
              resourceTypes: ["main_frame"]
            }
          });
        });
      } else if (mode === "whitelist") {
        // Allow listed research sites and crucial CDNs, block all others
        const allowed = [...sites, "gstatic.com", "googleapis.com", "firebaseio.com", "jsdelivr.net"];

        allowed.forEach((site, index) => {
          newRules.push({
            id: index + 1,
            priority: 2,
            action: { type: "allow" },
            condition: {
              urlFilter: `||${site}`,
              resourceTypes: ["main_frame", "sub_frame", "stylesheet", "script", "image", "xmlhttprequest"]
            }
          });
        });

        // Block everything else
        newRules.push({
          id: 9999,
          priority: 1,
          action: { type: "block" },
          condition: {
            urlFilter: "*",
            resourceTypes: ["main_frame"]
          }
        });
      }

      chrome.declarativeNetRequest.updateDynamicRules({
        removeRuleIds: removeIds,
        addRules: newRules
      }, () => {
        sendResponse({ status: "blocking_active", mode: mode, count: newRules.length });
      });
    });

    return true; // Keep message port open for async response
  }

  if (request.action === "STOP_BLOCKING") {
    chrome.declarativeNetRequest.getDynamicRules(existingRules => {
      const removeIds = existingRules.map(r => r.id);
      chrome.declarativeNetRequest.updateDynamicRules({
        removeRuleIds: removeIds
      }, () => {
        sendResponse({ status: "blocking_disabled" });
      });
    });

    return true;
  }
});