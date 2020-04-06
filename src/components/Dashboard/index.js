import React, { Component } from 'react'
import {Link, withRouter } from 'react-router-dom'

import firebase from '../../Firebase/Firebase'
import './styles.css'


export class Dashboard extends Component {

    state ={
        nome: localStorage.nome,
        email: firebase.getCurrent()
    }
    async componentDidMount(){
        // verificando se tem alguma sessao aberta,
        //se não estiver essa pagina não pode ser acessada
        if(!firebase.getCurrent()){
            this.props.history.replace('/login')
        }

        firebase.getUserName(info=>{
            localStorage.nome = info.val().nome
            this.setState({nome: localStorage.nome}) 
        })
    }

    logout = async () =>{
     await firebase.logout()
        .catch(error=>{
            console.log(error)
        })
        localStorage.removeItem('nome')
        this.props.history.push('/')
    }

    render() {
        const  {nome, email} = this.state

        return (
            <div id="dashboard">
                <div className="dash-info">
                    <h2>Olá  {nome}</h2>
                    <Link to='/dashboard/new'>Novo Post</Link>
                </div>
                <p> <strong>Logado com: </strong>  {email}</p>
                <button onClick={this.logout}>Sair</button>
            </div>
        )
    }
}

export default withRouter(Dashboard)
