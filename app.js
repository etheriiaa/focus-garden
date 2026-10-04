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

// Wall-clock & Anti-Cheat State
let totalSeconds = 600;
let remainingSeconds = 600;
let targetEndTime = null;
let sessionStartTime = null;
let timerInterval = null;
let isFocusing = false;
let wakeLockSentinel = null;

let audioCtx = null;
let gracePeriodTimeout = null;
let graceBeepInterval = null;
let graceSecondsLeft = 5;
let isInGracePeriod = false;

/* ================= ACCURATE MOBILE DETECTION ================= */
function isMobilePhone() {
  const ua = navigator.userAgent || navigator.vendor || window.opera || '';
  const isIOS = /iPhone|iPod|iPad/i.test(ua);
  const isAndroid = /Android/i.test(ua) && /Mobile/i.test(ua);
  const isTouchScreen = navigator.maxTouchPoints > 1 && window.innerWidth <= 1024;
  return isIOS || isAndroid || isTouchScreen;
}

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

/* ================= WEB AUDIO BEEPER ================= */
function initAudio() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
}

function playWarningBeep() {
  try {
    initAudio();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(650, audioCtx.currentTime);
    gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.2);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.2);
  } catch (e) {
    console.log("Audio not allowed or initialized yet:", e);
  }
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
      killPlant(event.data.reason || "you visited a prohibited website and your plant died");
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
  e.preventDefault();
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
      if (!isFocusing || currentSessionId !== active.sessionId) {
        syncRemoteTimerStart(active);
      }
    } else if (active && active.status === 'dead') {
      if (isFocusing) {
        syncRemoteTimerKill(active.reason);
      }
    } else {
      if (isFocusing) {
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
                  showToast('🥀', 'plant died...', `${item.owner}'s "${plantLabel}" died in ${groupData.name}.`, 'dead');
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
    ? "youtube.com, reddit.com, instagram.com, tiktok.com, twitter.com, netflix.com"
    : "instagram.com, google.com, docs.google.com, canvas.instructure.com, wikipedia.org";
  
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
    alert(`The username "${newName}" is already taken!`);
    return;
  }

  const currentData = (await oldDocRef.get()).data();
  currentData.displayName = newName;
  await newDocRef.set(currentData);
  await oldDocRef.delete();

  for (const group of userGroups) {
    const updatedMembers = group.members.map(m => m.toLowerCase() === currentUser.toLowerCase() ? newName.toLowerCase() : m);
    await db.collection('groups').doc(group.id).update({ members: updatedMembers });
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
function switchTab(tabName) {
  const buttons = document.querySelectorAll('.nav-tabs .tab-btn');
  buttons.forEach(btn => btn.classList.remove('active'));
  event.target.classList.add('active');

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
      console.log('Screen Wake Lock could not be acquired:', err);
    }
  }
}

function releaseWakeLock() {
  if (wakeLockSentinel !== null) {
    wakeLockSentinel.release().then(() => {
      wakeLockSentinel = null;
    });
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

  initAudio();
  await acquireWakeLock();

  sessionStartTime = Date.now();
  targetEndTime = sessionStartTime + (remainingSeconds * 1000);

  document.getElementById('startBtn').disabled = true;
  document.getElementById('giveUpBtn').disabled = false;
  document.getElementById('durationInput').disabled = true;
  document.getElementById('plantNicknameInput').disabled = true;
  document.getElementById('timerStatus').innerText = "locking in! don't leave or switch apps unless you want your plant to die";

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
  timerInterval = setInterval(() => {
    const now = Date.now();
    const msLeft = targetEndTime - now;
    remainingSeconds = Math.max(0, Math.ceil(msLeft / 1000));
    updateTimerDisplay();

    if (remainingSeconds <= 0) {
      completeSession();
    }
  }, 500);
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
  document.getElementById('timerStatus').innerText = "locking in on another device! 🌱";

  triggerExtensionBlocker(true);

  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    const now = Date.now();
    const msLeft = targetEndTime - now;
    remainingSeconds = Math.max(0, Math.ceil(msLeft / 1000));
    updateTimerDisplay();

    if (remainingSeconds <= 0) {
      completeSession();
    }
  }, 500);
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
  cancelGracePeriod();
  releaseWakeLock();
  triggerExtensionBlocker(false);

  document.getElementById('startBtn').disabled = false;
  document.getElementById('giveUpBtn').disabled = true;
  document.getElementById('durationInput').disabled = false;
  document.getElementById('plantNicknameInput').disabled = false;

  const sessionSeconds = totalSeconds;
  const totalCombinedSeconds = leafBankSeconds + sessionSeconds;
  const earnedLeaves = Math.floor(totalCombinedSeconds / 60);
  const remainingBank = totalCombinedSeconds % 60;
  leafBankSeconds = remainingBank;

  const plantNickname = getPlantNickname();
  const sessionMinutes = Math.round(totalSeconds / 60);

  let isClaimed = true;
  if (currentUser) {
    const userRef = db.collection('users').doc(currentUser.toLowerCase());
    try {
      isClaimed = await db.runTransaction(async (transaction) => {
        const userDoc = await transaction.get(userRef);
        const data = userDoc.data() || {};
        const active = data.activeSession;
        if (active && active.sessionId === currentSessionId && active.status === 'running') {
          transaction.update(userRef, { 'activeSession.status': 'completed' });
          return true;
        }
        return false;
      });
    } catch (e) {
      console.error("Session claim transaction failed:", e);
    }
  }

  if (isClaimed) {
    leaves += earnedLeaves;
    document.getElementById('leafCount').innerText = leaves;
    await recordPlantOutcome(selectedPlantId, plantNickname, 'grown', earnedLeaves, sessionMinutes, remainingBank);
  }

  const earnNotice = earnedLeaves > 0 
    ? `🎉 plant grown successfully! +${earnedLeaves} 🍃` 
    : `🎉 plant grown successfully! (${Math.round((remainingBank / 60) * 100)}% to your next leaf 🍃)`;
  document.getElementById('timerStatus').innerText = earnNotice;

  resetTimer();
}

