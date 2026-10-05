/* ================= FIREBASE INITIALIZATION ================= */
const firebaseConfig = {
  apiKey: "AIzaSyAepi_hs2ynBAuFrUkPcGEUvXGLfWjBlgk",
  authDomain: "myfocusgarden.firebaseapp.com",
  projectId: "myfocusgarden",
  storageBucket: "myfocusgarden.firebasestorage.app",
  messagingSenderId: "784596409013",
  appId: "1:784596409013:web:28786297a19d20898b3cfc"
};

// Initialize Firebase & Cloud Firestore
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

/* ================= GLOBAL STATE & CATALOG ================= */
const CATALOG = [
  { id: 'sprout', name: 'sprout', cost: 0, img: 'sprout.png' },
  { id: 'classic-tree', name: 'classic tree', cost: 25, img: 'classic-tree.png' },
  { id: 'droopy-tree', name: 'droopy tree', cost: 25, img: 'droopy-tree.png' },
  { id: 'spruce-tree', name: 'spruce tree', cost: 25, img: 'spruce-tree.png' },
  { id: 'evil-tree', name: 'evil tree', cost: 25, img: 'evil-tree.png' },
  { id: 'lantern-tree', name: 'lantern tree', cost: 50, img: 'lantern-tree.png' },
  { id: 'cotton-tree', name: 'cotton tree', cost: 50, img: 'cotton-tree.png' },
  { id: 'orange-tree', name: 'orange tree', cost: 50, img: 'orange-tree.png' },
  { id: 'succulent-tree', name: 'succulent tree', cost: 100, img: 'succulent-tree.png' },
  { id: 'flower-tree', name: 'flower tree', cost: 100, img: 'flower-tree.png' },
  { id: 'fairy-tree', name: 'fairy tree', cost: 150, img: 'fairy-tree.png' },
  { id: 'fairy-light-tree', name: 'fairy light tree', cost: 150, img: 'fairy-light-tree.png' },
  { id: 'galaxy-tree', name: 'galaxy tree', cost: 150, img: 'galaxy-tree.png' },
  { id: 'red-flowers', name: 'red flowers', cost: 25, img: 'red-flowers.png' },
  { id: 'pink-flowers', name: 'pink flowers', cost: 25, img: 'pink-flowers.png' },
  { id: 'eye-flower', name: 'eye flower', cost: 50, img: 'eye-flower.png' },
  { id: 'alien-flower', name: 'alien flower', cost: 100, img: 'alien-flower.png' },
  { id: 'fuschia-flowers', name: 'fuschia flowers', cost: 100, img: 'fuschia-flowers.png' },
  { id: 'spike-fruit', name: 'spike fruit', cost: 25, img: 'spike-fruit.png' },
  { id: 'purple-fruit', name: 'purple fruit', cost: 50, img: 'purple-fruit.png' },
  { id: 'golden-fruit', name: 'golden fruit', cost: 50, img: 'golden-fruit.png' },
  { id: 'lantern-plant', name: 'lantern plant', cost: 50, img: 'lantern-plant.png' },
  { id: 'crystal-plant', name: 'crystal plant', cost: 50, img: 'crystal-plant.png' },
  { id: 'cactus', name: 'cactus', cost: 25, img: 'cactus.png' },
  { id: 'succulent', name: 'succulent', cost: 50, img: 'succulent.png' },
  { id: 'fire-mushroom', name: 'fire mushroom', cost: 25, img: 'fire-mushroom.png' },
  { id: 'jelly-mushroom', name: 'jelly mushroom', cost: 25, img: 'jelly-mushroom.png' },
  { id: 'ghost-mushroom', name: 'ghost mushroom', cost: 25, img: 'ghost-mushroom.png' },
  { id: 'fig-house', name: 'fig house', cost: 150, img: 'fig-house.png' },
  { id: 'watermelon-house', name: 'watermelon house', cost: 150, img: 'watermelon-house.png' },
  { id: 'pumpkin-house', name: 'pumpkin house', cost: 200, img: 'pumpkin-house.png' },
  { id: 'pinecone-house', name: 'pinecone house', cost: 200, img: 'pinecone-house.png' },
  { id: 'pineapple-house', name: 'pineapple house', cost: 250, img: 'pineapple-house.png' },
  { id: 'blue-flower', name: 'blue flower', cost: 50, img: 'blue-flower.png' },
  { id: 'pink-flower', name: 'pink flower', cost: 50, img: 'pink-flower.png' },
  { id: 'yellow-flower', name: 'yellow flower', cost: 50, img: 'yellow-flower.png' },
  { id: 'jellyfish', name: 'jellyfish', cost: 100, img: 'jellyfish.png' },
  { id: 'leaf-owl', name: 'leaf owl', cost: 100, img: 'leaf-owl.png' },
  { id: 'leaf-lizard', name: 'leaf lizard', cost: 100, img: 'leaf-lizard.png' },
  { id: 'succulent-fox', name: 'succulent fox', cost: 150, img: 'succulent-fox.png' },
  { id: 'carrot-cat', name: 'carrot cat', cost: 200, img: 'carrot-cat.png' },
  { id: 'cabbage-cat', name: 'cabbage cat', cost: 200, img: 'cabbage-cat.png' },
  { id: 'cabbage-dog', name: 'cabbage dog', cost: 250, img: 'cabbage-dog.png' },
  { id: 'apple-dino', name: 'apple dino', cost: 250, img: 'apple-dino.png' },
  { id: 'orange-turtle', name: 'orange turtle', cost: 250, img: 'orange-turtle.png' },
  { id: 'mango-raccoon', name: 'mango raccoon', cost: 250, img: 'mango-raccoon.png' },
  { id: 'pineapple-dog', name: 'pineapple dog', cost: 250, img: 'pineapple-dog.png' },
  { id: 'leek-duck', name: 'leek duck', cost: 250, img: 'leek-duck.png' },
  { id: 'apple-bat', name: 'apple bat', cost: 250, img: 'apple-bat.png' },
  { id: 'tree-rex', name: 'tree-rex', cost: 250, img: 'tree-rex.png' }
];

