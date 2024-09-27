/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _src_modules_screens_startScreen_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../src/modules/screens/startScreen.js */ \"./src/modules/screens/startScreen.js\");\n/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./style.css */ \"./src/style.css\");\n\n\n(0,_src_modules_screens_startScreen_js__WEBPACK_IMPORTED_MODULE_0__.startScreen)();\n\n//# sourceURL=webpack://battleship/./src/index.js?");

/***/ }),

/***/ "./src/modules/controller/controller.js":
/*!**********************************************!*\
  !*** ./src/modules/controller/controller.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   handleBoard: () => (/* binding */ handleBoard)\n/* harmony export */ });\n/* harmony import */ var _dom_dom_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../dom/dom.js */ \"./src/modules/dom/dom.js\");\n/* harmony import */ var _screens_endScreen_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../screens/endScreen.js */ \"./src/modules/screens/endScreen.js\");\n\n\nfunction handleBoard(player1, player2) {\n  const divGameboard2 = document.querySelector('.gameboard-player2');\n  const newPlayer1 = player1;\n  const newPlayer2 = player2;\n  function addListener() {\n    divGameboard2.addEventListener('click', handlePlayerMove);\n  }\n  function removeListener() {\n    divGameboard2.removeEventListener('click', handlePlayerMove);\n  }\n  removeListener();\n  addListener();\n  async function handlePlayerMove(e) {\n    if (!e.target.classList.contains('cell') || e.target.classList.contains('clicked')) return;\n    const {\n      x,\n      y\n    } = getCoordinatesPlayer(e);\n    if (x === undefined || y === undefined) return;\n    const targetCell = newPlayer2.playerBoard.receiveAttack(x, y);\n    removeListener();\n    if (targetCell !== 'M') {\n      if (newPlayer2.playerBoard.endGame() === true) {\n        (0,_screens_endScreen_js__WEBPACK_IMPORTED_MODULE_1__.endScreen)('win', newPlayer1);\n      } else {\n        targetCell.sunk === true ? (0,_dom_dom_js__WEBPACK_IMPORTED_MODULE_0__.sunkMessage)(targetCell, newPlayer2) : (0,_dom_dom_js__WEBPACK_IMPORTED_MODULE_0__.hitMessage)(newPlayer2);\n      }\n    }\n    const result = targetCell === 'M' ? 'M' : 'X';\n    updateCell(e.target, result);\n    if (result === 'M') {\n      (0,_dom_dom_js__WEBPACK_IMPORTED_MODULE_0__.missMessage)(newPlayer1);\n      await delay(500);\n      handleCpuMove();\n    } else {\n      await delay(1500);\n      addListener();\n    }\n  }\n  const cpuAi = cpu();\n  async function handleCpuMove() {\n    removeListener();\n    cpuAi.startAttack();\n  }\n  function updateCell(cell, result) {\n    cell.textContent = result;\n    cell.classList.add('clicked', result === 'X' ? 'hit' : 'miss');\n  }\n  function cpu() {\n    const divGameboard1 = document.querySelector('.gameboard-player1');\n    const arrayCells = Array.from(divGameboard1.querySelectorAll('.cell'));\n    function randomAttack() {\n      const cell = arrayCells[Math.floor(Math.random() * arrayCells.length)];\n      const {\n        x,\n        y\n      } = getCoordinatesCPU(cell);\n      attack(cell, x, y);\n    }\n    function startAttack() {\n      const attackedShip = newPlayer1.playerBoard.ships.find(ship => ship.hits > 0 && ship.sunk === false);\n      if (attackedShip) {\n        const x = Number(attackedShip.hitPosition[0].x);\n        const y = Number(attackedShip.hitPosition[0].y);\n        predictiveAttack(x, y);\n      } else {\n        randomAttack();\n      }\n    }\n    async function predictiveAttack(x, y) {\n      let attempts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;\n      if (attempts >= 4) {\n        const attackedShip = newPlayer1.playerBoard.ships.find(ship => ship.hitPosition.some(position => Number(position.x) === x && Number(position.y) === y));\n        attackedShip.hitPosition.push(attackedShip.hitPosition.shift());\n        startAttack();\n        return;\n      }\n      const directions = [{\n        dx: 1,\n        dy: 0\n      }, {\n        dx: -1,\n        dy: 0\n      }, {\n        dx: 0,\n        dy: 1\n      }, {\n        dx: 0,\n        dy: -1\n      }];\n      const {\n        dx,\n        dy\n      } = directions[Math.floor(Math.random() * directions.length)];\n      const targetCell = arrayCells.find(cell => {\n        const cellX = Number(cell.dataset.x);\n        const cellY = Number(cell.dataset.y);\n        return cellX === x + dx && cellY === y + dy && !cell.classList.contains('clicked');\n      });\n      if (targetCell) {\n        const cellX = Number(targetCell.dataset.x);\n        const cellY = Number(targetCell.dataset.y);\n        attack(targetCell, cellX, cellY);\n      } else {\n        predictiveAttack(x, y, attempts + 1);\n      }\n    }\n    async function attack(cell, x, y) {\n      await delay(1500);\n      const targetCell = newPlayer1.playerBoard.receiveAttack(x, y);\n      if (targetCell !== 'M') {\n        if (newPlayer1.playerBoard.endGame() === true) {\n          (0,_screens_endScreen_js__WEBPACK_IMPORTED_MODULE_1__.endScreen)('lose', newPlayer1);\n        } else {\n          targetCell.sunk === true ? (0,_dom_dom_js__WEBPACK_IMPORTED_MODULE_0__.sunkMessage)(targetCell, newPlayer1) : (0,_dom_dom_js__WEBPACK_IMPORTED_MODULE_0__.hitMessage)(newPlayer1);\n        }\n      }\n      const result = targetCell === 'M' ? 'M' : 'X';\n      updateCell(cell, result);\n      arrayCells.splice(arrayCells.indexOf(cell), 1);\n      result === 'X' ? predictiveAttack(x, y) : (addListener(), (0,_dom_dom_js__WEBPACK_IMPORTED_MODULE_0__.missMessage)(newPlayer2));\n    }\n    return {\n      startAttack: () => startAttack(),\n      getArray: () => arrayCells\n    };\n  }\n  function getCoordinatesPlayer(e) {\n    return {\n      x: Number(e.target.dataset.x),\n      y: Number(e.target.dataset.y)\n    };\n  }\n  function getCoordinatesCPU(cell) {\n    return {\n      x: Number(cell.dataset.x),\n      y: Number(cell.dataset.y)\n    };\n  }\n  function delay(ms) {\n    return new Promise(resolve => setTimeout(resolve, ms));\n  }\n  return {\n    addListener,\n    removeListener\n  };\n}\n\n//# sourceURL=webpack://battleship/./src/modules/controller/controller.js?");