async function killPlant(reason) {
  if (!isFocusing) return;
  clearInterval(timerInterval);
  isFocusing = false;
  cancelGracePeriod();
  releaseWakeLock();
  triggerExtensionBlocker(false);

  document.getElementById('startBtn').disabled = false;
  document.getElementById('giveUpBtn').disabled = true;
  document.getElementById('durationInput').disabled = false;
  document.getElementById('plantNicknameInput').disabled = false;
  document.getElementById('timerStatus').innerText = reason;

  const plantNickname = getPlantNickname();
  const elapsedSeconds = Math.max(0, totalSeconds - remainingSeconds);
  const sessionMinutes = Math.floor(elapsedSeconds / 60);

  if (currentUser) {
    db.collection('users').doc(currentUser.toLowerCase()).update({
      activeSession: { 
        status: 'dead', 
        sessionId: currentSessionId,
        reason: reason 
      }
    }).catch(err => console.error("Error updating activeSession:", err));
  }

  await recordPlantOutcome(selectedPlantId, plantNickname, 'dead', 0, sessionMinutes, leafBankSeconds);
  resetTimer();
}

function giveUp() {
  killPlant("you gave up. your plant died. you monster");
}

function resetTimer() {
  const mins = parseInt(document.getElementById('durationInput').value) || 10;
  totalSeconds = mins * 60;
  remainingSeconds = totalSeconds;
  targetEndTime = null;
  currentSessionId = null;
  updateTimerDisplay();
}

/* --- Grace Period & Background Throttling Handlers --- */
function startGracePeriod() {
  if (!isFocusing || isInGracePeriod) return;
  isInGracePeriod = true;
  graceSecondsLeft = 5;

  const banner = document.getElementById('graceWarningBanner');
  if (banner) {
    banner.style.display = 'block';
    document.getElementById('graceSecondsCount').innerText = graceSecondsLeft;
  }

  playWarningBeep();
  graceBeepInterval = setInterval(() => {
    playWarningBeep();
  }, 1000);

  gracePeriodTimeout = setInterval(() => {
    graceSecondsLeft--;
    const counter = document.getElementById('graceSecondsCount');
    if (counter) counter.innerText = graceSecondsLeft;

    if (graceSecondsLeft <= 0) {
      cancelGracePeriod();
      killPlant("you left the tab for more than 5 seconds and your plant died");
    }
  }, 1000);
}

function cancelGracePeriod() {
  if (!isInGracePeriod) return;
  isInGracePeriod = false;
  clearInterval(gracePeriodTimeout);
  clearInterval(graceBeepInterval);
  const banner = document.getElementById('graceWarningBanner');
  if (banner) banner.style.display = 'none';
}

document.addEventListener("visibilitychange", () => {
  if (!isMobilePhone()) return;

  if (document.hidden) {
    if (isFocusing) {
      startGracePeriod();
    }
  } else {
    // Returning to the tab: cancel grace period countdown
    if (isInGracePeriod) {
      cancelGracePeriod();
    }

    // Sync wall-clock timer so locking phone screen allows session to continue
    if (isFocusing && targetEndTime) {
      acquireWakeLock();
      const now = Date.now();
      const msLeft = targetEndTime - now;

      if (msLeft <= 0) {
        remainingSeconds = 0;
        updateTimerDisplay();
        completeSession();
      } else {
        remainingSeconds = Math.ceil(msLeft / 1000);
        updateTimerDisplay();
      }
    }
  }
});

window.addEventListener("pagehide", () => {
  if (isMobilePhone() && isFocusing) {
    startGracePeriod();
  }
});

