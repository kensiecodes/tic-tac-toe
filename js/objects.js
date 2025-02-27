class Board{
    constructor(){
        this.grid = []
    }
    populateBoard(){
        
        for(let i = 0; i < 9; i++){
            this.grid.push(new Cell(i))
        }
        this.grid.forEach(cell => {
            const boundPlayCell = cell.playCell.bind(cell)
            cell.boundPlayCell = boundPlayCell
            cell.element.addEventListener('click', cell.boundPlayCell)
            // console.log('populatingcell')
        })
    } 
    clearBoard() {
        this.grid.forEach((cell) => {
            cell.element.innerText = "";
            document.querySelector('.winner').innerText = `Player 1 is X, Player 2 is O`
        });
    }
}


class Cell{
    constructor(id){
        this.state = ''
        this.id = '#cell'+id
        this.element = document.querySelector(this.id)
        this.boundPlayCell = null;
    }
    setState(state){
        this.state = state
        document.querySelector(this.id).innerText = state
    }
    playCell(){
        game.playTurn(this)
        let win = game.checkWin()
        if (win != null) {
            game.showWinner(win)
        }
    }

}

class Player{
    constructor(symbol){
        this.symbol = symbol
    }
}
 
//Handles game logic, and user input
class Game{
    constructor(){
        this.turn = 1

    }
    playTurn(cell){
        console.log(cell)
        if(cell.state != ''){
            return console.log('space occupied')
        }
        if(this.turn){
            this.turn--;
            cell.setState(player1.symbol)
        }else{
            this.turn++;
            cell.setState(player2.symbol)
        }
    }

    checkWin() {
        const value = board.grid;

       

        //horizontal
        for (let i = 0; i < 9; i += 3) {
            if (value[i].state === value[i+1].state && value[i].state === value[i+2].state && value[i].state !== '') {
              return value[i].state
            }
          }

          //vertical
          for (let i = 0; i < 3; i++) {
            if (value[i].state === value[i+3].state && value[i].state === value[i+6].state && value[i].state !== '') {
              return value[i].state
            }
          }

          //diagonal
          if (value[0].state === value[4].state && value[0].state === value[8].state && value[0].state !== '') {
            return value[0].state
          }
          if (value[2].state === value[4].state && value[2].state === value[6].state && value[2].state !== '') {
            return value[2].state
          }

        //   // if tie
        //   for (let i = 0; i < 9; i++) {
        //     if (value[i].state === '') {
                
        //     } else {
        //         return 'no winner'
        //     }
        //   }

          // no winner yet
        return null;

    }
    showWinner(winner) {
        let winnerText;
        if (winner === 'no winner') {
            document.querySelector("It's a tie. No winner!")
        } else {
            winner === 'x' ? winnerText = 'Player 1' : winnerText = 'Player 2';
            document.querySelector('.winner').innerText = `${winnerText} wins!`
        }
            // console.log(board.grid[i])
            board.grid.forEach(cell => cell.element.removeEventListener("click", cell.boundPlayCell))
        
    }
}