/***/ }),

/***/ "./src/modules/dom/dom.js":
/*!********************************!*\
  !*** ./src/modules/dom/dom.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   elementsCPU: () => (/* binding */ elementsCPU),\n/* harmony export */   elementsPlayer: () => (/* binding */ elementsPlayer),\n/* harmony export */   hitMessage: () => (/* binding */ hitMessage),\n/* harmony export */   missMessage: () => (/* binding */ missMessage),\n/* harmony export */   sunkMessage: () => (/* binding */ sunkMessage)\n/* harmony export */ });\n/* harmony import */ var _domHelpers_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./domHelpers.js */ \"./src/modules/dom/domHelpers.js\");\n\nconst gameContainer = document.querySelector('.game-container');\nfunction elementsPlayer(name) {\n  const boardContainer = (0,_domHelpers_js__WEBPACK_IMPORTED_MODULE_0__.create)('div', 'board-container', gameContainer);\n  const gameboardContainer1 = (0,_domHelpers_js__WEBPACK_IMPORTED_MODULE_0__.create)('div', 'gameboard-container', boardContainer);\n  gameboardContainer1.classList.add('box');\n  const span1 = (0,_domHelpers_js__WEBPACK_IMPORTED_MODULE_0__.create)('span', 'player', gameboardContainer1);\n  span1.innerHTML = `${name}'s waters`;\n  (0,_domHelpers_js__WEBPACK_IMPORTED_MODULE_0__.create)('i', 'water-container', gameboardContainer1);\n  const divGameboard1 = (0,_domHelpers_js__WEBPACK_IMPORTED_MODULE_0__.create)('div', 'gameboard-player1', gameboardContainer1);\n  const logContainer1 = (0,_domHelpers_js__WEBPACK_IMPORTED_MODULE_0__.create)('div', 'log-container', boardContainer);\n  logContainer1.innerHTML = '<p>Your log</p><p class=\" CPU\"></p>';\n  function createCells() {\n    for (let i = 0; i < 10; i++) {\n      for (let j = 0; j < 10; j++) {\n        const cell1 = (0,_domHelpers_js__WEBPACK_IMPORTED_MODULE_0__.create)('div', 'cell', divGameboard1);\n        cell1.dataset.x = j;\n        cell1.dataset.y = i;\n      }\n    }\n  }\n  createCells();\n  shipsSelector();\n  return {\n    divGameboard1\n  };\n}\nfunction shipsSelector() {\n  const shipsContainer = (0,_domHelpers_js__WEBPACK_IMPORTED_MODULE_0__.create)('div', 'ships-container', gameContainer);\n  const shipsData = [{\n    length: 2,\n    name: 'Destroyer',\n    symbol: 'D'\n  }, {\n    length: 3,\n    name: 'Submarine',\n    symbol: 'S'\n  }, {\n    length: 3,\n    name: 'Cruiser',\n    symbol: 'C'\n  }, {\n    length: 4,\n    name: 'Battleship',\n    symbol: 'B'\n  }, {\n    length: 5,\n    name: 'Carrier',\n    symbol: 'A'\n  }];\n  shipsData.forEach(ship => {\n    const shipCard = (0,_domHelpers_js__WEBPACK_IMPORTED_MODULE_0__.create)('div', 'ship-card', shipsContainer);\n    const shipName = (0,_domHelpers_js__WEBPACK_IMPORTED_MODULE_0__.create)('p', 'ship-name', shipCard);\n    shipName.innerHTML = ship.name;\n    const shipImg = (0,_domHelpers_js__WEBPACK_IMPORTED_MODULE_0__.create)('img', 'ship-img', shipCard);\n    shipImg.src = `../src/assets/img/${ship.name}.svg`;\n    shipImg.setAttribute('id', `${ship.name}`);\n  });\n}\nfunction elementsCPU() {\n  const boardContainer = (0,_domHelpers_js__WEBPACK_IMPORTED_MODULE_0__.create)('div', 'board-container', gameContainer);\n  const gameboardContainer2 = (0,_domHelpers_js__WEBPACK_IMPORTED_MODULE_0__.create)('div', 'gameboard-container', boardContainer);\n  gameboardContainer2.classList.add('box');\n  const span2 = (0,_domHelpers_js__WEBPACK_IMPORTED_MODULE_0__.create)('span', 'player', gameboardContainer2);\n  span2.innerHTML = `Enemy waters`;\n  (0,_domHelpers_js__WEBPACK_IMPORTED_MODULE_0__.create)('i', 'water-container', gameboardContainer2);\n  const logContainer2 = (0,_domHelpers_js__WEBPACK_IMPORTED_MODULE_0__.create)('div', 'log-container', boardContainer);\n  const divGameboard2 = (0,_domHelpers_js__WEBPACK_IMPORTED_MODULE_0__.create)('div', 'gameboard-player2', gameboardContainer2);\n  logContainer2.innerHTML = '<p>Enemy log</p><p class=\" P1\"></p>';\n  function createCells() {\n    for (let i = 0; i < 10; i++) {\n      for (let j = 0; j < 10; j++) {\n        const cell2 = (0,_domHelpers_js__WEBPACK_IMPORTED_MODULE_0__.create)('div', 'cell', divGameboard2);\n        cell2.dataset.x = j;\n        cell2.dataset.y = i;\n      }\n    }\n  }\n  createCells();\n}\nfunction typeWriter(text, element) {\n  let speed = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 45;\n  let i = 0;\n  function type() {\n    if (i < text.length) {\n      element.innerHTML += text.charAt(i);\n      i++;\n      setTimeout(type, speed);\n    }\n  }\n  type();\n}\nfunction hitMessage(player) {\n  const newParagraph = player.name === 'CPU' ? document.querySelector('.P1') : document.querySelector('.CPU');\n  newParagraph.innerHTML = '';\n  const message = `${player.name}'s ship has been hit!`;\n  typeWriter(message, newParagraph);\n}\nfunction missMessage(player) {\n  const newParagraph = player.name === 'CPU' ? document.querySelector('.CPU') : document.querySelector('.P1');\n  newParagraph.innerHTML = '';\n  const message = `${player.name}'s attack missed!`;\n  typeWriter(message, newParagraph);\n}\nfunction sunkMessage(ship, player) {\n  const newParagraph = player.name === 'CPU' ? document.querySelector('.P1') : document.querySelector('.CPU');\n  newParagraph.innerHTML = '';\n  const message = `${player.name}'s ${ship.name} has been sunk!`;\n  typeWriter(message, newParagraph);\n}\n\n//# sourceURL=webpack://battleship/./src/modules/dom/dom.js?");

