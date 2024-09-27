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

/***/ "./src/controller.js":
/*!***************************!*\
  !*** ./src/controller.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   handleBoard: () => (/* binding */ handleBoard)\n/* harmony export */ });\n/* harmony import */ var _dom_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom.js */ \"./src/dom.js\");\n/* harmony import */ var _endScreen_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./endScreen.js */ \"./src/endScreen.js\");\n\n\nfunction handleBoard(player1, player2) {\n  const divGameboard2 = document.querySelector('.gameboard-player2');\n  const newPlayer1 = player1;\n  const newPlayer2 = player2;\n  function addListener() {\n    divGameboard2.addEventListener('click', handlePlayerMove);\n  }\n  function removeListener() {\n    divGameboard2.removeEventListener('click', handlePlayerMove);\n  }\n  removeListener();\n  addListener();\n  async function handlePlayerMove(e) {\n    if (!e.target.classList.contains('cell') || e.target.classList.contains('clicked')) return;\n    const {\n      x,\n      y\n    } = getCoordinatesPlayer(e);\n    if (x === undefined || y === undefined) return;\n    const targetCell = newPlayer2.playerBoard.receiveAttack(x, y);\n    removeListener();\n    if (targetCell !== 'M') {\n      if (newPlayer2.playerBoard.endGame() === true) {\n        (0,_endScreen_js__WEBPACK_IMPORTED_MODULE_1__.endScreen)('win', newPlayer1);\n      } else {\n        targetCell.sunk === true ? (0,_dom_js__WEBPACK_IMPORTED_MODULE_0__.sunkMessage)(targetCell, newPlayer2) : (0,_dom_js__WEBPACK_IMPORTED_MODULE_0__.hitMessage)(newPlayer2);\n      }\n    }\n    const result = targetCell === 'M' ? 'M' : 'X';\n    updateCell(e.target, result);\n    if (result === 'M') {\n      (0,_dom_js__WEBPACK_IMPORTED_MODULE_0__.missMessage)(newPlayer1);\n      await delay(500);\n      handleCpuMove();\n    } else {\n      await delay(1500);\n      addListener();\n    }\n  }\n  const cpuAi = cpu();\n  async function handleCpuMove() {\n    removeListener();\n    cpuAi.startAttack();\n  }\n  function updateCell(cell, result) {\n    cell.textContent = result;\n    cell.classList.add('clicked', result === 'X' ? 'hit' : 'miss');\n  }\n  function cpu() {\n    const divGameboard1 = document.querySelector('.gameboard-player1');\n    const arrayCells = Array.from(divGameboard1.querySelectorAll('.cell'));\n    function randomAttack() {\n      const cell = arrayCells[Math.floor(Math.random() * arrayCells.length)];\n      const {\n        x,\n        y\n      } = getCoordinatesCPU(cell);\n      attack(cell, x, y);\n    }\n    function startAttack() {\n      const attackedShip = newPlayer1.playerBoard.ships.find(ship => ship.hits > 0 && ship.sunk === false);\n      if (attackedShip) {\n        const x = Number(attackedShip.hitPosition[0].x);\n        const y = Number(attackedShip.hitPosition[0].y);\n        predictiveAttack(x, y);\n      } else {\n        randomAttack();\n      }\n    }\n    async function predictiveAttack(x, y) {\n      let attempts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;\n      if (attempts >= 4) {\n        const attackedShip = newPlayer1.playerBoard.ships.find(ship => ship.hitPosition.some(position => Number(position.x) === x && Number(position.y) === y));\n        attackedShip.hitPosition.push(attackedShip.hitPosition.shift());\n        startAttack();\n        return;\n      }\n      const directions = [{\n        dx: 1,\n        dy: 0\n      }, {\n        dx: -1,\n        dy: 0\n      }, {\n        dx: 0,\n        dy: 1\n      }, {\n        dx: 0,\n        dy: -1\n      }];\n      const {\n        dx,\n        dy\n      } = directions[Math.floor(Math.random() * directions.length)];\n      const targetCell = arrayCells.find(cell => {\n        const cellX = Number(cell.dataset.x);\n        const cellY = Number(cell.dataset.y);\n        return cellX === x + dx && cellY === y + dy && !cell.classList.contains('clicked');\n      });\n      if (targetCell) {\n        const cellX = Number(targetCell.dataset.x);\n        const cellY = Number(targetCell.dataset.y);\n        attack(targetCell, cellX, cellY);\n      } else {\n        predictiveAttack(x, y, attempts + 1);\n      }\n    }\n    async function attack(cell, x, y) {\n      await delay(1500);\n      const targetCell = newPlayer1.playerBoard.receiveAttack(x, y);\n      if (targetCell !== 'M') {\n        if (newPlayer1.playerBoard.endGame() === true) {\n          (0,_endScreen_js__WEBPACK_IMPORTED_MODULE_1__.endScreen)('win', newPlayer1);\n        } else {\n          targetCell.sunk === true ? (0,_dom_js__WEBPACK_IMPORTED_MODULE_0__.sunkMessage)(targetCell, newPlayer1) : (0,_dom_js__WEBPACK_IMPORTED_MODULE_0__.hitMessage)(newPlayer1);\n        }\n      }\n      const result = targetCell === 'M' ? 'M' : 'X';\n      updateCell(cell, result);\n      arrayCells.splice(arrayCells.indexOf(cell), 1);\n      result === 'X' ? predictiveAttack(x, y) : (addListener(), (0,_dom_js__WEBPACK_IMPORTED_MODULE_0__.missMessage)(newPlayer2));\n    }\n    return {\n      startAttack: () => startAttack(),\n      getArray: () => arrayCells\n    };\n  }\n  function getCoordinatesPlayer(e) {\n    return {\n      x: Number(e.target.dataset.x),\n      y: Number(e.target.dataset.y)\n    };\n  }\n  function getCoordinatesCPU(cell) {\n    return {\n      x: Number(cell.dataset.x),\n      y: Number(cell.dataset.y)\n    };\n  }\n  function delay(ms) {\n    return new Promise(resolve => setTimeout(resolve, ms));\n  }\n  return {\n    addListener,\n    removeListener\n  };\n}\n\n//# sourceURL=webpack://battleship/./src/controller.js?");