let currentUser = localStorage.getItem('currentUser') || null;
let leaves = 0;
let leafBankSeconds = 0;
let ownedPlants = ['sprout'];
let selectedPlantId = 'sprout';
let gardenHistory = [];
let friends = [];
let userGroups = [];

let activeGroupId = null;
let currentGardenTimeframe = 'day';
let currentStatsTimeframe = 'day';
let focusChartInstance = null;

let unsubscribeUser = null;
let unsubscribeGroups = null;

let knownGroupHistoryIds = new Set();
let knownNotificationIds = new Set();
let isInitialGroupLoad = true;
let isInitialUserLoad = true;

// Device & Multi-Device Session State
const clientDeviceId = 'dev_' + Math.random().toString(36).substring(2, 9);
let currentSessionId = null;
let lastDeadSessionId = null;

// Wall-clock State
let totalSeconds = 600;
let remainingSeconds = 600;
let targetEndTime = null;
let sessionStartTime = null;
let timerInterval = null;
let isFocusing = false;
let wakeLockSentinel = null;

/* ================= TOAST NOTIFICATION POPUPS ================= */
function showToast(icon, title, message, type = 'grown') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <div class="toast-icon">${icon}</div>
    <div class="toast-content">
      <h5>${title}</h5>
      <p>${message}</p>
    </div>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = 'fadeOutToast 0.35s forwards';
    setTimeout(() => toast.remove(), 350);
  }, 4500);
}

/* ================= INITIALIZATION ================= */
window.addEventListener('DOMContentLoaded', () => {
  loadBlockerSettingsUI();

  if (currentUser) {
    attachFirebaseListeners(currentUser);
    showMainApp();
  }
  startSundayCountdownTimer();
});

// Listen for kill commands dispatched from the Chrome extension
window.addEventListener("message", (event) => {
  if (event.source !== window) return;
  if (event.data && event.data.type === "FOCUS_GARDEN_KILL") {
    if (isFocusing) {
      killPlant(event.data.reason || "your poor plant died because you went on that site");
    }
  }
});