/***/ }),

/***/ "./src/modules/dom/domHelpers.js":
/*!***************************************!*\
  !*** ./src/modules/dom/domHelpers.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   create: () => (/* binding */ create),\n/* harmony export */   createBtn: () => (/* binding */ createBtn)\n/* harmony export */ });\nfunction create(type, className, parent) {\n  const element = document.createElement(type);\n  element.classList.add(className);\n  parent.appendChild(element);\n  return element;\n}\nfunction createBtn(callback, text, container, id) {\n  const button = create('div', 'box', container);\n  button.classList.add('box-button');\n  create('span', 'span', button).innerHTML = `${text}`;\n  create('i', 'water-button', button);\n  button.addEventListener('click', callback);\n  if (id) button.setAttribute('id', id);\n  return button;\n}\n\n//# sourceURL=webpack://battleship/./src/modules/dom/domHelpers.js?");

/***/ }),

/***/ "./src/modules/factories/gameboard.js":
/*!********************************************!*\
  !*** ./src/modules/factories/gameboard.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ gameboard)\n/* harmony export */ });\nfunction gameboard() {\n  const board = Array.from({\n    length: 10\n  }, () => Array(10).fill(null));\n  const ships = [];\n  const missedShots = [];\n  const successfulShot = [];\n  function receiveAttack(x, y) {\n    if (board[y][x] === null) {\n      missedShots.push({\n        x,\n        y\n      });\n      board[y][x] = 'M';\n      return 'M';\n    } else {\n      const ship = ships.find(s => s.position.some(pos => pos.x === x && pos.y === y));\n      if (ship) {\n        ship.hit();\n        ship.hitPosition.push({\n          x,\n          y\n        });\n        ship.position.splice(ship.position.findIndex(pos => pos.x === x && pos.y === y), 1);\n        successfulShot.push({\n          x,\n          y\n        });\n        board[y][x] = 'X';\n      }\n      return ship;\n    }\n  }\n  function isValidPosition(ship, x, y, orientation) {\n    for (let i = 0; i < ship.length; i++) {\n      const posX = orientation === 'horizontal' ? x + i : x;\n      const posY = orientation === 'vertical' ? y + i : y;\n      if (posX >= 10 || posY >= 10 || board[posY][posX] !== null) {\n        throw new Error('Ship already placed');\n      }\n    }\n    return true;\n  }\n  function placeShipOnBoard(ship, x, y, orientation) {\n    for (let i = 0; i < ship.length; i++) {\n      const posX = orientation === 'horizontal' ? x + i : x;\n      const posY = orientation === 'vertical' ? y + i : y;\n      board[posY][posX] = ship.symbol;\n      ship.position.push({\n        x: posX,\n        y: posY\n      });\n    }\n  }\n  function placeShip(ship, orientation, x, y) {\n    if (x < 0 || y < 0 || orientation === 'horizontal' && x + ship.length > 10 || orientation === 'vertical' && y + ship.length > 10) {\n      throw new Error('Invalid coordinates');\n    }\n    if (isValidPosition(ship, x, y, orientation)) {\n      placeShipOnBoard(ship, x, y, orientation);\n      ships.push(ship);\n      return true;\n    } else {\n      return false;\n    }\n  }\n  function printBoard() {\n    console.log('  1 2 3 4 5 6 7 8 9 10');\n    for (let i = 0; i < board.length; i++) {\n      console.log(i + 1 + ' ' + board[i].join(' '));\n    }\n  }\n  function endGame() {\n    const state = ships.every(ship => ship.sunk) ? true : false;\n    return state;\n  }\n  return {\n    get board() {\n      return board;\n    },\n    ships,\n    missedShots,\n    successfulShot,\n    receiveAttack,\n    placeShip,\n    printBoard,\n    endGame\n  };\n}\n\n//# sourceURL=webpack://battleship/./src/modules/factories/gameboard.js?");

/***/ }),

/***/ "./src/modules/factories/player.js":
/*!*****************************************!*\
  !*** ./src/modules/factories/player.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ player1)\n/* harmony export */ });\n/* harmony import */ var _gameboard_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameboard.js */ \"./src/modules/factories/gameboard.js\");\n\nfunction player1(name) {\n  const playerBoard = (0,_gameboard_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])();\n  return {\n    name,\n    get playerBoard() {\n      return playerBoard;\n    }\n  };\n}\n;\n\n//# sourceURL=webpack://battleship/./src/modules/factories/player.js?");

/***/ }),

/***/ "./src/modules/factories/ship.js":
/*!***************************************!*\
  !*** ./src/modules/factories/ship.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ ship)\n/* harmony export */ });\nfunction ship(length, name, symbol) {\n  let hits = 0;\n  let sunk = false;\n  let position = [];\n  let hitPosition = [];\n  function hit() {\n    hits++;\n    if (hits === length) {\n      sunk = true;\n    }\n  }\n  return {\n    length,\n    name,\n    symbol,\n    get hits() {\n      return hits;\n    },\n    get sunk() {\n      return sunk;\n    },\n    hit,\n    position,\n    hitPosition\n  };\n}\n\n//# sourceURL=webpack://battleship/./src/modules/factories/ship.js?");

/***/ }),

