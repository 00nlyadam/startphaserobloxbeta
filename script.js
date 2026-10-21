
:root {
  color-scheme: light;
  --ink: #192b3c;
  --muted: #708296;
  --cyan: #a5e9ec;
  --cyan-strong: #83dce3;
  --surface: rgba(255, 255, 255, 0.76);
  --surface-solid: #f8fbff;
  --line: rgba(64, 105, 139, 0.13);
  --blue: #1684c5;
  --shadow: 0 16px 45px rgba(48, 100, 143, 0.09);
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  min-height: 100vh;
  padding: 22px;
  font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  color: var(--ink);
  background: linear-gradient(150deg, #f5faff 0%, #e2f1fc 48%, #c6e5f8 100%);
}

button,
input,
textarea {
  font: inherit;
}

button {
  color: inherit;
}

button:focus-visible,
a:focus-visible,
input:focus-visible,
textarea:focus-visible {
  outline: 3px solid rgba(22, 132, 197, 0.5);
  outline-offset: 3px;
}

button,
a {
  -webkit-tap-highlight-color: transparent;
}

.app {
  display: flex;
  max-width: 1700px;
  min-height: calc(100vh - 44px);
  margin: auto;
  overflow: hidden;
  border: 2px solid rgba(35, 61, 82, 0.7);
  border-radius: 28px;
  background: rgba(255, 255, 255, 0.22);
  box-shadow: var(--shadow);
}

.sidebar {
  display: flex;
  flex: 0 0 88px;
  flex-direction: column;
  align-items: center;
  gap: 26px;
  padding: 22px 12px;
  background: rgba(145, 231, 235, 0.72);
  border-right: 1px solid rgba(255, 255, 255, 0.55);
}

.brand {
  display: grid;
  width: 60px;
  height: 60px;
  place-items: center;
  overflow: hidden;
  border-radius: 17px;
}

.brand img {
  width: 95px;
  max-width: none;
  height: auto;
}

.nav,
.sidebar-bottom {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 13px;
}

.sidebar-bottom {
  margin-top: auto;
}

.nav-button,
.icon-button {
  display: grid;
  width: 48px;
  height: 48px;
  padding: 0;
  place-items: center;
  border: 0;
  border-radius: 16px;
  background: transparent;
  cursor: pointer;
  transition: background .18s ease, transform .18s ease;
}

.nav-button:hover,
.icon-button:hover {
  background: rgba(255, 255, 255, 0.65);
  transform: translateY(-2px);
}

.nav-button.active {
  background: #fff;
  box-shadow: 0 5px 15px rgba(40, 94, 119, 0.1);
}

.nav-icon,
[data-icon] {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.nav-icon img,
[data-icon] img {
  display: block;
  width: 21px;
  height: 21px;
}

.workspace {
  flex: 1;
  min-width: 0;
  padding: 34px clamp(20px, 4vw, 58px) 22px;
}

.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 30px;
}

.eyebrow {
  margin: 0 0 7px;
  color: #688ba5;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 2px;
}

h1,
h2,
h3,
p {
  margin-top: 0;
}

h1 {
  margin-bottom: 0;
  font-size: clamp(25px, 3vw, 36px);
  letter-spacing: -1.3px;
}

.clock {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
}

#clockTime {
  font-size: clamp(22px, 3vw, 34px);
  font-weight: 750;
  letter-spacing: -1px;
  font-variant-numeric: tabular-nums;
}

#clockDate {
  color: var(--muted);
  font-size: 12px;
}

.mode-view {
  display: none;
  animation: appear .25s ease;
}

.mode-view.active {
  display: block;
}