function triggerExtensionBlocker(start) {
  const mode = localStorage.getItem('blockerMode') || 'blacklist';
  const rawSites = localStorage.getItem('blockerSites') || 'youtube.com, reddit.com, instagram.com';
  const sites = rawSites.split(',').map(s => s.trim().toLowerCase()).filter(Boolean);

  window.postMessage({
    type: "FOCUS_GARDEN_BLOCKER",
    action: start ? "START_BLOCKING" : "STOP_BLOCKING",
    mode: mode,
    sites: sites
  }, "*");
}

/* ================= 4. PLANT PICKER ================= */
function openPlantPicker() {
  if (isFocusing) return;
  const grid = document.getElementById('pickerGrid');
  grid.innerHTML = '';

  ownedPlants.forEach(plantId => {
    const plant = CATALOG.find(p => p.id === plantId);
    if (!plant) return;

    const div = document.createElement('div');
    div.className = `picker-item ${plantId === selectedPlantId ? 'active' : ''}`;
    div.innerHTML = `
      <img src="${plant.img}" alt="${plant.name}">
      <p style="font-weight:600; font-size:0.85rem; margin-top:4px;">${plant.name}</p>
    `;
    div.onclick = async () => {
      selectedPlantId = plantId;
      await db.collection('users').doc(currentUser.toLowerCase()).update({
        selectedPlantId: selectedPlantId
      });
      updateSelectedPlantDisplay();
      closePlantPicker();
    };
    grid.appendChild(div);
  });

  document.getElementById('plantPickerModal').style.display = 'flex';
}

function closePlantPicker() {
  document.getElementById('plantPickerModal').style.display = 'none';
}

function updateSelectedPlantDisplay() {
  const plant = CATALOG.find(p => p.id === selectedPlantId) || CATALOG[0];
  document.getElementById('timerPlantImg').src = plant.img;
  document.getElementById('timerPlantName').innerText = plant.name;
}

/* ================= 5. TIMESTAMP & SIZING HELPERS ================= */
function parseTimestamp(ts) {
  if (!ts) return 0;
  if (typeof ts === 'number') return ts;
  if (ts.toMillis) return ts.toMillis();
  if (ts.seconds) return ts.seconds * 1000;
  if (typeof ts === 'string') {
    const parsed = new Date(ts).getTime();
    return isNaN(parsed) ? (Number(ts) || 0) : parsed;
  }
  return 0;
}

function getStartOfWeek() {
  const now = new Date();
  const day = now.getDay();
  const start = new Date(now);
  const daysFromMonday = (day === 0 ? 6 : day - 1);
  start.setDate(now.getDate() - daysFromMonday);
  start.setHours(0, 0, 0, 0);
  return start.getTime();
}

function getRandomPlantSize(timeframe) {
  if (timeframe === 'day') {
    return Math.floor(Math.random() * 21) + 75;
  } else if (timeframe === 'week') {
    return Math.floor(Math.random() * 16) + 55;
  } else if (timeframe === 'month') {
    return Math.floor(Math.random() * 13) + 38;
  } else if (timeframe === 'year') {
    return Math.floor(Math.random() * 11) + 26;
  }
  return 60;
}

/* ================= 6. GARDEN DATA SYNCING ================= */
async function recordPlantOutcome(plantId, nickname, status, earnedLeaves, minutes, updatedBankSeconds) {
  const now = Date.now();
  const entryId = 'entry_' + now + '_' + Math.floor(Math.random() * 1000);

  const plantEntry = { 
    id: plantId, 
    entryId: entryId,
    nickname: nickname, 
    status: status, 
    timestamp: now,
    minutes: minutes !== undefined ? minutes : 0
  };

  knownGroupHistoryIds.add(entryId);

  const userUpdate = {
    leaves: firebase.firestore.FieldValue.increment(earnedLeaves),
    gardenHistory: firebase.firestore.FieldValue.arrayUnion(plantEntry)
  };

  if (updatedBankSeconds !== undefined) {
    userUpdate.leafBankSeconds = updatedBankSeconds;
  }

  await db.collection('users').doc(currentUser.toLowerCase()).update(userUpdate);

  try {
    const userLower = (currentUser || '').toLowerCase();
    const groupsSnap = await db.collection('groups').get();
    
    const targetGroupIds = new Set();
    (userGroups || []).forEach(g => targetGroupIds.add(g.id));
    
    groupsSnap.forEach(doc => {
      const data = doc.data();
      const members = (data.members || []).map(m => String(m).toLowerCase());
      if (members.includes(userLower)) {
        targetGroupIds.add(doc.id);
      }
    });

    const groupPlantRecord = {
      id: plantId,
      entryId: entryId,
      nickname: nickname,
      owner: currentUser,
      status: status,
      timestamp: now,
      minutes: minutes !== undefined ? minutes : 0
    };

    for (const gid of targetGroupIds) {
      await db.collection('groups').doc(gid).set({
        history: firebase.firestore.FieldValue.arrayUnion(groupPlantRecord)
      }, { merge: true });
    }
  } catch (err) {
    console.error("Error writing plant to group history:", err);
  }
}

