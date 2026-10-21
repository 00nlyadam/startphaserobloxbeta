
const iconBase = "https://cdn.jsdelivr.net/npm/lucide-static@1.52.0/icons/";
const iconFallback = "https://cdn.jsdelivr.net/npm/lucide-static@1.52.0/icons/circle-help.svg";

function iconMarkup(name) {
  const safeName = /^[a-z0-9-]+$/.test(name) ? name : "circle-help";
  const url = iconBase + safeName + ".svg";
  return `<img src="${url}" alt="" aria-hidden="true" loading="lazy" onerror="this.onerror=null;this.src='${iconFallback}'">`;
}

document.querySelectorAll("[data-icon]").forEach((element) => {
  element.innerHTML = iconMarkup(element.dataset.icon);
});

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

const views = {
  home: $("#homeView"),
  roblox: $("#robloxView")
};

const modeInfo = {
  home: { label: "YOUR SPACE", title: "StartPhase" },
  roblox: { label: "EXPERIENCE HUB", title: "Roblox" }
};

let currentMode = "home";
let pendingPlaceId = null;
let pendingGameName = "";
let toastTimeout;
let searchSequence = 0;

const defaultWidgets = {
  home: ["clock", "links", "notes"],
  roblox: ["featured", "clock"]
};

function loadJSON(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

const layouts = {
  home: loadJSON("startphase-home-widgets", defaultWidgets.home),
  roblox: loadJSON("startphase-roblox-widgets", defaultWidgets.roblox)
};

const widgetData = loadJSON("startphase-widget-data", {});
const preferences = {
  compact: localStorage.getItem("startphase-compact") === "true",
  confirm: localStorage.getItem("startphase-confirm") !== "false"
};

function saveLayouts() {
  localStorage.setItem("startphase-home-widgets", JSON.stringify(layouts.home));
  localStorage.setItem("startphase-roblox-widgets", JSON.stringify(layouts.roblox));
}

function saveWidgetData() {
  localStorage.setItem("startphase-widget-data", JSON.stringify(widgetData));
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[character]);
}

function toast(message) {
  const element = $("#toast");
  element.textContent = message;
  element.classList.add("show");
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => element.classList.remove("show"), 3000);
}

function updateClock() {
  const now = new Date();
  $("#clockTime").textContent = now.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit"
  });
  $("#clockDate").textContent = now.toLocaleDateString([], {
    weekday: "short",
    month: "short",
    day: "numeric"
  });
}

function setMode(mode) {
  if (!views[mode]) return;

  currentMode = mode;

  Object.entries(views).forEach(([key, view]) => {
    view.classList.toggle("active", key === mode);
  });

  $$("[data-mode]").forEach((button) => {
    button.classList.toggle("active", button.dataset.mode === mode);
  });

  $("#modeLabel").textContent = modeInfo[mode].label;
  $("#pageTitle").textContent = modeInfo[mode].title;
  document.title = mode === "home" ? "StartPhase" : "Roblox | StartPhase";

  renderWidgets(mode);
}

function widgetMarkup(type, index, mode) {
  const data = widgetData[`${mode}:${type}:${index}`] || {};
  const removeButton = `<button class="widget-remove" data-remove-widget="${index}" aria-label="Remove widget">${iconMarkup("x")}</button>`;

  if (type === "clock") {
    return `<article class="widget">
      ${removeButton}
      <div class="widget-icon">${iconMarkup("clock")}</div>
      <h3>Local time</h3>
      <p class="clock-widget-time">${new Date().toLocaleTimeString([], {hour:"2-digit",minute:"2-digit"})}</p>
      <p>${new Date().toLocaleDateString([], {weekday:"long",month:"long",day:"numeric"})}</p>
    </article>`;
  }

  if (type === "notes") {
    return `<article class="widget">
      ${removeButton}
      <div class="widget-icon">${iconMarkup("notebook-pen")}</div>
      <h3>Quick notes</h3>
      <textarea data-note="${mode}:${index}" placeholder="Write something...">${escapeHTML(data.note || "")}</textarea>
    </article>`;
  }

  if (type === "links") {
    return `<article class="widget">
      ${removeButton}
      <div class="widget-icon">${iconMarkup("link")}</div>
      <h3>Website shortcuts</h3>
      <p><a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer">YouTube</a> · <a href="https://discord.com/app" target="_blank" rel="noopener noreferrer">Discord</a></p>
      <p><a href="https://duckduckgo.com/" target="_blank" rel="noopener noreferrer">DuckDuckGo</a></p>
    </article>`;
  }

  if (type === "featured") {
    return `<article class="widget">
      ${removeButton}
      <div class="widget-icon">${iconMarkup("star")}</div>
      <h3>Featured</h3>
      <textarea data-featured="${mode}:${index}" placeholder="Write a title or reminder...">${escapeHTML(data.title || "Your next adventure")}</textarea>
    </article>`;
  }

  return "";
}