@keyframes appear {
  from {
    opacity: 0;
    transform: translateY(5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.search {
  display: flex;
  align-items: center;
  gap: 14px;
  width: 100%;
  min-height: 65px;
  padding: 8px 10px 8px 23px;
  border: 1px solid rgba(255, 255, 255, 0.95);
  border-radius: 999px;
  background: #fff;
  box-shadow: 0 8px 24px rgba(46, 94, 132, 0.06);
}

.search > [data-icon] img {
  width: 22px;
  height: 22px;
}

.search input {
  flex: 1;
  width: 0;
  min-width: 0;
  border: 0;
  outline: none;
  background: transparent;
  color: var(--ink);
  font-size: 16px;
}

.search input::placeholder {
  color: #8797a6;
}

.search button {
  display: grid;
  flex: 0 0 46px;
  width: 46px;
  height: 46px;
  place-items: center;
  border: 0;
  border-radius: 50%;
  background: #e5f4fb;
  cursor: pointer;
}

.hero {
  position: relative;
  display: flex;
  min-height: 245px;
  margin-top: 24px;
  padding: clamp(24px, 4vw, 42px);
  overflow: hidden;
  align-items: center;
  justify-content: space-between;
  border: 1px solid rgba(255, 255, 255, 0.9);
  border-radius: 27px;
  background: linear-gradient(120deg, rgba(255, 255, 255, 0.92), rgba(219, 239, 252, 0.88));
}

.hero-copy {
  position: relative;
  z-index: 1;
  max-width: 470px;
}

.pill {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 11px;
  border: 1px solid rgba(68, 128, 157, 0.12);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.65);
  color: #547d94;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 1.1px;
}

.status-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #48b8a0;
}

.hero h2 {
  margin: 20px 0 10px;
  font-size: clamp(31px, 4vw, 48px);
  line-height: 1.06;
  letter-spacing: -2px;
}

.hero h2 span {
  color: #2785b9;
}

.hero p {
  max-width: 350px;
  margin-bottom: 0;
  color: var(--muted);
  font-size: 14px;
  line-height: 1.65;
}

.hero-art {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  display: grid;
  width: 38%;
  min-width: 180px;
  place-items: center;
  overflow: hidden;
  background: linear-gradient(145deg, #e0f2ff, #acd9f1);
}

.hero-art > [data-icon] {
  position: relative;
  z-index: 2;
}

.hero-art > [data-icon] img {
  width: 66px;
  height: 66px;
  opacity: .72;
}

.orb {
  position: absolute;
  border: 1px solid rgba(255, 255, 255, 0.8);
  border-radius: 50%;
}

.orb-one {
  width: 180px;
  height: 180px;
  background: rgba(255, 255, 255, 0.32);
}

.orb-two {
  width: 110px;
  height: 110px;
  background: rgba(123, 204, 235, 0.28);
}

.roblox-hero {
  background: linear-gradient(115deg, #f8fcff, #d8effd);
}

.roblox-hero .hero-art {
  background: linear-gradient(145deg, #cdeafb, #8bc9ed);
}

.game-cube {
  position: absolute;
  width: 74px;
  height: 74px;
  border: 1px solid rgba(255, 255, 255, 0.8);
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.4);
  transform: rotate(-12deg);
}

.cube-one {
  margin: -40px 0 0 -35px;
}

.cube-two {
  margin: 45px 0 0 55px;
  background: rgba(58, 158, 215, 0.2);
  transform: rotate(14deg);
}

.primary-button,
.secondary-button {
  display: inline-flex;
  min-height: 44px;
  align-items: center;
  justify-content: center;
  gap: 9px;
  padding: 0 17px;
  border: 0;
  border-radius: 14px;
  cursor: pointer;
  font-weight: 700;
  transition: transform .18s ease, filter .18s ease;
}

.primary-button {
  background: #207fb5;
  color: white;
}

.primary-button:hover,
.secondary-button:hover {
  transform: translateY(-2px);
  filter: brightness(1.04);
}

.roblox-hero .primary-button {
  margin-top: 20px;
}

.secondary-button {
  border: 1px solid var(--line);
  background: #eef5fb;
}

.section-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  margin: 32px 0 16px;
}

.section-heading h2 {
  margin-bottom: 5px;
  font-size: 19px;
  letter-spacing: -.5px;
}

.section-heading p {
  margin-bottom: 0;
  color: var(--muted);
  font-size: 12px;
}

.text-button {
  display: inline-flex;
  min-height: 36px;
  align-items: center;
  gap: 7px;
  padding: 0 10px;
  border: 0;
  border-radius: 10px;
  background: transparent;
  color: #277aa9;
  cursor: pointer;
  font-size: 12px;
  font-weight: 750;
}

.text-button:hover {
  background: rgba(255, 255, 255, 0.6);
}

.text-button [data-icon] img {
  width: 17px;
  height: 17px;
}

.widget-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 15px;
}

.widget {
  position: relative;
  min-width: 0;
  min-height: 145px;
  padding: 20px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.95);
  border-radius: 21px;
  background: var(--surface);
  box-shadow: 0 6px 22px rgba(48, 100, 143, 0.04);
}