function filterGarden(timeframe, btn) {
  currentGardenTimeframe = timeframe;
  if (btn) {
    document.querySelectorAll('.filter-pills .filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  }
  renderGarden(timeframe);
}

function renderGarden(timeframe) {
  const field = document.getElementById('gardenField');
  field.innerHTML = '';

  const now = Date.now();
  const startOfToday = new Date().setHours(0, 0, 0, 0);

  const filtered = gardenHistory.filter(item => {
    const t = parseTimestamp(item.timestamp);
    if (timeframe === 'day') return t >= startOfToday;
    if (timeframe === 'week') return t >= (now - 7 * 86400000);
    if (timeframe === 'month') return t >= (now - 30 * 86400000);
    if (timeframe === 'year') return t >= (now - 365 * 86400000);
    return true;
  });

  if (filtered.length === 0) {
    field.innerHTML = `<div class="empty-garden-notice">no plants for this timeframe yet<br>time to lock in!</div>`;
    return;
  }

  filtered.forEach(item => {
    const plant = CATALOG.find(p => p.id === item.id) || CATALOG[0];
    const randX = Math.floor(Math.random() * 80) + 10;
    const randY = Math.floor(Math.random() * 75) + 12;

    const plantSize = getRandomPlantSize(timeframe);
    const displayName = item.nickname || plant.name;
    const duration = item.minutes !== undefined ? item.minutes : 0;
    const isDead = item.status === 'dead' || item.status === 'withered';
    const statusText = isDead ? '🥀 Dead' : '🌸 Bloomed';
    const showTag = (timeframe === 'day' || timeframe === 'week');

    const el = document.createElement('div');
    el.className = `planted-item ${isDead ? 'dead' : ''}`;
    el.style.left = `${randX}%`;
    el.style.top = `${randY}%`;
    el.style.width = `${plantSize + 24}px`;

    el.innerHTML = `
      <div class="plant-tooltip">
        <strong>${displayName}</strong> (${statusText})<br>
        ⏱️ locked in: ${duration} mins
      </div>
      <img src="${plant.img}" alt="${plant.name}" style="width: ${plantSize}px; height: ${plantSize}px;">
      ${showTag ? `<span class="tag">${isDead ? '🥀 ' + displayName : '🌸 ' + displayName}</span>` : ''}
    `;
    field.appendChild(el);
  });
}

/* ================= 7. STATS MODAL & CHARTS ================= */
function openStatsModal() {
  document.getElementById('statsModal').style.display = 'flex';
  renderGardenStatsAndChart(currentStatsTimeframe);
}

function closeStatsModal() {
  document.getElementById('statsModal').style.display = 'none';
}

function setStatsTimeframe(timeframe, btn) {
  currentStatsTimeframe = timeframe;
  document.querySelectorAll('.stats-modal-filters .filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderGardenStatsAndChart(timeframe);
}

function renderGardenStatsAndChart(timeframe) {
  const now = Date.now();
  const startOfToday = new Date().setHours(0, 0, 0, 0);

  const plants = gardenHistory.filter(item => {
    const t = parseTimestamp(item.timestamp);
    if (timeframe === 'day') return t >= startOfToday;
    if (timeframe === 'week') return t >= (now - 7 * 86400000);
    if (timeframe === 'month') return t >= (now - 30 * 86400000);
    if (timeframe === 'year') return t >= (now - 365 * 86400000);
    return true;
  });

  const totalMinutes = plants.reduce((sum, item) => sum + (item.minutes !== undefined ? item.minutes : 0), 0);
  const hours = Math.floor(totalMinutes / 60);
  const mins = totalMinutes % 60;
  document.getElementById('totalFocusTimeDisplay').innerText = `${hours} hours, ${mins} mins`;
  document.getElementById('totalSessionsDisplay').innerText = `${plants.length} session${plants.length === 1 ? '' : 's'}`;

  let labels = [];
  let dataPoints = [];

  if (timeframe === 'day') {
    labels = ['12am','2am','4am','6am','8am','10am','12pm','2pm','4pm','6pm','8pm','10pm'];
    dataPoints = new Array(12).fill(0);

    plants.forEach(p => {
      const h = new Date(parseTimestamp(p.timestamp)).getHours();
      const bucket = Math.floor(h / 2);
      dataPoints[bucket] += (p.minutes !== undefined ? p.minutes : 0);
    });
  } else if (timeframe === 'week') {
    labels = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
    dataPoints = new Array(7).fill(0);

    plants.forEach(p => {
      const day = new Date(parseTimestamp(p.timestamp)).getDay();
      dataPoints[day] += (p.minutes !== undefined ? p.minutes : 0);
    });
  } else if (timeframe === 'month') {
    labels = ['week 1', 'week 2', 'week 3', 'week 4', 'week 5'];
    dataPoints = new Array(5).fill(0);

    plants.forEach(p => {
      const date = new Date(parseTimestamp(p.timestamp)).getDate();
      const weekIdx = Math.min(4, Math.floor((date - 1) / 7));
      dataPoints[weekIdx] += (p.minutes !== undefined ? p.minutes : 0);
    });
  } else if (timeframe === 'year') {
    labels = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
    dataPoints = new Array(12).fill(0);

    plants.forEach(p => {
      const month = new Date(parseTimestamp(p.timestamp)).getMonth();
      dataPoints[month] += (p.minutes !== undefined ? p.minutes : 0);
    });
  }

  const ctx = document.getElementById('focusChart').getContext('2d');
  if (focusChartInstance) {
    focusChartInstance.destroy();
  }

  focusChartInstance = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'minutes Locked In',
        data: dataPoints,
        backgroundColor: 'rgba(120, 184, 137, 0.75)',
        borderColor: '#78b889',
        borderWidth: 2,
        borderRadius: 8
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: (ctx) => ` ${ctx.parsed.y} mins focused`
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: (val) => `${val}m`
          },
          grid: { color: 'rgba(0, 0, 0, 0.05)' }
        },
        x: {
          grid: { display: false }
        }
      }
    }
  });
}

