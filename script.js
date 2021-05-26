/**
 * Modular Board Function used to setup the array that
 * will display the moves onto the board.
 */

const tBoard = (() => {
	let myBoard = new Array(9);

	const setInput = (btnIndex, player) => {
		myBoard[btnIndex] = player.getMark();
	};

	const resetArray = () => {
		for (let i = 0; i < myBoard.length; i++) {
			myBoard[i] = "";
		}
	};

	const fullDraw = () => {
		for (let i = 0; i < myBoard.length; i++) {
			if (myBoard[i] !== "X" && myBoard[i] !== "O") {
				return false;
			}
		}
		return true;
	};

	return { setInput, myBoard, resetArray, fullDraw };
})();

/**
 *
 * @param {*} mark is the option the player chose between X's and O's
 * This factory function will create a player and let them pick either x or o
 */

const Player = (mark) => {
	let _mark = mark;
	const getMark = () => _mark;
	return { getMark };
};

/**
 * Modular function that takes care of the game logic and decides if an outcome is reached
 */
const game = (() => {
	const tttBoard = Array.from(document.querySelectorAll(".grid"));
	const player1 = Player("X");
	const player2 = Player("O");
	let xTurn = 0;
	let winner = "";

	tttBoard.forEach((square) =>
		square.addEventListener("click", function () {
			if (
				tBoard.myBoard[this.value] !== "X" &&
				tBoard.myBoard[this.value] !== "O"
			) {
				if (xTurn % 2 === 0) {
					tBoard.setInput(this.value, player1);
				} else {
					tBoard.setInput(this.value, player2);
				}

				displayMoves.displayTTT(tBoard.myBoard);
				if (
					rowWin(tBoard.myBoard) ||
					colWin(tBoard.myBoard) ||
					diagWin(tBoard.myBoard)
				) {
					displayMoves.endGameDisplay(`${winner} win!`);
				} else if (tBoard.fullDraw() === true) {
					displayMoves.endGameDisplay(`Draw!`);
				}

				xTurn = xTurn + 1;
			}
		})
	);

	const rowWin = (array) => {
		for (let i = 0; i < 3; i++) {
			let j = i * 3;
			if (
				array[j] === "X" &&
				array[j] === array[j + 1] &&
				array[j] === array[j + 2]
			) {
				winner = "X's";
				return true;
			}
			if (
				array[j] === "O" &&
				array[j] === array[j + 1] &&
				array[j] === array[j + 2]
			) {
				winner = "O's";
				return true;
			}
		}
		return false;
	};

	const colWin = (array) => {
		for (let i = 0; i < 3; i++) {
			if (
				array[i] === "X" &&
				array[i] === array[i + 3] &&
				array[i] === array[i + 6]
			) {
				winner = "X's";
				return true;
			}
			if (
				array[i] === "O" &&
				array[i] === array[i + 3] &&
				array[i] === array[i + 6]
			) {
				winner = "O's";
				return true;
			}
		}
		return false;
	};

	const diagWin = (array) => {
		if (array[0] === "X" && array[0] === array[4] && array[0] === array[8]) {
			winner = "X's";
			return true;
		} else if (
			array[2] === "X" &&
			array[2] === array[4] &&
			array[2] === array[6]
		) {
			winner = "X's";
			return true;
		} else if (
			array[0] === "O" &&
			array[0] === array[4] &&
			array[0] === array[8]
		) {
			winner = "O's";
			return true;
		} else if (
			array[2] === "O" &&
			array[2] === array[4] &&
			array[2] === array[6]
		) {
			winner = "O's";
			return true;
		}

		return false;
	};

	const resetGame = () => {
		winner = "";
		xTurn = 0;
	};

	return { resetGame, rowWin, diagWin, colWin };
})();

/**
 * Displays moves performed onto the screen
 */

const displayMoves = (() => {
	const startBtn = document.querySelector(".start-btn");
	const restartBtn = document.querySelector(".restart-btn");
	const tog1 = document.querySelector(".input-toggle");
	const tog2 = document.querySelector(".input-toggle2");
	const diff = document.querySelector(".select");
	const endText = document.querySelector(".result-text");
	const endDisp = document.querySelector(".result-card");

	startBtn.addEventListener("click", function () {
		//if (document.querySelector(".input-tog:checked") === null){
		//xplayer = user
		//}
		document.querySelector(".start-btn-ctn").style.display = "none";
		document.querySelector(".game-board").style.display = "block";
		restartBtn.style.display = "block";
	});
	const tttBoard = Array.from(document.querySelectorAll(".grid"));

	const restart = () => {
		tttBoard.forEach((input) => {
			const move = input.children[0];
			move.textContent = "";
		});
		tBoard.resetArray();
		game.resetGame();
		document.querySelector(".start-btn-ctn").style.display = "flex";
		document.querySelector(".game-board").style.display = "none";
		tog1.style.display = "flex";
		tog2.style.display = "flex";
		diff.style.display = "block";
		endDisp.style.display = "none";
		restartBtn.style.transform = "scale(1)";
		restartBtn.style.position = "static";
		restartBtn.style.display = "none";
	};

	const displayTTT = (array) => {
		tttBoard.forEach((input) => {
			let count = 0;
			while (count < array.length) {
				if (tttBoard[count].children[0].textContent === "") {
					tttBoard[count].children[0].textContent = array[count];
				}
				count++;
			}
		});
	};

	const endGameDisplay = (text2bDisplayed) => {
		tog1.style.display = "none";
		tog2.style.display = "none";
		diff.style.display = "none";
		endText.textContent = text2bDisplayed;
		endDisp.style.display = "flex";
		restartBtn.style.position = "absolute";
		restartBtn.style.transform = "scale(2)";
	};

	restartBtn.addEventListener("click", restart);

	return { displayTTT, endGameDisplay };
})();