/***/ "./src/modules/screens/endScreen.js":
/*!******************************************!*\
  !*** ./src/modules/screens/endScreen.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   endScreen: () => (/* binding */ endScreen)\n/* harmony export */ });\n/* harmony import */ var _dom_domHelpers_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../dom/domHelpers.js */ \"./src/modules/dom/domHelpers.js\");\n\nconst container = document.querySelector('.game-container');\nfunction endScreen(state, player) {\n  container.innerHTML = '';\n  container.setAttribute('style', 'grid-template-columns: 1fr');\n  const endScreen = document.createElement('div');\n  endScreen.classList.add('end-screen');\n  state === 'win' ? (0,_dom_domHelpers_js__WEBPACK_IMPORTED_MODULE_0__.create)('p', 'text-end', endScreen).innerHTML = `${player.name} wins!` : (0,_dom_domHelpers_js__WEBPACK_IMPORTED_MODULE_0__.create)('p', 'text-end', endScreen).innerHTML = 'You lose!';\n  (0,_dom_domHelpers_js__WEBPACK_IMPORTED_MODULE_0__.createBtn)(() => location.reload(), 'Play Again!', endScreen);\n  container.appendChild(endScreen);\n}\n\n//# sourceURL=webpack://battleship/./src/modules/screens/endScreen.js?");

/***/ }),

/***/ "./src/modules/screens/gameScreen.js":
/*!*******************************************!*\
  !*** ./src/modules/screens/gameScreen.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   gameScreen: () => (/* binding */ gameScreen)\n/* harmony export */ });\n/* harmony import */ var _dom_dom_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../dom/dom.js */ \"./src/modules/dom/dom.js\");\n/* harmony import */ var _setupScreen_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./setupScreen.js */ \"./src/modules/screens/setupScreen.js\");\n/* harmony import */ var _controller_controller_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../controller/controller.js */ \"./src/modules/controller/controller.js\");\n\n\n\nfunction gameScreen(player) {\n  const container = document.querySelector('.game-container');\n  document.querySelector('.ships-container').remove();\n  document.getElementById('button-horizontal').remove();\n  document.getElementById('button-vertical').remove();\n  document.getElementById('button-start').remove();\n  container.style.display = 'grid';\n  container.style.gridTemplateColumns = '1fr 1fr';\n  container.style.justifyItems = 'center';\n  container.style.alignItems = 'center';\n  (0,_dom_dom_js__WEBPACK_IMPORTED_MODULE_0__.elementsCPU)();\n  const cpu = (0,_setupScreen_js__WEBPACK_IMPORTED_MODULE_1__.initializeBoard)('CPU');\n  displayDom();\n  (0,_controller_controller_js__WEBPACK_IMPORTED_MODULE_2__.handleBoard)(player, cpu);\n  console.log(player.playerBoard.ships, cpu.playerBoard.ships);\n}\nfunction displayDom() {\n  const spanName = document.querySelectorAll('.player');\n  spanName[0].style.display = 'block';\n  spanName[1].style.display = 'block';\n  const logContainer = document.querySelectorAll('.log-container');\n  logContainer[0].style.display = 'flex';\n  logContainer[1].style.display = 'flex';\n}\n\n//# sourceURL=webpack://battleship/./src/modules/screens/gameScreen.js?");

/***/ }),

/***/ "./src/modules/screens/setupScreen.js":
/*!********************************************!*\
  !*** ./src/modules/screens/setupScreen.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   initializeBoard: () => (/* binding */ initializeBoard),\n/* harmony export */   initializePlayerBoard: () => (/* binding */ initializePlayerBoard)\n/* harmony export */ });\n/* harmony import */ var _dom_domHelpers_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../dom/domHelpers.js */ \"./src/modules/dom/domHelpers.js\");\n/* harmony import */ var _factories_player_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../factories/player.js */ \"./src/modules/factories/player.js\");\n/* harmony import */ var _factories_ship_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../factories/ship.js */ \"./src/modules/factories/ship.js\");\n/* harmony import */ var _gameScreen_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./gameScreen.js */ \"./src/modules/screens/gameScreen.js\");\n\n\n\n\nfunction initializeBoard(name) {\n  const player = (0,_factories_player_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(name);\n  const shipsData = [{\n    length: 2,\n    name: 'Destroyer',\n    symbol: 'D'\n  }, {\n    length: 3,\n    name: 'Submarine',\n    symbol: 'S'\n  }, {\n    length: 3,\n    name: 'Cruiser',\n    symbol: 'C'\n  }, {\n    length: 4,\n    name: 'Battleship',\n    symbol: 'B'\n  }, {\n    length: 5,\n    name: 'Carrier',\n    symbol: 'A'\n  }];\n  name === 'CPU' ? initializeCPUBoard(player, shipsData) : initializePlayerBoard(player, shipsData);\n  return player;\n}\nfunction isMobileDevice() {\n  return /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);\n}\nconst device = isMobileDevice() ? 'mobile' : 'desktop';\nfunction initializeCPUBoard(player, ships) {\n  const playerBoard = player.playerBoard;\n  ships.forEach(_ref => {\n    let {\n      length,\n      name,\n      symbol\n    } = _ref;\n    let shipPlaced = false;\n    while (!shipPlaced) {\n      const orientation = Math.random() > 0.5 ? 'horizontal' : 'vertical';\n      const x = Math.floor(Math.random() * 10);\n      const y = Math.floor(Math.random() * 10);\n      try {\n        playerBoard.placeShip((0,_factories_ship_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(length, name, symbol), orientation, x, y);\n        shipPlaced = true;\n      } catch (error) {\n        console.log(`Error placing ${name}: ${error.message}. Retrying...`);\n      }\n    }\n  });\n}\nfunction initializePlayerBoard(player, shipsData) {\n  const playerBoard = player.playerBoard;\n  const playerGameboard = document.querySelector('.gameboard-player1');\n  const ships = shipsData;\n  let counter = 0;\n  let orientation = 'horizontal';\n  const buttonH = (0,_dom_domHelpers_js__WEBPACK_IMPORTED_MODULE_0__.createBtn)(() => {\n    orientation = 'horizontal';\n    buttonH.classList.add('active');\n    buttonV.classList.remove('active');\n    buttonV.style.removeProperty('background-color');\n    buttonH.style.color = 'white';\n  }, 'Horizontal', document.querySelector('.gameboard-container'), 'button-horizontal');\n  const buttonV = (0,_dom_domHelpers_js__WEBPACK_IMPORTED_MODULE_0__.createBtn)(() => {\n    orientation = 'vertical';\n    buttonV.classList.add('active');\n    buttonH.classList.remove('active');\n    buttonH.style.removeProperty('background-color');\n  }, 'Vertical', document.querySelector('.gameboard-container'), 'button-vertical');\n  buttonH.classList.add('active');\n  buttonH.style.top = '1%';\n  buttonH.style.left = '5%';\n  buttonV.style.top = '1%';\n  buttonV.style.right = '5%';\n  const buttonS = (0,_dom_domHelpers_js__WEBPACK_IMPORTED_MODULE_0__.createBtn)(() => {\n    if (counter < 5) return;\n    (0,_gameScreen_js__WEBPACK_IMPORTED_MODULE_3__.gameScreen)(player);\n  }, 'Start', document.querySelector('.gameboard-container'), 'button-start');\n  buttonS.style.bottom = '1%';\n  buttonS.style.justifySelf = 'center';\n  ships.forEach(ship => {\n    const shipImg = document.getElementById(ship.name);\n    shipImg.addEventListener(device === 'mobile' ? 'touchstart' : 'dragstart', e => {\n      const shipData = JSON.stringify(ship);\n      e.dataTransfer.setData('application/json', shipData);\n    });\n  });\n  playerGameboard.addEventListener(device === 'mobile' ? 'touchmove' : 'dragover', event => {\n    event.preventDefault();\n  });\n  playerGameboard.addEventListener(device === 'mobile' ? 'touchend' : 'drop', event => {\n    event.preventDefault();\n    const data = event.dataTransfer.getData('application/json');\n    const shipObject = JSON.parse(data);\n    const shipImg = document.getElementById(shipObject.name);\n    const cell = event.target;\n    const x = Number(cell.getAttribute('data-x'));\n    const y = Number(cell.getAttribute('data-y'));\n    orientation === 'vertical' ? shipImg.style.transform = 'rotate(90deg) translate(0px, -100%)' : shipImg.style.transform = 'rotate(0deg) translate(0%, 0px)';\n    if (!playerBoard.placeShip((0,_factories_ship_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(shipObject.length, shipObject.name, shipObject.symbol), orientation, x, y)) {\n      return;\n    }\n    ;\n    playerGameboard.appendChild(shipImg);\n    shipImg.setAttribute('draggable', 'false');\n    shipImg.style.position = 'absolute';\n    shipImg.style.left = `${x * 10}%`;\n    shipImg.style.top = `${y * 10}%`;\n    shipImg.style.height = '10%';\n    shipImg.style.aspectRatio = `${shipObject.length} / 1`;\n    shipImg.style.transformOrigin = 'top left 0px';\n    shipImg.style.zIndex = '-1';\n    counter++;\n  });\n}\n\n//# sourceURL=webpack://battleship/./src/modules/screens/setupScreen.js?");