/* ================= 8. NURSERY ================= */
function renderNursery() {
  const unlockedGrid = document.getElementById('unlockedPlantsGrid');
  const lockedGrid = document.getElementById('lockedPlantsGrid');
  unlockedGrid.innerHTML = '';
  lockedGrid.innerHTML = '';

  CATALOG.forEach(plant => {
    const isOwned = ownedPlants.includes(plant.id);

    if (isOwned) {
      const card = document.createElement('div');
      card.className = 'nursery-card';
      card.innerHTML = `
        <img src="${plant.img}" alt="${plant.name}">
        <h4>${plant.name}</h4>
        <p style="font-size:0.8rem; color:#78b889; font-weight:600; margin-top:6px;">owned ✓</p>
      `;
      unlockedGrid.appendChild(card);
    } else {
      const card = document.createElement('div');
      card.className = 'nursery-card locked';
      card.innerHTML = `
        <img src="${plant.img}" alt="${plant.name}">
        <h4>${plant.name}</h4>
        <div class="nursery-price">🍃 ${plant.cost} leaves</div>
        <button class="btn btn-primary" onclick="buyPlant('${plant.id}', ${plant.cost})">buy</button>
      `;
      lockedGrid.appendChild(card);
    }
  });
}

async function buyPlant(plantId, cost) {
  if (leaves < cost) {
    alert("you don't have enough leaves yet lmao");
    return;
  }

  await db.collection('users').doc(currentUser.toLowerCase()).update({
    leaves: firebase.firestore.FieldValue.increment(-cost),
    ownedPlants: firebase.firestore.FieldValue.arrayUnion(plantId)
  });
}

function updateCurrencyDisplay() {
  document.getElementById('leafCount').innerText = leaves;
}

/* ================= 9. CLOUD FRIENDS & GROUPS ================= */
function renderFriendsList() {
  const ul = document.getElementById('friendsList');
  ul.innerHTML = '';

  if (friends.length === 0) {
    ul.innerHTML = `<li style="color:#888; font-size:0.85rem; padding: 6px;">you don't have any friends yet lol</li>`;
    return;
  }

  friends.forEach(friend => {
    const li = document.createElement('li');
    li.className = 'friend-item';
    li.innerHTML = `
      <span>👤 ${friend}</span>
      <button class="remove-x-btn" title="Remove friend" onclick="removeFriend('${friend}')">×</button>
    `;
    ul.appendChild(li);
  });
}

async function addFriend() {
  const input = document.getElementById('friendUsernameInput');
  const targetUser = input.value.trim();
  if (!targetUser) return;

  if (targetUser.toLowerCase() === currentUser.toLowerCase()) {
    alert("why are you trying to add yourself as a friend?");
    return;
  }

  if (friends.map(f => f.toLowerCase()).includes(targetUser.toLowerCase())) {
    alert(`"${targetUser}" is already in your friends list lmao`);
    return;
  }

  const targetDoc = await db.collection('users').doc(targetUser.toLowerCase()).get();
  if (!targetDoc.exists) {
    alert(`account "${targetUser}" does not exist`);
    return;
  }

  const verifiedName = targetDoc.data().displayName || targetUser;

  await db.collection('users').doc(currentUser.toLowerCase()).update({
    friends: firebase.firestore.FieldValue.arrayUnion(verifiedName)
  });

  await db.collection('users').doc(targetUser.toLowerCase()).update({
    notifications: firebase.firestore.FieldValue.arrayUnion({
      id: 'notif_' + Date.now() + '_' + Math.floor(Math.random() * 1000),
      type: 'friend',
      text: `${currentUser} added you as a friend!`,
      timestamp: Date.now()
    })
  });

  input.value = '';
}

