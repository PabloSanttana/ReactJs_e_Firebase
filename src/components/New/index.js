import React, { Component } from 'react'
import {Link , withRouter} from 'react-router-dom'

import firebase from '../../Firebase/Firebase'
import './styles.css'

export class New extends Component {

    state ={
        titulo: '',
        image: '',
        descricao:'',
        alerta: '',
        url: '',
        progress: 0
    }


   async componentDidMount(){
    if(!firebase.getCurrent()){
        this.props.history.replace('/login')
    }
    }

    cadastrar = async (e) =>{
         e.preventDefault()

         if(this.state.titulo !== '' && this.state.image !== '' && this.state.descricao !== '' && this.state.url !== ''){
                let posts = firebase.app.ref('posts');
                let id = (await posts.push()).key;

                await posts.child(id).set({
                     titulo: this.state.titulo,
                     descricao: this.state.descricao,
                     image: this.state.url,
                     autor: localStorage.nome,
                })
                 alert('Cadastrado com sucesso!')
                 this.props.history.push('/dashboard')
            }else{
                this.setState({alerta: 'Peencha todos os campos!'})
        }
    }


    handleFile = async (e) =>{


        if(e.target.files[0]){

            const image = e.target.files[0]

            if(image.type === 'image/png' || image.type === 'image/jpg' || image.type === 'image/jpeg'  ){
             await this.setState({image})

             this.handleUpload();

            }else{
                alert('Envie uma imagem do tipo PNG ou JPG')
                this.setState({image: null})
                return null
            }
            
        }
  

    }
    handleUpload = async () =>{
        const { image } = this.state
        const  uid = firebase.getCurrentUid();
        // acessando storege do firebase

        const uploadTaks = firebase.storege.ref(`image/${uid}/${image.name}`)
                                .put(image)

        await uploadTaks.on('state_changed',
        (snapshot)=>{
            //progresso

            let progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes)*100)
            this.setState({progress})
        },
        (error)=>{
            // error
            console.log('Error de imagem:  ' + error)
        },
        ()=>{
            // sucesso
            // pegando a url gerada pelo storege do firebase
            firebase.storege.ref(`image/${uid}`)
            .child(image.name).getDownloadURL()
            .then(url=>{
                this.setState({url})
            })
        })
       
    }


    render() {
        return (
            <div id="Post">
               <header  id="New">
                   <Link to="/dashboard">Voltar</Link>
               </header>
               <form onSubmit={this.cadastrar} id="new-post">
                  <span>{this.state.alerta}</span>
                 

                  <input type="file"  onChange={this.handleFile}/>

                  {this.state.url !=='' ?
                  
                    <img src={this.state.url} width="250" height="150" alt="Capa do Post" />
                    :
                    <progress value={this.state.progress} max="100"/>
                  }

                   <label>Titulo</label>
                   <input type="text" value={this.state.titulo}
                    placeholder="Titulo do Post" autoFocus autoComplete='off' 
                    onChange={e =>this.setState({titulo: e.target.value})}
                   />
                   
                   <label>Descrição</label>
                   <textarea type="text" value={this.state.descricao}
                    placeholder="Descrição da imagem" autoComplete='off' 
                    onChange={e =>this.setState({descricao: e.target.value})}
                   />
                   <button type="submit">Cadastrar</button>
               </form>
            </div>
        )
    }
}

export default  withRouter(New)

