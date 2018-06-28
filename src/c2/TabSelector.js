import React from 'react';
import PropTypes from 'prop-types';
import './TabSelector.css';

//受控组件的状态由它的使用者来维护，组件尽量无状态所需数据通过props获取
export default class TabSelector extends React.PureComponent{
    static propTypes={
        value: PropTypes.string,
        options: PropTypes.array,
        onChange: PropTypes.func
    };
    //你可以通过配置 defaultProps 为 组件的props定义默认值
    static defaultProps={
        value: null,
        options: [],
        onChange: () => {}
    };

    render(){
        const { options,value,onChange }=this.props;
        return (
            <div className="tab-selector">
                <ul>
                    {options.map(opt => (
                        <li
                            key={opt.value}
                            //通过切换类名实现点击效果
                            className={`tab-item ${opt.value === this.props.value 
                                ? "selected"
                                : ""
                            }`}
                            onClick={()=>this.props.onChange(opt.value)}
                        >
                            {opt.name}
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}

const options = [
  { name: "Red", value: "red" },
  { name: "Blue", value: "blue" },
  { name: "Orange", value: "orange" }
];
//使用者内部有状态state
export class TabSelectorSample extends React.PureComponent{
    state={
        color: null
    };

    render(){
        return (
            <div>
                Select color: 
                <TabSelector 
                    options={options} 
                    value={this.state.color}
                    onChange={c => this.setState({ color:c })}
                />
            </div>
        );
    }
}