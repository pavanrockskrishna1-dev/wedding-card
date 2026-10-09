# wedding-card — Anna & David's Wedding Invitation

A mobile-first, interactive, bilingual-ready (4 languages) Christian wedding
invitation built as a static site. It is a React + Vite + Tailwind project
that **builds to a single static `dist/index.html`** (via
`vite-plugin-singlefile`), so the shipped output is pure HTML/CSS/JS with no
backend — ready for GitHub Pages.

> **Note on tech stack:** The brief asked for "HTML, CSS, JavaScript only,"
> with Three.js and GSAP loaded from cdnjs. This project was built inside a
> React + Vite + Tailwind starter template (the environment's required
> toolchain), so Three.js and GSAP are installed as npm packages instead of
> `<script>` CDN tags, and Tailwind utility classes are used instead of hand
> written CSS files. Functionally this satisfies every requirement in the
> brief: the **build output is a static site** (one self-contained
> `index.html`, no server/runtime dependency), Three.js is used **only** for
> the threefold-cord 3D scene, and GSAP drives every other animation. All
> content still lives in a single config file (`src/config.ts`).

## 1. Live demo

Deploy with the steps in section 3 and your live link will be:

```
https://<your-github-username>.github.io/wedding-card/
```

(Replace `<your-github-username>` — this repo has not been deployed by me;
you must publish it from your own GitHub account, see steps below.)

## 2. File list — what every file does

```
wedding-card/
├── index.html                     Page shell: title, meta tags, Google Fonts
│                                   (Noto Sans, Noto Sans Telugu/Devanagari/
│                                   Oriya, Cormorant Garamond), mounts React.
├── src/
│   ├── main.tsx                   React entry point, renders <App/>.
│   ├── App.tsx                    Scene router: reads ?name=&lang= from the
│   │                               URL, shows the language picker (unless
│   │                               ?lang= is set), tracks which of the 6
│   │                               scenes is active, renders the bottom
│   │                               Next/progress-dot navigation.
│   ├── config.ts                  ⭐ SINGLE SOURCE OF TRUTH for all text.
│   │                               English/Telugu/Hindi/Odia translations,
│   │                               scripture text (Bible Society of India
│   │                               wording), couple/date/venue/map data,
│   │                               URL-param helper. Edit this file to
│   │                               change any wording, date, names or links.
│   ├── index.css                  Tailwind import, font-family theme
│   │                               tokens, shared animation keyframes
│   │                               (petals, twinkle, glow, fade-in), shared
│   │                               button styles.
│   ├── hooks/
│   │   └── useSwipeNav.ts         Detects swipe-up (touch), mouse-wheel and
│   │                               Arrow keys to advance/go back a scene.
│   ├── components/
│   │   ├── SceneNav.tsx           Fixed bottom "Next/Begin" button, swipe
│   │                               hint text, and progress dots.
│   │   └── Silhouette.tsx         Simple flat SVG placeholder silhouettes
│   │                               for the bride and groom (to be swapped
│   │                               for real artwork/photos later).
│   └── scenes/
│       ├── LanguagePickerScene.tsx   Scene 1 — 4 glowing language buttons.
│       ├── StainedGlassScene.tsx     Scene 2 — coloured glass pieces fly in
│       │                             and assemble into a pointed-arch church
│       │                             window; a light shaft reveals the
│       │                             personalised greeting.
│       ├── CordScene.tsx             Scene 3 — Three.js: three glowing
│       │                             strands (gold/white/rose) converge and
│       │                             crossfade into a braided cord;
│       │                             Ecclesiastes 4:12 fades in.
│       ├── CoupleScene.tsx           Scene 4 — bride & groom placeholder
│       │                             silhouettes walk together, two rings
│       │                             appear, a cord halo "wraps" the rings.
│       ├── StoryScene.tsx            Scene 5 — 3 placeholder timeline cards
│       │                             ("Our Story").
│       ├── DetailsScene.tsx          Scene 6 — church, date/time, reception,
│       │                             "Get Directions" buttons (Google Maps).
│       └── BlessingScene.tsx         Scene 7 — closing verses (1 Corinthians
│                                      13:4-7, Ruth 1:16), falling petals,
│                                      mute/unmute background-music button.
├── public/
│   └── audio/README.txt           Explains the background-music placeholder
│                                   (see "Known limitations" below).
├── .github/workflows/deploy.yml   GitHub Actions workflow: builds the site
│                                   with npm and publishes dist/ to GitHub
│                                   Pages automatically on every push to main.
├── vite.config.ts / tsconfig.json / package.json   Build tooling (provided
│                                   by the project template; not hand-edited
│                                   beyond adding the three/gsap dependencies).
└── dist/                          Build output (generated — not committed;
                                    created automatically by `npm run build`
                                    or by the GitHub Actions workflow).
```