/***/ }),

/***/ "./src/dom.js":
/*!********************!*\
  !*** ./src/dom.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   elementsCPU: () => (/* binding */ elementsCPU),\n/* harmony export */   elementsPlayer: () => (/* binding */ elementsPlayer),\n/* harmony export */   hitMessage: () => (/* binding */ hitMessage),\n/* harmony export */   missMessage: () => (/* binding */ missMessage),\n/* harmony export */   sunkMessage: () => (/* binding */ sunkMessage)\n/* harmony export */ });\n/* harmony import */ var _domHelpers_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./domHelpers.js */ \"./src/domHelpers.js\");\n\nconst carrier = new Image('./img/carrier.svg');\nconst gameContainer = document.querySelector('.game-container');\nfunction elementsPlayer(name) {\n  const boardContainer = (0,_domHelpers_js__WEBPACK_IMPORTED_MODULE_0__.create)('div', 'board-container', gameContainer);\n  const gameboardContainer1 = (0,_domHelpers_js__WEBPACK_IMPORTED_MODULE_0__.create)('div', 'gameboard-container', boardContainer);\n  gameboardContainer1.classList.add('box');\n  const span1 = (0,_domHelpers_js__WEBPACK_IMPORTED_MODULE_0__.create)('span', 'player', gameboardContainer1);\n  span1.innerHTML = `${name}'s waters`;\n  const i1 = (0,_domHelpers_js__WEBPACK_IMPORTED_MODULE_0__.create)('i', 'water-container', gameboardContainer1);\n  const divGameboard1 = (0,_domHelpers_js__WEBPACK_IMPORTED_MODULE_0__.create)('div', 'gameboard-player1', gameboardContainer1);\n  const logContainer1 = (0,_domHelpers_js__WEBPACK_IMPORTED_MODULE_0__.create)('div', 'log-container', boardContainer);\n  logContainer1.innerHTML = '<p>Your log</p><p class=\" CPU\"></p>';\n  function createCells() {\n    for (let i = 0; i < 10; i++) {\n      for (let j = 0; j < 10; j++) {\n        const cell1 = (0,_domHelpers_js__WEBPACK_IMPORTED_MODULE_0__.create)('div', 'cell', divGameboard1);\n        cell1.dataset.x = j;\n        cell1.dataset.y = i;\n      }\n    }\n  }\n  createCells();\n  shipsSelector();\n  return {\n    divGameboard1\n  };\n}\nfunction shipsSelector() {\n  const shipsContainer = (0,_domHelpers_js__WEBPACK_IMPORTED_MODULE_0__.create)('div', 'ships-container', gameContainer);\n  const shipsData = [{\n    length: 2,\n    name: 'Destroyer',\n    symbol: 'D'\n  }, {\n    length: 3,\n    name: 'Submarine',\n    symbol: 'S'\n  }, {\n    length: 3,\n    name: 'Cruiser',\n    symbol: 'C'\n  }, {\n    length: 4,\n    name: 'Battleship',\n    symbol: 'B'\n  }, {\n    length: 5,\n    name: 'Carrier',\n    symbol: 'A'\n  }];\n  shipsData.forEach(ship => {\n    const shipCard = (0,_domHelpers_js__WEBPACK_IMPORTED_MODULE_0__.create)('div', 'ship-card', shipsContainer);\n    const shipName = (0,_domHelpers_js__WEBPACK_IMPORTED_MODULE_0__.create)('p', 'ship-name', shipCard);\n    shipName.innerHTML = ship.name;\n    const shipImg = (0,_domHelpers_js__WEBPACK_IMPORTED_MODULE_0__.create)('img', 'ship-img', shipCard);\n    shipImg.src = `./img/${ship.name}.svg`;\n    shipImg.setAttribute('id', `${ship.name}`);\n  });\n}\nfunction elementsCPU() {\n  const boardContainer = (0,_domHelpers_js__WEBPACK_IMPORTED_MODULE_0__.create)('div', 'board-container', gameContainer);\n  const gameboardContainer2 = (0,_domHelpers_js__WEBPACK_IMPORTED_MODULE_0__.create)('div', 'gameboard-container', boardContainer);\n  gameboardContainer2.classList.add('box');\n  const span2 = (0,_domHelpers_js__WEBPACK_IMPORTED_MODULE_0__.create)('span', 'player', gameboardContainer2);\n  span2.innerHTML = `Enemy waters`;\n  const i2 = (0,_domHelpers_js__WEBPACK_IMPORTED_MODULE_0__.create)('i', 'water-container', gameboardContainer2);\n  const logContainer2 = (0,_domHelpers_js__WEBPACK_IMPORTED_MODULE_0__.create)('div', 'log-container', boardContainer);\n  const divGameboard2 = (0,_domHelpers_js__WEBPACK_IMPORTED_MODULE_0__.create)('div', 'gameboard-player2', gameboardContainer2);\n  logContainer2.innerHTML = '<p>Enemy log</p><p class=\" P1\"></p>';\n  function createCells() {\n    for (let i = 0; i < 10; i++) {\n      for (let j = 0; j < 10; j++) {\n        const cell2 = (0,_domHelpers_js__WEBPACK_IMPORTED_MODULE_0__.create)('div', 'cell', divGameboard2);\n        cell2.dataset.x = j;\n        cell2.dataset.y = i;\n      }\n    }\n  }\n  createCells();\n}\nfunction typeWriter(text, element) {\n  let speed = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 45;\n  let i = 0;\n  function type() {\n    if (i < text.length) {\n      element.innerHTML += text.charAt(i);\n      i++;\n      setTimeout(type, speed);\n    }\n  }\n  type();\n}\nfunction hitMessage(player) {\n  const newParagraph = player.name === 'CPU' ? document.querySelector('.P1') : document.querySelector('.CPU');\n  newParagraph.innerHTML = '';\n  const message = `${player.name}'s ship has been hit!`;\n  typeWriter(message, newParagraph);\n}\nfunction missMessage(player) {\n  const newParagraph = player.name === 'CPU' ? document.querySelector('.CPU') : document.querySelector('.P1');\n  newParagraph.innerHTML = '';\n  const message = `${player.name}'s attack missed!`;\n  typeWriter(message, newParagraph);\n}\nfunction sunkMessage(ship, player) {\n  const newParagraph = player.name === 'CPU' ? document.querySelector('.P1') : document.querySelector('.CPU');\n  newParagraph.innerHTML = '';\n  const message = `${player.name}'s ${ship.name} has been sunk!`;\n  typeWriter(message, newParagraph);\n}\n\n//# sourceURL=webpack://battleship/./src/dom.js?");

