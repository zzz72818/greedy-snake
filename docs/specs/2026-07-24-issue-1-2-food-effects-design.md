# Issues #1 and #2: Food Effects and Eating Sound

## Goal

Replace fruit with meat foods that have distinct score and growth rewards, and
play feedback audio whenever the snake eats, in both the React game and the
standalone offline HTML game.

## Approved behaviour

- Chicken leg: 10 points and 1 segment of growth.
- Steak: 20 points and 2 segments of growth.
- Each newly spawned food randomly selects one of these food kinds.
- No food changes the game speed.
- Eating either food plays a short sound effect.
- The standalone game remains a single file with no network dependency.

## Architecture

The game engine owns food rules. A food value contains its board position,
kind, score reward, and growth reward. Growth is represented by a pending-growth
counter so rewards larger than one segment are applied predictably across
subsequent moves without duplicating a segment in the same cell.

The React component renders the current food kind and observes score changes to
trigger a Web Audio sound. The sound is synthesized at runtime, avoiding a
binary asset and preserving offline support. The standalone HTML mirrors the
same food definitions, growth rule, rendering, and synthesized sound.

## Testing

- Engine tests prove chicken and steak scoring and growth behaviour.
- Rendered HTML tests prove both food kinds and the sound hook are included.
- Standalone tests prove both food definitions, growth rewards, and Web Audio
  support while retaining the existing no-network guarantee.
- The full lint, test, and standalone test commands must pass before commit.