.widget-icon {
  display: grid;
  width: 38px;
  height: 38px;
  margin-bottom: 15px;
  place-items: center;
  border-radius: 12px;
  background: #e0f2fb;
}

.widget h3 {
  margin-bottom: 7px;
  font-size: 14px;
}

.widget p {
  margin-bottom: 0;
  color: var(--muted);
  font-size: 12px;
  line-height: 1.55;
  overflow-wrap: anywhere;
}

.widget-remove {
  position: absolute;
  top: 10px;
  right: 10px;
  display: grid;
  width: 28px;
  height: 28px;
  place-items: center;
  border: 0;
  border-radius: 9px;
  background: transparent;
  opacity: .55;
  cursor: pointer;
}

.widget-remove:hover {
  background: #e9f1f7;
  opacity: 1;
}

.widget-remove img {
  width: 15px;
  height: 15px;
}

.widget textarea {
  width: 100%;
  min-height: 64px;
  resize: vertical;
  border: 1px solid var(--line);
  border-radius: 10px;
  padding: 9px;
  background: rgba(255, 255, 255, 0.75);
  color: var(--ink);
  font-size: 12px;
}

.widget a {
  color: #247bab;
  text-decoration: none;
}

.widget-grid:empty::after {
  content: "No widgets yet. Use + Add widget to build your layout.";
  grid-column: 1 / -1;
  padding: 24px;
  border: 1px dashed rgba(80, 132, 165, 0.35);
  border-radius: 18px;
  color: var(--muted);
  text-align: center;
  font-size: 13px;
}

.quick-links {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
}

.quick-links a {
  display: flex;
  min-width: 0;
  min-height: 58px;
  align-items: center;
  gap: 12px;
  padding: 12px 15px;
  border: 1px solid rgba(255, 255, 255, 0.9);
  border-radius: 15px;
  background: var(--surface);
  color: var(--ink);
  text-decoration: none;
  font-size: 13px;
  font-weight: 650;
  transition: transform .18s ease, background .18s ease;
}

.quick-links a:hover {
  transform: translateY(-2px);
  background: white;
}

.quick-links a span:last-child {
  margin-left: auto;
}

.quick-links a span:last-child img {
  width: 16px;
  height: 16px;
  opacity: .5;
}

.game-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 15px;
}

.game-card {
  min-width: 0;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.9);
  border-radius: 19px;
  background: var(--surface);
}

.game-card > img {
  display: block;
  width: 100%;
  aspect-ratio: 1.65;
  object-fit: cover;
  background: #dcecf7;
}

.game-card-body {
  padding: 14px;
}

.game-card h3 {
  margin-bottom: 7px;
  font-size: 14px;
}

.game-card p {
  min-height: 16px;
  margin-bottom: 13px;
  color: var(--muted);
  font-size: 11px;
}

.game-card .primary-button {
  width: 100%;
  min-height: 38px;
  border-radius: 11px;
  font-size: 12px;
}

.empty-state {
  grid-column: 1 / -1;
  display: flex;
  min-height: 175px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 25px;
  border: 1px dashed rgba(80, 132, 165, 0.35);
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.35);
  text-align: center;
}

.empty-state > [data-icon] img {
  width: 30px;
  height: 30px;
  opacity: .6;
}

.empty-state h3 {
  margin: 12px 0 6px;
  font-size: 15px;
}

.empty-state p {
  margin-bottom: 0;
  color: var(--muted);
  font-size: 12px;
}

.footer {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  margin-top: 38px;
  padding-top: 18px;
  border-top: 1px solid var(--line);
  color: var(--muted);
  font-size: 11px;
}

.dialog {
  width: min(440px, calc(100% - 28px));
  max-height: min(80vh, 680px);
  padding: 23px;
  border: 1px solid rgba(255, 255, 255, 0.95);
  border-radius: 23px;
  background: #f7fbff;
  color: var(--ink);
  box-shadow: 0 25px 100px rgba(20, 54, 80, 0.22);
}

.dialog::backdrop {
  background: rgba(26, 51, 73, 0.3);
  backdrop-filter: blur(5px);
}

