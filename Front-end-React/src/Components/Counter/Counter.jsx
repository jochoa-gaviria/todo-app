import React, {Component} from 'react'
import propTypes from 'prop-types'
import './Counter.css'


class Counter extends Component{
        //Define the initial state
    constructor(){
        super(); //Error, no calling this method is an error. 
        this.state={
            counter : 0 // counter is a variable name.
        }
        this.incrementCount = this.incrementCount.bind(this)
        this.decrementCount = this.decrementCount.bind(this)
        this.reset = this.reset.bind(this)
    }
    
    render(){
        return(
            <div className="counter">
                <CounterButton by={1} incrementMethod={this.incrementCount} decrementMethod={this.decrementCount}/>
                <CounterButton by={5} incrementMethod={this.incrementCount} decrementMethod={this.decrementCount}/>
                <CounterButton by={10} incrementMethod={this.incrementCount} decrementMethod={this.decrementCount}/>
                <span className="count">{this.state.counter}</span>
                <div><button className="reset" onClick={this.reset}>Reset</button></div>
            </div>
        );
    }

    //RESET method
    reset(){ this.setState({ counter : 0  }); }

    incrementCount(by) {
        //console.log(`Increment from child - ${by}`)
        //this.state.counter++; - if do this, the compiler will make an error. You must use to setState method
        this.setState(
            (prevState)=>{
            return {counter : prevState.counter + by}
            });
     }
     decrementCount(by){
         this.setState(
            (prevState)=>{
                return {counter: prevState.counter - by}
            });
     }
}

class CounterButton extends Component {
    
    // Define the initial state
    // constructor(){
    //     super(); //Error, no calling this method is an error. 
    //     this.state={
    //         counter : 0 // counter is a variable name.
    //     }
    //     this.incrementCount = this.incrementCount.bind(this)
    //     this.decrementCount = this.decrementCount.bind(this)
    // }

    render(){
        return(
            <div className="counter">
                <button onClick={() => this.props.incrementMethod(this.props.by)}>+{this.props.by}</button>
                <button onClick={() => this.props.decrementMethod(this.props.by)}>-{this.props.by}</button>
            </div>
            );
        }
    // incrementCount() {
    //    console.log("Increment +1")
    //    this.state.counter++; - if do this, the compiler will make an error. You must use to setState method
    //    this.setState({
    //        counter : this.state.counter + (this.props.by)
    //    });
    //    this.props.incrementeMethod(this.props.by);
    // }
    // decrementCount(){
    //     this.setState({
    //         counter : this.state.counter - (this.props.by)
    //     });
    //     this.props.decrementMethod(this.props.by);
    // }
  }

  CounterButton.defautProps = {
    by:1
  }
  CounterButton.propTypes = {
      by : propTypes.number
  }

  export default Counter