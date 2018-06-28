import React from 'react';
import PropTypes from 'prop-types';

export default class CommentForm extends React.PureComponent{
    static propTypes={
        comments: PropTypes.object.isRequired
    };
    render(){
        return (
            <div className="comment-form">
                <form onSubmit={evt=>evt.preventDefault()}>
                    <textarea />
                    <button>Submit</button>
                </form>
            </div>
        );
    }
}