/* ================= 1. AUTH & FIRESTORE SYNC ================= */
function openLoginModal() {
  document.getElementById('loginModal').style.display = 'flex';
}

function closeLoginModal() {
  document.getElementById('loginModal').style.display = 'none';
}

async function handleLogin(e) {
  if (e) e.preventDefault();
  const inputUser = document.getElementById('loginUsername').value.trim();
  if (!inputUser) return;

  currentUser = inputUser;
  localStorage.setItem('currentUser', currentUser);

  const userDocRef = db.collection('users').doc(currentUser.toLowerCase());
  const doc = await userDocRef.get();

  if (!doc.exists) {
    await userDocRef.set({
      displayName: currentUser,
      leaves: 0,
      leafBankSeconds: 0,
      ownedPlants: ['sprout'],
      selectedPlantId: 'sprout',
      gardenHistory: [],
      friends: [],
      notifications: [],
      activeSession: null
    });
  }

  isInitialGroupLoad = true;
  isInitialUserLoad = true;
  attachFirebaseListeners(currentUser);
  closeLoginModal();
  showMainApp();
}

function attachFirebaseListeners(username) {
  if (unsubscribeUser) unsubscribeUser();
  if (unsubscribeGroups) unsubscribeGroups();

  const userDocRef = db.collection('users').doc(username.toLowerCase());

  unsubscribeUser = userDocRef.onSnapshot(doc => {
    if (!doc.exists) return;
    const data = doc.data();

    currentUser = data.displayName || currentUser;
    leaves = data.leaves || 0;
    leafBankSeconds = data.leafBankSeconds || 0;
    ownedPlants = data.ownedPlants || ['sprout'];
    selectedPlantId = data.selectedPlantId || 'sprout';
    gardenHistory = data.gardenHistory || [];
    friends = data.friends || [];

    // --- TWO-WAY CROSS-DEVICE TIMER SYNC ---
    const active = data.activeSession;
    if (active && active.status === 'running') {
      if (active.sessionId !== lastDeadSessionId) {
        if (!isFocusing || currentSessionId !== active.sessionId) {
          syncRemoteTimerStart(active);
        }
      }
    } else if (active && active.status === 'dead') {
      lastDeadSessionId = active.sessionId;
      if (isFocusing) {
        syncRemoteTimerKill(active.reason);
      }
    } else {
      if (isFocusing && (!active || active.status === 'idle' || active.status === 'completed')) {
        syncRemoteTimerStop();
      }
    }

    const notifications = data.notifications || [];
    if (isInitialUserLoad) {
      notifications.forEach(n => knownNotificationIds.add(n.id));
      isInitialUserLoad = false;
    } else {
      notifications.forEach(n => {
        if (!knownNotificationIds.has(n.id)) {
          knownNotificationIds.add(n.id);
          showToast('💌', 'friend notice!', n.text, 'friend');
        }
      });
    }

    document.getElementById('displayUser').innerText = currentUser;
    updateCurrencyDisplay();
    updateSelectedPlantDisplay();
    renderNursery();
    renderGarden(currentGardenTimeframe);
    renderFriendsList();
  });

  const userLower = username.toLowerCase();
  unsubscribeGroups = db.collection('groups').onSnapshot(snapshot => {
    userGroups = [];

    snapshot.forEach(doc => {
      const groupData = { id: doc.id, ...doc.data() };
      const members = (groupData.members || []).map(m => String(m).toLowerCase());

      if (members.includes(userLower)) {
        userGroups.push(groupData);

        const history = groupData.history || [];

        if (isInitialGroupLoad) {
          history.forEach(item => {
            if (item.entryId) knownGroupHistoryIds.add(item.entryId);
          });
        } else {
          history.forEach(item => {
            if (item.entryId && !knownGroupHistoryIds.has(item.entryId)) {
              knownGroupHistoryIds.add(item.entryId);

              if (item.owner && item.owner.toLowerCase() !== currentUser.toLowerCase()) {
                const plantLabel = item.nickname || 'a plant';
                if (item.status === 'grown') {
                  showToast('🌸', 'plant bloomed!', `${item.owner} successfully grew "${plantLabel}" in ${groupData.name}!`, 'grown');
                } else if (item.status === 'dead' || item.status === 'withered') {
                  showToast('🥀', 'plant died...', `${item.owner} killed "${plantLabel}" in ${groupData.name}. boo!`, 'dead');
                }
              }
            }
          });
        }
      }
    });

    if (isInitialGroupLoad) isInitialGroupLoad = false;

    renderGroupsList();
    if (activeGroupId) {
      const currentGroup = userGroups.find(g => g.id === activeGroupId);
      if (currentGroup) renderGroupLeaderboardAndGarden(currentGroup);
    }
  });
}

