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
        moves:[],
        GameBoard: [gameBoard],
        Groups: {},
        sendAlert: true,
        response: '',
        koCheck: 0
  }

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res.express }))
      .catch(err => console.log(err));
  }

    checkKoOrSuicide(key){
      var bol = true
      var move = this.state.moves
      if(move[this.state.turn] !== "pass" && this.state.turn > 2){
        if(this.state.koCheck === key){
          if(this.state.sendAlert){
            alert("illegal Ko move")
            this.setState({sendAlert: false})
          }
          this.state.board.setValueOfID(key,"empty")
          bol = false;
          
        }
        else
        {
            this.setState({koCheck: 0})
        }
      }
      if(!this.CheckBoard(key) && !this.CheckLife(key)){
        alert("illegal suicide move")
        this.state.board.setValueOfID(key,"empty")
        bol = false
      } 
      if(bol){
      var move = this.state.moves
      move.push(key)
      this.setState({moves : move})
      }
      
     return bol; 
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
          if(this.state.board.getValueOfID(key)!== "blackstone" && this.state.board.getValueOfID(key)!=="whitestone"){
            return;
          }
          var group = this.CreateGroup(key)
          if(group.length === 1){
            this.setState({koCheck: group[0]})
            console.log("newKocheck",this.state.koCheck)
          }
          // var groups =  [key, arr] 
          // this.setState(Groups : [key, arr] )
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
        return group
      }
      

    GlobalCheck (key){
      this.DisplayStone(key);
      this.CheckIfGameIsOver();
    }

    CheckIfGameIsOver(){
      var moves = this.state.moves;
      if(moves[moves.length]=== "pass" && moves[moves.length-1]=== "pass"){
        alert("Games Over")
      }
    }

    CheckLife(key){
      var bol = false;
      if(this.state.board.getValueOfID(key) !== "blackstone" && this.state.board.getValueOfID(key) !== "whitestone"){
        bol = true;
      }
      var group = this.CreateGroup(key);
      if(group === []){
        return true;
      }

      group.forEach(entry => {
        var arr = this.state.board.getNeighbors(entry);
            arr.forEach(i => {
              if(i === null){
              }
              else{
                if(this.CheckIfLiberty(i)){
                   bol = true;
                }
              }
            })
      })
    return bol
    }

    CheckIfLiberty(key){
      var bol = true;
      if(this.state.board.getValueOfID(key) === "blackstone" || this.state.board.getValueOfID(key) === "whitestone"){
        bol = false;
      }
      return bol;
    }

    pass(){
      var move = this.state.moves
      move.push("pass")
      this.setState({moves : move})
      var k = this.state.turn + 1 
      this.setState({turn: k})
    }

    callApi = async () => {
      const response = await fetch('/');
      const body = await response.json();
  
      if (response.status !== 200) throw Error(body.message);
  
      return body;
    };


    CheckBoard(key) { 
        var bol = false
        var i = this.state.board.getNorthNeighbor(key)
        
       if(!this.CheckLife(i)){
         this.DeleteGroup(i)
         bol = true
       }
         i = this.state.board.getSouthNeighbor(key)
          if(!this.CheckLife(i)){
         this.DeleteGroup(i)
         bol = true
       }
        i = this.state.board.getWestNeighbor(key)
        if(!this.CheckLife(i)){
         this.DeleteGroup(i)
         bol = true
       }
         i = this.state.board.getEastNeighbor(key)
        if(!this.CheckLife(i)){
         this.DeleteGroup(i)
         bol = true
       }
      return bol;
      }
  
    DisplayStone (key){ 
      if(key === 0){
        return
      }
      var color;
      this.setState({sendAlert : true})
    if(!this.checkIfStoneAlreadyThere(key) && this.checkKoOrSuicide(key)){
      if((this.state.turn % 2) === 1)
      {
      color = "blackstone"
    }
    else{
        color = "whitestone"
        }
    this.state.board.setValueOfID(key, color)
      var i = this.state.GameBoard
      i.push(this.state.board)
      this.setState({GameBoard: i})
      var k = this.state.turn + 1 
      this.setState({turn: k})
  }

}
  render() {
    
    return (
      <div>
      <div className="header">
        <h2>
          Lewis Herman's Go game  
        </h2>
       </div>
  
      <div className="App">
      <div className={`board-frame board-size-19`}>
                    {this.state.boardItterator.map(i => 
                    
                    <Square  id={i} clickHandler={this.GlobalCheck.bind(this, i)}                                
                          // key={i}
                          // initial = {this.state.initial}
                          value={this.state.board.getValueOfID(i)}
                          style={this.state.board.getValueOfID(i)}  
                    />
                    )}
        </div>
      </div>
      <button className="middle" onClick={() => {this.pass() }}>
             Pass
      </button>
      <p className="Games">{this.state.response}</p>
    </div>
    );
  };
}
export default App;
