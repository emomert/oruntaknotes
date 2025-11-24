---
title: Space Defender FPS Game
description: A simple, competitive FPS game I designed with Three.js.
thumbnailUrl: /uploads/space-defender1.png
projectUrl: https://space-invaders-fps.netlify.app/
publishedAt: 2025-11-22
---
## Overview
Space Defender is a browser-based, wave-survival FPS built entirely with vanilla web tech and Three.js. You fight neon-lit drones on a circular platform suspended in space, balancing ammo, stamina, and positioning to climb the local leaderboard. Everything runs client-side—no installs or plugins—and feels cinematic thanks to foggy lighting, a rotating starfield, and a fully procedural weapon model.
## Tech Stack
- **Rendering**: Three.js r128 for the 3D scene, custom meshes, emissive materials, soft shadows, and a 3K-particle starfield.
- **Audio**: Web Audio API generates a dark ambient loop (filters, LFOs, sequenced arps) plus layered plasma shot SFX.
- **UI/UX**: Vanilla HTML/CSS overlays for HUD, pause/game-over screens, vignette danger cue, reload and stamina feedback.
- **Data**: Local persistence of high scores via `localStorage`; optional cloud save with a Netlify Function POST to `/.netlify/functions/save-score`.
- **Input**: Pointer Lock API for FPS look; keyboard/mouse for movement and shooting.
## Gameplay Loop
Start from `index.html` to see the briefing and leaderboard, then jump into `game.html`. Click to lock the cursor, move with WASD, sprint with Shift, and fire with the left mouse button. Each enemy kill awards 100 base points plus a distance bonus. Every eight kills advances the wave, tightening spawn intervals and boosting enemy speed. If you fall, you can save your run locally (and to Netlify if available) and immediately restart.
## Systems and Mechanics
- **Player**: Stamina-gated sprinting with regen, gravity and jump handling, and a boundary clamp to keep you on the arena. Shield pickups grant a single-hit buffer before game over.
- **Weapon**: A procedural sci-fi rifle attached to the camera, with 15-round mags, reload timing, and a quick muzzle-flash overlay; ammo state is mirrored in the HUD.
- **Enemies**: Pooled spheres in three behaviors—standard, fast rushers, and bobbing floaters—capped to maintain performance. They home in, face the player, and scale aggressiveness per wave.
- **Power-Ups**: Shield orbs spawn roughly every 15 seconds, hover and rotate with emissive glow, and expire after ~10 seconds if ignored.
- **UI/HUD**: Crosshair, ammo/readiness, stamina bar, shield badge, wave/score readouts, danger bar keyed to nearest enemy distance, plus pause and game-over overlays with save flow.
![In Game Screenshot](/uploads/space-defender2.png)
## Visual and Audio Style
A dark, fogged scene with twin point lights and a directional sun sets the tone, while the starfield subtly drifts to keep the arena alive. The weapon mixes metallic and glassy materials with cyan emissives. Audio sits in the background as a pulsing sci-fi drone with occasional arpeggiated tension, keeping the focus on moment-to-moment survival.
## Running the Project
Open `index.html` in a modern desktop browser (Chrome, Edge, Brave, Firefox) or serve the folder locally (`npx serve` or `python -m http.server`) for smooth pointer lock. Click “Start Game,” accept the pointer lock prompt, and play. Scores save locally by default; cloud save works when the Netlify endpoint is available.