function showMainApp() {
  document.getElementById('pageHome').style.display = 'none';
  document.getElementById('exitScreen').style.display = 'none';
  document.getElementById('appContainer').style.display = 'block';
  document.getElementById('displayUser').innerText = currentUser;

  updateSelectedPlantDisplay();
  renderNursery();
  renderGarden(currentGardenTimeframe);
  renderFriendsList();
  renderGroupsList();
}

function triggerExit() {
  document.getElementById('pageHome').style.display = 'none';
  document.getElementById('appContainer').style.display = 'none';
  document.getElementById('exitScreen').style.display = 'block';
}

function backToHome() {
  document.getElementById('exitScreen').style.display = 'none';
  document.getElementById('pageHome').style.display = 'flex';
}

/* ================= SETTINGS & EXTENSION CONFIG ================= */
function openSettingsModal() {
  document.getElementById('newUsernameInput').value = currentUser || '';

  const adminSection = document.getElementById('adminSettingsSection');
  if (adminSection) {
    if (currentUser && (currentUser.toLowerCase() === 'admin' || currentUser.toLowerCase() === 'dallas')) {
      adminSection.style.display = 'block';
    } else {
      adminSection.style.display = 'none';
    }
  }

  loadBlockerSettingsUI();
  document.getElementById('settingsModal').style.display = 'flex';
}

function closeSettingsModal() {
  document.getElementById('settingsModal').style.display = 'none';
}

function setBlockerMode(mode) {
  localStorage.setItem('blockerMode', mode);
  const blacklistBtn = document.getElementById('blockerModeBlacklistBtn');
  const whitelistBtn = document.getElementById('blockerModeWhitelistBtn');
  const desc = document.getElementById('blockerModeDescription');

  if (blacklistBtn && whitelistBtn) {
    if (mode === 'blacklist') {
      blacklistBtn.classList.add('active-mode');
      whitelistBtn.classList.remove('active-mode');
    } else {
      whitelistBtn.classList.add('active-mode');
      blacklistBtn.classList.remove('active-mode');
    }
  }

  if (desc) {
    desc.innerText = mode === 'blacklist'
      ? "blacklist mode: blocks only the websites listed below."
      : "whitelist mode: blocks EVERYTHING except the websites listed below.";
  }
}

function loadBlockerSettingsUI() {
  const mode = localStorage.getItem('blockerMode') || 'blacklist';
  const defaultSites = mode === 'blacklist' 
    ? "youtube.com, instagram.com, netflix.com, tiktok.com"
    : "google.com, docs.google.com, canvas.instructure.com, wikipedia.org";
  
  const savedSites = localStorage.getItem('blockerSites') || defaultSites;
  const textarea = document.getElementById('blockerSitesTextarea');
  if (textarea) textarea.value = savedSites;
  setBlockerMode(mode);
}

function saveBlockerSettings() {
  const textarea = document.getElementById('blockerSitesTextarea');
  if (!textarea) return;
  const sites = textarea.value.trim();
  localStorage.setItem('blockerSites', sites);

  triggerExtensionBlocker(isFocusing);
  alert("blocker settings saved!");
}

