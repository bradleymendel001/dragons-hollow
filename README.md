# Dragon's Hollow

A "perfect sized" RPG built with React Native and Expo. Pick a hero, name them, and battle a goblin using attacks, an inventory, and a bit of luck.

## Tech Stack

- **[Expo](https://expo.dev/)** (SDK 57)
- **React 19** / **React Native 0.86**
- **[React Navigation](https://reactnavigation.org/)** 

## How to Run the Game

1. **Install dependencies** 
   ```bash
   npm install
   ```
2. **Start the Expo dev server**:
   ```bash
   npm start
   ```
   This runs `expo start` and opens Expo's developer tools in your terminal (and a QR code).
3. **Open the app** on a device or simulator:
   - Press `i` to launch in the iOS Simulator
   - Press `a` to launch in an Android emulator
   - Press `w` to open in a web browser
   - Or scan the QR code with the **Expo Go** app on your phone

   You can also skip straight to a platform with:
   ```bash
   npm run ios      # expo start --ios
   npm run android  # expo start --android
   npm run web      # expo start --web
   ```

## How to Play

1. **Home Screen** — Tap **Start Game** to begin.
2. **Choose Your Hero** — Pick one of three characters, each with different stats:

   | Hero   | HP | Attack | Style                    |
   |--------|----|--------|---------------------------|
   | Knight | 40 | 6      | Tough and reliable        |
   | Wizard | 25 | 10     | Fragile but hits hard     |
   | Archer | 30 | 8      | Balanced and quick        |

3. **Name Your Hero** — Type a custom name (up to 16 characters) or leave it blank to use the default name, then tap **Begin Adventure**.
4. **Assign Bonus Stats** — Spend 5 bonus points between **HP** (+2 per point) and **Attack** (+1 per point) using the - / + buttons, then tap **Confirm & Start Battle**.
5. **Battle** — You face a **Goblin** (35 HP, attack 5) in combat:
   - Tap **Attack** to deal random damage to the goblin (random damage amount is also based on your characters ability).
   - Tap **Inventory** to open your item bag. You start with 2 **Health Potions** (heal 15 HP each) and a **Rusty Key** (unused item for now). Tap **Use** on the potion to heal — this also uses up your turn.
   - After your turn, the goblin automatically attacks back for random damage.
   - The battle log shows the last few turns of combat above the health bars.
   - Health bars show current/max HP for both you and the goblin.
6. **Victory or Defeat** — The battle ends when either HP bar hits 0:
   - **Victory!** if the goblin's HP reaches 0 first.
   - **Defeat...** if your HP reaches 0 first.
   - From here, tap **Play Again** to restart the battle with max HP and restocked inventory, or **Return Home** to go back to the title screen.

## Project Structure

### Root files

- **[App.js](App.js)** — The app's entry point. Sets up React Navigation's stack navigator and registers the five screens (`Home`, `CharacterSelect`, `NameEntry`, `StatAllocation`, `Game`) in the order the player moves through them.
- **[package.json](package.json)** — Project dependencies, and the `npm start`/`android`/`ios`/`web` scripts.

### `screens/` — Full-page views wired into the navigator

- **[screens/HomeScreen.js](screens/HomeScreen.js)** — The title screen. Shows the game title/subtitle and a **Start Game** button that navigates to character select.
- **[screens/CharacterSelectScreen.js](screens/CharacterSelectScreen.js)** — Lists all playable heroes (from `data/characters.js`) as `CharacterCard`s in a scroll view. Tapping one navigates to the name-entry screen with the chosen character passed along.
- **[screens/NameEntryScreen.js](screens/NameEntryScreen.js)** — Lets the player type a custom hero name via a text input. Confirms with an `ActionButton` and navigates to the stat allocation screen, passing both the character and the chosen (or default) name.
- **[screens/StatAllocationScreen.js](screens/StatAllocationScreen.js)** — Lets the player spend a small pool of bonus points on HP and Attack before battle. Uses `useReducer` (via `statAllocationReducer`/`initialStatAllocationState`) to track points spent on each stat, and `getAllocatedStats` to turn that into final HP/Attack numbers. A `StatRow` sub-component renders each stat's label, value, and - / + `ActionButton`s (disabled when there are no points left to spend or refund). Confirming builds a new character object with the boosted stats and navigates to the game screen.
- **[screens/GameScreen.js](screens/GameScreen.js)** — The core battle screen. It:
  - Initializes battle state with `useReducer` (via `battleReducer`/`initialBattleState`), pitting the chosen character against the `GOBLIN` from `data/enemy.js`.
  - Tracks a local `screen` state (`'battle'`, `'inventory'`, `'victory'`, `'defeat'`) to switch between sub-views.
  - Uses `useEffect` to detect when either combatant's HP hits 0 and switch to the victory/defeat view.
  - Uses another `useEffect` to automatically trigger the enemy's turn (a short delay, then a random-damage attack) whenever it becomes the enemy's turn.
  - Defines three internal sub-components in the same file: `BattleView` (portraits, log, health bars, Attack/Inventory buttons), `InventoryView` (item list with Use buttons), and `ResultView` (Victory/Defeat message with Play Again/Return Home buttons).

### `components/` — Small reusable UI pieces shared across screens

- **[components/ActionButton.js](components/ActionButton.js)** — A styled, colorable, `Pressable` button used everywhere in the game (Attack, Inventory, Use, Play Again, etc.).
- **[components/CharacterCard.js](components/CharacterCard.js)** — Renders a hero's portrait, name, attack stat, and description on the character-select screen.
- **[components/StatBar.js](components/StatBar.js)** — A labeled HP bar that fills proportionally to `value / max`. Used for both the player's and the goblin's health during battle.

### `data/` — Static game data

- **[data/characters.js](data/characters.js)** — Defines the three playable heroes (Knight, Wizard, Archer) with their id, name, portrait image, HP, attack, and description.
- **[data/enemy.js](data/enemy.js)** — Defines the `GOBLIN` enemy (name, portrait, HP, attack).

### `reducers/` — Battle state logic

- **[reducers/battleReducer.js](reducers/battleReducer.js)** — All the rules of combat live here, kept separate from the UI:
  - `initialBattleState(player, enemy)` builds a fresh battle state: both combatants' HP, whose turn it is, a starting log message, and the starting inventory (2 Health Potions, 1 Rusty Key(not yet used but will use soon.)).
  - `battleReducer(state, action)` handles four action types:
    - `PLAYER_ATTACK` — subtracts damage from the enemy's HP, logs it, passes the turn to the enemy.
    - `ENEMY_ATTACK` — subtracts damage from the player's HP, logs it, passes the turn to the player.
    - `USE_ITEM` — heals the player (capped at max HP) if the item exists, has `heal` and quantity remaining, decrements that item's quantity, logs it, passes the turn to the enemy.
    - `RESET` — rebuilds a fresh battle state for a new round (used by "Play Again").
- **[reducers/statAllocationReducer.js](reducers/statAllocationReducer.js)** — The rules for spending bonus stat points, kept separate from `StatAllocationScreen`'s UI:
  - `initialStatAllocationState(character)` builds the starting allocation state: the character's base HP/Attack, zero points spent on each, and the full pool of `TOTAL_POINTS` (5) remaining.
  - `statAllocationReducer(state, action)` handles four action types:
    - `ADD_HP` / `REMOVE_HP` — spends or refunds one point on HP (worth `HP_PER_POINT`, 2, each), ignored if there are no points left to spend or none spent yet to refund.
    - `ADD_ATTACK` / `REMOVE_ATTACK` — same idea for Attack (worth `ATTACK_PER_POINT`, 1, each).
    - `RESET` — rebuilds a fresh allocation state (available if this screen is ever revisited, e.g. after backing out to choose a different hero).
  - `getAllocatedStats(state)` derives the final HP/Attack from the base stats plus points spent, so the screen always has a single source of truth instead of storing the totals separately.

### `assets/` — Images ("borrowed" imagaes from a quick google search with a screenshot, will perhaps create my own in the future.)

- **assets/characters/** — Portrait images for `knight.png`, `wizard.png`, `archer.png`.
- **assets/enemies/** — Portrait image for `goblin.png`.

