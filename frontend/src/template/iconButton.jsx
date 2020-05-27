import React,{Component} from 'react'
import If from '../utils/if'

export default class IconButton extends Component{
    render(){
        return(
            <If test={!this.props.hide}>
                <button className={`btn btn-${this.props.style}`} onClick={this.props.onClick}>
                    <i className={`fa fa-${this.props.icon}`}></i>
                </button>
            </If>
        )
    }
}