async function updateUsername() {
  const newName = document.getElementById('newUsernameInput').value.trim();
  if (!newName || newName === currentUser) {
    closeSettingsModal();
    return;
  }

  const oldDocRef = db.collection('users').doc(currentUser.toLowerCase());
  const newDocRef = db.collection('users').doc(newName.toLowerCase());

  const check = await newDocRef.get();
  if (check.exists) {
    alert(`the username "${newName}" is already taken!`);
    return;
  }

  const currentData = (await oldDocRef.get()).data();
  currentData.displayName = newName;
  await newDocRef.set(currentData);
  await oldDocRef.delete();

  // Cascade username update across all user groups and historical plants
  const oldLower = currentUser.toLowerCase();
  for (const group of userGroups) {
    const updatedMembers = (group.members || []).map(m => m.toLowerCase() === oldLower ? newName.toLowerCase() : m);
    const updatedHistory = (group.history || []).map(item => {
      if (item.owner && item.owner.toLowerCase() === oldLower) {
        return { ...item, owner: newName };
      }
      return item;
    });

    await db.collection('groups').doc(group.id).update({
      members: updatedMembers,
      history: updatedHistory
    });
  }

  currentUser = newName;
  localStorage.setItem('currentUser', currentUser);
  attachFirebaseListeners(currentUser);

  alert(`Username updated to "${newName}"!`);
  closeSettingsModal();
}

async function confirmResetProgress() {
  const confirmed = confirm("are you sure you want to reset all progress? you will lose leaves, plants, and garden history!");
  if (!confirmed) return;

  const userDocRef = db.collection('users').doc(currentUser.toLowerCase());
  await userDocRef.update({
    leaves: 0,
    leafBankSeconds: 0,
    ownedPlants: ['sprout'],
    selectedPlantId: 'sprout',
    gardenHistory: [],
    activeSession: null
  });

  closeSettingsModal();
  alert("your progress has been completely reset");
}

function logOut() {
  if (unsubscribeUser) unsubscribeUser();
  if (unsubscribeGroups) unsubscribeGroups();

  currentUser = null;
  localStorage.removeItem('currentUser');
  closeSettingsModal();
  document.getElementById('appContainer').style.display = 'none';
  document.getElementById('pageHome').style.display = 'flex';
}

/* ================= 2. TAB NAVIGATION ================= */
function switchTab(tabName, clickedBtn) {
  const buttons = document.querySelectorAll('.nav-tabs .tab-btn');
  buttons.forEach(btn => btn.classList.remove('active'));

  if (clickedBtn) {
    clickedBtn.classList.add('active');
  } else {
    const btn = Array.from(buttons).find(b => b.getAttribute('onclick')?.includes(`'${tabName}'`));
    if (btn) btn.classList.add('active');
  }

  document.querySelectorAll('.tab-view').forEach(view => view.classList.remove('active-tab'));

  if (tabName === 'timer') document.getElementById('tabTimer').classList.add('active-tab');
  if (tabName === 'garden') {
    document.getElementById('tabGarden').classList.add('active-tab');
    renderGarden(currentGardenTimeframe);
  }
  if (tabName === 'nursery') {
    document.getElementById('tabNursery').classList.add('active-tab');
    renderNursery();
  }
  if (tabName === 'friends') {
    document.getElementById('tabFriends').classList.add('active-tab');
    backToFriendsOverview();
  }
}

/* ================= 3. TIMER & CROSS-DEVICE ENGINE ================= */
async function acquireWakeLock() {
  if ('wakeLock' in navigator) {
    try {
      wakeLockSentinel = await navigator.wakeLock.request('screen');
    } catch (err) {
      console.log('Screen Wake Lock standby:', err);
    }
  }
}

function releaseWakeLock() {
  if (wakeLockSentinel !== null) {
    wakeLockSentinel.release().then(() => {
      wakeLockSentinel = null;
    }).catch(() => {});
  }
}

function onCustomTimeChange() {
  if (isFocusing) return;
  const mins = parseInt(document.getElementById('durationInput').value) || 10;
  totalSeconds = mins * 60;
  remainingSeconds = totalSeconds;
  updateTimerDisplay();
}

function updateTimerDisplay() {
  const mins = String(Math.floor(remainingSeconds / 60)).padStart(2, '0');
  const secs = String(remainingSeconds % 60).padStart(2, '0');
  document.getElementById('timerDisplay').innerText = `${mins}:${secs}`;
}