async function removeFriend(friendName) {
  await db.collection('users').doc(currentUser.toLowerCase()).update({
    friends: firebase.firestore.FieldValue.arrayRemove(friendName)
  });
}

function renderGroupsList() {
  const container = document.getElementById('groupsListContainer');
  container.innerHTML = '';

  if (userGroups.length === 0) {
    container.innerHTML = `<p style="color:#888; font-size:0.9rem;">you aren't in any groups yet lmao</p>`;
    return;
  }

  userGroups.forEach(group => {
    const card = document.createElement('div');
    card.className = 'group-card';
    card.innerHTML = `
      <div class="group-card-header">
        <div>
          <h4>🌱 ${group.name}</h4>
          <span class="subtitle-text">${(group.members || []).length} members</span>
        </div>
        <button class="remove-x-btn" title="Leave/Delete group" onclick="deleteOrLeaveGroup('${group.id}')">×</button>
      </div>
      <div class="group-card-actions">
        <button class="btn btn-primary" style="width: 100%;" onclick="viewGroup('${group.id}')">view group garden</button>
      </div>
    `;
    container.appendChild(card);
  });
}

async function createGroup() {
  const input = document.getElementById('newGroupNameInput');
  const name = input.value.trim();
  if (!name) return;

  const snapshot = await db.collection('groups').where('nameLower', '==', name.toLowerCase()).get();
  if (!snapshot.empty) {
    alert(`a group named "${name}" already exists!`);
    return;
  }

  const initialHistory = (gardenHistory || []).map(p => ({
    id: p.id,
    entryId: p.entryId || ('entry_' + p.timestamp + '_' + Math.floor(Math.random() * 1000)),
    nickname: p.nickname || '',
    owner: currentUser,
    status: p.status || 'grown',
    timestamp: p.timestamp || Date.now(),
    minutes: p.minutes !== undefined ? p.minutes : 10
  }));

  await db.collection('groups').add({
    name: name,
    nameLower: name.toLowerCase(),
    members: [currentUser.toLowerCase()],
    history: initialHistory
  });

  input.value = '';
}

async function joinGroup() {
  const input = document.getElementById('joinGroupNameInput');
  const name = input.value.trim();
  if (!name) return;

  const snapshot = await db.collection('groups').where('nameLower', '==', name.toLowerCase()).get();
  if (snapshot.empty) {
    alert(`group "${name}" does not exist!`);
    return;
  }

  const groupDoc = snapshot.docs[0];
  const groupData = groupDoc.data();
  const members = (groupData.members || []).map(m => String(m).toLowerCase());

  if (members.includes(currentUser.toLowerCase())) {
    alert(`you are already in "${groupData.name}".`);
    return;
  }

  const userEntries = (gardenHistory || []).map(p => ({
    id: p.id,
    entryId: p.entryId || ('entry_' + p.timestamp + '_' + Math.floor(Math.random() * 1000)),
    nickname: p.nickname || '',
    owner: currentUser,
    status: p.status || 'grown',
    timestamp: p.timestamp || Date.now(),
    minutes: p.minutes !== undefined ? p.minutes : 10
  }));

  const updatePayload = {
    members: firebase.firestore.FieldValue.arrayUnion(currentUser.toLowerCase())
  };
  if (userEntries.length > 0) {
    updatePayload.history = firebase.firestore.FieldValue.arrayUnion(...userEntries);
  }

  await db.collection('groups').doc(groupDoc.id).update(updatePayload);
  input.value = '';
  alert(`Joined "${groupData.name}"!`);
}

async function deleteOrLeaveGroup(groupId) {
  const confirmed = confirm("are you sure you want to leave or remove this group?");
  if (!confirmed) return;

  const group = userGroups.find(g => g.id === groupId);
  if (!group) return;

  if ((group.members || []).length <= 1) {
    await db.collection('groups').doc(groupId).delete();
  } else {
    await db.collection('groups').doc(groupId).update({
      members: firebase.firestore.FieldValue.arrayRemove(currentUser.toLowerCase())
    });
  }
}

async function viewGroup(groupId) {
  activeGroupId = groupId;
  let group = userGroups.find(g => g.id === groupId);

  document.getElementById('friendsMainView').style.display = 'none';
  document.getElementById('groupDetailView').style.display = 'block';

  if (!group || !group.history) {
    try {
      const docSnap = await db.collection('groups').doc(groupId).get();
      if (docSnap.exists) {
        group = { id: docSnap.id, ...docSnap.data() };
      }
    } catch (e) {
      console.error("Error loading group directly:", e);
    }
  }

  if (!group) return;

  document.getElementById('groupDetailTitle').innerText = `🌱 ${group.name}`;
  document.getElementById('groupMemberCount').innerText = `members: ${(group.members || []).join(', ')}`;

  renderGroupLeaderboardAndGarden(group);
}

