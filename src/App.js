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
      console.log(this.CheckLife(key), "is", key, "alive")
      if(this.turn%2 ===1){
        color = "blackstone"
      } else{
        color = "whitestone"
      }
      this.state.board.setValueOfID(key,color)
      if(move !== "pass"){
        if(move === this.state.koCheck[0]){
          alert("illegal Ko move")
          this.state.board.setValueOfID(key,"empty")
          return false
        }
      }
      if(this.CheckLife(key)){
        alert("illegal suicide move")
        this.state.board.setValueOfID(key,"empty")
        return false
      }
      return true; 
    }

    checkIfStoneAlreadyThere(key)
    { 
      if(this.state.board.getValueOfID(key) === "blackstone" || this.state.board.getValueOfID(key)  === "whitestone")
      { 
        return true;
      }
      else
      {
        return false;
      }
    }
    DeleteGroup(key){
          console.log("Deleted group", this.CreateGroup(key))
          this.state.board.replaceChainFromID(key, "empty");
     }
    CreateGroup(key){
        var group = [];
        if(this.state.board.getValueOfID(key)=== null || this.state.board.getValueOfID(key)=== undefined || this.state.board.getValueOfID(key)=== "empty"){
          return []
        }
       
        var i = this.state.board.getChainFromID(key)
        i.forEach(entry => {
          group.push(entry);
        }) 
        console.log(group, "GROUP")
        return group
      }
      
    GlobalCheck (key){
      this.DisplayStone(key);
      this.CheckBoard(key);
      
    }

    CheckLife(key){
      //debugger;
      console.log("CheckLife")
      if(this.state.board.getValueOfID(key) !== "blackstone" && this.state.board.getValueOfID(key) !== "whitestone"){
        return true
      }
      var group = this.CreateGroup(key);
      console.log("Group created", group)
      if(group === []){
        return false;
      }
      group.forEach(entry => {
        var arr = this.state.board.getNeighbors(entry);
            arr.forEach(i => {
              console.log(i, "is", this.CheckIfLiberty(i))
                if(this.CheckIfLiberty(i)){
                  console.log(i)
                  return true;
                }
            })
      })
    return false
    }

    CheckIfLiberty(i){
      console.log(i, "is ", this.state.board.getValueOfID(i))
      if(this.state.board.getValueOfID(i) !== "blackstone" && this.state.board.getValueOfID(i) !== "whitestone"){
        console.log(true)
        return true
      }
      console.log(false)
      return false;
    }

    CheckBoard(key) { 
        var i = this.state.board.getNorthNeighbor(key)
        console.log(i);
        if(i !== null || i !== undefined || i !== "empty"){
        console.log("Is it alive:", this.CheckLife(i), "North")
        if(!this.CheckLife(i)){
          console.log("deleted North group")
          this.DeleteGroup(i)
        }
      }
         i = this.state.board.getSouthNeighbor(key)
         console.log(i);
         if(i !== null || i !== undefined || i !== "empty"){
        console.log("Is it alive:", this.CheckLife(i), "South")
        if(!this.CheckLife(i)){
          this.DeleteGroup(i)
          console.log("deleted South group")
        }
      }
     
        i = this.state.board.getWestNeighbor(key)
        console.log(i);
        if(i !== null || i !== undefined || i !== "empty"){
        console.log("Is it alive:", this.CheckLife(i), "West")
        if(!this.CheckLife(i)){
          console.log("deleted west group")
          this.DeleteGroup(i)
        }
      }
        if(i !== null || i !== undefined || i !== "empty"){
         i = this.state.board.getEastNeighbor(key)
         console.log(i);
        console.log("Is it alive:", this.CheckLife(i), "East")
            if(!this.CheckLife(i)){
              console.log("deleted East group")
          this.DeleteGroup(i)
      }
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
        this.state.board.setValueOfID(key, "blackstone")
        this.setState({
          state: "blackstone"  
        }) 
     }
     else{ if(this.state.turn % 2 === 0){
        this.state.board.setValueOfID(key, "whitestone")
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
                          // key={i}
                          // id={i}
                          // initial = {this.state.initial}
                          value={this.state.board.getValueOfID(i)}
                          style={this.state.board.getValueOfID(i)}  
                    />
                    )}
        </div>
      </div>
    );
  };
}
export default App;
