import React from 'react';
import PropTypes from 'prop-types';
import './SnapshotSample.css';

export default class SnapshotSample extends React.PureComponent{
    //实例属性，相当于写在constructor里
    state={
        messages: []
    };

    handleNewMessage(){
        this.setState(prev => ({
            messages: [
                `msg ${prev.messages.length}`,
                ...prev.messages
            ]
        }));
    }

    componentDidMount(){
        for(let i=0;i<20;i++) this.handleNewMessage();
        this.interval=window.setInterval(()=>{
            if(this.state.messages.length>100){
                window.clearInterval(this.interval);
                return;
            }
            this.handleNewMessage();
        },1000);
    }

    componentWillUnmount(){
        window.clearInterval(this.interval);
    }

    /*这个API在每次state更新后，页面render前调用
     *在该例中获取render之前的DOM状态，避免顶部DOM一直新增想看到的内容一直往下刷
     *这一生命周期返回的任何值将会 作为参数被传递给componentDidUpdate()。
     */
    getSnapshotBeforeUpdate(){
        return this.rootNode.scrollHeight;
    }

    //componentDidUpdate(prevProps, prevState)会在更新发生后立即被调用。
    //这里原本没有的第三个参数就是从上一个函数传过来的
    componentDidUpdate(prevProps,prevState,prevScrollHeight){
        const scrollTop=this.rootNode.scrollTop;
        console.log(scrollTop);
        if(scrollTop<5) return;
        /*scrollTop是元素的顶部到它的滚动容器最顶部的距离（即控制从滚动容器哪个位置开始显示）
         *scrollHeight是元素滚动容器的高度
         *每次更新后滚动容器顶部加入的DOM的高度就是this.rootNode.scrollHeight-prevScrollHeight
         *若你初始scrollTop是200，则它会一直不变且上放有新DOM高度加入，所以你想看到的内容会一直往下刷
         *此时就需要让scrollTop加上每次新增的高度，保持你之前想看到内容的点
         */
        this.rootNode.scrollTop=scrollTop+(this.rootNode.scrollHeight-prevScrollHeight);   
    }

    render(){
        return (
            <div
                className="snapshot-sample"
                /*使用最新回调形式的refs，用于强制访问在 render 方法中创建的 DOM 节点或 React 元素。              
                 *当构造组件时，refs 通常被赋值给实例的一个属性，这样你可以在组件中任意一处使用它们.
                 *在这里就是获取该div元素存储到该SnapshotSample组件的rootNode实例中
                 *具体见官方文档Refs & DOM
                */
                ref={n=> (this.rootNode = n)}
            >
                {this.state.messages.map(msg => <div>{msg}</div>)}
            </div>
        )
    }
}