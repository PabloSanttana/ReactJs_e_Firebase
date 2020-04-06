import React,{useState, useEffect} from 'react'
import { Link, withRouter, useHistory } from 'react-router-dom'

import firebase from '../../Firebase/Firebase'
import './styles.css'



 function Login() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const history = useHistory();


        useEffect(()=>{
            userLogado();
        })

    // verificar se user esta logado
    async function userLogado(){
        if( await firebase.getCurrent()){
            history.push('/dashboard')
        }
    }

    async function Entrar(e){
        e.preventDefault();
        try {
            await firebase.login(email,password)
            .then(response=>{
                history.push('/dashboard')
            })
            .catch(error=>{
                if(error.code === 'auth/user-not-found'){
                    alert('Este usuario não existe!')
                    return null
                }else{
                    alert('error:' + error.code)
                    return null
                }
            })
           
        } catch (error) {
            alert(error.messge)
        }
    }


    return (
        <div>
           <form onSubmit={Entrar} id="login">
            <label>Email</label>
            <input type="email" autoComplete="off" autoFocus value={email}
            placeholder="teste@teste.com" onChange={e => setEmail(e.target.value)}
            />
            <label>Password</label>
            <input type="password" autoComplete="off" value={password}
            placeholder="Sua senha" onChange={e => setPassword(e.target.value)}
            />
            <button type="submit">Entrar</button>
            <Link to="/register">Ainda não tem cadastro?</Link>
           </form>
        </div>
    )
}

export default withRouter(Login)
