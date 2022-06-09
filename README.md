# MyFirstIndieStyleGame-CSY1018

A web development project assigned during my first year of university.



Features
Bare pass (D- - D+)
When the start button is pressed the game should begin and the start button should no
longer be visible	✅

Game starts when button is pressed✅

Spaceships get created at a random position at the top of the screen✅

Bombs fall down the screen towards the player✅

When the bomb hits the ground (green grass area) it explodes✅

If the player is in the radius of the bomb, print “game over” and set the players animation to ✅dead (css class “character dead”)✅




Good pass (C- - B-)
The bombs should explode at random points on the grass, not all at the same height✅

The player will have three lives signified at the top right✅

Each time the player gets hit by a bomb the player loses a life and display the “hit”
animation (css class, e.g. “character hit left”). The life should be removed from the panel in the top right	✅

If the player loses all three lives, display the character dead animation and print “game over” to the screen	✅

Display a “play again?” message to allow the player to restart the game if they lose	


Very good pass (B – A-)
Implement a scoring system with high scores. Count the number of bombs the player managed to avoid and when they die have them enter their name. When the game ends, ask their name and log the score using Local Storage. When the game ends display the high scores.❌


Make the game more difficult by randomizing the spaceships speed and frequency at which the bombs are dropped.✅


Make the bombs fall at different angles rather than straight down.✅


_In progress_
Excellent pass (A – A+)
Add levels of increasing difficulty. For example, 10 slow bombs in level 1, 15 bombs in level 2, etc. Extra marks are available if there are an infinite number of levels that gradually increase in difficulty.❌

There is an “arrow” class and a “fire” animation for the player. Make it so the player can fire up and destroy the bombs before they hit the ground by pressing the space key. When the key is pressed
a.	The player should be given the class “character stand up fire”✅
b.	The player should not be able to move for 0.5s while the arrow is being fired✅
c.	The arrow should fire up from the player’s position and if it hits a bomb, both the arrow and the bomb should be destroyed❌
d.	The player should only be able to fire one arrow every 0.5s		✅