/***/ }),

/***/ "./src/domHelpers.js":
/*!***************************!*\
  !*** ./src/domHelpers.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   create: () => (/* binding */ create),\n/* harmony export */   createBtn: () => (/* binding */ createBtn)\n/* harmony export */ });\nfunction create(type, className, parent) {\n  const element = document.createElement(type);\n  element.classList.add(className);\n  parent.appendChild(element);\n  return element;\n}\nfunction createBtn(callback, text, container, id) {\n  const button = create('div', 'box', container);\n  button.classList.add('box-button');\n  create('span', 'span', button).innerHTML = `${text}`;\n  create('i', 'water-button', button);\n  button.addEventListener('click', callback);\n  if (id) button.setAttribute('id', id);\n  return button;\n}\n\n//# sourceURL=webpack://battleship/./src/domHelpers.js?");

/***/ }),

/***/ "./src/endScreen.js":
/*!**************************!*\
  !*** ./src/endScreen.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   endScreen: () => (/* binding */ endScreen)\n/* harmony export */ });\n/* harmony import */ var _domHelpers_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./domHelpers.js */ \"./src/domHelpers.js\");\n\nconst container = document.querySelector('.game-container');\nfunction endScreen(state, player) {\n  container.innerHTML = '';\n  container.setAttribute('style', 'grid-template-columns: 1fr');\n  const endScreen = document.createElement('div');\n  endScreen.classList.add('end-screen');\n  state === 'win' ? (0,_domHelpers_js__WEBPACK_IMPORTED_MODULE_0__.create)('p', 'text-end', endScreen).innerHTML = `${player.name} wins!` : (0,_domHelpers_js__WEBPACK_IMPORTED_MODULE_0__.create)('p', 'text-end', endScreen).innerHTML = 'You lose!';\n  (0,_domHelpers_js__WEBPACK_IMPORTED_MODULE_0__.createBtn)(() => location.reload(), 'Play Again!', endScreen);\n  container.appendChild(endScreen);\n}\n\n//# sourceURL=webpack://battleship/./src/endScreen.js?");

