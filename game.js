var upPressed = false;
var downPressed = false;
var leftPressed = false;
var rightPressed = false;
var lastPressed = false;
var spaceBarPressed = false;
var hit = 1;
var level = 3;
var finalScore;
var count = 0;

var shot = true;


//if this function remains true it will allows the functions regarding hte bombs , spaceship and general game flow to operate as normal
var DropBombs = true;

var scoresCount = true;


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
	// if spacebar is clicked change player animation
	if (event.keyCode == 32)
	{
		spaceBarPressed = false;
		lastPressed = 'up fire';
		
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

	if (spaceBarPressed && DropBombs == true) 
	{
		
		
		

		var sky = document.getElementsByClassName('sky')[0];
		var skyHeight = sky.offsetHeight;
		var bowTop = 1000;
		var bowLeft =  1000;
		
//Once spacebar is clicked Arrow is generated


/* sourced from overflow.com/questions/27645619/javascript-on-key-press-trigger-only-once */
		document.body.onkeydown  = function(e){
		if(e.keyCode == 32){
		var bow = document.createElement('div');
		bow.classList = 'arrow';
		// bombs move upwards 
		setInterval(function(){	
		var topLeftBow = document.elementFromPoint(bow.offsetLeft,bow.offsetTop);
		bow.style.top = bowTop  + 'px' ;
		bow.style.left = bowLeft  + 'px';

		bow.style.transform = 'rotate(-90deg)';
		console.log('Arrow created');
		
		document.body.appendChild(bow)
		if (topLeftBow.classList.contains('bomb')== true || bowTop == 0)
		{
			bow.parentNode.removeChild(bow);
		}
		else
			 {
				bowTop = bowTop - 1;
				bow.style.top = bowTop - 'px';

			}
		},3)
			
	
	}
}
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

	if (event.keyCode == 32)
	{
		spaceBarPressed = true;
	}
}
// allows the game to 'begin' 
function startGame(bomb){
	timeout = setInterval(move,10);
	document.addEventListener('keydown',keydown);
	document.addEventListener('keyup',keyup);
	
	var playerName = document.getElementById('pn');

	let welcomeText = prompt(" enter your name...");

	if (welcomeText == null || welcomeText == "")
	{
		welcomeText = 'unknown'
	}
	playerName.textContent = welcomeText;
	
	var playGame = document.getElementsByClassName('start')[0];
	playGame.style.display = 'none';
	createSpaceShip(1);
	createMoreSpaceShip()
	setInterval(spaceShipPositions,2000);
}


function createSpaceShip(number){

	if (DropBombs == true)
		{
	for ( var i = 0; i < number; i++){
	var spaceShip = document.createElement('div');
	spaceShip.classList = 'alien';
	var body = document.getElementsByTagName('body')[0];
	body.appendChild(spaceShip);
	}
	}
}

function createMoreSpaceShip(number){
//Every 35 seconds another Spaceship is added
if (DropBombs == true)
{
	setInterval(function(){
		var spaceShip = document.createElement('div');
		spaceShip.classList = 'alien';
		var body = document.getElementsByTagName('body')[0];
		body.appendChild(spaceShip);
	},15000)
}
}

function spaceShipPositions (){
	var spaceShips = document.getElementsByClassName('alien');
	if (DropBombs == true)
	{
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
		moveBomb(bombs);
		}
	}
	
}

function moveBomb (bomb){
		
		var scores = document.getElementsByClassName('scoreboard')[0];
		var velocity = Math.ceil(Math.random()*10);
		var moveBombsToTheRight = Math.ceil(Math.random()*10)-9;
		var top = bomb.offsetTop;
		var left = bomb.offsetLeft;
		var sky = document.getElementsByClassName('sky')[0];
		var skyHeight = sky.offsetHeight;

	
		var player = document.getElementById('player');
	
		var grass = window.innerHeight - skyHeight;
		var randomPoint = Math.floor(Math.random() * grass);
		
		
		var fall = setInterval(function(){
			var topLeft = document.elementFromPoint(player.offsetLeft,player.offsetTop);
			if (top - randomPoint > skyHeight)
		
			{
				bomb.classList = 'explosion';
				if (topLeft.classList.contains('explosion') == true)
				

			{
				resetPlayerPosition();
				console.log('hit');
				player.classList = 'character hit left'
			}
			setTimeout(function(){
				if (bomb.parentNode != null )
				{
					bomb.parentNode.removeChild(bomb);
					
					count+= 1;
					console.log(count)
					scores.innerHTML = count;
				
				}
			},800)
			
	
	
		} else {
			// bombs drop in a diagonal fashion
			var distanceToLeft = 0.1
			top = top + 1
			bomb.style.top = top + 'px';

			
			left = left + distanceToLeft;
			bomb.style.left = left + 'px';

			if (bomb.style.left >= 50 + 'vw'){
				distanceToLeft = -0.3;

				left = left + distanceToLeft;
			bomb.style.left = left + 'px';
			}
		}
	},velocity)

	
}


function removeLife(scores,spaceShip)
{
	var player = document.getElementsByClassName('player')
	var life = document.getElementsByTagName('li');
	
	
//if the life is higher than 1 remove a life
	if (life.length >= 1)
	{
		life[0].remove();
		console.log(hit);
		findExplosions();
		hit++;
		count -= 1;
		console.log('-1')
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
		btn.style.left = '50%';
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
		DropBombs = false;



		// After all lives have been removed the score is fixed to the last number prior to their lifes being removed
		var scores = document.getElementsByClassName('scoreboard')[0];
		
		
		var finalScoreBoard = document.getElementsByClassName('Finalscoreboard')[0];
		finalScoreBoard.innerHTML = count;
		finalScoreBoard.style.visibility = 'visible';
		document.body.appendChild(finalScoreBoard);
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


function myLoadFunction() {
	var playGame = document.getElementsByClassName('start')[0];
	playGame.addEventListener('click',startGame);
}


document.addEventListener('DOMContentLoaded', myLoadFunction);