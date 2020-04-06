import React from 'react'

import firebase from '../../Firebase/Firebase'
import './styles.css'

export default class Home extends React.Component {

    state ={
        posts:[]
    }
    
    componentDidMount(){
        firebase.app.ref('posts').once('value',(snapshot)=>{
            let posts =[];

            snapshot.forEach(item=>{
                posts.push({
                    key: item.key,
                    titulo: item.val().titulo,
                    image: item.val().image,
                    descricao: item.val().descricao,
                    autor: item.val().autor
                })
            })

            posts.reverse();
            this.setState({posts})
        })
    }


    render(){
    return (
    
      <section id="post">
          {this.state.posts.map(post =>(
              <article key={post.key}>
                  <header>
                      <div className="title">
                        <strong>{post.titulo}</strong>
                        <span>Autor: {post.autor}</span>
                      </div>
                  </header>
                  <img src={post.image} alt="Capa do post"/>

                  <footer>
                     <p>{post.descricao}</p>
                  </footer>
              </article>
          ))}

      </section>
    )
          
}
}