/***/ }),

/***/ "./src/gameScreen.js":
/*!***************************!*\
  !*** ./src/gameScreen.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   gameScreen: () => (/* binding */ gameScreen)\n/* harmony export */ });\n/* harmony import */ var _dom_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom.js */ \"./src/dom.js\");\n/* harmony import */ var _setupScreen_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./setupScreen.js */ \"./src/setupScreen.js\");\n/* harmony import */ var _controller_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./controller.js */ \"./src/controller.js\");\n\n\n\nfunction gameScreen(player) {\n  const container = document.querySelector('.game-container');\n  document.querySelector('.ships-container').remove();\n  document.getElementById('button-horizontal').remove();\n  document.getElementById('button-vertical').remove();\n  document.getElementById('button-start').remove();\n  container.style.display = 'grid';\n  container.style.gridTemplateColumns = '1fr 1fr';\n  container.style.justifyItems = 'center';\n  container.style.alignItems = 'center';\n  (0,_dom_js__WEBPACK_IMPORTED_MODULE_0__.elementsCPU)();\n  const cpu = (0,_setupScreen_js__WEBPACK_IMPORTED_MODULE_1__.initializeBoard)('CPU');\n  displayDom();\n  (0,_controller_js__WEBPACK_IMPORTED_MODULE_2__.handleBoard)(player, cpu);\n  console.log(player.playerBoard.ships, cpu.playerBoard.ships);\n}\nfunction displayDom() {\n  const spanName = document.querySelectorAll('.player');\n  spanName[0].style.display = 'block';\n  spanName[1].style.display = 'block';\n  const logContainer = document.querySelectorAll('.log-container');\n  logContainer[0].style.display = 'flex';\n  logContainer[1].style.display = 'flex';\n}\n\n//# sourceURL=webpack://battleship/./src/gameScreen.js?");

