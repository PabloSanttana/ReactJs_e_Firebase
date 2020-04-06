import app from 'firebase/app'
import 'firebase/database'
import 'firebase/auth'
import 'firebase/storage'

let firebaseConfig = {
        // coloque suas configuração do seu banco firebase aqui 
  };
  // Initialize Firebase



class Firebase{

    // construtor para inicializar as config... do banco
    constructor(){
       app.initializeApp(firebaseConfig);

       // exportando para acessar em outos locais
       this.app = app.database();
       this.storege = app.storage();
    }
    //verificando se tem user no banco e logando
    login(email, password){
        return app.auth().signInWithEmailAndPassword(email, password)
    }

    logout(){
       
        return app.auth().signOut();

    }

    // metodo para registrar
  async  register(nome, email, password){
      // registrando user
     await   app.auth().createUserWithEmailAndPassword(email, password)

     // criando um id aleatorio
     const uid = app.auth().currentUser.uid;
        // colocando user no banco 
     return app.database().ref('usuarios').child(uid).set({
         nome: nome
     })
    }

    // verificando a conexao com o  banco firebase
    isInitialized(){
        return new Promise(resolver =>{
            app.auth().onAuthStateChanged(resolver)
        })
    }
    //verificar ser tem alguma sessão de usuario logado e tbm retorna o email
    getCurrent(){
        return app.auth().currentUser && app.auth().currentUser.email
    }
 //verificar ser tem alguma sessão de usuario logado e tbm retorna o id
    getCurrentUid(){
        return app.auth().currentUser && app.auth().currentUser.uid
    }

    // buscando o nome do usuario no banco
    async getUserName(callback){

        if(!app.auth().currentUser){
            return null
        }

        const uid = app.auth().currentUser.uid;

        await app.database().ref('usuarios').child(uid)
            .once('value').then(callback)
    }
      


}

export default new Firebase();