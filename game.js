var upPressed = false;
var downPressed = false;
var leftPressed = false;
var rightPressed = false;
var lastPressed = false;

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
	createSpaceShip(1);
	setInterval(spaceShipPositions,2000);

}


function createSpaceShip(number){
	for ( var i = 0; i < number; i++){
	var spaceShip = document.createElement('div');
	spaceShip.classList = 'alien';
	var body = document.getElementsByTagName('body')[0];
	body.appendChild(spaceShip);
	}
}

function spaceShipPositions (){
	var spaceShips = document.getElementsByClassName('alien');

	for (var i = 0; i < spaceShips.length; i++){
		var anyNumber = Math.ceil(Math.random() * 100);
		spaceShips[i].style.top = 0;
		spaceShips[i].style.left = anyNumber + 'vw';
		
		var bombs = document.createElement('div');
		bombs.classList = 'bomb';
		bombs.style.left = anyNumber+1.7 + 'vw';
		bombs.style.top = '93px';
		document.body.appendChild(bombs);
		moveBomb(bombs)

	}
	
}


function moveBomb (bomb){
	var velocity = Math.ceil(Math.random()*100);
	var bombTimer = Math.ceil(Math.random()*100);
	var top = bomb.offsetTop;
	setInterval(function(){

	var sky = document.getElementsByClassName('sky')[0];
	var skyHeight = sky.offsetHeight;

	if (top > skyHeight)
	{

		
		bomb.classList = 'explosion';
		
		
	}
	else {
		bomb.style.top = top++ + 'px';
	}

	
},velocity)
}


function myLoadFunction() {
	var playGame = document.getElementsByClassName('start')[0];
	playGame.addEventListener('click',startGame);
}


document.addEventListener('DOMContentLoaded', myLoadFunction);