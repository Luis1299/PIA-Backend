import React from 'react'
import NavBar from '../components/NavBar'
import { UserContext } from '../context/UserContext'

class AddUserScreen extends React.Component{

    state = {
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        country: '',
        errorMsg: {}
    }


    static contextType = UserContext

    async registrar(e){
        e.preventDefault()
        try{
            await this.context.add({
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                email: this.state.email,
                password: this.state.password,
                country: this.state.country
            })
            
            console.log("Xd")
            this.props.history.push('/users')

        }catch(err){
            console.log(err)
            this.setState({errorMsg: err})
        }
    }

    render(){
        return(
            <div>
                <NavBar header="Nuevo Usuario"/>
                
                <div className="uk-container uk-position-center">
                    <div className="uk-margin uk-text-danger uk-text-small">{this.state.errorMsg.msg}</div>
                    <form>
                        <div className="uk-margin">
                            <div className="uk-inline">
                                <span className="uk-form-icon" uk-icon="icon: user"></span>
                                <input 
                                    type="email"
                                    className="uk-input" 
                                    placeholder="email@mail.com"
                                    value={this.state.email} 
                                    onChange={e=>this.setState({email: e.target.value})}
                                />
                            </div>
                            <div className="uk-text-danger uk-text-small">{this.state.errorMsg.email}</div>
                        </div>
                        <div className="uk-margin">
                            <div className="uk-inline">
                                <span className="uk-form-icon" uk-icon="icon: lock"></span>
                                <input 
                                    type="password"
                                    className="uk-input" 
                                    placeholder="******"
                                    value={this.state.password}
                                    onChange={e=>this.setState({password: e.target.value})}
                                />
                            </div>
                            <div className="uk-text-danger uk-text-small">{this.state.errorMsg.password}</div>
                        </div>
                        <div className="uk-margin">
                            <input 
                                type="text" 
                                className="uk-input"
                                placeholder="First name"
                                value={this.state.firstName}
                                onChange={e=>this.setState({firstName: e.target.value})}
                                />
                            <div className="uk-text-danger uk-text-small">{this.state.errorMsg.firstName}</div>
                        </div>
                        <div className="uk-margin">
                            <input 
                                type="text" 
                                className="uk-input"
                                placeholder="Last name"
                                value={this.state.lastName}
                                onChange={e=>this.setState({lastName: e.target.value})}
                                />
                            <div className="uk-text-danger uk-text-small">{this.state.errorMsg.lastName}</div>
                        </div>
                        <select defaultValue="Default" className="uk-select" onChange={e=>{this.setState({country: e.target.value})}}>
                            <option value="Default" disabled>Pais</option>
                            <option value="mexico">Mexico</option>
                            <option value="usa">USA</option>
                            <option value="canada">Canada</option>
                        </select>
                        <button
                            className="uk-button uk-button-primary uk-margin"
                            onClick={e => this.registrar(e)}>
                                Registrar
                        </button>
                    </form>
                </div>

            </div>
        )
    }
}

   
export default AddUserScreen