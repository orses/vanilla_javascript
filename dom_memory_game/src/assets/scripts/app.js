/* eslint-disable import/extensions */
import { shuffle, conffetiRain } from './utils.js';

/** ****************************************************************
 * Module scope variables
 */

// the elements to identify and match
const memoryItems = [
  '💀',
  '💀',
  '😊',
  '😊',
  '✨',
  '✨',
  '❤️',
  '❤️',
  '😂',
  '😂',
  '🐒',
  '🐒',
  '💩',
  '💩',
  '💁‍♀️',
  '💁‍♀️',
  '🎃',
  '🎃',
  '🎨',
  '🎨',
  '🎺',
  '🎺',
  '🎡',
  '🎡',
];

// every new play, we get a new board with items shuffled
let shuffledItems = [];

// We need to take track of the two pair of tiles selected by the user
const memoryValues = [];
const memoryTilesIds = [];

// How many tiles are flipped. When its value is equal to memoryItems.length the use win
let tilesFlipped = 0;

/** ****************************************************************
 * Functions
 */

function createTiles(items) {
  const elements = items.map(
    (item, i) => `<div class="tile tile-back-side" data-tile="${i}"></div>`
  );

  return elements.join('\n');
}

function flipTileToFront(tileId, value) {
  // We create a new tile with the associated icon, we don't want the function to mutate the element
  const frontTile = document.createElement('div');
  frontTile.classList.add('tile', 'tile-front-side');
  frontTile.setAttribute('data-tile', tileId);
  frontTile.innerHTML = value;

  return frontTile;
}

function flipTileToBack(tileId) {
  // We create a new tile with the associated class, we don't want the function to mutate the element
  const backTile = document.createElement('div');
  backTile.classList.add('tile', 'tile-back-side');
  backTile.setAttribute('data-tile', tileId);

  return backTile;
}

/**
 * When the pair tiles does not match we reset the tiles and tracking arrays.
 */
function resetLastPairOfTiles() {
  //
  const tileFirst = document.querySelector(
    `[data-tile="${memoryTilesIds[0]}"]`
  );
  const tileSecond = document.querySelector(
    `[data-tile="${memoryTilesIds[1]}"]`
  );

  tileFirst.parentElement.replaceChild(
    flipTileToBack(tileFirst.dataset.tile),
    tileFirst
  );
  tileSecond.parentElement.replaceChild(
    flipTileToBack(tileSecond.dataset.tile),
    tileSecond
  );

  memoryValues.length = 0;
  memoryTilesIds.length = 0;
}

function checkTile(tile) {
  // if the user make a click outside a tile, there's nothing to do
  if (!('tile' in tile.dataset)) return false;

  // if tile have and icon or memoryValues has two records, we don't need to do anything
  if (tile.innerHTML || memoryValues.length >= 2) return false;

  // We have a new par of tiles to evaluate, so it's time to flipp selected the tile
  const tileId = tile.dataset.tile;
  const tileValue = shuffledItems[tileId];
  tile.parentElement.replaceChild(flipTileToFront(tileId, tileValue), tile);

  // We register the selected tile as first if applicable.
  if (memoryValues.length === 0) {
    memoryValues.push(tileValue);
    memoryTilesIds.push(tileId);
    return false;
  }

  // We register the second tile if any
  if (memoryValues.length === 1) {
    memoryValues.push(tileValue);
    memoryTilesIds.push(tileId);
  }

  // We want to know if the user has a valid match
  if (memoryValues[0] === memoryValues[1]) {
    tilesFlipped += 2;
    memoryValues.length = 0;
    memoryTilesIds.length = 0;

    // check is the whole board is cleared
    if (tilesFlipped === shuffledItems.length) {
      const startConffeti = setInterval(conffetiRain, 100);
      setTimeout(() => {
        clearInterval(startConffeti);
        const button = document.querySelector('.button-primary');
        button.disabled = false;
      }, 3000);
    }

    return false;
  }

  setTimeout(resetLastPairOfTiles, 500);

  return false;
}

// we need the closure to add and remove the listener
function handleMemoryBoard(e) {
  checkTile(e.target);
}

function newBoard() {
  const button = document.querySelector('.button-primary');
  button.disabled = true;

  tilesFlipped = 0;
  memoryValues.length = 0;
  memoryTilesIds.length = 0;

  shuffledItems = shuffle(memoryItems);
  const tiles = createTiles(shuffledItems);

  const memoryBoard = document.querySelector('.memory-board');
  memoryBoard.innerHTML = tiles;

  memoryBoard.addEventListener('click', handleMemoryBoard);
}

function makeGame() {
  const button = document.querySelector('.button-primary');
  button.disabled = true;
  button.addEventListener('click', newBoard);
  newBoard();
}

window.addEventListener('DOMContentLoaded', makeGame);