/***/ }),

/***/ "./src/modules/screens/startScreen.js":
/*!********************************************!*\
  !*** ./src/modules/screens/startScreen.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   startScreen: () => (/* binding */ startScreen)\n/* harmony export */ });\n/* harmony import */ var _dom_domHelpers_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../dom/domHelpers.js */ \"./src/modules/dom/domHelpers.js\");\n/* harmony import */ var _dom_dom_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../dom/dom.js */ \"./src/modules/dom/dom.js\");\n/* harmony import */ var _setupScreen_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./setupScreen.js */ \"./src/modules/screens/setupScreen.js\");\n\n\n\nconst container = document.querySelector('.game-container');\nconst expression = /^[a-zA-ZÀ-ÿ]{2,10}$/;\nfunction startScreen() {\n  const startContainer = (0,_dom_domHelpers_js__WEBPACK_IMPORTED_MODULE_0__.create)('div', 'start-container', container);\n  const input = (0,_dom_domHelpers_js__WEBPACK_IMPORTED_MODULE_0__.create)('input', 'start-input', startContainer);\n  input.setAttribute('type', 'text');\n  input.setAttribute('placeholder', 'Enter name');\n  (0,_dom_domHelpers_js__WEBPACK_IMPORTED_MODULE_0__.createBtn)(start, 'Start Game', startContainer);\n}\nfunction start() {\n  const name = document.querySelector('.start-input').value;\n  if (!expression.test(name)) {\n    document.querySelector('.start-input').value = '';\n    document.querySelector('.start-input').setAttribute('placeholder', 'Only 2-10 letters!');\n    return;\n  }\n  (0,_dom_dom_js__WEBPACK_IMPORTED_MODULE_1__.elementsPlayer)(name);\n  document.querySelector('.start-container').remove();\n  (0,_setupScreen_js__WEBPACK_IMPORTED_MODULE_2__.initializeBoard)(name);\n}\n\n//# sourceURL=webpack://battleship/./src/modules/screens/startScreen.js?");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/style.css":
