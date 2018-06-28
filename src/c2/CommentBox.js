import React from 'react';
import CommentList from './CommentList';
import CommentForm from './CommentForm';
import withTimer from '../c6/withTimer';
import './CommentBox.css';

const comments=[
    { author: "DAOMA1", content: "Hello React! This is a sample comment." },
    { author: "DAOMA2", content: "Hello Redux!" },
    { author: "DAOMA3", content: "Hello Rekit!" }
]

export class CommentBox extends React.Component{
    render(){
        return (
            <div className="comment-box">
                <h1>Comments ({comments.length})</h1>
                <CommentList comments={comments} />
                <CommentForm />
                {this.props.time.toLocaleString()}
            </div>
        );
    }
}

export default withTimer(CommentBox);