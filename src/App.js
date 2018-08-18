import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Matrix from 'matrix-map';
import Square from './components/square/square.jsx'
// import Gameboard from './components/index.js'
let gameBoard = new Matrix(361);
class App extends Component {
  state = {
        turn: 1,
        board: gameBoard,
        boardItterator:  gameBoard.keysAsArray,
        gameOver: false,
        value: "empty",
        initial: 1,
        game: [{move:0,groups:[]}],
        koCheck: [0],

  }
    checkKoOrSuicide(key){
      let move = this.state.game[this.state.game.length]
      let color
      if(move !== "pass"){
        if(move === this.state.koCheck[0]){
          alert("illegal Ko move")
          return false
        }
      }
      if(this.turn%2 ===1){
        color = "blackstone"
      } else{
        color = "whitestone"
      }
      if(this.CheckLife(key)){
        alert("illegal suicide move")
        return false
      }
      return true; 
    }

    checkIfStoneAlreadyThere(key)
    { 
      if(this.state.board.getValueOfId(key) === "blackstone" || this.state.board.getValueOfId(key)  === "whitestone")
      {
       
        console.log(this.state.board.getValueOfId(key), "Stone is already there") 
        return true;
      }
      else
      {
        return false;
      }
    }
    DeleteGroup(array){
          console.log("Deleted group", array)
          var i = this.state.game
          console.log(this.state.game)
          i[this.state.turn - 1].groups.push(array)
          this.setState({i});
          this.state.board.destroyChainfromID(array);
     }
    CreateGroup(key){
        var group = [];
        if(this.state.board.getValueOfId(key)=== null || this.state.board.getValueOfId(key)=== undefined || this.state.board.getValueOfId(key)=== "empty"){
          return [0]
        }
        console.log(this.state.board.getChainfromID(key), "OBJECT")
        var i = this.state.board.getChainfromID(key)
        i.forEach(entry => {
          group.push(entry);
        })
        console.log(group);
        return group
      }
      
    GlobalCheck (key){
      this.CheckBoard(key);
      this.DisplayStone (key);
      this.CreateGroup(key);
    }

    CheckLife(key){
      var group = this.CreateGroup(key);
      console.log("check life")
      group.forEach(entry => {
        console.log(entry)
        console.log(this.CheckLifeUp(entry), this.CheckLifeDown(entry), this.CheckLifeLeft(entry), this.CheckLifeRight(entry))
        if(this.CheckLifeUp(entry) || this.CheckLifeDown(entry) || this.CheckLifeLeft(entry) || this.CheckLifeRight(entry)){
          return true
        }
    })
    return false
    }
    CheckLifeLeft(key){
      var i = this.state.board.getWestNeighbor(key)
      console.log(i)
      console.log(this.state.board.getValueOfId(key))
      if(this.state.board.getValueOfId(key) === "empty"|| this.state.board.getValueOfId(key)=== null|| this.state.board.getValueOfId(key)=== undefined){
        return true
      }
      return false;
    }
    CheckLifeRight(key){
      var i = this.state.board.getEastNeighbor(key)
      console.log(i)
      console.log(this.state.board.getValueOfId(key))
      if(this.state.board.getValueOfId(key)=== "empty"|| this.state.board.getValueOfId(key)=== null || this.state.board.getValueOfId(key)=== undefined){
        return true
      }
      return false;
    }
    CheckLifeDown(key){
      var i = this.state.board.getSouthNeighbor(key)
      console.log(i)
      console.log(this.state.board.getValueOfId(key))
      if(this.state.board.getValueOfId(key)=== "empty"|| this.state.board.getValueOfId(key)=== null || this.state.board.getValueOfId(key)=== undefined){
        return true
      }
      return false;
    }
    CheckLifeUp(key){
      var i = this.state.board.getNorthNeighbor(key)
      console.log(i)
      console.log(this.state.board.getValueOfId(i))
      if(this.state.board.getValueOfId(i)=== "empty" || this.state.board.getValueOfId(i)=== null || this.state.board.getValueOfId(i)=== undefined){
        return true
      }
      return false;
    }

    CheckIfOppositeColor(key, Color){
      if(this.state.board.getValueOfId(key) === Color || this.state.board.getValueOfId(key) === "empty" || this.state.board.getValueOfId(key) === null){
        return true
      }
      return false
    }

    CheckBoard(key) { 
        var i = this.state.board.getNorthNeighbor(key)
        console.log(this.state.board.getValueOfId(i))
        if(!this.CheckLife(i)){
          this.DeleteGroup(i)
        }
      
         i = this.state.board.getSouthNeighbor(key)
        console.log(this.state.board.getValueOfId(i))
        if(!this.CheckLife(i)){
          this.DeleteGroup(i)
        }
     
        i = this.state.board.getWestNeighbor(key)
        console.log(this.state.board.getValueOfId(i))
        if(!this.CheckLife(i)){
          this.DeleteGroup(i)
        }
     
         i = this.state.board.getEastNeighbor(key)
        console.log(this.state.board.getValueOfId(i))
            if(!this.CheckLife(i)){
          this.DeleteGroup(i)
      }
    }
  
    DisplayStone (key){ 
    if(!this.checkIfStoneAlreadyThere(key) && this.checkKoOrSuicide(key)){
      var i = this.state.game
      i.push({move: key, groups:[]})
      this.setState({game: i})
      if(this.state.turn === 1){
        this.setState({initial: 2})  
      }

     if(this.state.turn % 2 === 1){
        this.state.board.setValueOfid(key, "blackstone")
        this.setState({
          state: "blackstone"  
        }) 
     }
     else{ if(this.state.turn % 2 === 0){
        this.state.board.setValueOfid(key, "whitestone")
        this.setState({
          state: "whitestone"  
        }) 
      } 
    }
      this.setState({turn: this.state.turn+1});
   
  }

}
  render() {
    
    return (
      <div className="App">

      <div className={`board-frame board-size-19`}>
                    {this.state.boardItterator.map(i => 
                    
                    <Square clickHandler={this.GlobalCheck.bind(this, i)}                                
                          key={i}
                          id={i}
                          initial = {this.state.initial}
                          value={this.state.board.getValueOfId(i)}
                          style={this.state.board.getValueOfId(i)}  
                    />
                    )}
        </div>
      </div>
    );
  };
}
export default App;
