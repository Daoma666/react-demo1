import React from 'react';
import withTimer from '../c6/withTimer';

class MessageList extends React.PureComponent{
    render(){
        return (
            <ul>
                {this.props.messages.map(msg => <li>{msg}</li>)}
            </ul>
        );
    }
}

export class ChatApp extends React.Component{
    //ES6实例属性新写法，可以不用在constructor里写成this.state=...
    state={
        messages: [],
        inputMsg: ''
    };

    handleInput= evt => {
        this.setState({
            inputMsg: evt.target.value
        });
    };
    handleSend= () => {
        const text=this.state.inputMsg;
        if(text){
            const newMessages=[...this.state.messages,text];
            this.setState({
                messages: newMessages,
                inputMsg: ""
            });
        }
    }

    render(){
        return (
            <div>
                <MessageList messages={this.state.messages} />
                <div>
                    <input value={this.state.inputMsg} onChange={this.handleInput} />
                    <button onClick={this.handleSend}>Send</button>
                </div>
                <h2>{this.props.time.toLocaleString()}</h2>
            </div>
        );
    }
}
//通过高阶组件传过来计时器功能
export default withTimer(ChatApp);