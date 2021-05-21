import React, { useContext } from 'react'
import { UserContext } from '../context/UserContext'

function NavBar(props){

    const {isLogedIn, logout} = useContext(UserContext)

    if(isLogedIn()){
        return(
            <div className="uk-navbar uk-padding-small uk-heading-divider uk-background-secondary">
                <div className="uk-navbar-left">
                    <div className="uk-container">
                        <h3 className="title-white">{props.header}</h3>
                    </div>
                </div>
                <div className="uk-navbar-right">
                    <nav>
                        { window.location.pathname === '/users' && 
                            <a 
                                className="uk-button uk-button-primary uk-margin-right"
                                href="/addUser"
                            > Nuevo </a> }
                        {
                            window.location.pathname === '/addUser' && 
                            <a 
                                className="uk-button uk-button-primary uk-margin-right"
                                href="/users"
                            > Tabla </a> }
                        <button onClick={logout} className="uk-button uk-button-danger uk-margin-right">Salir</button>
                    </nav>
                </div>
            </div>
        )
    }
    return (
        <div className="uk-navbar uk-padding-small uk-heading-divider">
            <div className="uk-container">
                <h1>{props.header}</h1>
            </div>
        </div>
    )
}

export default NavBar