function backToFriendsOverview() {
  activeGroupId = null;
  document.getElementById('groupDetailView').style.display = 'none';
  document.getElementById('friendsMainView').style.display = 'grid';
  renderFriendsList();
  renderGroupsList();
}

function renderGroupLeaderboardAndGarden(group) {
  const startOfWeek = getStartOfWeek();
  const groupHistory = group.history || [];
  const weeklyHistory = groupHistory.filter(item => parseTimestamp(item.timestamp) >= startOfWeek);

  const minutesTally = {};
  const memberDisplayNames = {};

  (group.members || []).forEach(m => {
    const key = String(m).toLowerCase();
    minutesTally[key] = 0;
    memberDisplayNames[key] = m;
  });

  weeklyHistory.forEach(item => {
    const ownerKey = (item.owner || '').toLowerCase();
    const mins = item.minutes !== undefined ? item.minutes : 0;
    if (minutesTally[ownerKey] !== undefined) {
      minutesTally[ownerKey] += mins;
    } else {
      minutesTally[ownerKey] = mins;
      memberDisplayNames[ownerKey] = item.owner || ownerKey;
    }
  });

  const sortedMembers = Object.keys(minutesTally).map(key => {
    return { name: memberDisplayNames[key] || key, minutes: minutesTally[key] };
  }).sort((a, b) => b.minutes - a.minutes);

  const leaderboardEl = document.getElementById('groupLeaderboard');
  if (leaderboardEl) {
    leaderboardEl.innerHTML = '';

    sortedMembers.forEach((member, index) => {
      const isFirst = index === 0 && member.minutes > 0;
      
      const hrs = Math.floor(member.minutes / 60);
      const mins = member.minutes % 60;
      const timeDisplay = hrs > 0 ? `${hrs}h ${mins}m` : `${mins}m`;

      const row = document.createElement('div');
      row.className = 'leader-row';
      row.innerHTML = `
        <div>
          <span>${isFirst ? '👑 #1' : `#${index + 1}`}</span>
          <strong style="margin-left: 8px;">${member.name}</strong>
        </div>
        <div>
          <span>⏱️ ${timeDisplay}</span>${isFirst ? '<span style="color:#d99b16; margin-left:8px; font-weight:700;">(+250 🍃)</span>' : ''}
        </div>
      `;
      leaderboardEl.appendChild(row);
    });
  }

  const scatterEl = document.getElementById('groupGardenScatter');
  if (!scatterEl) return;
  scatterEl.innerHTML = '';

  const gardenPlants = weeklyHistory.length > 0 ? weeklyHistory : groupHistory;

  if (gardenPlants.length === 0) {
    scatterEl.innerHTML = `<div class="empty-garden-notice">no plants grown yet.<br>better hurry up and lock in!</div>`;
    return;
  }

  gardenPlants.forEach(item => {
    const plant = CATALOG.find(p => p.id === item.id) || CATALOG[0];
    const randX = Math.floor(Math.random() * 80) + 10;
    const randY = Math.floor(Math.random() * 75) + 12;

    const plantSize = getRandomPlantSize('week');
    const plantName = item.nickname || plant.name;
    const duration = item.minutes !== undefined ? item.minutes : 0;
    const isDead = item.status === 'dead' || item.status === 'withered';
    const statusText = isDead ? '🥀 dead' : '🌸 bloomed';

    const el = document.createElement('div');
    el.className = `planted-item ${isDead ? 'dead' : ''}`;
    el.style.left = `${randX}%`;
    el.style.top = `${randY}%`;
    el.style.width = `${plantSize + 24}px`;

    el.innerHTML = `
      <div class="plant-tooltip">
        <strong>${plantName}</strong> (${statusText})<br>
        👤 grown by: ${item.owner}<br>
        ⏱️ locked in: ${duration} mins
      </div>
      <img src="${plant.img}" alt="${plant.name}" style="width: ${plantSize}px; height: ${plantSize}px;">
      <span class="tag">${isDead ? '🥀 ' + plantName + ' (' + item.owner + ')' : '🌸 ' + plantName + ' (' + item.owner + ')'}</span>
    `;
    scatterEl.appendChild(el);
  });
}

function startSundayCountdownTimer() {
  function updateCountdown() {
    const now = new Date();
    const day = now.getDay();
    const daysUntilSunday = (7 - day) % 7;

    const nextSundayMidnight = new Date(now);
    nextSundayMidnight.setDate(now.getDate() + (daysUntilSunday === 0 && now.getHours() === 0 ? 0 : (daysUntilSunday || 7)));
    nextSundayMidnight.setHours(24, 0, 0, 0);

    const diff = nextSundayMidnight.getTime() - now.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const mins = Math.floor((diff / (1000 * 60)) % 60);

    const badge = document.getElementById('sundayCountdown');
    if (badge) {
      badge.innerText = `ends in ${hours}h ${mins}m`;
    }
  }

  updateCountdown();
  setInterval(updateCountdown, 60000);
}

/* ================= 10. ADMIN FUNCTIONS ================= */
async function openAdminModal() {
  if (!currentUser || (currentUser.toLowerCase() !== 'admin' && currentUser.toLowerCase() !== 'dallas')) return;
  closeSettingsModal();
  document.getElementById('adminModal').style.display = 'flex';
  await loadAdminUsers();
  await loadAdminGroups();
}

function closeAdminModal() {
  document.getElementById('adminModal').style.display = 'none';
}

function switchAdminTab(tab) {
  const usersBtn = document.getElementById('adminTabUsersBtn');
  const groupsBtn = document.getElementById('adminTabGroupsBtn');
  const usersList = document.getElementById('adminUsersList');
  const groupsList = document.getElementById('adminGroupsList');

  if (tab === 'users') {
    usersBtn.classList.add('active');
    groupsBtn.classList.remove('active');
    usersList.style.display = 'flex';
    groupsList.style.display = 'none';
  } else {
    groupsBtn.classList.add('active');
    usersBtn.classList.remove('active');
    groupsList.style.display = 'flex';
    usersList.style.display = 'none';
  }
}

async function loadAdminUsers() {
  const container = document.getElementById('adminUsersList');
  container.innerHTML = '<p style="color:#888; font-size:0.85rem;">loading users...</p>';

  try {
    const snapshot = await db.collection('users').get();
    container.innerHTML = '';

    if (snapshot.empty) {
      container.innerHTML = '<p style="color:#888;">no users found.</p>';
      return;
    }

    snapshot.forEach(doc => {
      const data = doc.data();
      const username = data.displayName || doc.id;
      const leavesCount = data.leaves || 0;
      const historyCount = (data.gardenHistory || []).length;

      const row = document.createElement('div');
      row.className = 'admin-row';
      row.innerHTML = `
        <div>
          <strong>👤 ${username}</strong>
          <div class="admin-row-meta">🍃 ${leavesCount} leaves • 🪴 ${historyCount} sessions</div>
        </div>
        <button class="btn btn-danger" style="padding: 6px 12px; font-size: 0.8rem;" onclick="adminDeleteUser('${doc.id}', '${username}')">delete</button>
      `;
      container.appendChild(row);
    });
  } catch (err) {
    container.innerHTML = `<p style="color:#a44;">error loading users: ${err.message}</p>`;
  }
}

async function loadAdminGroups() {
  const container = document.getElementById('adminGroupsList');
  container.innerHTML = '<p style="color:#888; font-size:0.85rem;">loading groups...</p>';

  try {
    const snapshot = await db.collection('groups').get();
    container.innerHTML = '';

    if (snapshot.empty) {
      container.innerHTML = '<p style="color:#888;">no groups found.</p>';
      return;
    }

    snapshot.forEach(doc => {
      const data = doc.data();
      const members = data.members || [];
      const plantCount = (data.history || []).length;

      const row = document.createElement('div');
      row.className = 'admin-row';
      row.innerHTML = `
        <div>
          <strong>🌱 ${data.name || doc.id}</strong>
          <div class="admin-row-meta">👥 ${members.length} members • 🪴 ${plantCount} group plants</div>
        </div>
        <button class="btn btn-danger" style="padding: 6px 12px; font-size: 0.8rem;" onclick="adminDeleteGroup('${doc.id}', '${data.name}')">delete</button>
      `;
      container.appendChild(row);
    });
  } catch (err) {
    container.innerHTML = `<p style="color:#a44;">error loading groups: ${err.message}</p>`;
  }
}

async function adminDeleteUser(docId, username) {
  const confirmed = confirm(`are you sure you want to completely delete user "${username}"? this cannot be undone.`);
  if (!confirmed) return;

  try {
    await db.collection('users').doc(docId).delete();
    alert(`user "${username}" deleted.`);
    await loadAdminUsers();
  } catch (err) {
    alert(`failed to delete user: ${err.message}`);
  }
}

async function adminDeleteGroup(docId, groupName) {
  const confirmed = confirm(`are you sure you want to completely delete group "${groupName}"?`);
  if (!confirmed) return;

  try {
    await db.collection('groups').doc(docId).delete();
    alert(`Group "${groupName}" deleted.`);
    await loadAdminGroups();
  } catch (err) {
    alert(`failed to delete group: ${err.message}`);
  }
}