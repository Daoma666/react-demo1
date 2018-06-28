import React from 'react';
import PropTypes from 'prop-types';

export default class Comment extends React.PureComponent{
    static propTypes={
        comments: PropTypes.object.isRequired
    };
    render(){
        const {author,content}=this.props.comment;
        return (
            <div className="comment-item">
                <span className="avatar"> </span>
                <a href="#">{author}</a>
                <p>{content}</p>
            </div>
        );
    }
}