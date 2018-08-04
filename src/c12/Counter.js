import React,{Component} from 'react';
import { bindActionCreators,createStore } from 'redux';
import {connect,Provider} from 'react-redux';
const initialState={count: 0};
//reducer
const counter=(state=initialState,action)=>{
    switch(action.type){
        case "PLUS_ONE":
            return {count: state.count+1};
        case "MINUS_ONE":
            return {count:state.count-1};
        case "CUSTOM_COUNT":
            return {count:state.count+action.payload.count};
        default:
            break;
    }
    return state;
};
//store
const store=createStore(counter);
//action creator
function plusOne(){
    return {type:"PLUS_ONE"};
}
function minusOne(){
    return {type: "MINUS_ONE"};
}

export class Counter extends Component{
    render(){
        const {count,plusOne,minusOne}=this.props;
        return (
            <div className="counter">
                <button onClick={minusOne}>-</button>
                <span style={{display:"inline-block",margin: "0 10px"}}>{count}</span>
                <button onClick={plusOne}>+</button>
            </div>
        );
    }
}

function mapStateToProps(state){
    //这里传入越精确越好
    return {
        count: state.count
    };
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({plusOne,minusOne},dispatch);
}

const ConnectedCounter=connect(mapStateToProps,mapDispatchToProps)(Counter);

export default class CounterSample extends React.Component{
    render(){
        return (
            <Provider store={store}>
                <ConnectedCounter />
            </Provider>
        );
    }
}