/*!*************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/style.css ***!
  \*************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/noSourceMaps.js */ \"./node_modules/css-loader/dist/runtime/noSourceMaps.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/getUrl.js */ \"./node_modules/css-loader/dist/runtime/getUrl.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);\n// Imports\n\n\n\nvar ___CSS_LOADER_URL_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(/*! ../src/assets/img/Designer(2).jpeg */ \"./src/assets/img/Designer(2).jpeg\"), __webpack_require__.b);\nvar ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));\nvar ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_0___);\n// Module\n___CSS_LOADER_EXPORT___.push([module.id, `* {\n    margin: 0;\n    padding: 0;\n    box-sizing: border-box;\n}\n\n.gameboard-player1, .gameboard-player2{\n    width: 30rem;\n    display: grid;\n    grid-template-columns: repeat(10, 1fr);\n    background-color: rgba(255, 255, 255, 0.74);\n    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);\n    position: relative;\n}\n\n.gameboard-container {\n    width: 40rem;\n    height: 40rem;\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    justify-content: center;\n    border-radius: 20px;\n}\n\n.gameboard-container > .active {\n    background-color: #6cb18a;\n    box-shadow: 0 0 10px rgba(20, 168, 82, 0.63);\n}\n\n#button-horizontal, #button-vertical, #button-start {\n  position: absolute;\n  display: flex;\n  justify-content: center;\n  width: 14rem;\n}\n\n.ships-container {\n  width: 9rem;\n  height: 40rem;\n  display: flex;\n  background-color: rgba(0, 0, 0, 0.75);\n  align-items: center;\n  justify-content: center;\n  border-radius: 20px;\n  flex-direction: column;\n}\n\n.ship-card {\n    width: 8rem;\n    height: 7.5rem;\n    background-color: rgba(10, 72, 122, 0.8);\n    align-items: center;\n    justify-content: center;\n    border-radius: 20px;\n    color: white;\n    font-size: larger;\n    display: flex;\n    flex-direction: column;\n    gap: 2rem;\n    align-self: start;\n    box-shadow: inset 0 0 50px rgba(0, 0, 0, 0.5);\n    margin: auto;\n}\n\n.ship-img {\n  max-width: 100%;\n  max-height: 50%;\n}\n\n.log-container {\n    width: 30rem;\n    height: 5rem;\n    background-color: rgba(10, 72, 122, 0.8);\n    align-items: center;\n    justify-content: center;\n    border-radius: 20px;\n    color: white;\n    font-size: larger;\n    flex-direction: column;\n    gap: 2rem;\n    box-shadow: inset 0 0 50px rgba(0, 0, 0, 0.5);\n    display: none;\n}\n\n.miss {\n    color: rgb(255, 145, 0);\n}\n\n.hit {\n    color: red;\n}\n\nh1 {\n    color: white;\n    justify-self: center;\n    align-self: center;\n}\n\n.game-container {\n    width: 100vw;\n    height: 100vh;\n    justify-content: center;\n    align-items: center;\n    display: flex;\n    background: url(${___CSS_LOADER_URL_REPLACEMENT_0___});\n    background-size: cover;\n}\n\n.board-container {\n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n    align-items: center;\n    gap: 1rem;\n}\n\n.end-screen {\n    display: grid;\n    justify-items: center;\n    align-items: center;\n}\n\n.cell {\n    width: 3rem;\n    height: 3rem;\n    border: 1px solid black;\n    justify-content: center;\n    align-items: center;\n    user-select: none;\n    display: flex;\n}\n\n.gameboard-player2 > .cell:hover {\n    background-color: rgba(42, 92, 185, 0.205);\n    cursor: pointer;\n}\n\n.start-container {\n    display: flex;\n    flex-direction: column;\n}\n\ninput {\n    background-color: white; \n    color: black; \n    border: 2px solid #008CBA;\n    padding: 16px 32px;\n    text-align: center;\n    text-decoration: none;\n    display: inline-block;\n    font-size: 16px;\n    margin: 4px 2px;\n    transition-duration: 0.4s;\n    cursor: pointer;\n    border-radius: 20px;\n    box-shadow: \n    0 0 2px 0 rgba(73, 115, 255, .1), \n    0 0 4px 0 rgba(73, 115, 255, .2), \n    0 0 6px 0 rgba(73, 115, 255, .3), \n    0 0 8px 0 rgba(73, 115, 255, .4),\n    0 0 12px 0 rgba(73, 115, 255, .5), \n    0 0 18px 0 rgba(73, 115, 255, .6);\n}\n\n\n.box {\n    transform: translate(0%, 0%);\n    padding: 20px 50px;\n    text-decoration: none;\n    text-transform: uppercase;\n    overflow: hidden;\n    font: 16px/24px Arial, sans-serif;\n    background-color: rgba(10, 72, 122, 0.8);\n    transition: \n      box-shadow 0.4s ease, \n      background-color 0.4s ease, \n      color 0.4s ease;\n  }\n\n  .box-button {\n    box-shadow: \n    0 0 2px 0 rgba(73, 115, 255, .1), \n    0 0 4px 0 rgba(73, 115, 255, .2), \n    0 0 6px 0 rgba(73, 115, 255, .3), \n    0 0 8px 0 rgba(73, 115, 255, .4),\n    0 0 12px 0 rgba(73, 115, 255, .5), \n    0 0 18px 0 rgba(73, 115, 255, .6);\n    border-radius: 20px;\n    cursor: pointer;\n  }\n  \n  .box-button:hover{\n    background-color: rgba(35, 38, 80, 0.8);\n    box-shadow: \n      0 0 2px 0 rgba(73, 115, 238, 0.1), \n      0 0 4px 0 rgba(73, 115, 238, 0.2), \n      0 0 6px 0 rgba(73, 115, 238, 0.3), \n      0 0 8px 0 rgba(73, 115, 238, 0.4),\n      0 0 12px 0 rgba(73, 115, 238, 0.5), \n      0 0 18px 0 rgba(73, 115, 238, 0.6),\n      0 0 4px 0 rgba(73, 115, 238, 0.7);\n  }\n  \n  .box span {\n    color: #fff;\n    letter-spacing: 8px;\n  }\n  \n  .box i {\n    position: absolute;\n    z-index: -1;\n    left: 0;\n    top: 50%;\n    transform: translateY(-50%);\n    width: 100%;\n    box-shadow: inset 0 0 50px rgba(0, 0, 0, 0.5);\n    transition: \n      transform 0.4s linear, \n      top 1s linear;\n    overflow: hidden;\n  }\n\n  .water-button {\n    height: 450%;\n  }\n\n  .water-container {\n    height: 100%;\n  }\n  \n  .box i:before,\n  .box i:after {\n    content: \"\";\n    position: absolute;\n    width: 200%;\n    height: 200%;\n    top: 0;\n    left: 50%;\n    transform: translate(-50%, -75%);\n  }\n  .box i:before {\n    border-radius: 46%;\n    background-color: rgba(255, 255, 255, 0.589);\n    animation: animate 5s linear infinite;\n  }\n  .box i:after {\n    border-radius: 40%;\n    background-color: rgba(255, 255, 255, 0.5);\n    animation: animate 10s linear infinite;\n  }\n  \n  @keyframes animate {\n    0% {\n      transform: \n        translate(-50%, -75%) \n        rotate(0deg);\n    }\n    100% {\n      transform: \n        translate(-50%, -75%) \n        rotate(360deg);\n    }\n  }\n\n  .player {\n    font-size: 2rem;\n    color: white;\n    font-weight: bold;\n    display: none;\n    text-shadow: #008CBA 0 0 5px;\n    position: absolute;\n    top: 5%;\n  }\n\n  .text-end {\n    font-size: 2rem;\n    color: rgb(255, 255, 255);\n    font-weight: bold;\n    text-shadow: #008CBA 0 0 5px;\n  }`, \"\"]);\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);\n\n\n//# sourceURL=webpack://battleship/./src/style.css?./node_modules/css-loader/dist/cjs.js");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {

eval("\n\n/*\n  MIT License http://www.opensource.org/licenses/mit-license.php\n  Author Tobias Koppers @sokra\n*/\nmodule.exports = function (cssWithMappingToString) {\n  var list = [];\n\n  // return the list of modules as css string\n  list.toString = function toString() {\n    return this.map(function (item) {\n      var content = \"\";\n      var needLayer = typeof item[5] !== \"undefined\";\n      if (item[4]) {\n        content += \"@supports (\".concat(item[4], \") {\");\n      }\n      if (item[2]) {\n        content += \"@media \".concat(item[2], \" {\");\n      }\n      if (needLayer) {\n        content += \"@layer\".concat(item[5].length > 0 ? \" \".concat(item[5]) : \"\", \" {\");\n      }\n      content += cssWithMappingToString(item);\n      if (needLayer) {\n        content += \"}\";\n      }\n      if (item[2]) {\n        content += \"}\";\n      }\n      if (item[4]) {\n        content += \"}\";\n      }\n      return content;\n    }).join(\"\");\n  };\n\n  // import a list of modules into the list\n  list.i = function i(modules, media, dedupe, supports, layer) {\n    if (typeof modules === \"string\") {\n      modules = [[null, modules, undefined]];\n    }\n    var alreadyImportedModules = {};\n    if (dedupe) {\n      for (var k = 0; k < this.length; k++) {\n        var id = this[k][0];\n        if (id != null) {\n          alreadyImportedModules[id] = true;\n        }\n      }\n    }\n    for (var _k = 0; _k < modules.length; _k++) {\n      var item = [].concat(modules[_k]);\n      if (dedupe && alreadyImportedModules[item[0]]) {\n        continue;\n      }\n      if (typeof layer !== \"undefined\") {\n        if (typeof item[5] === \"undefined\") {\n          item[5] = layer;\n        } else {\n          item[1] = \"@layer\".concat(item[5].length > 0 ? \" \".concat(item[5]) : \"\", \" {\").concat(item[1], \"}\");\n          item[5] = layer;\n        }\n      }\n      if (media) {\n        if (!item[2]) {\n          item[2] = media;\n        } else {\n          item[1] = \"@media \".concat(item[2], \" {\").concat(item[1], \"}\");\n          item[2] = media;\n        }\n      }\n      if (supports) {\n        if (!item[4]) {\n          item[4] = \"\".concat(supports);\n        } else {\n          item[1] = \"@supports (\".concat(item[4], \") {\").concat(item[1], \"}\");\n          item[4] = supports;\n        }\n      }\n      list.push(item);\n    }\n  };\n  return list;\n};\n\n//# sourceURL=webpack://battleship/./node_modules/css-loader/dist/runtime/api.js?");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/getUrl.js":
/*!********************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/getUrl.js ***!
  \********************************************************/
/***/ ((module) => {

eval("\n\nmodule.exports = function (url, options) {\n  if (!options) {\n    options = {};\n  }\n  if (!url) {\n    return url;\n  }\n  url = String(url.__esModule ? url.default : url);\n\n  // If url is already wrapped in quotes, remove them\n  if (/^['\"].*['\"]$/.test(url)) {\n    url = url.slice(1, -1);\n  }\n  if (options.hash) {\n    url += options.hash;\n  }\n\n  // Should url be wrapped?\n  // See https://drafts.csswg.org/css-values-3/#urls\n  if (/[\"'() \\t\\n]|(%20)/.test(url) || options.needQuotes) {\n    return \"\\\"\".concat(url.replace(/\"/g, '\\\\\"').replace(/\\n/g, \"\\\\n\"), \"\\\"\");\n  }\n  return url;\n};\n\n//# sourceURL=webpack://battleship/./node_modules/css-loader/dist/runtime/getUrl.js?");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/noSourceMaps.js":
/*!**************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/noSourceMaps.js ***!
  \**************************************************************/
/***/ ((module) => {

eval("\n\nmodule.exports = function (i) {\n  return i[1];\n};\n\n//# sourceURL=webpack://battleship/./node_modules/css-loader/dist/runtime/noSourceMaps.js?");

/***/ }),

/***/ "./src/style.css":
/*!***********************!*\
  !*** ./src/style.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ \"./node_modules/style-loader/dist/runtime/styleDomAPI.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ \"./node_modules/style-loader/dist/runtime/insertBySelector.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ \"./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ \"./node_modules/style-loader/dist/runtime/insertStyleElement.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ \"./node_modules/style-loader/dist/runtime/styleTagTransform.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./style.css */ \"./node_modules/css-loader/dist/cjs.js!./src/style.css\");\n\n      \n      \n      \n      \n      \n      \n      \n      \n      \n\nvar options = {};\n\noptions.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());\noptions.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());\noptions.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, \"head\");\noptions.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());\noptions.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());\n\nvar update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"], options);\n\n\n\n\n       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"] && _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals ? _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals : undefined);\n\n\n//# sourceURL=webpack://battleship/./src/style.css?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {

eval("\n\nvar stylesInDOM = [];\nfunction getIndexByIdentifier(identifier) {\n  var result = -1;\n  for (var i = 0; i < stylesInDOM.length; i++) {\n    if (stylesInDOM[i].identifier === identifier) {\n      result = i;\n      break;\n    }\n  }\n  return result;\n}\nfunction modulesToDom(list, options) {\n  var idCountMap = {};\n  var identifiers = [];\n  for (var i = 0; i < list.length; i++) {\n    var item = list[i];\n    var id = options.base ? item[0] + options.base : item[0];\n    var count = idCountMap[id] || 0;\n    var identifier = \"\".concat(id, \" \").concat(count);\n    idCountMap[id] = count + 1;\n    var indexByIdentifier = getIndexByIdentifier(identifier);\n    var obj = {\n      css: item[1],\n      media: item[2],\n      sourceMap: item[3],\n      supports: item[4],\n      layer: item[5]\n    };\n    if (indexByIdentifier !== -1) {\n      stylesInDOM[indexByIdentifier].references++;\n      stylesInDOM[indexByIdentifier].updater(obj);\n    } else {\n      var updater = addElementStyle(obj, options);\n      options.byIndex = i;\n      stylesInDOM.splice(i, 0, {\n        identifier: identifier,\n        updater: updater,\n        references: 1\n      });\n    }\n    identifiers.push(identifier);\n  }\n  return identifiers;\n}\nfunction addElementStyle(obj, options) {\n  var api = options.domAPI(options);\n  api.update(obj);\n  var updater = function updater(newObj) {\n    if (newObj) {\n      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {\n        return;\n      }\n      api.update(obj = newObj);\n    } else {\n      api.remove();\n    }\n  };\n  return updater;\n}\nmodule.exports = function (list, options) {\n  options = options || {};\n  list = list || [];\n  var lastIdentifiers = modulesToDom(list, options);\n  return function update(newList) {\n    newList = newList || [];\n    for (var i = 0; i < lastIdentifiers.length; i++) {\n      var identifier = lastIdentifiers[i];\n      var index = getIndexByIdentifier(identifier);\n      stylesInDOM[index].references--;\n    }\n    var newLastIdentifiers = modulesToDom(newList, options);\n    for (var _i = 0; _i < lastIdentifiers.length; _i++) {\n      var _identifier = lastIdentifiers[_i];\n      var _index = getIndexByIdentifier(_identifier);\n      if (stylesInDOM[_index].references === 0) {\n        stylesInDOM[_index].updater();\n        stylesInDOM.splice(_index, 1);\n      }\n    }\n    lastIdentifiers = newLastIdentifiers;\n  };\n};\n\n//# sourceURL=webpack://battleship/./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {

eval("\n\nvar memo = {};\n\n/* istanbul ignore next  */\nfunction getTarget(target) {\n  if (typeof memo[target] === \"undefined\") {\n    var styleTarget = document.querySelector(target);\n\n    // Special case to return head of iframe instead of iframe itself\n    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {\n      try {\n        // This will throw an exception if access to iframe is blocked\n        // due to cross-origin restrictions\n        styleTarget = styleTarget.contentDocument.head;\n      } catch (e) {\n        // istanbul ignore next\n        styleTarget = null;\n      }\n    }\n    memo[target] = styleTarget;\n  }\n  return memo[target];\n}\n\n/* istanbul ignore next  */\nfunction insertBySelector(insert, style) {\n  var target = getTarget(insert);\n  if (!target) {\n    throw new Error(\"Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.\");\n  }\n  target.appendChild(style);\n}\nmodule.exports = insertBySelector;\n\n//# sourceURL=webpack://battleship/./node_modules/style-loader/dist/runtime/insertBySelector.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {

eval("\n\n/* istanbul ignore next  */\nfunction insertStyleElement(options) {\n  var element = document.createElement(\"style\");\n  options.setAttributes(element, options.attributes);\n  options.insert(element, options.options);\n  return element;\n}\nmodule.exports = insertStyleElement;\n\n//# sourceURL=webpack://battleship/./node_modules/style-loader/dist/runtime/insertStyleElement.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\n\n/* istanbul ignore next  */\nfunction setAttributesWithoutAttributes(styleElement) {\n  var nonce =  true ? __webpack_require__.nc : 0;\n  if (nonce) {\n    styleElement.setAttribute(\"nonce\", nonce);\n  }\n}\nmodule.exports = setAttributesWithoutAttributes;\n\n//# sourceURL=webpack://battleship/./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {

eval("\n\n/* istanbul ignore next  */\nfunction apply(styleElement, options, obj) {\n  var css = \"\";\n  if (obj.supports) {\n    css += \"@supports (\".concat(obj.supports, \") {\");\n  }\n  if (obj.media) {\n    css += \"@media \".concat(obj.media, \" {\");\n  }\n  var needLayer = typeof obj.layer !== \"undefined\";\n  if (needLayer) {\n    css += \"@layer\".concat(obj.layer.length > 0 ? \" \".concat(obj.layer) : \"\", \" {\");\n  }\n  css += obj.css;\n  if (needLayer) {\n    css += \"}\";\n  }\n  if (obj.media) {\n    css += \"}\";\n  }\n  if (obj.supports) {\n    css += \"}\";\n  }\n  var sourceMap = obj.sourceMap;\n  if (sourceMap && typeof btoa !== \"undefined\") {\n    css += \"\\n/*# sourceMappingURL=data:application/json;base64,\".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), \" */\");\n  }\n\n  // For old IE\n  /* istanbul ignore if  */\n  options.styleTagTransform(css, styleElement, options.options);\n}\nfunction removeStyleElement(styleElement) {\n  // istanbul ignore if\n  if (styleElement.parentNode === null) {\n    return false;\n  }\n  styleElement.parentNode.removeChild(styleElement);\n}\n\n/* istanbul ignore next  */\nfunction domAPI(options) {\n  if (typeof document === \"undefined\") {\n    return {\n      update: function update() {},\n      remove: function remove() {}\n    };\n  }\n  var styleElement = options.insertStyleElement(options);\n  return {\n    update: function update(obj) {\n      apply(styleElement, options, obj);\n    },\n    remove: function remove() {\n      removeStyleElement(styleElement);\n    }\n  };\n}\nmodule.exports = domAPI;\n\n//# sourceURL=webpack://battleship/./node_modules/style-loader/dist/runtime/styleDomAPI.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {

eval("\n\n/* istanbul ignore next  */\nfunction styleTagTransform(css, styleElement) {\n  if (styleElement.styleSheet) {\n    styleElement.styleSheet.cssText = css;\n  } else {\n    while (styleElement.firstChild) {\n      styleElement.removeChild(styleElement.firstChild);\n    }\n    styleElement.appendChild(document.createTextNode(css));\n  }\n}\nmodule.exports = styleTagTransform;\n\n//# sourceURL=webpack://battleship/./node_modules/style-loader/dist/runtime/styleTagTransform.js?");

/***/ }),

/***/ "./src/assets/img/Designer(2).jpeg":
/*!*****************************************!*\
  !*** ./src/assets/img/Designer(2).jpeg ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__.p + \"9dbd8b9428dc39883515.jpeg\";\n\n//# sourceURL=webpack://battleship/./src/assets/img/Designer(2).jpeg?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript && document.currentScript.tagName.toUpperCase() === 'SCRIPT')
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && (!scriptUrl || !/^http(s?):/.test(scriptUrl))) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		__webpack_require__.b = document.baseURI || self.location.href;
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// no jsonp function
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;