/**
 * QuadFuse — Cyber Synth Arcade 2048 Engine
 * Single-Page Web Application
 * Compliant with PRD-QuadFuse-Game2048.md & Cyber Synth Arcade Design System
 */

(function () {
  'use strict';

  /* ==========================================================================
     1. Web Audio API Synthesizer (Retro-Futuristic Cyber Synth Soundscape)
     ========================================================================== */
  class CyberSynthAudio {
    constructor() {
      this.ctx = null;
      this.enabled = localStorage.getItem('quadfuse_sound_enabled') !== 'false';
    }

    init() {
      if (!this.ctx) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) {
          this.ctx = new AudioCtx();
        }
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
    }

    toggle() {
      this.enabled = !this.enabled;
      localStorage.setItem('quadfuse_sound_enabled', this.enabled ? 'true' : 'false');
      return this.enabled;
    }

    playMove() {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;
      try {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        const now = this.ctx.currentTime;
        osc.frequency.setValueAtTime(220, now);
        osc.frequency.exponentialRampToValueAtTime(120, now + 0.07);
        gain.gain.setValueAtTime(0.06, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.07);
      } catch (e) {}
    }

    playMerge(val) {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;
      try {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        const now = this.ctx.currentTime;
        const level = Math.min(Math.log2(val || 4), 12);
        const baseFreq = 260 + level * 45;
        osc.frequency.setValueAtTime(baseFreq, now);
        osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.35, now + 0.12);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.14);
      } catch (e) {}
    }

    playVictory() {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;
      try {
        const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6 synth arpeggio
        notes.forEach((freq, idx) => {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'triangle';
          const start = this.ctx.currentTime + idx * 0.1;
          osc.frequency.setValueAtTime(freq, start);
          gain.gain.setValueAtTime(0.15, start);
          gain.gain.exponentialRampToValueAtTime(0.001, start + 0.35);
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(start);
          osc.stop(start + 0.35);
        });
      } catch (e) {}
    }

    playGameOver() {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;
      try {
        const notes = [330, 293.66, 261.63, 220]; // E4, D4, C4, A3
        notes.forEach((freq, idx) => {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sawtooth';
          const start = this.ctx.currentTime + idx * 0.12;
          osc.frequency.setValueAtTime(freq, start);
          gain.gain.setValueAtTime(0.08, start);
          gain.gain.exponentialRampToValueAtTime(0.001, start + 0.28);
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(start);
          osc.stop(start + 0.28);
        });
      } catch (e) {}
    }

    playClick() {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;
      try {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        const now = this.ctx.currentTime;
        osc.frequency.setValueAtTime(800, now);
        gain.gain.setValueAtTime(0.05, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.04);
      } catch (e) {}
    }
  }

  /* ==========================================================================
     2. Tile Style Definitions (Cyber Synth Palette from DESIGN.md)
     ========================================================================== */
  function getTileVisuals(value) {
    let bgClasses = '';
    let textClasses = 'text-white';
    let borderClasses = '';
    let shadowClasses = '';
    let fontClasses = 'text-2xl sm:text-3xl font-extrabold';
    let extraGlow = '';

    if (value >= 10000) {
      fontClasses = 'text-xs sm:text-sm font-black tracking-tight';
    } else if (value >= 1000) {
      fontClasses = 'text-base sm:text-lg font-black tracking-tight';
    } else if (value >= 100) {
      fontClasses = 'text-lg sm:text-xl font-black tracking-tight';
    }

    switch (value) {
      case 2:
        bgClasses = 'bg-gradient-to-br from-[#1e293b] to-[#0f172a]';
        textClasses = 'text-cyan-200';
        borderClasses = 'border border-cyan-500/30';
        shadowClasses = 'shadow-[0_0_12px_rgba(6,182,212,0.18),inset_0_1px_1px_rgba(255,255,255,0.15)]';
        fontClasses = 'text-2xl sm:text-3xl font-bold';
        break;
      case 4:
        bgClasses = 'bg-gradient-to-br from-[#0e7490] to-[#083344]';
        textClasses = 'text-white';
        borderClasses = 'border border-cyan-400/50';
        shadowClasses = 'shadow-[0_0_16px_rgba(6,182,212,0.35),inset_0_1px_1px_rgba(255,255,255,0.2)]';
        break;
      case 8:
        bgClasses = 'bg-gradient-to-br from-[#2563eb] to-[#1e3a8a]';
        borderClasses = 'border border-blue-400/50';
        shadowClasses = 'shadow-[0_0_18px_rgba(37,99,235,0.4),inset_0_1px_1px_rgba(255,255,255,0.25)]';
        break;
      case 16:
        bgClasses = 'bg-gradient-to-br from-[#7c3aed] to-[#4c1d95]';
        borderClasses = 'border border-purple-400/50';
        shadowClasses = 'shadow-[0_0_20px_rgba(124,58,237,0.45),inset_0_1px_1px_rgba(255,255,255,0.25)]';
        break;
      case 32:
        bgClasses = 'bg-gradient-to-br from-[#d946ef] to-[#86198f]';
        borderClasses = 'border border-fuchsia-300/60';
        shadowClasses = 'shadow-[0_0_22px_rgba(217,70,239,0.5),inset_0_1px_1px_rgba(255,255,255,0.3)]';
        break;
      case 64:
        bgClasses = 'bg-gradient-to-br from-[#f43f5e] to-[#9f1239]';
        borderClasses = 'border border-rose-300/60';
        shadowClasses = 'shadow-[0_0_22px_rgba(244,63,94,0.5),inset_0_1px_1px_rgba(255,255,255,0.3)]';
        break;
      case 128:
        bgClasses = 'bg-gradient-to-br from-[#f59e0b] to-[#b45309]';
        borderClasses = 'border border-amber-300/60';
        shadowClasses = 'shadow-[0_0_24px_rgba(245,158,11,0.55),inset_0_1px_1px_rgba(255,255,255,0.3)]';
        break;
      case 256:
        bgClasses = 'bg-gradient-to-br from-[#10b981] to-[#065f46]';
        borderClasses = 'border border-emerald-300/60';
        shadowClasses = 'shadow-[0_0_24px_rgba(16,185,129,0.55),inset_0_1px_1px_rgba(255,255,255,0.3)]';
        break;
      case 512:
        bgClasses = 'bg-gradient-to-br from-[#eab308] to-[#854d0e]';
        textClasses = 'text-[#0a0e18]';
        borderClasses = 'border-2 border-yellow-200';
        shadowClasses = 'shadow-[0_0_28px_rgba(234,179,8,0.65),inset_0_1px_2px_rgba(255,255,255,0.4)]';
        break;
      case 1024:
        bgClasses = 'bg-gradient-to-br from-[#a855f7] to-[#581c87]';
        borderClasses = 'border border-purple-300/80';
        shadowClasses = 'shadow-[0_0_30px_rgba(168,85,247,0.7),inset_0_1px_2px_rgba(255,255,255,0.4)]';
        break;
      case 2048:
        bgClasses = 'bg-gradient-to-br from-[#00f5ff] via-[#d0bcff] to-[#f59e0b]';
        textClasses = 'text-[#0a0e18]';
        borderClasses = 'border-2 border-white';
        extraGlow = 'tile-glow-2048';
        break;
      default:
        // 4096 and higher
        bgClasses = 'bg-gradient-to-br from-[#facc15] via-[#ec4899] to-[#8b5cf6]';
        textClasses = 'text-white';
        borderClasses = 'border-2 border-cyan-300';
        extraGlow = 'tile-glow-beyond';
        break;
    }

    return {
      classes: `${bgClasses} ${textClasses} ${borderClasses} ${shadowClasses} ${fontClasses} ${extraGlow}`.trim()
    };
  }

  /* ==========================================================================
     3. Game State & Logic Engine
     ========================================================================== */
  const GRID_SIZE = 4;
  const STORAGE_BEST_KEY = 'quadfuse_best_score';
  const STORAGE_TUTORIAL_KEY = 'quadfuse_tutorial_seen';
  const STORAGE_LEADERBOARD_KEY = 'quadfuse_local_leaderboard';

  const defaultLeaderboard = [
    { name: 'Pilar Taktis', date: 'Kemarin • 21:14 WIB', bestTile: 1024, moves: 610, time: '11m 45s', score: 16380 },
    { name: 'Penjaga Sudut', date: '3 hari lalu', bestTile: 1024, moves: 580, time: '09m 10s', score: 14920 },
    { name: 'Langkah Cepat', date: '12 Okt 2025', bestTile: 512, moves: 422, time: '07m 02s', score: 9410 },
    { name: 'Pemanasan Awal', date: '10 Okt 2025', bestTile: 512, moves: 390, time: '06m 30s', score: 8120 }
  ];

  let nextTileId = 1;
  let tiles = []; // active tile objects { id, value, r, c, element, isNew, isMerged, mergedInto }
  let score = 0;
  let bestScore = 0;
  let movesCount = 0;
  let gameWon = false;
  let wonDismissed = false;
  let gameOver = false;
  let isMoving = false;
  let undoStack = []; // history of { tilesData, score, movesCount, gameWon, wonDismissed, gameOver }

  // Timer
  let timerInterval = null;
  let elapsedSeconds = 0;
  let timerRunning = false;

  const audio = new CyberSynthAudio();

  // DOM Elements
  const tileLayerEl = document.getElementById('tile-layer');
  const currentScoreEl = document.getElementById('current-score');
  const bestScoreEl = document.getElementById('best-score');
  const scoreFloaterEl = document.getElementById('score-floater');
  const movesCountEl = document.getElementById('moves-count');
  const timeElapsedEl = document.getElementById('time-elapsed');

  const btnNewGame = document.getElementById('btn-new-game');
  const btnUndo = document.getElementById('btn-undo');
  const btnSound = document.getElementById('btn-sound');
  const soundIcon = document.getElementById('sound-icon');
  const btnTutorial = document.getElementById('btn-tutorial');

  const dirButtons = document.querySelectorAll('.dir-btn');

  // Modals
  const tutorialModal = document.getElementById('tutorial-modal');
  const btnCloseTutorial = document.getElementById('btn-close-tutorial');
  const btnGotIt = document.getElementById('btn-got-it');
  const navTutorial = document.getElementById('nav-tutorial');

  const victoryModal = document.getElementById('victory-modal');
  const btnKeepGoing = document.getElementById('btn-keep-going');
  const btnVictoryNewGame = document.getElementById('btn-victory-new-game');
  const btnShareScore = document.getElementById('btn-share-score');
  const shareToast = document.getElementById('share-toast');

  const leaderboardModal = document.getElementById('leaderboard-modal');
  const btnCloseLeaderboard = document.getElementById('btn-close-leaderboard');
  const navLeaderboard = document.getElementById('nav-leaderboard');
  const btnResetLeaderboard = document.getElementById('reset-leaderboard-btn');
  const navArena = document.getElementById('nav-arena');

  const gameOverOverlay = document.getElementById('game-over-overlay');
  const overlayRestartBtn = document.getElementById('overlay-restart-btn');
  const overlayLeaderboardBtn = document.getElementById('overlay-leaderboard-btn');

  /* ==========================================================================
     4. Timer Management
     ========================================================================== */
  function formatTime(totalSeconds) {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    const padM = String(mins).padStart(2, '0');
    const padS = String(secs).padStart(2, '0');
    return `${padM}m ${padS}s`;
  }

  function startTimer() {
    if (timerRunning) return;
    timerRunning = true;
    timerInterval = setInterval(() => {
      elapsedSeconds++;
      if (timeElapsedEl) {
        timeElapsedEl.textContent = formatTime(elapsedSeconds);
      }
    }, 1000);
  }

  function pauseTimer() {
    timerRunning = false;
    if (timerInterval) {
      clearInterval(timerInterval);
      timerInterval = null;
    }
  }

  function resetTimer() {
    pauseTimer();
    elapsedSeconds = 0;
    if (timeElapsedEl) {
      timeElapsedEl.textContent = '00m 00s';
    }
  }

  /* ==========================================================================
     5. Board Initialization & Tile Management
     ========================================================================== */
  function loadBestScore() {
    try {
      const stored = localStorage.getItem(STORAGE_BEST_KEY);
      bestScore = stored ? parseInt(stored, 10) || 0 : 0;
    } catch (e) {
      bestScore = 0;
    }
    if (bestScoreEl) {
      bestScoreEl.textContent = bestScore.toLocaleString('id-ID');
    }
  }

  function saveBestScore() {
    if (score > bestScore) {
      bestScore = score;
      try {
        localStorage.setItem(STORAGE_BEST_KEY, String(bestScore));
      } catch (e) {}
      if (bestScoreEl) {
        bestScoreEl.textContent = bestScore.toLocaleString('id-ID');
      }
    }
  }

  function createTile(r, c, value, isNew = false, isMerged = false) {
    return {
      id: nextTileId++,
      value,
      r,
      c,
      isNew,
      isMerged,
      mergedInto: null,
      element: null
    };
  }

  function getTileAt(r, c) {
    return tiles.find(t => t.r === r && t.c === c && !t.mergedInto);
  }

  function getEmptyPositions() {
    const empty = [];
    for (let r = 0; r < GRID_SIZE; r++) {
      for (let c = 0; c < GRID_SIZE; c++) {
        if (!getTileAt(r, c)) {
          empty.push({ r, c });
        }
      }
    }
    return empty;
  }

  function spawnRandomTile() {
    const emptyPositions = getEmptyPositions();
    if (emptyPositions.length === 0) return null;
    const pos = emptyPositions[Math.floor(Math.random() * emptyPositions.length)];
    // 90% chance of 2, 10% chance of 4
    const value = Math.random() < 0.9 ? 2 : 4;
    const tile = createTile(pos.r, pos.c, value, true, false);
    tiles.push(tile);
    return tile;
  }

  function getHighestTile() {
    return tiles.reduce((max, t) => (t.value > max ? t.value : max), 2);
  }

  /* ==========================================================================
     6. DOM Rendering Matrix
     ========================================================================== */
  function updateTileElement(tile) {
    if (!tile.element) {
      const el = document.createElement('div');
      el.className = `tile-item pos-r-${tile.r} pos-c-${tile.c}`;
      if (tile.isNew) el.classList.add('tile-spawn');
      if (tile.isMerged) el.classList.add('tile-merged');

      const inner = document.createElement('div');
      inner.className = 'tile-inner';
      const visuals = getTileVisuals(tile.value);
      visuals.classes.split(' ').forEach(cls => {
        if (cls) inner.classList.add(cls);
      });
      inner.innerHTML = `<span>${tile.value}</span>`;

      el.appendChild(inner);
      tileLayerEl.appendChild(el);
      tile.element = el;
    } else {
      // Update coordinates
      tile.element.className = `tile-item pos-r-${tile.r} pos-c-${tile.c}`;
      if (tile.isMerged) {
        tile.element.classList.add('tile-merged');
        const inner = tile.element.querySelector('.tile-inner');
        if (inner) {
          inner.className = 'tile-inner';
          const visuals = getTileVisuals(tile.value);
          visuals.classes.split(' ').forEach(cls => {
            if (cls) inner.classList.add(cls);
          });
          inner.innerHTML = `<span>${tile.value}</span>`;
        }
      }
    }
  }

  function renderTiles() {
    // Synchronize tiles with DOM
    tiles.forEach(tile => {
      updateTileElement(tile);
    });
  }

  function purgeMergedTiles() {
    tiles = tiles.filter(tile => {
      if (tile.mergedInto) {
        if (tile.element && tile.element.parentNode) {
          tile.element.parentNode.removeChild(tile.element);
        }
        return false;
      }
      tile.isNew = false;
      tile.isMerged = false;
      return true;
    });
  }

  function showScoreFloater(points) {
    if (!scoreFloaterEl || points <= 0) return;
    scoreFloaterEl.textContent = `+${points}`;
    scoreFloaterEl.classList.remove('animate-floater', 'opacity-0');
    // Force reflow
    void scoreFloaterEl.offsetWidth;
    scoreFloaterEl.classList.add('animate-floater');
  }

  function updateHUD() {
    if (currentScoreEl) {
      currentScoreEl.textContent = score.toLocaleString('id-ID');
    }
    saveBestScore();
    if (movesCountEl) {
      movesCountEl.textContent = movesCount.toLocaleString('id-ID');
    }
    if (btnUndo) {
      btnUndo.disabled = undoStack.length === 0;
      if (undoStack.length === 0) {
        btnUndo.classList.add('opacity-40', 'cursor-not-allowed');
      } else {
        btnUndo.classList.remove('opacity-40', 'cursor-not-allowed');
      }
    }
  }

  /* ==========================================================================
     7. Movement & Merge Engine (Strict 2048 Rules)
     ========================================================================== */
  function saveUndoState(state) {
    if (!state) return;
    undoStack.push(state);
    if (undoStack.length > 20) {
      undoStack.shift();
    }
    updateHUD();
  }

  function performUndo() {
    if (undoStack.length === 0 || isMoving) return;

    const previousState = undoStack.pop();
    if (!previousState) return;

    audio.playClick();

    // Clear current DOM tiles
    tileLayerEl.innerHTML = '';
    tiles = [];

    // Restore state
    score = previousState.score;
    movesCount = previousState.movesCount;
    gameWon = previousState.gameWon;
    wonDismissed = previousState.wonDismissed;
    gameOver = previousState.gameOver;
    elapsedSeconds = previousState.elapsedSeconds;

    // Recreate tiles
    previousState.tiles.forEach(tData => {
      const tile = createTile(tData.r, tData.c, tData.value, false, false);
      tile.id = tData.id;
      tiles.push(tile);
    });

    renderTiles();
    updateHUD();

    if (gameOverOverlay) {
      gameOverOverlay.classList.remove('visible-modal');
      gameOverOverlay.classList.add('hidden-modal');
    }

    if (timeElapsedEl) {
      timeElapsedEl.textContent = formatTime(elapsedSeconds);
    }
  }

  function move(direction) {
    if (isMoving || gameOver) return;

    // Vector directions
    const vectors = {
      UP: { dr: -1, dc: 0 },
      DOWN: { dr: 1, dc: 0 },
      LEFT: { dr: 0, dc: -1 },
      RIGHT: { dr: 0, dc: 1 }
    };

    const vector = vectors[direction];
    if (!vector) return;

    // Clean previous turn state
    purgeMergedTiles();

    // Snapshot pre-move state for Undo history
    const preMoveState = {
      tiles: tiles.filter(t => !t.mergedInto).map(t => ({
        id: t.id,
        value: t.value,
        r: t.r,
        c: t.c
      })),
      score,
      movesCount,
      gameWon,
      wonDismissed,
      gameOver,
      elapsedSeconds
    };

    // Prepare traversal order
    const rTraversal = [];
    const cTraversal = [];
    for (let i = 0; i < GRID_SIZE; i++) {
      rTraversal.push(i);
      cTraversal.push(i);
    }
    if (vector.dr === 1) rTraversal.reverse();
    if (vector.dc === 1) cTraversal.reverse();

    let moved = false;
    let turnScoreIncrease = 0;
    let mergedOccurred = false;
    const newMergedTiles = [];

    // 4x4 matrix representation of occupied tiles for collision checks
    const gridMatrix = Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(null));
    tiles.forEach(t => {
      gridMatrix[t.r][t.c] = t;
    });

    // Tracking tiles merged in this turn
    const mergedGrid = Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(false));

    rTraversal.forEach(r => {
      cTraversal.forEach(c => {
        const tile = gridMatrix[r][c];
        if (!tile) return;

        let nextR = r + vector.dr;
        let nextC = c + vector.dc;
        let farthestR = r;
        let farthestC = c;

        // Trace line until boundary or another tile
        while (nextR >= 0 && nextR < GRID_SIZE && nextC >= 0 && nextC < GRID_SIZE) {
          const nextTile = gridMatrix[nextR][nextC];
          if (!nextTile) {
            farthestR = nextR;
            farthestC = nextC;
            nextR += vector.dr;
            nextC += vector.dc;
          } else {
            // Collision with another tile! Check if merge is possible
            if (nextTile.value === tile.value && !mergedGrid[nextR][nextC]) {
              // Merge occurs!
              mergedGrid[nextR][nextC] = true;

              // Create merged tile
              const mergedVal = tile.value * 2;
              const mergedTile = createTile(nextR, nextC, mergedVal, false, true);

              // Mark original tiles as merging into the new tile
              tile.mergedInto = mergedTile;
              tile.r = nextR;
              tile.c = nextC;

              nextTile.mergedInto = mergedTile;
              // nextTile remains at nextR, nextC

              // Update grid matrix
              gridMatrix[r][c] = null;
              gridMatrix[nextR][nextC] = mergedTile;

              newMergedTiles.push(mergedTile);
              turnScoreIncrease += mergedVal;
              mergedOccurred = true;
              moved = true;
            }
            break;
          }
        }

        // If no merge occurred, check if tile can slide to farthest empty spot
        if (!tile.mergedInto && (farthestR !== r || farthestC !== c)) {
          gridMatrix[r][c] = null;
          gridMatrix[farthestR][farthestC] = tile;
          tile.r = farthestR;
          tile.c = farthestC;
          moved = true;
        }
      });
    });

    if (moved) {
      isMoving = true;
      saveUndoState(preMoveState);

      // Start timer on first move
      if (!timerRunning) {
        startTimer();
      }

      // Update positions for sliding animation
      tiles.forEach(tile => {
        if (tile.element) {
          tile.element.className = `tile-item pos-r-${tile.r} pos-c-${tile.c}`;
        }
      });

      // Sound feedback
      if (mergedOccurred) {
        audio.playMerge(newMergedTiles[0] ? newMergedTiles[0].value : 4);
      } else {
        audio.playMove();
      }

      // Add merged tiles to tiles array
      newMergedTiles.forEach(mt => {
        tiles.push(mt);
      });

      movesCount++;

      if (turnScoreIncrease > 0) {
        score += turnScoreIncrease;
        showScoreFloater(turnScoreIncrease);
      }

      updateHUD();

      // Wait for slide animation (125ms) before purging merged tiles & spawning new one
      setTimeout(() => {
        purgeMergedTiles();
        const newTile = spawnRandomTile();
        if (newTile) {
          updateTileElement(newTile);
        }

        renderTiles();
        isMoving = false;

        // Check Win Condition (tile >= 2048)
        if (!gameWon && !wonDismissed) {
          const reached2048 = tiles.some(t => t.value >= 2048);
          if (reached2048) {
            handleVictory();
            return;
          }
        }

        // Check Game Over Condition
        if (isGameOver()) {
          handleGameOver();
        }
      }, 125);
    }
  }

  function isGameOver() {
    if (getEmptyPositions().length > 0) return false;

    // Check if any adjacent tiles have matching values
    for (let r = 0; r < GRID_SIZE; r++) {
      for (let c = 0; c < GRID_SIZE; c++) {
        const tile = getTileAt(r, c);
        if (!tile) return false;

        // Check right
        if (c < GRID_SIZE - 1) {
          const right = getTileAt(r, c + 1);
          if (right && right.value === tile.value) return false;
        }
        // Check down
        if (r < GRID_SIZE - 1) {
          const down = getTileAt(r + 1, c);
          if (down && down.value === tile.value) return false;
        }
      }
    }
    return true;
  }

  function handleVictory() {
    gameWon = true;
    pauseTimer();
    audio.playVictory();

    // Record win in leaderboard
    recordSessionInLeaderboard('Sesi Menang 2048 🎉', true);

    // Populate victory modal metrics
    populateVictoryModal();
    openModal(victoryModal);
  }

  function handleGameOver() {
    gameOver = true;
    pauseTimer();
    audio.playGameOver();

    // Record game over in leaderboard
    recordSessionInLeaderboard('Sesi Terakhir', false);

    // Show Game Over overlay
    const overlayScore = document.getElementById('overlay-final-score');
    const overlayTile = document.getElementById('overlay-best-tile');
    if (overlayScore) overlayScore.textContent = score.toLocaleString('id-ID');
    if (overlayTile) overlayTile.textContent = getHighestTile().toLocaleString('id-ID');

    if (gameOverOverlay) {
      gameOverOverlay.classList.remove('hidden-modal');
      gameOverOverlay.classList.add('visible-modal');
    }
  }

  function resetGame() {
    audio.playClick();
    pauseTimer();
    resetTimer();

    score = 0;
    movesCount = 0;
    gameWon = false;
    wonDismissed = false;
    gameOver = false;
    isMoving = false;
    undoStack = [];

    // Clear board DOM
    tileLayerEl.innerHTML = '';
    tiles = [];

    // Spawn 2 initial tiles
    spawnRandomTile();
    spawnRandomTile();
    renderTiles();

    updateHUD();

    // Close overlays
    if (gameOverOverlay) {
      gameOverOverlay.classList.remove('visible-modal');
      gameOverOverlay.classList.add('hidden-modal');
    }
    closeModal(victoryModal);
  }

  /* ==========================================================================
     8. Local Leaderboard (localStorage Persistence)
     ========================================================================== */
  function getLeaderboard() {
    try {
      const raw = localStorage.getItem(STORAGE_LEADERBOARD_KEY);
      if (!raw) {
        localStorage.setItem(STORAGE_LEADERBOARD_KEY, JSON.stringify(defaultLeaderboard));
        return defaultLeaderboard;
      }
      return JSON.parse(raw);
    } catch (e) {
      return defaultLeaderboard;
    }
  }

  function saveLeaderboard(list) {
    try {
      localStorage.setItem(STORAGE_LEADERBOARD_KEY, JSON.stringify(list));
    } catch (e) {}
  }

  function recordSessionInLeaderboard(sessionLabel, isWin) {
    const list = getLeaderboard();
    const highestTile = getHighestTile();
    const timeFormatted = formatTime(elapsedSeconds);

    const newEntry = {
      name: isWin ? 'Juara 2048' : (sessionLabel || 'Sesi Kamu Hari Ini'),
      date: 'Baru saja diselesaikan',
      bestTile: highestTile,
      moves: movesCount,
      time: timeFormatted,
      score: score,
      isLatest: true
    };

    // Remove isLatest from other entries
    list.forEach(entry => { entry.isLatest = false; });

    list.unshift(newEntry);
    // Sort descending by score
    list.sort((a, b) => b.score - a.score);
    const trimmed = list.slice(0, 10);
    saveLeaderboard(trimmed);
  }

  function renderLeaderboardTable(targetTbodyId = 'leaderboard-body') {
    const tbody = document.getElementById(targetTbodyId);
    if (!tbody) return;

    const list = getLeaderboard();
    tbody.innerHTML = '';

    list.forEach((entry, idx) => {
      const isFirst = idx === 0;
      const tr = document.createElement('tr');
      tr.className = entry.isLatest
        ? 'bg-primary-container/10 border-l-4 border-l-primary-container border-y border-primary-container/30 shadow-[0_0_15px_rgba(0,245,255,0.08)]'
        : 'hover:bg-surface-container/60 transition-colors';

      let rankBadge = isFirst
        ? '<span class="w-7 h-7 rounded-lg bg-gradient-to-br from-primary-container to-secondary text-surface-container-lowest font-mono text-xs font-bold flex items-center justify-center shadow-[0_0_10px_rgba(0,245,255,0.6)]">#1</span>'
        : `<span class="w-7 h-7 rounded-lg bg-surface-container-high border border-outline-variant/40 text-on-surface font-mono text-xs font-bold flex items-center justify-center">#${idx + 1}</span>`;

      let tileBadge = '';
      if (entry.bestTile >= 2048) {
        tileBadge = `<span class="inline-block px-2.5 py-1 rounded-md bg-gradient-to-r from-primary-container to-secondary text-surface-container-lowest font-mono text-xs font-bold shadow-[0_0_10px_rgba(0,245,255,0.6)]">${entry.bestTile}</span>`;
      } else if (entry.bestTile >= 1024) {
        tileBadge = `<span class="inline-block px-2.5 py-1 rounded-md bg-surface-container-highest border border-tertiary-fixed-dim/40 text-tertiary-fixed font-mono text-xs font-bold">${entry.bestTile}</span>`;
      } else {
        tileBadge = `<span class="inline-block px-2.5 py-1 rounded-md bg-surface-container-highest border border-secondary/40 text-secondary-fixed font-mono text-xs font-bold">${entry.bestTile}</span>`;
      }

      const scoreColor = entry.isLatest
        ? 'text-primary-container font-bold drop-shadow-[0_0_6px_rgba(0,245,255,0.4)]'
        : 'text-primary font-bold';

      tr.innerHTML = `
        <td class="py-3 px-3">${rankBadge}</td>
        <td class="py-3 px-3">
          <div class="flex flex-col">
            <span class="font-headline-md text-sm ${entry.isLatest ? 'text-primary font-bold flex items-center gap-2' : 'font-semibold text-on-surface'}">
              ${entry.name}
              ${entry.isLatest ? '<span class="px-1.5 py-0.5 rounded bg-primary-container/20 border border-primary-container/40 text-primary-container font-mono text-[10px] uppercase font-bold">Baru</span>' : ''}
            </span>
            <span class="text-on-surface-variant font-mono text-xs">${entry.date}</span>
          </div>
        </td>
        <td class="py-3 px-3 text-center">
          ${tileBadge}
        </td>
        <td class="py-3 px-3 text-right font-mono font-medium">${entry.moves || 0}</td>
        <td class="py-3 px-3 text-right text-on-surface-variant font-mono text-xs">${entry.time || '-'}</td>
        <td class="py-3 px-3 text-right font-mono text-base sm:text-lg ${scoreColor}">${(entry.score || 0).toLocaleString('id-ID')}</td>
      `;
      tbody.appendChild(tr);
    });
  }

  function populateVictoryModal() {
    const highestTile = getHighestTile();
    const vicScoreEl = document.getElementById('vic-score');
    const vicMovesEl = document.getElementById('vic-moves');
    const vicTileEl = document.getElementById('vic-tile');
    const vicTimeEl = document.getElementById('vic-time');
    const vicEfficiencyEl = document.getElementById('vic-efficiency');
    const vicPaceEl = document.getElementById('vic-pace');

    if (vicScoreEl) vicScoreEl.textContent = score.toLocaleString('id-ID');
    if (vicMovesEl) vicMovesEl.textContent = movesCount.toLocaleString('id-ID');
    if (vicTileEl) vicTileEl.textContent = highestTile.toLocaleString('id-ID');
    if (vicTimeEl) vicTimeEl.textContent = formatTime(elapsedSeconds);

    if (vicEfficiencyEl && movesCount > 0) {
      const eff = (score / movesCount).toFixed(1);
      vicEfficiencyEl.textContent = `Efisiensi ${eff} poin/geser`;
    }

    if (vicPaceEl && movesCount > 0) {
      const pace = (elapsedSeconds / movesCount).toFixed(2);
      vicPaceEl.textContent = `Rata-rata ${pace} dtk/geser`;
    }

    renderLeaderboardTable('vic-leaderboard-body');
  }

  /* ==========================================================================
     9. Modal Controls
     ========================================================================== */
  function openModal(modalEl) {
    if (!modalEl) return;
    audio.playClick();
    modalEl.classList.remove('hidden-modal');
    modalEl.classList.add('visible-modal');
  }

  function closeModal(modalEl) {
    if (!modalEl) return;
    modalEl.classList.remove('visible-modal');
    modalEl.classList.add('hidden-modal');
  }

  function checkFirstVisitTutorial() {
    const hasSeen = localStorage.getItem(STORAGE_TUTORIAL_KEY);
    if (!hasSeen) {
      setTimeout(() => {
        openModal(tutorialModal);
      }, 350);
    }
  }

  /* ==========================================================================
     10. Event Listeners & Input Bindings
     ========================================================================== */
  function initEventListeners() {
    // Keyboard controls
    window.addEventListener('keydown', (e) => {
      // Ignore if modal is open except Escape to close
      const isAnyModalOpen =
        (tutorialModal && tutorialModal.classList.contains('visible-modal')) ||
        (victoryModal && victoryModal.classList.contains('visible-modal')) ||
        (leaderboardModal && leaderboardModal.classList.contains('visible-modal'));

      if (e.key === 'Escape') {
        closeModal(tutorialModal);
        closeModal(victoryModal);
        closeModal(leaderboardModal);
        if (wonDismissed && !gameOver) {
          startTimer();
        }
        return;
      }

      if (isAnyModalOpen) return;

      switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          e.preventDefault();
          move('UP');
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          e.preventDefault();
          move('DOWN');
          break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
          e.preventDefault();
          move('LEFT');
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          e.preventDefault();
          move('RIGHT');
          break;
        case 'u':
        case 'U':
          e.preventDefault();
          performUndo();
          break;
        case 'n':
        case 'N':
          if (confirm('Mulai game baru sekarang?')) {
            resetGame();
          }
          break;
      }
    });

    // Touch & Swipe Controls for Mobile
    const boardEl = document.getElementById('board-container');
    if (boardEl) {
      let touchStartX = 0;
      let touchStartY = 0;
      let touchEndX = 0;
      let touchEndY = 0;

      boardEl.addEventListener('touchstart', (e) => {
        if (e.touches.length > 0) {
          touchStartX = e.touches[0].clientX;
          touchStartY = e.touches[0].clientY;
        }
      }, { passive: true });

      boardEl.addEventListener('touchend', (e) => {
        if (e.changedTouches.length > 0) {
          touchEndX = e.changedTouches[0].clientX;
          touchEndY = e.changedTouches[0].clientY;
          handleSwipeGesture();
        }
      }, { passive: true });

      function handleSwipeGesture() {
        const dx = touchEndX - touchStartX;
        const dy = touchEndY - touchStartY;
        const absDx = Math.abs(dx);
        const absDy = Math.abs(dy);
        const minSwipeThreshold = 25; // minimum swipe distance in px

        if (Math.max(absDx, absDy) < minSwipeThreshold) return;

        if (absDx > absDy) {
          // Horizontal swipe
          if (dx > 0) {
            move('RIGHT');
          } else {
            move('LEFT');
          }
        } else {
          // Vertical swipe
          if (dy > 0) {
            move('DOWN');
          } else {
            move('UP');
          }
        }
      }
    }

    // On-screen direction buttons
    dirButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const dir = btn.getAttribute('data-dir');
        if (dir) {
          move(dir.toUpperCase());
        }
      });
    });

    // New Game & Undo
    if (btnNewGame) {
      btnNewGame.addEventListener('click', () => {
        if (score > 0 && !gameOver) {
          if (confirm('Mulai game baru sekarang? Kemajuan sesi saat ini akan direset.')) {
            resetGame();
          }
        } else {
          resetGame();
        }
      });
    }

    if (btnUndo) {
      btnUndo.addEventListener('click', performUndo);
    }

    // Sound toggle
    function updateSoundUI(enabled) {
      if (soundIcon) {
        soundIcon.textContent = enabled ? 'volume_up' : 'volume_off';
      }
      const footerAudioIcons = document.querySelectorAll('.footer-sound-icon');
      footerAudioIcons.forEach(icon => {
        icon.textContent = enabled ? 'volume_up' : 'volume_off';
      });
    }

    if (btnSound) {
      btnSound.addEventListener('click', () => {
        const state = audio.toggle();
        updateSoundUI(state);
        audio.playClick();
      });
    }

    // Footer audio button
    const footerAudioBtn = document.getElementById('footer-btn-audio');
    if (footerAudioBtn) {
      footerAudioBtn.addEventListener('click', () => {
        const state = audio.toggle();
        updateSoundUI(state);
        audio.playClick();
      });
    }

    // Footer undo button
    const footerUndoBtn = document.getElementById('footer-btn-undo');
    if (footerUndoBtn) {
      footerUndoBtn.addEventListener('click', performUndo);
    }

    // Tutorial Modal Triggers
    if (btnTutorial) {
      btnTutorial.addEventListener('click', () => openModal(tutorialModal));
    }
    if (navTutorial) {
      navTutorial.addEventListener('click', (e) => {
        e.preventDefault();
        openModal(tutorialModal);
      });
    }
    if (btnCloseTutorial) {
      btnCloseTutorial.addEventListener('click', () => {
        localStorage.setItem(STORAGE_TUTORIAL_KEY, 'true');
        closeModal(tutorialModal);
      });
    }
    if (btnGotIt) {
      btnGotIt.addEventListener('click', () => {
        localStorage.setItem(STORAGE_TUTORIAL_KEY, 'true');
        closeModal(tutorialModal);
      });
    }
    if (tutorialModal) {
      tutorialModal.addEventListener('click', (e) => {
        if (e.target === tutorialModal) {
          localStorage.setItem(STORAGE_TUTORIAL_KEY, 'true');
          closeModal(tutorialModal);
        }
      });
    }

    // Leaderboard Modal Triggers
    if (navLeaderboard) {
      navLeaderboard.addEventListener('click', (e) => {
        e.preventDefault();
        renderLeaderboardTable('modal-leaderboard-body');
        openModal(leaderboardModal);
      });
    }
    if (btnCloseLeaderboard) {
      btnCloseLeaderboard.addEventListener('click', () => closeModal(leaderboardModal));
    }
    if (leaderboardModal) {
      leaderboardModal.addEventListener('click', (e) => {
        if (e.target === leaderboardModal) closeModal(leaderboardModal);
      });
    }
    if (btnResetLeaderboard) {
      btnResetLeaderboard.addEventListener('click', () => {
        if (confirm('Hapus seluruh riwayat skor lokal dari penyimpanan browser?')) {
          localStorage.removeItem(STORAGE_LEADERBOARD_KEY);
          renderLeaderboardTable('modal-leaderboard-body');
          audio.playClick();
        }
      });
    }

    if (navArena) {
      navArena.addEventListener('click', (e) => {
        e.preventDefault();
        closeModal(leaderboardModal);
        closeModal(tutorialModal);
        closeModal(victoryModal);
      });
    }

    // Victory Screen Actions
    if (btnKeepGoing) {
      btnKeepGoing.addEventListener('click', () => {
        wonDismissed = true;
        closeModal(victoryModal);
        startTimer();
      });
    }
    if (btnVictoryNewGame) {
      btnVictoryNewGame.addEventListener('click', () => {
        resetGame();
      });
    }
    if (btnShareScore) {
      btnShareScore.addEventListener('click', () => {
        const text = `🏆 Saya berhasil mencapai ubin 2048 di QuadFuse Cyber Arcade dengan skor ${score.toLocaleString('id-ID')} dalam ${movesCount} langkah (${formatTime(elapsedSeconds)})! Bisakah kamu mengalahkan rekor saya?`;
        if (navigator.clipboard) {
          navigator.clipboard.writeText(text).then(() => {
            if (shareToast) {
              shareToast.classList.remove('hidden');
              shareToast.classList.add('flex');
              setTimeout(() => {
                shareToast.classList.add('hidden');
                shareToast.classList.remove('flex');
              }, 4000);
            }
          });
        }
      });
    }

    // Game Over Overlay Actions
    if (overlayRestartBtn) {
      overlayRestartBtn.addEventListener('click', resetGame);
    }
    if (overlayLeaderboardBtn) {
      overlayLeaderboardBtn.addEventListener('click', () => {
        renderLeaderboardTable('modal-leaderboard-body');
        openModal(leaderboardModal);
      });
    }
  }

  /* ==========================================================================
     11. Initializer
     ========================================================================== */
  function init() {
    loadBestScore();
    updateSoundUI(audio.enabled);
    initEventListeners();
    resetGame();
    checkFirstVisitTutorial();

    // Development & Testing interface
    window.QuadFuse = {
      getTiles: () => tiles,
      setTilesForTest: (newTilesData) => {
        tileLayerEl.innerHTML = '';
        tiles = [];
        newTilesData.forEach(tData => {
          const t = createTile(tData.r, tData.c, tData.value, false, false);
          tiles.push(t);
        });
        renderTiles();
      },
      move,
      performUndo,
      resetGame,
      handleVictory,
      isGameOver,
      getScore: () => score,
      getMoves: () => movesCount,
      getElapsed: () => elapsedSeconds,
      audio
    };
  }

  // Boot on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function updateSoundUI(enabled) {
    if (soundIcon) {
      soundIcon.textContent = enabled ? 'volume_up' : 'volume_off';
    }
    const footerAudioIcons = document.querySelectorAll('.footer-sound-icon');
    footerAudioIcons.forEach(icon => {
      icon.textContent = enabled ? 'volume_up' : 'volume_off';
    });
  }
})();
