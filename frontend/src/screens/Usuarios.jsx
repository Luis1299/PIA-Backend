import React from 'react'
import NavBar from '../components/NavBar'
import UserRow from '../components/UserRow'
import { UserContext } from '../context/UserContext'

class UsersScreen extends React.Component {
    
    state = {
        cargando: true,
        users: []
    }

    static contextType = UserContext
    
    async componentDidMount(){
        try{
            if(!this.context.isLogedIn()){
                throw {status: 401}
            }
            let result = await this.context.getAll()
            this.setState({users: result})
            this.setState({cargando: false})
        }catch(err){
            if(err.status === 401){ // Token expiro o invalido
                await this.context.logout()
                alert("Su token ha expirado o es invalido, inicie sesion nuevamente")
                this.props.history.push('/login')
            }
            console.log(err)
        }
    }

    render(){

        if(this.state.cargando){
            return(
                <div>Cargando...</div>
            )
        }

        return(
            <div>
                <NavBar header="Usuarios"/>
                <div className="uk-container uk-margin-top">

                    <table className="uk-table uk-table-striped uk-table-middle uk-table-small">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Apellido</th>
                                <th>Email</th>
                                <th>Pais</th>
                                <th>Editar</th>
                                <th>Borrar</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.users.map((user, key) => {
                                return <UserRow 
                                            firstName={user.firstName}
                                            lastName={user.lastName}
                                            email={user.email}
                                            country={user.country}
                                            id={user._id}
                                            key={key}
                                        />
                            })
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default UsersScreen