.dialog-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 15px;
}

.dialog-header h2 {
  margin-bottom: 0;
  font-size: 24px;
}

.dialog-description,
.muted {
  color: var(--muted);
  font-size: 13px;
  line-height: 1.65;
}

.dialog-description {
  margin: 15px 0 20px;
}

.widget-picker {
  display: grid;
  gap: 9px;
}

.picker-item {
  display: flex;
  align-items: center;
  gap: 13px;
  padding: 13px;
  border: 1px solid var(--line);
  border-radius: 14px;
  background: white;
  text-align: left;
  cursor: pointer;
}

.picker-item:hover {
  background: #eaf6fc;
}

.picker-item > span:first-child {
  display: grid;
  width: 39px;
  height: 39px;
  flex: 0 0 39px;
  place-items: center;
  border-radius: 12px;
  background: #e0f2fb;
}

.picker-item strong,
.picker-item small {
  display: block;
}

.picker-item strong {
  margin-bottom: 4px;
  font-size: 13px;
}

.picker-item small,
.setting-row small {
  color: var(--muted);
  font-size: 11px;
}

.setting-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  padding: 17px 0;
  border-bottom: 1px solid var(--line);
}

.setting-row strong,
.setting-row small {
  display: block;
}

.setting-row strong {
  margin-bottom: 5px;
  font-size: 13px;
}

.setting-row input {
  width: 18px;
  height: 18px;
  accent-color: #207fb5;
}

.full-button {
  width: 100%;
  margin-top: 20px;
}

.dialog-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.toast {
  position: fixed;
  right: 24px;
  bottom: 24px;
  z-index: 10;
  max-width: calc(100% - 48px);
  padding: 13px 17px;
  border: 1px solid rgba(255, 255, 255, 0.8);
  border-radius: 13px;
  background: #193d56;
  color: white;
  box-shadow: var(--shadow);
  font-size: 12px;
  opacity: 0;
  pointer-events: none;
  transform: translateY(8px);
  transition: opacity .2s ease, transform .2s ease;
}

.toast.show {
  opacity: 1;
  transform: translateY(0);
}

.compact .widget-grid,
.compact .game-grid {
  gap: 9px;
}

.compact .widget {
  min-height: 120px;
  padding: 15px;
}

@media (max-width: 950px) {
  .widget-grid,
  .game-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .hero-art {
    width: 30%;
    min-width: 130px;
  }
}

@media (max-width: 650px) {
  body {
    padding: 8px;
  }

  .app {
    min-height: calc(100vh - 16px);
    border-radius: 21px;
  }

  .sidebar {
    flex-basis: 60px;
    gap: 20px;
    padding: 14px 5px;
  }

  .brand {
    width: 45px;
    height: 45px;
  }

  .brand img {
    width: 76px;
  }

  .nav-button {
    width: 43px;
    height: 43px;
    border-radius: 14px;
  }

  .workspace {
    padding: 23px 13px 17px;
  }

  .topbar {
    align-items: flex-start;
    margin-bottom: 20px;
  }

  #clockDate {
    max-width: 100px;
    text-align: right;
    line-height: 1.4;
  }

  .search {
    min-height: 55px;
    gap: 9px;
    padding-left: 14px;
  }

  .search input {
    font-size: 13px;
  }

  .search button {
    flex-basis: 38px;
    width: 38px;
    height: 38px;
  }

  .hero {
    min-height: 230px;
    padding: 22px 18px;
  }

  .hero h2 {
    font-size: 32px;
  }

  .hero-art {
    width: 26%;
    min-width: 65px;
    opacity: .6;
  }

  .hero-art > [data-icon] img {
    width: 36px;
    height: 36px;
  }

  .hero-copy {
    max-width: 85%;
  }

  .hero p {
    font-size: 12px;
  }

  .widget-grid,
  .game-grid {
    grid-template-columns: minmax(0, 1fr);
  }

  .widget {
    min-height: 125px;
  }

  .quick-links {
    grid-template-columns: minmax(0, 1fr);
  }

  .section-heading {
    align-items: flex-start;
  }

  .text-button {
    font-size: 11px;
  }
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: .01ms !important;
    transition-duration: .01ms !important;
    scroll-behavior: auto !important;
  }
}
