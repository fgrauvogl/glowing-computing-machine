var keyState = {};

window.onkeydown = window.onkeyup = function (e) {
    keyState[e.keyCode] = e.type == 'keydown';
    
    // checks for up and left
    if (keyState[38] && keyState[37]) {
      character.Movement(-2,0);
      character.Movement(0,-2);
    }
    // checks for up and right
    else if (keyState[38] && keyState[39]) {
      character.Movement(2,0);
      character.Movement(0,-2);
    }
    // checks for down and left
    else if (keyState[40] && keyState [37]) {
      character.Movement(-2,0);
      character.Movement(0,2);
    }
    // checks for down and right
    else if(keyState[40] && keyState [39]) {
      character.Movement(2,0);
      character.Movement(0,2);
    }
    // checks for up
    else if (keyState[38]) {
      character.Movement(0,-2);
  }
}