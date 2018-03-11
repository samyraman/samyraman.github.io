# Connect Four

My version of a two-player Connect Four game, built in native JavaScript. 

## Getting Started

Simply open the [connectfour.html](connectfour.html) file and play the game.

## Thought Process
I represented the game board as a 2D array. Each (row, col) pair corresponds to one space on the board. When a disc is dropped onto the board, I change its value in the 2D array and color the CSS circle corresponding to that space. I then check to see if that move caused a win, and if not, it switches to the next player. To check for a win, I recursively check the surrounding spots to see if the colors match. To implement the arrow scrolling at the top of the board, I tracked the mouse's X-position and divided that by the width of a column to find out which of the 7 columns the disc should fall into. I also included an event listener for touch on mobile devices, since users cannot scroll with a mouse the way they would on desktop.

### Efficiency
I tried to keep the runtime as efficient as I could. Most of the checks (checking for a tie, checking whose turn it is, etc.) are done in O(1) time, and the rest (checking for a win, finding the next empty space in a column) are O(n) in the length of the board.  
