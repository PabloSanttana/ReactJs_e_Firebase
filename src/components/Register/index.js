import React,{useState} from 'react'
import {withRouter, useHistory } from 'react-router-dom'

import firebase from '../../Firebase/Firebase'
import './styles.css'



 function Register() {

    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirme, setPasswordConfirme] = useState('')
    const history = useHistory();


      
    async function onRegister(e){

        e.preventDefault();
        if (password === passwordConfirme) {

            try {

                await firebase.register(nome,email,password)
                    .then(Response=>{
                        history.push('/dashboard')
                    })
            } catch (error) {
                
            }
        } else {
            alert('Senha não correspondente')
            return null;
        }
   
       
    }


    return (
        <div>
            <h1 className="registerTitle">Novo Usuario</h1>
           <form onSubmit={onRegister} id="register">
            <label>Nome</label>
            <input type="text" autoComplete="off" autoFocus value={nome}
            placeholder="Seu nome" onChange={e => setNome(e.target.value)}
            />
            <label>Email</label>
            <input type="email" autoComplete="off"  value={email}
            placeholder="teste@teste.com" onChange={e => setEmail(e.target.value)}
            />
            <label>Password</label>
            <input type="password" autoComplete="off" value={password}
            placeholder="Sua senha" onChange={e => setPassword(e.target.value)}
            />
            <label>Confirme Password</label>
            <input type="password" autoComplete="off" value={passwordConfirme}
            placeholder="Sua senha" onChange={e => setPasswordConfirme(e.target.value)}
            />
            <button type="submit">Cadastrar</button>
           </form>
        </div>
    )
}

export default withRouter(Register)
