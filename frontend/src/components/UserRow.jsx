import React, { useContext, useState } from 'react'
import { UserContext } from '../context/UserContext'
import {useHistory} from 'react-router-dom'

function UserRow(props){

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [country, setCountry] = useState('')
    const [icon, setIcon] = useState('pencil')
    const [editMode, setEditMode] = useState(false)

    const {destroy, update, logout, getuid} = useContext(UserContext)

    const history = useHistory()

    function editar(e){
        if(editMode){
            e.target.parentElement.parentElement.classList.remove("edit")
            setEditMode(false)
            setIcon("pencil")
        }
        else{
            e.target.parentElement.parentElement.classList.add("edit")
            setEditMode(true)
            setIcon("close")
        }
    }

    async function actualizar(){
        try{
            let result = await update(props.id, {
                firstName: firstName,
                lastName: lastName,
                country: country
            })
            if(result.status === 401) // token invalido
                logout()
            window.location.reload()
        }catch(err){
            if(err.status === 401){ // Token expiro o invalido
                alert("Su token ha expirado o es invalido, inicie sesion nuevamente")
                history.push('/login')
            }
            console.log(err)
        }
    }

    async function borrar(){
        try{
            await destroy(props.id)
            if(props.id === getuid())
                await logout()
            window.location.reload()
        }catch(err){
            // if(err.status === 401){ // Token expiro o invalido
            //     alert("Su token ha expirado o es invalido, inicie sesion nuevamente")
            //     history.push('/login')
            // }
        }
    }

    return(
        <>
            <tr>
                <td>{props.firstName}</td>
                <td>{props.lastName}</td>
                <td>{props.email}</td>
                <td>{props.country}</td>
                <td>
                    <button 
                    className="uk-button uk-button-secondary"
                    onClick={e=>{editar(e)}}
                    ><span uk-icon={"icon: "+icon}></span></button>
                </td>
                <td>
                    <button 
                    className="uk-button uk-button-danger uk-inline"
                    onClick={borrar}
                    >Borrar</button>
                </td>
            </tr>
            { editMode && 
            <tr className="edit-row">
                <td>
                    <input type="text" className="uk-input" onChange={e=>{setFirstName(e.target.value)}} placeholder="Nombre"/>
                </td>
                <td>
                    <input type="text" className="uk-input" onChange={e=>{setLastName(e.target.value)}} placeholder="Apellido"/>
                </td>
                <td>
                    
                </td>
                <td>
                    <select defaultValue="Default" className="uk-select" onChange={e => {setCountry(e.target.value)}}>
                        <option value="Default" disabled>Pais</option>
                        <option value="mexico">Mexico</option>
                        <option value="usa">USA</option>
                        <option value="canada">Canada</option>
                    </select>
                </td>
                <td>
                    <button className="uk-button uk-button-primary" onClick={actualizar}>
                        <span uk-icon="icon: check"></span>
                    </button>
                </td>
                <td></td>
            </tr>}
        </>
    )
}

export default UserRow