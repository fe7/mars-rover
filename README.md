# Mars-rover exercise
[https://code.google.com/archive/p/marsrovertechchallenge/](https://code.google.com/archive/p/marsrovertechchallenge/)

**To Run:**
 - Have node installed.
 - $ node main.js

This reads input from input.txt. You can change inputs in there. A longer input set is in more_inputs.txt, copy data into input.txt to run those inputs.

**To run tests (Mocha Chai):**
 - $ npm intall
 - $ npm run test

**Assumptions / program features:**
 - fist line of input file are plateau coordinates
 - following pair of lines are: (i) rover starting coordinates (ii) rover movment instructions string in order.
 - plateau's lower bounds are 0,0, and upper bounds are from first line
 - may fail if give blank lines or incorrect set of data.
 - if rover lands out of bounds, then will not move. There may be a there may be a different program to navigate the terrain if landed out of the plateau
 - if moving the rover will result in colliding with other rovers then it will halt

**Future work:**
 - could workout which coordinates of the plateau were unvisited by rovers
 - suggest path for rovers to cover this unvisited area (with least number of moves)