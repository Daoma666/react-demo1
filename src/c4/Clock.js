import React from 'react';

export default class Clock extends React.Component{
    constructor(props){
        super(props);
        console.log("Clock constructed");
        this.state={
            date: new Date()
        };
    }

    componentDidMount(){
        console.log("Clock did mount");
        this.timeID=setInterval(() => this.tick(),1000);
    }

    componentDidUpdate(){
        console.log("Clock did update");
    }

    componentWillUnmount(){
        console.log("Clock will unmount");
        clearInterval(this.timeID);
    }

    tick(){
        this.setState({
            date: new Date()
        });
    }

    render(){
        return (
            <div>
                <h1>Hello,world!</h1>
                <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
            </div>
        );
    }
}