function renderWidgets(mode) {
  const container = mode === "home" ? $("#homeWidgets") : $("#robloxWidgets");
  container.innerHTML = layouts[mode]
    .map((type, index) => widgetMarkup(type, index, mode))
    .join("");

  container.querySelectorAll("[data-remove-widget]").forEach((button) => {
    button.addEventListener("click", () => {
      const index = Number(button.dataset.removeWidget);
      layouts[mode].splice(index, 1);
      saveLayouts();
      renderWidgets(mode);
      toast("Widget removed.");
    });
  });

  container.querySelectorAll("[data-note]").forEach((textarea) => {
    textarea.addEventListener("input", () => {
      const key = `${mode}:notes:${textarea.dataset.note.split(":").pop()}`;
      widgetData[key] = { ...widgetData[key], note: textarea.value };
      saveWidgetData();
    });
  });

  container.querySelectorAll("[data-featured]").forEach((textarea) => {
    textarea.addEventListener("input", () => {
      const key = `${mode}:featured:${textarea.dataset.featured.split(":").pop()}`;
      widgetData[key] = { ...widgetData[key], title: textarea.value };
      saveWidgetData();
    });
  });
}

function openWidgetPicker() {
  $("#widgetDialog").showModal();
}

$$("[data-mode]").forEach((button) => {
  button.addEventListener("click", () => setMode(button.dataset.mode));
});

$$("[data-action]").forEach((button) => {
  button.addEventListener("click", () => {
    const action = button.dataset.action;

    if (action === "widgets") openWidgetPicker();
    if (action === "settings") $("#settingsDialog").showModal();
    if (action === "about") $("#aboutDialog").showModal();
  });
});

$$("[data-widget]").forEach((button) => {
  button.addEventListener("click", () => {
    const type = button.dataset.widget;
    const layout = layouts[currentMode];

    if (layout.length >= 9) {
      toast("This layout has reached the 9-widget limit.");
      return;
    }

    const index = layout.filter((item) => item === type).length;
    layout.push(type);
    saveLayouts();
    renderWidgets(currentMode);
    $("#widgetDialog").close();
    toast("Widget added to " + (currentMode === "home" ? "StartPhase" : "Roblox") + " mode.");
  });
});

$("#webSearch").addEventListener("submit", (event) => {
  event.preventDefault();
  const query = $("#webQuery").value.trim();
  if (!query) return;
  location.href = "https://duckduckgo.com/?q=" + encodeURIComponent(query);
});

function renderEmptyGames(title, message) {
  $("#gameGrid").innerHTML = `<div class="empty-state">
    ${iconMarkup("search")}
    <h3>${escapeHTML(title)}</h3>
    <p>${escapeHTML(message)}</p>
  </div>`;
}

function renderGames(games, query) {
  const validGames = games.filter((game) => game && game.id && game.name);

  if (!validGames.length) {
    renderEmptyGames("No experiences found", "Try another search, or check again later.");
    return;
  }

  $("#gameGrid").innerHTML = validGames.map((game) => {
    const placeId = String(game.rootPlaceId || game.placeId || game.id);
    const creator = game.creator?.name || "Roblox creator";
    const image = game.imageUrl || "";
    const description = game.description || creator;

    return `<article class="game-card">
      <img src="${escapeHTML(image)}" alt="" loading="lazy" onerror="this.style.visibility='hidden'">
      <div class="game-card-body">
        <h3>${escapeHTML(game.name)}</h3>
        <p>${escapeHTML(description.slice(0, 90))}</p>
        <button class="primary-button join-game" data-place-id="${escapeHTML(placeId)}" data-game-name="${escapeHTML(game.name)}">
          ${iconMarkup("play")} Join
        </button>
      </div>
    </article>`;
  }).join("");

  $$(".join-game").forEach((button) => {
    button.addEventListener("click", () => {
      requestJoin(button.dataset.placeId, button.dataset.gameName);
    });
  });

  $("#discoverDescription").textContent = `Results for "${query}"`;
}