/***/ }),

/***/ "./src/gameboard.js":
/*!**************************!*\
  !*** ./src/gameboard.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ gameboard)\n/* harmony export */ });\nfunction gameboard() {\n  const board = Array.from({\n    length: 10\n  }, () => Array(10).fill(null));\n  const ships = [];\n  const missedShots = [];\n  const successfulShot = [];\n  function receiveAttack(x, y) {\n    if (board[y][x] === null) {\n      missedShots.push({\n        x,\n        y\n      });\n      board[y][x] = 'M';\n      return 'M';\n    } else {\n      const ship = ships.find(s => s.position.some(pos => pos.x === x && pos.y === y));\n      if (ship) {\n        ship.hit();\n        ship.hitPosition.push({\n          x,\n          y\n        });\n        ship.position.splice(ship.position.findIndex(pos => pos.x === x && pos.y === y), 1);\n        successfulShot.push({\n          x,\n          y\n        });\n        board[y][x] = 'X';\n      }\n      return ship;\n    }\n  }\n  function isValidPosition(ship, x, y, orientation) {\n    for (let i = 0; i < ship.length; i++) {\n      const posX = orientation === 'horizontal' ? x + i : x;\n      const posY = orientation === 'vertical' ? y + i : y;\n      if (posX >= 10 || posY >= 10 || board[posY][posX] !== null) {\n        throw new Error('Ship already placed');\n      }\n    }\n    return true;\n  }\n  function placeShipOnBoard(ship, x, y, orientation) {\n    for (let i = 0; i < ship.length; i++) {\n      const posX = orientation === 'horizontal' ? x + i : x;\n      const posY = orientation === 'vertical' ? y + i : y;\n      board[posY][posX] = ship.symbol;\n      ship.position.push({\n        x: posX,\n        y: posY\n      });\n    }\n  }\n  function placeShip(ship, orientation, x, y) {\n    if (x < 0 || y < 0 || orientation === 'horizontal' && x + ship.length > 10 || orientation === 'vertical' && y + ship.length > 10) {\n      throw new Error('Invalid coordinates');\n    }\n    if (isValidPosition(ship, x, y, orientation)) {\n      placeShipOnBoard(ship, x, y, orientation);\n      ships.push(ship);\n      return true;\n    } else {\n      return false;\n    }\n  }\n  function printBoard() {\n    console.log('  1 2 3 4 5 6 7 8 9 10');\n    for (let i = 0; i < board.length; i++) {\n      console.log(i + 1 + ' ' + board[i].join(' '));\n    }\n  }\n  function endGame() {\n    const state = ships.every(ship => ship.sunk) ? true : false;\n    return state;\n  }\n  return {\n    get board() {\n      return board;\n    },\n    ships,\n    missedShots,\n    successfulShot,\n    receiveAttack,\n    placeShip,\n    printBoard,\n    endGame\n  };\n}\n\n//# sourceURL=webpack://battleship/./src/gameboard.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _startScreen_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./startScreen.js */ \"./src/startScreen.js\");\n\n//import * as css from \"./style.css\";\n\n(0,_startScreen_js__WEBPACK_IMPORTED_MODULE_0__.startScreen)();\n\n//# sourceURL=webpack://battleship/./src/index.js?");

/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ player1)\n/* harmony export */ });\n/* harmony import */ var _src_gameboard_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../src/gameboard.js */ \"./src/gameboard.js\");\n\nfunction player1(name) {\n  const playerBoard = (0,_src_gameboard_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])();\n  return {\n    name,\n    get playerBoard() {\n      return playerBoard;\n    }\n  };\n}\n;\n\n//# sourceURL=webpack://battleship/./src/player.js?");

/***/ }),

