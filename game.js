var currentPlayer = 'x';

var board = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
];

var moves = 0;

function notify (message, fade) {
  var note = document.querySelector('.note');
  var oldnote = note.innerHTML;
  note.innerHTML = message;
  
  if (fade) {
    setTimeout(function () {
      note.innerHTML = oldnote;
    }, 750);
  }
}

function assign (cell, player) {
  var id = cell.id.split('-');
  var row = id[0];
  var column = id[1];
    
  if (board[row][column]){
    notify('quit it. that spot is taken.', true);
  }
  
  else {
    moves++;
    board[row][column] = player;
    cell.innerHTML = player;
      
    if (winner()) {
      notify('game over! good job ' + currentPlayer);
    }
    
    else if (moves === 9) {
      notify('you are both horrible at this.');
    }
    
    else {
      switchPlayer();
    }
  }
}

function switchPlayer () {
  currentPlayer = (currentPlayer === 'x') ? 'o' : 'x';
  notify(currentPlayer + '\'s turn.');
};

function winner () {
  var status = false;
  for (var i=0; i<board.length; i++) {
    
    /* horizontal */
    if (equal(board[i][0], board[i][1], board[i][2])) {
      status = true;
    }
    
    /* vertical */
    else if (equal(board[0][i], board[1][i], board[2][i])) {
      status = true;
    }
  }
  
  /* diagonal left to right */
  if (equal(board[0][0], board[1][1], board[2][2])) {
    status = true
  }
  
  /* diagonal right to left */
  else if (equal(board[0][2], board[1][1], board[2][0])) {
    status = true
  }
  
  return status;
}

function equal (a, b, c) {
  if (a === null) return false;
  if (a !== b || a !== c) return false;
  return true;
}

function reset () {
  moves = 0;
  
  board = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
  ];
  
  currentPlayer = 'x';
  notify(currentPlayer + '\'s turn.');
  
  var cells = document.querySelectorAll('.cell');
  
  for (var i=0; i<cells.length; i++) {
    cells[i].innerHTML = '';
  }
}

document.addEventListener('click', function (e) {
  var el = e.target;
  if (el.className == 'cell') assign(el, currentPlayer);  
  if (el.id == 'reset') reset();
});
