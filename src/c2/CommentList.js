import React from 'react';
import PropTypes from 'prop-types';
import CommentItem from './CommentItem';

export default class CommentList extends React.PureComponent{
    //React 也有一些内置的类型检查功能。要检查组件的属性，你需要配置组件的 propTypes 属性：
    //Console会提示一个Warning:Failed prop type: Invalid prop `comments` of type `array` supplied to `CommentList`, expected `object`.
    static propTypes={
        //静态属性，通过类名CommentList.propTypes这样来引用
        comments: PropTypes.object.isRequired
    };

    render(){
        return (
            <div className="comment-list">
                {this.props.comments.map(comment=><CommentItem comment={comment} />)}
            </div>
        );
    }
}