var upPressed = false;
var downPressed = false;
var leftPressed = false;
var rightPressed = false;
var lastPressed = false;
var hit = 1;
var level = 3;
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
	

	var playerName = document.getElementById('pn');

	var score = document.getElementById('sb');
	let welcomeText = prompt(" enter your name...");

	if (welcomeText == null || welcomeText == "")
	{
		welcomeText = 'unknown'
	}

	playerName.textContent = welcomeText;
	
	var scores = 0;
	
	score.textContent = scores;

	var playGame = document.getElementsByClassName('start')[0];
	playGame.style.display = 'none';
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
		// I've changed it to 90 because , when i run it in the mobile version
		// the spaceship spawns in a positon which cause the field to be extended to a way where the grass extends past the sky
		var anyNumber = Math.ceil(Math.random() * 90);
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
	var bombExplosionTimer =Math.ceil(Math.random(700)*2100);;
	var randomNum = Math.ceil(Math.random()*50);


	var top = bomb.offsetTop;
	

	var sky = document.getElementsByClassName('sky')[0];
	var skyHeight = sky.offsetHeight;

	var player = document.getElementById('player');


	var topLeft = document.elementFromPoint(player.offsetLeft,player.offsetTop);

	var grass = window.innerHeight - sky.offsetHeight;
	var randomPoint = Math.floor(Math.random() *grass);

	var fall = setInterval(function(){
		if (top - randomPoint > sky.offsetHeight)
		{
			bomb.classList = 'explosion';
		
		setTimeout(function(){
			if (bomb.parentNode != null)
			{
				bomb.parentNode.removeChild(bomb);

			}
		},800)
	} else {
		top = top + 1
		bomb.style.top = top + 'px'
	}
},2)
if (topLeft.classList.contains('explosion') == true)
		{
			resetPlayerPosition();
			console.log('hit');
			player.classList = 'character hit left'
		}
}






function removeLife()
{
	var player = document.getElementsByClassName('player')
	var life = document.getElementsByTagName('li');
	var bombs = document.getElementsByClassName('bomb')[0];
//if the life is higher than 1 remove a life
	if (life.length >= 1)
	{
		life[0].remove();
		console.log(hit);
		findExplosions();
		hit++;
	}
	if (hit > 3)
	{
		player.classList = 'character dead';
		
		// Created a new button which refreshes the page
		var btn = document.createElement('button');
		btn.innerHTML = "GAME OVER , Play Again?";
		btn.style.display = 'block';
		btn.style.zIndex = '1000';
		btn.style.width = 'fit-content';
		btn.style.backgroundColor = 'red';
		btn.style.left = '40%';
		btn.style.top = '50%';
		btn.style.marginTop = '-1em';
		btn.style.textAlign = 'center';
		btn.style.marginLeft = 'auto';
		btn.style.marginRight = 'auto';
		btn.style.color = 'white';
		btn.style.fontSize = '2em';
		btn.style.borderRadius = '20px';
		btn.style.cursor = 'pointer';
		btn.style.fontFamily = "Oxygen-Regular, sans-serif";
		btn.style.boxShadow = '4px 4px 4px #000';
		btn.style.textShadow = '2px 2px 2px #000';
		btn.style.position = 'absolute';
		document.body.appendChild(btn);
		
			
		// if play again is clicked then the webpage is reloaded
		btn.addEventListener('click', function handleClick() {
			window.location.reload();
		  });
	}

	
}

// Included so one bomb is tracked as one hit to the character
function findExplosions ()
{
	var explosionsFound = document.getElementsByClassName('explosion');

	for (var i =0; i < findExplosions.length; i++)
	{
		explosionsFound[0].remove();
	}	
}

// resets player position back to original position
function resetPlayerPosition()
{
	var player = document.getElementById('player')
	player.style.top;
	player.style.left = '200px';
	removeLife();
}


function clearBombs ()
{
	var bombs = document.getElementsByClassName('bomb');
	var bodyElement = document.getElementsByTagName('head')[0];
	for (var i = 0; i < bombs.length; i++)
	{		
		for (var i = 0; i < bombs.length; i++)
		{
			bombs[i].parentNode.removeChild(bombs[i]);
		}	
	}
	var explosion = document.getElementsByClassName('explosion')
	for (var i = 0; i < explosion.length; i++)
	{
		explosion[i].parentNode.removeChild(explosion[i])
	}
}

// function clearScore ()
// {

// }


function myLoadFunction() {
	var playGame = document.getElementsByClassName('start')[0];
	playGame.addEventListener('click',startGame);
}


document.addEventListener('DOMContentLoaded', myLoadFunction);