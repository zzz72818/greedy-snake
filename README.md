# Greedy Snake

A maintainable, responsive Snake game built with Next.js, TypeScript, and
vanilla game logic. It supports keyboard, WASD, and touch controls, and includes
a standalone HTML edition that works completely offline.

## Play

- **Online:** [Play Greedy Snake](https://greedy-snake-arcade.poan-tao.chatgpt.site)
- **Offline:** Download `GreedySnake.html` and open it in any modern browser.
  No installation or internet connection is required.

## Features

- Classic Snake movement and collision rules
- Food items with configurable score and growth effects
- Keyboard, WASD, and mobile touch controls
- Pause, restart, current score, and locally saved high score
- Responsive desktop and mobile layout
- Fully self-contained offline HTML edition
- Game rules separated from the user interface for easier maintenance

## Controls

| Action | Keyboard |
| --- | --- |
| Move | Arrow keys or `W` `A` `S` `D` |
| Pause / Resume | `Space` |
| Start / Restart | On-screen button |

Touch direction buttons are available on smaller screens.

## Project Structure

```text
app/
├─ components/       # Interactive UI components
├─ game/             # Game rules, configuration, and types
├─ globals.css       # Global visual styles
├─ layout.tsx        # Metadata and shared layout
└─ page.tsx          # Home page composition
public/
└─ assets/
   ├─ sprites/       # Characters, food, and item images
   ├─ audio/         # Sound effects and music
   ├─ backgrounds/   # Page and board backgrounds
   └─ icons/         # Interface icons
GreedySnake.html     # Standalone offline edition
```

## Local Development

Requirements:

- Node.js 22 or newer
- pnpm

Install dependencies and start the development server:

```bash
pnpm install
pnpm dev
```

Open the local URL displayed in the terminal.

## Build and Test

```bash
pnpm build
node --test tests/*.mjs
```

## Common Customizations

- Board size, speed, and scoring: `app/game/config.ts`
- Movement, collision, and food generation: `app/game/engine.ts`
- Game interface and interactions: `app/components/SnakeGame.tsx`
- Colors and layout: `app/globals.css`
- Offline edition: `GreedySnake.html`

When adding levels, obstacles, or new food types, define the data structure in
`app/game/types.ts`, implement the rules in `app/game/engine.ts`, and keep the
UI component focused on rendering and input.

## Asset Guidelines

Place new files in the matching folder under `public/assets`. Use lowercase,
hyphen-separated filenames such as `golden-apple.png` or `eat-food.mp3`.
