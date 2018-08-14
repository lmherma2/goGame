import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Matrix from 'matrix-map';
import Square from './components/square/square.jsx'


class App extends Component {
  constructor(){
    super()
    let gameBoard = new Matrix(81);
    let genRandNum = () => Math.floor((Math.random() * 4) + 1)
    gameBoard.fillEmptyValues(genRandNum)

    this.state = {
        board: gameBoard,
        boardItterator: gameBoard.keysAsArray,
        score: 0,
        level: 1,
        gameOver: false,
        // animateClass: null,
    }

}

  render() {
    return (
      <div className="App">
      helloworld
        <div className={`board-frame board-size-${Math.sqrt(this.state.board.size)}`}>
                    {/* {this.state.boardItterator.map(i =>  */}
                        <Square key={1} id={1} value={this.state.board.getValueOfId(1)} />
                        {/* //clickHandler={this.handleSquareClick.bind(this, i)}
                    // />)} */}
          </div>
      helloworld
      </div>
    );
  }
}


export default App;