/***/ "./src/setupScreen.js":
/*!****************************!*\
  !*** ./src/setupScreen.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   initializeBoard: () => (/* binding */ initializeBoard),\n/* harmony export */   initializePlayerBoard: () => (/* binding */ initializePlayerBoard)\n/* harmony export */ });\n/* harmony import */ var _domHelpers_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./domHelpers.js */ \"./src/domHelpers.js\");\n/* harmony import */ var _player_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./player.js */ \"./src/player.js\");\n/* harmony import */ var _ship_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ship.js */ \"./src/ship.js\");\n/* harmony import */ var _gameScreen_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./gameScreen.js */ \"./src/gameScreen.js\");\n\n\n\n\nfunction initializeBoard(name) {\n  const player = (0,_player_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(name);\n  const shipsData = [{\n    length: 2,\n    name: 'Destroyer',\n    symbol: 'D'\n  }, {\n    length: 3,\n    name: 'Submarine',\n    symbol: 'S'\n  }, {\n    length: 3,\n    name: 'Cruiser',\n    symbol: 'C'\n  }, {\n    length: 4,\n    name: 'Battleship',\n    symbol: 'B'\n  }, {\n    length: 5,\n    name: 'Carrier',\n    symbol: 'A'\n  }];\n  name === 'CPU' ? initializeCPUBoard(player, shipsData) : initializePlayerBoard(player, shipsData);\n  return player;\n}\nfunction isMobileDevice() {\n  return /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);\n}\nconst device = isMobileDevice() ? 'mobile' : 'desktop';\nfunction initializeCPUBoard(player, ships) {\n  const playerBoard = player.playerBoard;\n  ships.forEach(_ref => {\n    let {\n      length,\n      name,\n      symbol\n    } = _ref;\n    let shipPlaced = false;\n    while (!shipPlaced) {\n      const orientation = Math.random() > 0.5 ? 'horizontal' : 'vertical';\n      const x = Math.floor(Math.random() * 10);\n      const y = Math.floor(Math.random() * 10);\n      try {\n        playerBoard.placeShip((0,_ship_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(length, name, symbol), orientation, x, y);\n        shipPlaced = true;\n      } catch (error) {\n        console.log(`Error placing ${name}: ${error.message}. Retrying...`);\n      }\n    }\n  });\n}\nfunction initializePlayerBoard(player, shipsData) {\n  const playerBoard = player.playerBoard;\n  const playerGameboard = document.querySelector('.gameboard-player1');\n  const ships = shipsData;\n  let counter = 0;\n  let orientation = 'horizontal';\n  const buttonH = (0,_domHelpers_js__WEBPACK_IMPORTED_MODULE_0__.createBtn)(() => {\n    orientation = 'horizontal';\n    buttonH.classList.add('active');\n    buttonV.classList.remove('active');\n    buttonV.style.removeProperty('background-color');\n    buttonH.style.color = 'white';\n  }, 'Horizontal', document.querySelector('.gameboard-container'), 'button-horizontal');\n  const buttonV = (0,_domHelpers_js__WEBPACK_IMPORTED_MODULE_0__.createBtn)(() => {\n    orientation = 'vertical';\n    buttonV.classList.add('active');\n    buttonH.classList.remove('active');\n    buttonH.style.removeProperty('background-color');\n  }, 'Vertical', document.querySelector('.gameboard-container'), 'button-vertical');\n  buttonH.classList.add('active');\n  buttonH.style.top = '1%';\n  buttonH.style.left = '5%';\n  buttonV.style.top = '1%';\n  buttonV.style.right = '5%';\n  const buttonS = (0,_domHelpers_js__WEBPACK_IMPORTED_MODULE_0__.createBtn)(() => {\n    if (counter < 5) return;\n    (0,_gameScreen_js__WEBPACK_IMPORTED_MODULE_3__.gameScreen)(player);\n  }, 'Start', document.querySelector('.gameboard-container'), 'button-start');\n  buttonS.style.bottom = '1%';\n  buttonS.style.justifySelf = 'center';\n  ships.forEach(ship => {\n    const shipImg = document.getElementById(ship.name);\n    shipImg.addEventListener(device === 'mobile' ? 'touchstart' : 'dragstart', e => {\n      const shipData = JSON.stringify(ship);\n      e.dataTransfer.setData('application/json', shipData);\n    });\n  });\n  playerGameboard.addEventListener(device === 'mobile' ? 'touchmove' : 'dragover', event => {\n    event.preventDefault();\n  });\n  playerGameboard.addEventListener(device === 'mobile' ? 'touchend' : 'drop', event => {\n    event.preventDefault();\n    const data = event.dataTransfer.getData('application/json');\n    const shipObject = JSON.parse(data);\n    const shipImg = document.getElementById(shipObject.name);\n    const cell = event.target;\n    const x = Number(cell.getAttribute('data-x'));\n    const y = Number(cell.getAttribute('data-y'));\n    orientation === 'vertical' ? shipImg.style.transform = 'rotate(90deg) translate(0px, -100%)' : shipImg.style.transform = 'rotate(0deg) translate(0%, 0px)';\n    if (!playerBoard.placeShip((0,_ship_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(shipObject.length, shipObject.name, shipObject.symbol), orientation, x, y)) {\n      return;\n    }\n    ;\n    playerGameboard.appendChild(shipImg);\n    shipImg.setAttribute('draggable', 'false');\n    shipImg.style.position = 'absolute';\n    shipImg.style.left = `${x * 10}%`;\n    shipImg.style.top = `${y * 10}%`;\n    shipImg.style.height = '10%';\n    shipImg.style.aspectRatio = `${shipObject.length} / 1`;\n    shipImg.style.transformOrigin = 'top left 0px';\n    shipImg.style.zIndex = '-1';\n    counter++;\n  });\n}\n\n//# sourceURL=webpack://battleship/./src/setupScreen.js?");

