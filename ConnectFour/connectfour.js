board = document.getElementById("gameBoard");
var currPlayer;
var disksDropped;

//Begins a new game
function newGame() {
	disksDropped = 0;
	currPlayer = "red";
	board.innerHTML='<div id="scrollBar"><span>&#9662;</span></div>';
	document.querySelector(".redText").classList.remove("hide");
	document.querySelector(".yellowText").classList.add("hide");
	gameBoard = new Array(6)
	for (row = 0; row < 6; row++) {
		gameBoard[row] = new Array();
		for (col = 0; col < 7; col++) {
			gameBoard[row].push(0);
			board.innerHTML += '<div id="' + row + ' ' + col + '" class="circle"></div>';
		}
	}
	scroll();
}

//Finds the next free space to drop a disk within a COL
function findOpenSpace(col) {
	for (i = 5; i >= 0; i--) {
		if (gameBoard[i][col] == 0) {
			return i
		}
	}
}

//Drops a disk of COLOR in the next free space of COL
function dropDisc(color, col) {
	try {
		row = findOpenSpace(col);
		gameBoard[row][col] = color;
		document.getElementById(row + " " + col).classList.add(color); // Player drops their disk
		if (color == "red") {
			currPlayer = "yellow";
			document.getElementById("scrollBar").style.color = "#FEDC32";
		}
		else {
			currPlayer = "red";
			document.getElementById("scrollBar").style.color = "#e23a28";
		}
		document.querySelector(".redText").classList.toggle("hide");
		document.querySelector(".yellowText").classList.toggle("hide");
		disksDropped++;
		if (checkForWinner(row, col)) {
			setTimeout(function() {
  				alert(color + " wins!");
  				newGame();
			}, 30)
		}
		else if (disksDropped == 42) {
			setTimeout(function() {
				alert("Game Over. It's a tie!");
				newGame();
			}, 30)
		}
	}
	catch (err){ 
		// Player goes again until they make a valid move
	}
}

//Checks to see if the player who just played has won
function checkForWinner(row, col) {
	//Check horizontally adjacent neighbors
	if (checkNeighbors(row, col, 0, 1) + checkNeighbors(row, col, 0, -1) >= 3) {
		return true;
	}
	//Check vertically adjacent neighbors
	if (checkNeighbors(row, col, 1, 0) >= 3) {
		return true;
	}
	//Check diagonally adjacent neighbors in both directions
	if (checkNeighbors(row, col, 1, 1) + checkNeighbors(row, col, -1, -1) >= 3) {
		return true;
	}
	if (checkNeighbors(row, col, -1, 1) + checkNeighbors(row, col, 1, -1) >= 3) {
		return true;
	}
	return false;
}

//Recursively checks the neighbors of a disk to see if they match
function checkNeighbors(row, col, rowIncrement, colIncrement) {
	try {
		if (gameBoard[row][col] == gameBoard[row+rowIncrement][col+colIncrement]) {
			return 1 + checkNeighbors(row+rowIncrement, col+colIncrement, rowIncrement, colIncrement);
		}
		else {
			return 0;
		}
	}
	catch(err){
		return 0;
	}
}

//Deals with moving the arrow cursor
function scroll() {
	this.onmousemove = function(event) {
		var x = event.clientX - document.getElementById("gameBoard").offsetLeft;
	    var width = document.getElementById("gameBoard").offsetWidth/7;
	    var scrollPos = ~~(x/width);
	    if (scrollPos <= 0) {
	    	document.getElementById("scrollBar").style.paddingLeft = "20px";
	    }
	    else if (scrollPos >= 6) {
	    	document.getElementById("scrollBar").style.paddingLeft = "90%";
	    }
	    else{
	    	document.getElementById("scrollBar").style.paddingLeft = (width * scrollPos + 20) + 'px';
	    }
	    this.onmousedown = function(){
			dropDisc(currPlayer, scrollPos);
		}
	}
	document.getElementById("gameBoard").addEventListener('touchend', function(e){
        var touched = e.changedTouches[0];
	var scrollPos = parseInt(touched.target.id.slice(2,3))
	dropDisc(currPlayer, scrollPos);
    }, false)
};

document.getElementById("restart").onmousedown = function(){
			newGame();
}


newGame();


