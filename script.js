const startPage = document.getElementById("startPage");
const robloxPage = document.getElementById("robloxPage");
const modeToggle = document.getElementById("modeToggle");
const toggleIcon = document.getElementById("toggleIcon");
const toggleText = document.getElementById("toggleText");
const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");
const gameSearchForm = document.getElementById("gameSearchForm");
const gameSearchInput = document.getElementById("gameSearchInput");
const homeRobloxButton = document.getElementById("homeRobloxButton");

function setMode(mode) {
  const isRoblox = mode === "roblox";

  startPage.hidden = isRoblox;
  robloxPage.hidden = !isRoblox;
  modeToggle.setAttribute("aria-pressed", String(isRoblox));
  toggleIcon.textContent = isRoblox ? "⌂" : "🎮";
  toggleText.textContent = isRoblox ? "Home Mode" : "Roblox Mode";
  document.title = isRoblox ? "StartPhase | Roblox" : "StartPhase";
}

function toggleMode() {
  setMode(robloxPage.hidden ? "roblox" : "home");
}

modeToggle.addEventListener("click", toggleMode);

homeRobloxButton.addEventListener("click", () => {
  setMode("roblox");
});

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const query = searchInput.value.trim();

  if (!query) return;

  window.location.href =
    "https://duckduckgo.com/?q=" + encodeURIComponent(query);
});

gameSearchForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const query = gameSearchInput.value.trim();

  if (!query) return;

  window.open(
    "https://www.roblox.com/search/experiences?keyword=" +
      encodeURIComponent(query),
    "_blank",
    "noopener,noreferrer"
  );
});

setMode("home");