async function startFocus() {
  if (isFocusing) return;
  isFocusing = true;
  currentSessionId = 'sess_' + Date.now() + '_' + Math.floor(Math.random() * 1000);

  await acquireWakeLock();

  sessionStartTime = Date.now();
  targetEndTime = sessionStartTime + (remainingSeconds * 1000);

  document.getElementById('startBtn').disabled = true;
  document.getElementById('giveUpBtn').disabled = false;
  document.getElementById('durationInput').disabled = true;
  document.getElementById('plantNicknameInput').disabled = true;
  document.getElementById('timerStatus').innerText = "locking in! you're not gonna kill your plant, are you?";

  if (currentUser) {
    db.collection('users').doc(currentUser.toLowerCase()).update({
      activeSession: {
        status: 'running',
        sessionId: currentSessionId,
        initiatorDeviceId: clientDeviceId,
        totalSeconds: totalSeconds,
        targetEndTime: targetEndTime,
        plantId: selectedPlantId,
        plantNickname: getPlantNickname()
      }
    }).catch(err => console.error("Error broadcasting activeSession:", err));
  }

  triggerExtensionBlocker(true);

  clearInterval(timerInterval);
  timerInterval = setInterval(tickTimer, 500);
}

function tickTimer() {
  if (!isFocusing || !targetEndTime) return;
  const now = Date.now();
  const msLeft = targetEndTime - now;
  remainingSeconds = Math.max(0, Math.ceil(msLeft / 1000));
  updateTimerDisplay();

  if (remainingSeconds <= 0) {
    completeSession();
  }
}

function syncRemoteTimerStart(active) {
  isFocusing = true;
  currentSessionId = active.sessionId;
  totalSeconds = active.totalSeconds;
  targetEndTime = active.targetEndTime;
  selectedPlantId = active.plantId || 'sprout';

  acquireWakeLock();
  updateSelectedPlantDisplay();

  document.getElementById('startBtn').disabled = true;
  document.getElementById('giveUpBtn').disabled = false;
  document.getElementById('durationInput').disabled = true;
  document.getElementById('plantNicknameInput').disabled = true;
  document.getElementById('plantNicknameInput').value = active.plantNickname || '';
  document.getElementById('timerStatus').innerText = "locking in on another device!";

  triggerExtensionBlocker(true);

  clearInterval(timerInterval);
  timerInterval = setInterval(tickTimer, 500);
}

function syncRemoteTimerStop() {
  clearInterval(timerInterval);
  isFocusing = false;
  currentSessionId = null;
  targetEndTime = null;
  releaseWakeLock();
  triggerExtensionBlocker(false);

  document.getElementById('startBtn').disabled = false;
  document.getElementById('giveUpBtn').disabled = true;
  document.getElementById('durationInput').disabled = false;
  document.getElementById('plantNicknameInput').disabled = false;
  document.getElementById('timerStatus').innerText = "session finished on another device!";
  resetTimer();
}

function syncRemoteTimerKill(reason) {
  clearInterval(timerInterval);
  isFocusing = false;
  currentSessionId = null;
  targetEndTime = null;
  releaseWakeLock();
  triggerExtensionBlocker(false);

  document.getElementById('startBtn').disabled = false;
  document.getElementById('giveUpBtn').disabled = true;
  document.getElementById('durationInput').disabled = false;
  document.getElementById('plantNicknameInput').disabled = false;
  document.getElementById('timerStatus').innerText = reason || "your plant died on another device";
  resetTimer();
}

function getPlantNickname() {
  const customName = document.getElementById('plantNicknameInput').value.trim();
  if (customName) return customName;
  const currentPlant = CATALOG.find(p => p.id === selectedPlantId) || CATALOG[0];
  return currentPlant.name;
}

async function completeSession() {
  clearInterval(timerInterval);
  isFocusing = false;
  releaseWakeLock();
  triggerExtensionBlocker(false);

  document.getElementById('startBtn').disabled = false;
  document.getElementById('giveUpBtn').disabled = true;
  document.getElementById('durationInput').disabled = false;
  document.getElementById('plantNicknameInput').disabled = false;