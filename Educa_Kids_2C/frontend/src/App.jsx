import { useState , useEffect } from 'react'
import axios from 'axios'
import './App.css'


const api = axios.create({
baseURL: 'http://localhost:3001'
})

function App() {
  const [users, setUsers] = useState([])
  const [name ,setNewUser] = useState('')
  const [email, setNewEmail] = useState('')
  const [senha, setNewSenha] = useState('')
  const [senhacf, setNewSenhacf] = useState ('')



  useEffect(() => {
    api.get('/').then((response) => {
      console.log(response.data)
      setUsers(response.data)
    })

  }, [])

   function newUser() {
    api
    .post('/cadastro', {
      name,
      email,
      senha,
      senhacf,
    })

    .then((response) => {
   console.log(response)
    })

  }

    return (

      <div>
        <h1>Usuários</h1>
        <ul>
          {users.map((user) => (

            <li key={user.name}>
              Nome: {user.name} - Email: {user.email} - Senha: {user.senha} - Confirmar {user.senhacf}
            </li>

          ))}
        </ul>
        

        <h2>Cadastrar</h2>
        <form>
        <input placeholder='Nome' onChange={event => setNewUser(event.target.value)} />
        <input placeholder='Email' onChange={event=> setNewEmail(event.target.value)}/>
        <input placeholder='Senha' onChange={event=> setNewSenha(event.target.value)}/>
        <input placeholder='Confirmar' onChange={event=> setNewSenhacf(event.target.value)}/>
        <div><button onClick={newUser}>Cadastrar</button></div>
        </form>
      </div>

    )
  }

  export default App