async function searchRoblox(query) {
  const sequence = ++searchSequence;
  $("#discoverDescription").textContent = "Searching Roblox experiences...";
  renderEmptyGames("Searching...", "Fetching available public experience results.");

  try {
    const response = await fetch(
      "https://apis.roblox.com/search-api/omni-search?searchQuery=" +
      encodeURIComponent(query) +
      "&pageToken=&sessionId="
    );

    if (!response.ok) throw new Error("Search request failed");

    const result = await response.json();
    if (sequence !== searchSequence) return;

    const sections = result.searchResults || [];
    const games = sections.flatMap((section) => section.contents || [])
      .filter((item) => item.universeId || item.rootPlaceId || item.placeId)
      .map((item) => ({
        id: item.universeId || item.rootPlaceId || item.placeId,
        rootPlaceId: item.rootPlaceId || item.placeId,
        name: item.name || item.title,
        description: item.description || "",
        creator: item.creator || item.author,
        imageUrl: item.thumbnail?.url || item.imageUrl || ""
      }));

    const uniqueGames = [...new Map(games.map((game) => [game.id, game])).values()];

    if (!uniqueGames.length) {
      const fallback = await searchExperiencesFallback(query);
      if (sequence === searchSequence) renderGames(fallback, query);
      return;
    }

    const enrichedGames = await Promise.all(uniqueGames.slice(0, 12).map(async (game) => {
      if (game.imageUrl) return game;

      try {
        const thumbnailResponse = await fetch(
          "https://thumbnails.roblox.com/v1/games/icons?universeIds=" +
          encodeURIComponent(game.id) +
          "&returnPolicy=PlaceHolder&size=256x256&format=Png&isCircular=false"
        );

        if (!thumbnailResponse.ok) return game;

        const thumbnailData = await thumbnailResponse.json();
        return {
          ...game,
          imageUrl: thumbnailData.data?.[0]?.imageUrl || ""
        };
      } catch {
        return game;
      }
    }));

    if (sequence === searchSequence) renderGames(enrichedGames, query);
  } catch {
    if (sequence !== searchSequence) return;
    const fallback = await searchExperiencesFallback(query);
    if (sequence === searchSequence) renderGames(fallback, query);
  }
}

async function searchExperiencesFallback(query) {
  try {
    const response = await fetch(
      "https://games.roblox.com/v1/games/list?model.keyword=" +
      encodeURIComponent(query) +
      "&model.maxRows=12&model.startRow=0"
    );

    if (!response.ok) return [];

    const result = await response.json();
    return (result.games || []).map((game) => ({
      id: game.universeId || game.id,
      rootPlaceId: game.placeId,
      name: game.name,
      description: game.gameDescription || "",
      creator: { name: game.creatorName || "Roblox creator" },
      imageUrl: ""
    }));
  } catch {
    return [];
  }
}

$("#robloxSearch").addEventListener("submit", (event) => {
  event.preventDefault();
  const query = $("#gameQuery").value.trim();
  if (query) searchRoblox(query);
});

$("#discoverButton").addEventListener("click", () => {
  $("#gameQuery").focus();
  $("#gameQuery").scrollIntoView({ behavior: "smooth", block: "center" });
});

$("#clearGames").addEventListener("click", () => {
  searchSequence++;
  $("#gameQuery").value = "";
  $("#discoverDescription").textContent = "Explore Roblox experiences.";
  renderEmptyGames("Find your next game", "Search for an experience to see available results.");
});

function requestJoin(placeId, gameName) {
  if (!/^\d+$/.test(String(placeId))) {
    toast("This experience doesn't have a valid Place ID.");
    return;
  }

  pendingPlaceId = String(placeId);
  pendingGameName = gameName || "this experience";

  if (preferences.confirm) {
    $("#launchMessage").textContent = `Open "${pendingGameName}" in your installed Roblox client?`;
    $("#launchDialog").showModal();
  } else {
    launchGame();
  }
}

function launchGame() {
  if (!pendingPlaceId) return;

  const uri = `roblox://experiences/start?placeId=${encodeURIComponent(pendingPlaceId)}`;
  $("#launchDialog").close();
  window.location.href = uri;
  toast("If prompted, allow your browser to open Roblox. BetterSTRAP must be registered to handle the launch.");
  pendingPlaceId = null;
}

$("#confirmLaunch").addEventListener("click", launchGame);

$("#cancelLaunch").addEventListener("click", () => {
  $("#launchDialog").close();
  pendingPlaceId = null;
});

$("#compactToggle").checked = preferences.compact;
$("#confirmToggle").checked = preferences.confirm;
document.body.classList.toggle("compact", preferences.compact);

$("#compactToggle").addEventListener("change", (event) => {
  preferences.compact = event.target.checked;
  localStorage.setItem("startphase-compact", String(preferences.compact));
  document.body.classList.toggle("compact", preferences.compact);
});

$("#confirmToggle").addEventListener("change", (event) => {
  preferences.confirm = event.target.checked;
  localStorage.setItem("startphase-confirm", String(preferences.confirm));
});

$("#resetLayout").addEventListener("click", () => {
  layouts.home = [...defaultWidgets.home];
  layouts.roblox = [...defaultWidgets.roblox];
  saveLayouts();
  renderWidgets(currentMode);
  $("#settingsDialog").close();
  toast("Both layouts have been reset.");
});

updateClock();
setInterval(updateClock, 1000);
renderWidgets("home");
renderWidgets("roblox");
setMode("home");