/***/ }),

/***/ "./src/ship.js":
/*!*********************!*\
  !*** ./src/ship.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ ship)\n/* harmony export */ });\nfunction ship(length, name, symbol) {\n  let hits = 0;\n  let sunk = false;\n  let position = [];\n  let hitPosition = [];\n  function hit() {\n    hits++;\n    if (hits === length) {\n      sunk = true;\n    }\n  }\n  return {\n    length,\n    name,\n    symbol,\n    get hits() {\n      return hits;\n    },\n    get sunk() {\n      return sunk;\n    },\n    hit,\n    position,\n    hitPosition\n  };\n}\n\n//# sourceURL=webpack://battleship/./src/ship.js?");

/***/ }),

/***/ "./src/startScreen.js":
/*!****************************!*\
  !*** ./src/startScreen.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   startScreen: () => (/* binding */ startScreen)\n/* harmony export */ });\n/* harmony import */ var _domHelpers_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./domHelpers.js */ \"./src/domHelpers.js\");\n/* harmony import */ var _dom_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dom.js */ \"./src/dom.js\");\n/* harmony import */ var _controller_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./controller.js */ \"./src/controller.js\");\n/* harmony import */ var _setupScreen_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./setupScreen.js */ \"./src/setupScreen.js\");\n\n\n\n\nconst container = document.querySelector('.game-container');\nconst expression = /^[a-zA-ZÀ-ÿ]{2,10}$/;\nfunction startScreen() {\n  const startContainer = (0,_domHelpers_js__WEBPACK_IMPORTED_MODULE_0__.create)('div', 'start-container', container);\n  const input = (0,_domHelpers_js__WEBPACK_IMPORTED_MODULE_0__.create)('input', 'start-input', startContainer);\n  input.setAttribute('type', 'text');\n  input.setAttribute('placeholder', 'Enter name');\n  (0,_domHelpers_js__WEBPACK_IMPORTED_MODULE_0__.createBtn)(start, 'Start Game', startContainer);\n}\nfunction start() {\n  const name = document.querySelector('.start-input').value;\n  if (!expression.test(name)) {\n    document.querySelector('.start-input').value = '';\n    document.querySelector('.start-input').setAttribute('placeholder', 'Only 2-10 letters!');\n    return;\n  }\n  (0,_dom_js__WEBPACK_IMPORTED_MODULE_1__.elementsPlayer)(name);\n  document.querySelector('.start-container').remove();\n  (0,_setupScreen_js__WEBPACK_IMPORTED_MODULE_3__.initializeBoard)(name);\n}\n\n//# sourceURL=webpack://battleship/./src/startScreen.js?");

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
/******/ 			// no module.id needed
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
/************************************************************************/
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
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;