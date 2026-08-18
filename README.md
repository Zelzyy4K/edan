# Steam Game Tools

A browser-only prototype for a future Windows desktop utility. The prototype uses HTML, CSS and Vanilla JavaScript with ES modules. It has no backend and stores demo state in `localStorage`.

## Run

1. Open `index.html` directly in a modern Chromium/Firefox browser.
2. Internet access is only needed for the Inter font and Lucide icon CDN. The application itself has no backend.
3. Use the sidebar or keyboard shortcuts to explore the prototype.

## Folder structure

- `index.html` - application shell.
- `css/` - separated global, sidebar, component, dashboard, games, settings and responsive styles.
- `js/app.js` - bootstrap, navigation chrome and global keyboard shortcuts.
- `js/router.js` - tiny hash-style client router.
- `js/state.js` - application state and demo seed data.
- `js/storage.js` - LocalStorage, export/import and reset helpers.
- `js/pages/` - one module per application page.
- `js/components/` - reusable modal, toast, progress, card and dropdown primitives.
- `js/services/` - mock boundaries for Steam, backup, injection, bypass and fix workflows.
- `assets/` - reserved for future local assets.

## Theme

Edit CSS variables in `css/main.css`, especially `--bg-primary`, `--bg-card`, `--border`, `--accent`, `--success`, `--warning`, `--danger` and `--info`.

## Add a game

Edit `defaultGames` in `js/state.js`. A game needs an `id`, `name`, `appId`, `installed`, `status`, `favorite`, `lastActivity`, `path` and `cover` value.

## Add a tool

1. Add a UI card in the relevant page module.
2. Create a mock service in `js/services/`.
3. Keep progress, success/failure and logging inside the service boundary.
4. Update state through `updateState()`.
5. Keep the page responsible for UI, not OS/file operations.

## Add a page

1. Create `js/pages/example.js`.
2. Export `renderExample()` returning `{ element }`.
3. Register it in `js/app.js`.
4. Add the navigation item to `sidebarItems`.

## Mock behavior

The prototype deliberately does not access Steam, the Windows file system or running processes. Injection and bypass pages only simulate workflows and explicitly record that no real security or game files were changed.

## Local data

The key `sgt-prototype-v1` is used in LocalStorage. Settings can export/import JSON. `Reset Demo Data` restores the seeded games, logs, backups, tools and settings.

## QA checklist

- [ ] Sidebar navigation works
- [ ] Sidebar collapse state persists
- [ ] Dashboard statistics render
- [ ] Recent activity renders
- [ ] Game search works
- [ ] Game filters work
- [ ] Game sorting works
- [ ] Favorites persist
- [ ] Game details modal opens
- [ ] Confirmation modal works
- [ ] Escape closes modals/search
- [ ] Backup create/restore/delete simulations work
- [ ] Injection simulation works
- [ ] Bypass simulation works
- [ ] Fix simulations work
- [ ] Steam restart simulation works
- [ ] Toast notifications work
- [ ] Activity logs and filters work
- [ ] Clear logs confirmation works
- [ ] Settings persist
- [ ] Export/import works
- [ ] Reset demo data works
- [ ] Ctrl+K global search works
- [ ] Ctrl+1..6 and Ctrl+, navigation works
- [ ] Responsive layouts work at common desktop sizes
- [ ] No intentional browser alert() calls are used
- [ ] Mock services remain isolated from UI modules

## Native Windows next stage

For the Windows application, keep the same UI/service contract and replace only the service implementations. A reasonable architecture is:

`UI -> application state -> service interface -> audited native adapter -> Windows API / Steam integration`

The native stage should add explicit permission boundaries, path validation, process lifecycle handling, cancellation, structured error codes, logging, and tests around every OS-facing operation. Do not port browser mock behavior into privileged native operations blindly.
