let isBlocking = false;
let blockerMode = "blacklist";
let blockerSites = [];

// Initialize saved settings from storage and persist blocking state across service worker restarts
chrome.storage.local.get(["isBlocking", "blockerMode", "blockerSites"], (res) => {
  if (typeof res.isBlocking === 'boolean') isBlocking = res.isBlocking;
  if (res.blockerMode) blockerMode = res.blockerMode;
  if (res.blockerSites) {
    if (Array.isArray(res.blockerSites)) {
      blockerSites = res.blockerSites;
    } else if (typeof res.blockerSites === 'string') {
      blockerSites = res.blockerSites.split(',').map(s => s.trim().toLowerCase()).filter(Boolean);
    }
  }
});

// Focus or open Focus Garden tab on sprout toolbar click
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

// Handle commands from app.js via content.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "START_BLOCKING") {
    isBlocking = true;
    if (request.mode) blockerMode = request.mode;
    if (request.sites && Array.isArray(request.sites)) {
      blockerSites = request.sites;
    }
    chrome.storage.local.set({
      isBlocking: true,
      blockerMode: blockerMode,
      blockerSites: blockerSites
    });
    sendResponse({ status: "blocking_active", mode: blockerMode, sites: blockerSites });
    return true;
  }

  if (request.action === "STOP_BLOCKING") {
    isBlocking = false;
    chrome.storage.local.set({ isBlocking: false });
    sendResponse({ status: "blocking_disabled" });
    return true;
  }
});

// Central URL enforcement for active browsing/navigation
function checkAndEnforceUrl(urlStr, tabId) {
  if (!isBlocking || !urlStr) return;

  // Always ignore internal protocols and Focus Garden itself
  if (
    urlStr.startsWith("chrome://") || 
    urlStr.startsWith("chrome-extension://") || 
    urlStr.startsWith("about:") || 
    urlStr.includes("focus-garden") || 
    urlStr.includes("127.0.0.1") || 
    urlStr.includes("localhost")
  ) {
    return;
  }

  let hostname = "";
  try {
    hostname = new URL(urlStr).hostname.toLowerCase();
  } catch (e) {
    return;
  }

  if (!hostname) return;

  let shouldBlock = false;
  let reason = "";

  if (blockerMode === "blacklist") {
    const isBlacklisted = blockerSites.some(site => {
      const clean = site.replace(/^https?:\/\//, '').replace(/\/.*$/, '').trim();
      return clean && (hostname === clean || hostname.endsWith("." + clean));
    });

    if (isBlacklisted) {
      shouldBlock = true;
      reason = `you visited ${hostname} (blacklisted) and your plant died`;
    }
  } else if (blockerMode === "whitelist") {
    const defaultAllowed = ["gstatic.com", "googleapis.com", "firebaseio.com", "github.io", "google.com"];
    const isAllowed = [...blockerSites, ...defaultAllowed].some(site => {
      const clean = site.replace(/^https?:\/\//, '').replace(/\/.*$/, '').trim();
      return clean && (hostname === clean || hostname.endsWith("." + clean));
    });

    if (!isAllowed) {
      shouldBlock = true;
      reason = `you visited ${hostname} (not on whitelist) and your plant died`;
    }
  }

  if (shouldBlock) {
    isBlocking = false;
    chrome.storage.local.set({ isBlocking: false });

    // Redirect to the hosted blocked page on GitHub Pages
    const blockedUrl = `https://etheriiaa.github.io/focus-garden/blocked.html?site=${encodeURIComponent(hostname)}`;
    chrome.tabs.update(tabId, { url: blockedUrl });
    notifyFocusGardenKill(reason);
  }
}

// Dispatches the kill event to open Focus Garden tabs
function notifyFocusGardenKill(reason) {
  chrome.tabs.query({}, (tabs) => {
    tabs.forEach(t => {
      if (t.url && (t.url.includes("focus-garden") || t.url.includes("localhost") || t.url.includes("127.0.0.1"))) {
        chrome.tabs.sendMessage(t.id, {
          action: "KILL_PLANT_FROM_EXTENSION",
          reason: reason
        }).catch(() => {});
      }
    });
  });
}

// Navigation listener: catches destination before page loads
chrome.webNavigation.onBeforeNavigate.addListener((details) => {
  if (details.frameId === 0) {
    checkAndEnforceUrl(details.url, details.tabId);
  }
});

// Tab update listener: catches URL changes within existing tabs
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.url) {
    checkAndEnforceUrl(changeInfo.url, tabId);
  }
});