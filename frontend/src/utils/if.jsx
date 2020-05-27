import React,{Component} from 'react'

export default class If extends Component{
    render(){
        if(this.props.test)
            return this.props.children
        else
            return false
    }
}

