const iconBase = "https://cdn.jsdelivr.net/npm/lucide-static@0.468.0/icons/";
const iconNames = [...new Set([...document.querySelectorAll("[data-icon]")].map((element) => element.dataset.icon))];

iconNames.forEach((name) => {
  document.querySelectorAll(`[data-icon="${name}"]`).forEach((element) => {
    const image = document.createElement("img");
    image.src = `${iconBase}${encodeURIComponent(name)}.svg`;
    image.alt = "";
    image.setAttribute("aria-hidden", "true");
    image.addEventListener("error", () => image.remove(), { once: true });
    element.append(image);
  });
});

const homeView = document.querySelector("#homeView");
const robloxView = document.querySelector("#robloxView");
const widgetDialog = document.querySelector("#widgetDialog");
const settingsDialog = document.querySelector("#settingsDialog");
const aboutDialog = document.querySelector("#aboutDialog");
const launchDialog = document.querySelector("#launchDialog");
const toast = document.querySelector("#toast");
const storageKey = "startphase-state-v1";
const initialState = { mode: "home", widgets: { home: [], roblox: [] }, compact: false, confirmLaunch: true };
let state;
let pendingPlaceId = null;
let toastTimer;

try {
  state = { ...initialState, ...JSON.parse(localStorage.getItem(storageKey) || "{}") };
  state.widgets = { ...initialState.widgets, ...(state.widgets || {}) };
} catch {
  state = { ...initialState, widgets: { home: [], roblox: [] } };
}

function saveState() {
  localStorage.setItem(storageKey, JSON.stringify(state));
}

function notify(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2600);
}

function setMode(mode) {
  state.mode = mode === "roblox" ? "roblox" : "home";
  const isRoblox = state.mode === "roblox";
  homeView.classList.toggle("active", !isRoblox);
  robloxView.classList.toggle("active", isRoblox);
  document.querySelector("#pageTitle").textContent = isRoblox ? "Roblox" : "StartPhase";
  document.querySelector("#modeLabel").textContent = isRoblox ? "ROBLOX MODE" : "YOUR SPACE";
  document.querySelectorAll("[data-mode]").forEach((button) => button.classList.toggle("active", button.dataset.mode === state.mode));
  saveState();
}

function updateClock() {
  const now = new Date();
  document.querySelector("#clockTime").textContent = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  document.querySelector("#clockDate").textContent = now.toLocaleDateString([], { weekday: "long", month: "long", day: "numeric" });
}

const widgetInfo = {
  clock: { title: "Clock & date", icon: "clock" },
  notes: { title: "Quick notes", icon: "notebook-pen" },
  links: { title: "Website shortcuts", icon: "link" },
  featured: { title: "Featured", icon: "star" }
};

