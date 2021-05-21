import React from 'react'
import NavBar from '../components/NavBar.jsx'
import { UserContext } from '../context/UserContext.jsx'

class LoginScreen extends React.Component{

    state = {
        email: '',
        password: '',
        errorMsg: ''
    }

    static contextType = UserContext

    async iniciarSesion(e){
        e.preventDefault()
        try{
            await this.context.login({
                email: this.state.email,
                password: this.state.password
            })
            this.props.history.push('/users')
        }catch(err){
            this.setState({errorMsg: err})
        }
    }

    render(){
        return(
            <div>
                <NavBar header="PIA Backend"/>

                <div className="form uk-position-center">

                    <h3 className="uk-padding">Login</h3>

                    <div className="uk-line">

                        <form>
                            <div className="uk-margin uk-text-danger uk-text-small">{this.state.errorMsg.msg}</div>
                            
                            <div className="uk-margin">
                                <div className="uk-inline">
                                    <span className="uk-form-icon" uk-icon="icon: user"></span>
                                    <input 
                                        className="uk-input" 
                                        value={this.state.email} 
                                        placeholder="email@mail.com"
                                        type="email"
                                        onChange={e=>this.setState({email: e.target.value})}
                                    />
                                </div>
                            </div>

                            <div className="uk-margin">
                                <div className="uk-inline">
                                    <span className="uk-form-icon" uk-icon="icon: lock"></span>
                                    <input 
                                        className="uk-input" 
                                        value={this.state.password} 
                                        placeholder="******" 
                                        type="password"
                                        onChange={e=>this.setState({password: e.target.value})}
                                    />
                                </div>
                            </div>
                            
                            <button
                                className="uk-button uk-button-primary uk-margin"
                                onClick={e => this.iniciarSesion(e)}>
                                    Iniciar Sesion
                            </button>
                            <br/>
                            <a className="uk-link-toggle" href="/register">Registrarse</a>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default LoginScreen