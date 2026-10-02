// Open or focus your Focus Garden tab when clicking the sprout toolbar icon
chrome.action.onClicked.addListener(() => {
  const targetUrl = "https://etheriiaa.github.io/focus-garden/";

  chrome.tabs.query({}, (tabs) => {
    const existingTab = tabs.find(t => t.url && t.url.includes("focus-garden"));
    if (existingTab) {
      chrome.tabs.update(existingTab.id, { active: true });
      if (existingTab.windowId) {
        chrome.windows.update(existingTab.windowId, { focused: true });
      }
    } else {
      chrome.tabs.create({ url: targetUrl });
    }
  });
});

// Clear any stale blocking rules when extension boots up
chrome.runtime.onInstalled.addListener(() => {
  chrome.declarativeNetRequest.getDynamicRules(existingRules => {
    const ids = existingRules.map(r => r.id);
    if (ids.length > 0) {
      chrome.declarativeNetRequest.updateDynamicRules({ removeRuleIds: ids });
    }
  });
});

// Listen for START_BLOCKING / STOP_BLOCKING from the webpage
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "START_BLOCKING") {
    const mode = request.mode || "blacklist";
    const sites = request.sites || [];

    chrome.declarativeNetRequest.getDynamicRules(existingRules => {
      const removeIds = existingRules.map(r => r.id);
      const newRules = [];

      if (mode === "blacklist") {
        // Redirect blacklisted sites to your custom visual shield page
        sites.forEach((site, index) => {
          newRules.push({
            id: index + 1,
            priority: 1,
            action: {
              type: "redirect",
              redirect: { extensionPath: "/blocked.html" }
            },
            condition: {
              urlFilter: `||${site}`,
              resourceTypes: ["main_frame"]
            }
          });
        });
      } else if (mode === "whitelist") {
        // Whitelist mode: Allow specified domains, redirect all others to shield
        const allowed = [...sites, "google.com", "gstatic.com", "googleapis.com", "firebaseio.com", "jsdelivr.net", "github.io"];

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

        // Redirect everything else to shield
        newRules.push({
          id: 9999,
          priority: 1,
          action: {
            type: "redirect",
            redirect: { extensionPath: "/blocked.html" }
          },
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

    return true;
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