function renderWidgets(mode) {
  const container = document.querySelector(mode === "roblox" ? "#robloxWidgets" : "#homeWidgets");
  container.replaceChildren();
  state.widgets[mode].forEach((widget, index) => {
    const info = widgetInfo[widget.type];
    if (!info) return;
    const card = document.createElement("article");
    card.className = "widget";
    const remove = document.createElement("button");
    remove.className = "widget-remove";
    remove.type = "button";
    remove.setAttribute("aria-label", `Remove ${info.title}`);
    remove.dataset.removeWidget = String(index);
    const removeIcon = document.createElement("img");
    removeIcon.src = `${iconBase}x.svg`;
    removeIcon.alt = "";
    remove.append(removeIcon);
    const icon = document.createElement("span");
    icon.className = "widget-icon";
    const iconImage = document.createElement("img");
    iconImage.src = `${iconBase}${info.icon}.svg`;
    iconImage.alt = "";
    icon.append(iconImage);
    const heading = document.createElement("h3");
    heading.textContent = info.title;
    card.append(remove, icon, heading);
    if (widget.type === "clock") {
      const detail = document.createElement("p");
      detail.textContent = new Date().toLocaleString([], { weekday: "long", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" });
      card.append(detail);
    } else if (widget.type === "notes") {
      const note = document.createElement("textarea");
      note.placeholder = "Write a note...";
      note.value = widget.text || "";
      note.setAttribute("aria-label", "Quick note");
      note.addEventListener("input", () => {
        widget.text = note.value;
        saveState();
      });
      card.append(note);
    } else if (widget.type === "links") {
      const link = document.createElement("a");
      link.href = "https://www.google.com/";
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.textContent = "Open Google";
      card.append(link);
    } else {
      const detail = document.createElement("p");
      detail.textContent = mode === "roblox" ? "Your Roblox space, ready for a new adventure." : "Your space, set up just the way you like it.";
      card.append(detail);
    }
    container.append(card);
  });
}

function renderAllWidgets() {
  renderWidgets("home");
  renderWidgets("roblox");
}

document.addEventListener("click", (event) => {
  const modeButton = event.target.closest("[data-mode]");
  if (modeButton) {
    event.preventDefault();
    setMode(modeButton.dataset.mode);
    return;
  }
  const actionButton = event.target.closest("[data-action]");
  if (actionButton) {
    const dialogs = { widgets: widgetDialog, settings: settingsDialog, about: aboutDialog };
    dialogs[actionButton.dataset.action]?.showModal();
    return;
  }
  const picker = event.target.closest("[data-widget]");
  if (picker) {
    const type = picker.dataset.widget;
    if (widgetInfo[type]) {
      state.widgets[state.mode].push({ type, text: "" });
      saveState();
      renderWidgets(state.mode);
      widgetDialog.close();
      notify(`${widgetInfo[type].title} added to ${state.mode === "roblox" ? "Roblox" : "StartPhase"}.`);
    }
    return;
  }
  const removeButton = event.target.closest("[data-remove-widget]");
  if (removeButton) {
    state.widgets[state.mode].splice(Number(removeButton.dataset.removeWidget), 1);
    saveState();
    renderWidgets(state.mode);
  }
});

document.querySelector("#webSearch").addEventListener("submit", (event) => {
  event.preventDefault();
  const query = document.querySelector("#webQuery").value.trim();
  if (query) window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, "_blank", "noopener,noreferrer");
});

function showEmptyState(title, message) {
  const grid = document.querySelector("#gameGrid");
  grid.replaceChildren();
  const empty = document.createElement("div");
  empty.className = "empty-state";
  empty.innerHTML = '<span data-icon="search"></span>';
  const heading = document.createElement("h3");
  heading.textContent = title;
  const description = document.createElement("p");
  description.textContent = message;
  empty.append(heading, description);
  grid.append(empty);
  const image = document.createElement("img");
  image.src = `${iconBase}search.svg`;
  image.alt = "";
  empty.querySelector("[data-icon]").append(image);
}

async function searchGames(query) {
  if (!query) return;
  const grid = document.querySelector("#gameGrid");
  document.querySelector("#discoverDescription").textContent = `Searching Roblox for “${query}”…`;
  grid.replaceChildren();
  try {
    const response = await fetch(`https://apis.roblox.com/search-api/omni-search?searchQuery=${encodeURIComponent(query)}&sessionId=startphase&pageType=game`);
    if (!response.ok) throw new Error("Roblox search is unavailable.");
    const result = await response.json();
    const games = (result.searchResults || []).flatMap((group) => group.contents || []).slice(0, 12);
    if (!games.length) {
      showEmptyState("No experiences found", "Try a different search.");
      document.querySelector("#discoverDescription").textContent = "No matching experiences.";
      return;
    }
    const thumbnailIds = games.map((game) => game.universeId).filter(Boolean).join(",");
    let thumbnails = {};
    try {
      const imagesResponse = await fetch(`https://thumbnails.roblox.com/v1/games/icons?universeIds=${thumbnailIds}&returnPolicy=PlaceHolder&size=512x512&format=Png&isCircular=false`);
      if (imagesResponse.ok) {
        const images = await imagesResponse.json();
        thumbnails = Object.fromEntries((images.data || []).map((image) => [image.targetId, image.imageUrl]));
      }
    } catch {}
    grid.replaceChildren();
    games.forEach((game) => {
      const card = document.createElement("article");
      card.className = "game-card";
      const thumbnail = document.createElement("img");
      thumbnail.src = thumbnails[game.universeId] || "https://cdn.jsdelivr.net/npm/lucide-static@0.468.0/icons/gamepad-2.svg";
      thumbnail.alt = "";
      const body = document.createElement("div");
      body.className = "game-card-body";
      const title = document.createElement("h3");
      title.textContent = game.name || "Roblox experience";
      const detail = document.createElement("p");
      detail.textContent = `${Number(game.playerCount || 0).toLocaleString()} playing`;
      const launch = document.createElement("button");
      launch.type = "button";
      launch.className = "primary-button";
      launch.dataset.placeId = String(game.rootPlaceId || "");
      launch.textContent = "Play";
      body.append(title, detail, launch);
      card.append(thumbnail, body);
      grid.append(card);
    });
    document.querySelector("#discoverDescription").textContent = `${games.length} experiences found.`;
  } catch {
    showEmptyState("Search unavailable", "Roblox search could not be reached. Try again in a moment.");
    const fallback = document.createElement("a");
    fallback.className = "primary-button";
    fallback.href = `https://www.roblox.com/search/experiences?keyword=${encodeURIComponent(query)}`;
    fallback.target = "_blank";
    fallback.rel = "noopener noreferrer";
    fallback.textContent = "Search on Roblox";
    document.querySelector("#gameGrid .empty-state").append(fallback);
    document.querySelector("#discoverDescription").textContent = "Roblox search is temporarily unavailable.";
  }
}

document.querySelector("#robloxSearch").addEventListener("submit", (event) => {
  event.preventDefault();
  searchGames(document.querySelector("#gameQuery").value.trim());
});
document.querySelector("#discoverButton").addEventListener("click", () => document.querySelector("#gameQuery").focus());
document.querySelector("#clearGames").addEventListener("click", () => {
  document.querySelector("#gameQuery").value = "";
  document.querySelector("#discoverDescription").textContent = "Explore Roblox experiences.";
  showEmptyState("Find your next game", "Search for an experience to see available results.");
});

document.querySelector("#gameGrid").addEventListener("click", (event) => {
  const launch = event.target.closest("[data-place-id]");
  if (!launch) return;
  pendingPlaceId = launch.dataset.placeId;
  if (state.confirmLaunch) launchDialog.showModal();
  else window.location.href = `roblox://experiences/start?placeId=${encodeURIComponent(pendingPlaceId)}`;
});
document.querySelector("#cancelLaunch").addEventListener("click", () => launchDialog.close());
document.querySelector("#confirmLaunch").addEventListener("click", () => {
  if (pendingPlaceId) window.location.href = `roblox://experiences/start?placeId=${encodeURIComponent(pendingPlaceId)}`;
  launchDialog.close();
});

document.querySelector("#compactToggle").checked = Boolean(state.compact);
document.body.classList.toggle("compact", Boolean(state.compact));
document.querySelector("#compactToggle").addEventListener("change", (event) => {
  state.compact = event.target.checked;
  document.body.classList.toggle("compact", state.compact);
  saveState();
});
document.querySelector("#confirmToggle").checked = state.confirmLaunch !== false;
document.querySelector("#confirmToggle").addEventListener("change", (event) => {
  state.confirmLaunch = event.target.checked;
  saveState();
});
document.querySelector("#resetLayout").addEventListener("click", () => {
  state.widgets = { home: [], roblox: [] };
  saveState();
  renderAllWidgets();
  settingsDialog.close();
  notify("Both widget layouts have been reset.");
});

updateClock();
setInterval(updateClock, 30000);
renderAllWidgets();
setMode(state.mode);