## 3. How to publish on GitHub Pages

**Option A — GitHub Actions (recommended, already set up in this repo):**

1. Create a new GitHub repository named `wedding-card`.
2. Push all the files above to the `main` branch of that repo.
3. In the repo settings: **Settings → Pages → Build and deployment → Source**,
   choose **"GitHub Actions."**
4. Push to `main` (or click "Run workflow" under the **Actions** tab). The
   included workflow (`.github/workflows/deploy.yml`) will run
   `npm ci && npm run build` and publish the `dist/` folder automatically.
5. Your site will be live at `https://<your-username>.github.io/wedding-card/`.

**Option B — manual, no Actions:**

1. Run `npm install` then `npm run build` locally. This produces `dist/index.html`
   (plus `dist/audio/`).
2. Create the `wedding-card` GitHub repo and push your source normally to `main`.
3. Publish the contents of `dist/` to a `gh-pages` branch (e.g. using the
   `gh-pages` npm package: `npx gh-pages -d dist`) **or** copy `dist/index.html`
   into a `/docs` folder on `main` and set **Settings → Pages → Source** to
   `main` / `/docs`.
4. Your site will be live at the same `https://<your-username>.github.io/wedding-card/` URL.

Because the production build is a **single self-contained `index.html`**
(all JS/CSS inlined, fonts loaded from Google's CDN, and the only local file
reference — the background audio — uses a relative path), it works
correctly from a GitHub Pages *project* URL (i.e. a sub-path like
`/wedding-card/`), not just from a domain root.

## 4. Personalised links

- `?name=Mary%20Aunty` → the Stained Glass scene greets "Dear Mary Aunty"
  (the word "Dear" is translated per language; the name itself is shown
  exactly as given, since guest names are not translated).
- `?lang=te` (or `hi` / `or` / `en`) → skips the language-picker scene and
  opens directly in that language.
- Combined example:
  `https://<your-username>.github.io/wedding-card/?name=Mary%20Aunty&lang=te`

## 5. Content config

Everything text-related — names, date, venue, scripture, story cards, button
labels, language names — lives in **`src/config.ts`**. Nothing is hard-coded
in any scene component. To customise:

- Change `WEDDING` (bride/groom names, ISO date, Google Maps links).
- Edit `TRANSLATIONS.en/te/hi/or` for wording per language (each language has
  the same keys, so nothing is missed).
- Scripture quotations (Ecclesiastes 4:12, 1 Corinthians 13:4-7, Ruth 1:16)
  use **Bible Society of India** wording, sourced and cross-checked from the
  official BSI-licensed editions distributed via bible.com:
  - Telugu: **TELUBSI**
  - Hindi: **HINOVBSI** (पवित्र बाइबिल OV Re-edited, BSI)
  - Odia: **ODIAOV-BSI** (ପବିତ୍ର ବାଇବଲ OV Re-edited, BSI)
  - English: King James Version (the traditional English text used
    alongside BSI vernacular editions in Indian churches).

## 6. Known limitation — placeholder audio

