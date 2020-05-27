import React, {Component} from 'react'
import PageReader from '../template/pageHeader'
import TodoForm from '../todo/todoForm'
import TodoList from '../todo/todoList'
import axios from 'axios' 

const URL = 'http://localhost:3003/api/todos'

export default class Todo extends Component{
    constructor(props){
       super(props)

       this.state = { description:'', list:[] }
       this.handleChange = this.handleChange.bind(this)
       this.handleAdd = this.handleAdd.bind(this)
       this.refresh = this.refresh.bind(this)
       this.handleRemove = this.handleRemove.bind(this)
       this.handleMarkAsDone =  this.handleMarkAsDone.bind(this)
       this.handleMaskAsPending = this.handleMaskAsPending.bind(this)
       this.handleSearch = this.handleSearch.bind(this)
       this.handleClearSearch = this.handleClearSearch.bind(this)
       this.refresh()
        
       
    }

    refresh(description = '') {
        const search = description?`&description__regex=/${description}/`:''
        axios.get(`${URL}?sort=-createdAt${search}`)
        .then(resp=> this.setState({...this.state, description: description, list: resp.data }))
    }

    handleSearch(){
        this.refresh(this.state.description)
    }

    handleRemove(todo){
        axios.delete(`${URL}/${todo._id}`)
        .then(resp=>this.refresh(this.state.description))
    }

    handleMarkAsDone(todo){
        axios.put(`${URL}/${todo._id}`, {...todo, done:true})
        .then(resp=>this.refresh(this.state.description))
    }

    handleMaskAsPending(todo){
        axios.put(`${URL}/${todo._id}`, {...todo, done:false})
        .then(resp=> this.refresh(this.state.description))
    }

    handleClearSearch(){
        this.refresh()
    }


    handleChange(e){
        this.setState({...this.state, description:e.target.value})
    }

    handleAdd(){
        const description = this.state.description
        axios.post(URL,{description})
        .then(rest=> this.refresh())
    }


    render(){

        return (
            <div>
                <PageReader name='Tarefas' small='Cadastro' /> 
                <TodoForm 
                handleAdd={this.handleAdd} 
                description={this.state.description} 
                handleChange={this.handleChange}
                handleSearch={this.handleSearch}
                handleClearSearch={this.handleClearSearch}/>

                <TodoList list={this.state.list} 
                handleRemove={this.handleRemove} 
                handleMarkAsDone={this.handleMarkAsDone}
                handleMaskAsPending={this.handleMaskAsPending}
                />
            </div>
        )
    }
}