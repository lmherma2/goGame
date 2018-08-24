import React from 'react';
import './square.scss';
var i;
class Square extends React.Component{
    constructor(props){
        super(props);
        this.state= {
            value: "empty",
            animateClass: 'initial',
            initial: 1
        
        }
        i = this.props.value
        if(this.props.initial === 1){
            i = this.state.value
        }
    }

    render(){
        if(this.state.value === null){
            return(
                <div id={this.props.id} onClick={this.props.clickHandler}
                className={`square-empty`}>
                </div>
            )
        }
        if(this.props.initial === 1){
            return(
                <div id={this.props.id}  onClick={this.props.clickHandler}
                className={`square-empty`}>
                </div>
            )
        }
        else{
            if(this.props.value === null){
            return(
            <div id={this.props.id} onClick={this.props.clickHandler}
            className={`square-empty`}>
            </div>
        )
    }
        else
        return(
            <div id={this.props.id} onClick={this.props.clickHandler}
            className={`square-${this.props.value}`}>
            </div>
        )
    }
}
    }



// const square = (props) => 
// (<div onClick={props.clickHandler} className={`square-style square-color-${props.value} ${props.id}`}>
// </div>)
export default Square;