No actual music file is bundled (to avoid licensing issues and keep the
repo small, as instructed). `src/config.ts` points the Blessing scene's
`<audio>` element at `audio/background-music.mp3`, which does not exist in
this build. The mute/unmute button still works as a UI control (it toggles
state and icon), but playback will fail silently — this is caught in code
(`BlessingScene.tsx`) and shown as a small hint ("Add your music file at
…") rather than breaking the page. Drop a royalty-free MP3 at
`public/audio/background-music.mp3` and rebuild to enable real playback.

## 7. How this was tested (honesty section)

I do not have a real mobile device or a browser-automation tool in this
environment, so I could **not** visually click through the live site on an
actual Android phone. What I *did* do, concretely, for each scene:

- **All scenes:** ran `npm run build` (Vite production build) after every
  significant change and confirmed it completed with 0 errors — this
  compiles/bundles all TypeScript/TSX and catches syntax errors, missing
  imports, and broken JSX. Final build: `dist/index.html` ≈ 875 KB
  (≈243 KB gzipped) — well under the 3 MB budget, confirmed by reading the
  build output size directly.
- **Scene 1 (Language picker):** traced the code path manually — `App.tsx`
  renders `LanguagePickerScene` only when no `lang` URL param is present;
  `onSelect` sets React state which switches to the scene list. Verified the
  4 `LANGUAGES` entries match the 4 required languages and each button's
  `onClick` passes the correct `LangCode`.
- **Scene 2 (Stained glass):** manually traced the GSAP timeline in
  `StainedGlassScene.tsx` — pieces are set to randomized off-screen
  `x/y/rotate` via `gsap.set`, then animated to `0` with stagger; verified
  the clip-path arch shape coordinates stay inside the 200×240 viewBox;
  verified the greeting string concatenation (`dearPrefix + guestName` vs.
  `defaultGuest`) against both the "name present" and "name absent" cases by
  reading `getUrlParams()`'s logic.
- **Scene 3 (Threefold cord, Three.js):** reviewed the Three.js lifecycle
  code line-by-line for correctness: scene/camera/renderer setup, light
  placement, geometry/material creation, the GSAP timeline that moves
  `mesh.position`/`material.opacity` (valid GSAP targets since these are
  plain numeric properties on Three.js objects), the `requestAnimationFrame`
  loop, and — importantly — the cleanup function (cancels the animation
  frame, disposes every geometry/material, disposes the renderer, removes
  the canvas node) so repeated scene mount/unmount during swiping does not
  leak WebGL contexts, which was a specific risk I checked for given the
  "must run smoothly on a budget Android phone" requirement.
- **Scene 4 (Bride & groom):** verified the SVG ring coordinates
  (`cx/cy/r`) fit inside their `viewBox` without clipping, and traced the
  GSAP timeline order (figures slide in → rings pop in → cord-halo circles
  draw via `strokeDashoffset` → copy fades in).
- **Scene 5 (Our story):** confirmed all 3 placeholder cards render from
  `t.story.cards` (array, so adding/removing a card automatically updates
  the timeline) in all 4 languages by reading each language block in
  `config.ts` side by side to confirm identical key structure.
- **Scene 6 (Details):** confirmed the two "Get Directions" buttons are
  plain `<a target="_blank">` tags pointing at `WEDDING.mapsLink` /
  `WEDDING.receptionMapsLink` from `config.ts` (currently placeholder Google
  Maps search URLs) — clicking them opens Google Maps in a new tab by
  design; I did not have a way to click-test this in a real browser here.
- **Scene 7 (Blessing):** verified the petal generator produces valid CSS
  custom properties and that the `<audio>` `play()` call is wrapped so a
  rejected promise (e.g. missing file, as in this build) is caught and
  reflected in the UI instead of throwing an unhandled error.
- **Type/consistency check:** grepped the codebase for every remaining use
  of hard-coded `font-display` to make sure it is never combined with
  vernacular-script text (Cormorant Garamond doesn't include
  Telugu/Devanagari/Oriya glyphs) — fixed all such cases to use a
  language-aware `headingFontClass` instead.

**What this means for you:** the code builds cleanly and I'm confident in
the logic by manual trace, but please do a real click-through on an actual
phone (or `npm run dev` + Chrome DevTools device emulation) before sending
this to guests — especially the swipe gesture feel and the Google Maps
links once you replace the placeholder addresses with your real venue.

## 8. Local development

```bash
npm install
npm run dev       # local dev server
npm run build     # production build → dist/
npm run preview   # preview the production build locally
```
