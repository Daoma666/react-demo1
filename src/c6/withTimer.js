import React from 'react';

//高阶组件就是一个函数，且该函数接受一个组件作为参数，并返回一个新的组件
//该高阶函数封装了一个计时器功能，给其它组件(WrappedComponent组件)使用
export default function withTimer(WrappedComponent){
    return class extends React.Component{
        state={time:new Date()};
        componentDidMount(){
            /*组件被渲染到页面上后立马执行，在组件的整个生命周期内只执行一次。
            这里可以调用 setState 更新组件内部状态，且会触发一个重新渲染的过程，
            即会重新执行 render 方法并更新视图。
            */
            this.timerID=setInterval(()=>this.tick(),1000);
        }

        componentWillUnmount(){
            clearInterval(this.timerID);
        }

        tick(){
            this.setState({
                time: new Date()
            });
        }

        render(){
            //???{...this.props}不知道有什么用,是传给withTimer组件的
            return <WrappedComponent time={this.state.time} {...this.props} />;
        }
    }
}