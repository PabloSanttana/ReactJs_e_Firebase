import React,{useState, useEffect} from 'react'
import { BrowserRouter, Switch , Route} from 'react-router-dom'

import Header from './components/Header'
import Home from './components/Home'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import Register from './components/Register'
import New from './components/New'

import firebase from './Firebase/Firebase'

export default function Routes(){

    const [firebaseInitialized, setFirebaseInitialized ] = useState(false)

    useEffect(()=>{
        privater();
    },[firebaseInitialized])

    async function privater(){
        /// verificando as config se esta td ok
        await  firebase.isInitialized().then(responser=>{
            setFirebaseInitialized(true);
        })
    }



    return firebaseInitialized !== false ?(
        <BrowserRouter>
            <Header/>
            <Switch>
                <Route path='/' exact component={Home}/>
                <Route path='/login' exact component={Login}/>
                <Route path='/dashboard' exact component={Dashboard}/>
                <Route path='/register' exact component={Register}/>
                <Route path='/dashboard/new' exact component={New}/>
            </Switch>
        </BrowserRouter>
    ) : (
       <h1>Carregando... </h1>
    )
}