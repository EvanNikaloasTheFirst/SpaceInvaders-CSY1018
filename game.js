var upPressed = false;
var downPressed = false;
var leftPressed = false;
var rightPressed = false;
var lastPressed = false;

var bombLanded = false

function keyup(event) {
	var player = document.getElementById('player');
	if (event.keyCode == 37) {
		leftPressed = false;
		lastPressed = 'left';
	}
	if (event.keyCode == 39) {
		rightPressed = false;
		lastPressed = 'right';
	}
	if (event.keyCode == 38) {
		upPressed = false;
		lastPressed = 'up';
	}
	if (event.keyCode == 40) {
		downPressed = false;
		lastPressed = 'down';
	}

	player.className = 'character stand ' + lastPressed;
}


function move() {
	var player = document.getElementById('player');
	var positionLeft = player.offsetLeft;
	var positionTop = player.offsetTop;
	if (downPressed) {
		var newTop = positionTop+1;

		var element = document.elementFromPoint(player.offsetLeft, newTop+32);
		if (element.classList.contains('sky') == false) {
			player.style.top = newTop + 'px';	
		}

		if (leftPressed == false) {
			if (rightPressed == false) {
				player.className = 'character walk down';
			}
		}
	}
	if (upPressed) {
		var newTop = positionTop-1;

		var element = document.elementFromPoint(player.offsetLeft, newTop);
		if (element.classList.contains('sky') == false) {
			player.style.top = newTop + 'px';	
		}
		
		if (leftPressed == false) {
			if (rightPressed == false) {
				player.className = 'character walk up';
			}
		}
	}
	if (leftPressed) {
		var newLeft = positionLeft-1;

		var element = document.elementFromPoint(newLeft, player.offsetTop);
		if (element.classList.contains('sky') == false) {
			player.style.left = newLeft + 'px';	
		}


		player.className = 'character walk left';
	}
	if (rightPressed) {
		var newLeft = positionLeft+1;
		
		var element = document.elementFromPoint(newLeft+32, player.offsetTop);
		if (element.classList.contains('sky') == false) {
			player.style.left = newLeft + 'px';		
		}

		player.className = 'character walk right';
	}

}


function keydown(event) {
	if (event.keyCode == 37) {
		leftPressed = true;
	}
	if (event.keyCode == 39) {
		rightPressed = true;
	}
	if (event.keyCode == 38) {
		upPressed = true;
	}
	if (event.keyCode == 40) {
		downPressed = true;
	}
}
// allows the game to 'begin' 
function startGame(){
	timeout = setInterval(move,10);
	document.addEventListener('keydown',keydown);
	document.addEventListener('keyup',keyup);

	var playGame = document.getElementsByClassName('start')[0];
	playGame.style.display = 'none';

	//creates the space ships using the for loop in a function
	var number = 10;


	for (var i = 0; i < number; i++)
	{
		createSpaceShip();
	}
	setInterval(spaceShipPositions,2000);



	for (var i = 0; i < number; i++)
	{
		dropBomb()
	}
	setInterval(dropBomb,800)
}


function createSpaceShip(){
	var spaceShip = document.createElement('div');
	spaceShip.classList = 'alien';
	var body = document.getElementsByTagName('body')[0];
	body.appendChild(spaceShip);
}

function spaceShipPositions (){
	var spaceShips = document.getElementsByClassName('alien');

	for (var i = 0; i < spaceShips.length; i++){
		var anyNumber = Math.ceil(Math.random() * 10);
		spaceShips[i].style.top = 0;
		spaceShips[i].style.left = anyNumber + '0vw';
		
		var bombs = document.createElement('div');
		bombs.classList = 'bomb';
		var body = document.getElementsByTagName('body')[0];
		body.appendChild(bombs);
		bombs.style.left = anyNumber + '0vw';

	}
	
}

function dropBomb (){
	var bombs = document.getElementsByClassName('bomb');
	for (var i = 0; i < bombs.length; i++)
	{
		var positionTop = bombs[i].offsetTop;
		var newTop = positionTop + 10;
	//	if (bombs.classList.contains('sky') == true){
			bombs[i].style.top = newTop + 'px';
			
			console.log(newTop)

	}
	}
/* determines the position of the bombs
function positionBombs(){
	var bombs = document.getElementsByClassName('bomb');
// randomly creates a random number of bombs
	for (var i = 0; i < bombs.length; i++){
		var anyNumber = Math.ceil(Math.random() *10);
		bombs[i].style.top = 0;
		bombs[i].style.left = anyNumber + '0vw';
	}
}
*/

function myLoadFunction() {
	var playGame = document.getElementsByClassName('start')[0];
	playGame.addEventListener('click',startGame);
}


document.addEventListener('DOMContentLoaded', myLoadFunction);