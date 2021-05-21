import React, { createContext, useMemo, useState } from "react";
import { get, post, put, destroy as del } from "./HttpSC";

const UserContext = createContext()

function UserProvider(props){
    
    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        uid: "",
        country: ""
    })

    const login = async (data) => {
        try{
            let result = await post('users/login', data)
            result = await result.json()
            setToken(result.token)
            await setUser({
                email: result.email,
                firstName: result.firstName,
                lastName: result.lastName,
                country: result.country,
                uid: result._id
            })
            return Promise.resolve(result)
        }catch(err){
            return Promise.reject(await err.json())
        }
    }

    const add = async (data) => {
        try{
            let result = await post('users/register', data)
            return Promise.resolve(result)
        }catch(err){
            return Promise.reject(await err.json())
        }
    }

    const register = async (data) => {
        try{
            let result = await post('users/register', data)
            result = await result.json()
            setToken(result.token)
            setUser({
                email: result.email,
                firstName: result.firstName,
                lastName: result.lastName,
                country: result.country,
                uid: result._id
            })
            return Promise.resolve(result)
        }catch(err){
            return Promise.reject(await err.json())
        }
    }

    const update = async (id, data) => {
        let result = await put('users/'+id, data, getToken())
        if(result.status === 200)
            return Promise.resolve(await result.json())
        if(result.status === 401) // Token invalido
            await logout()
        return Promise.reject(result)
    }

    const destroy = async (id) => {
        let result = await del('users/'+id, getToken())
        if(result.status === 200)
            return Promise.resolve(await result.json())
        if(result.status === 401) // Token invalido
            return await logout()
        return Promise.reject(result)
    }

    const logout = async () => {
            delToken()
        setUser({
            firstName: "",
            lastName: "",
            email: "",
            uid: "",
            country: ""
        })
        window.location.reload()
    }

    const getAll = async () => {
        let result = await get('users/', getToken())
        if(result.status === 200)
            return Promise.resolve(await result.json())
        if(result.status === 401)
            await logout()
        return Promise.reject(result)
    }

    const getuid = () => {
        return user.uid
    }

    const getUser = () => {
        return user
    }
    
    const isLogedIn = () => {
        return getToken()? true: false
    }

    const setToken = (token) => {
        localStorage.setItem('t0k3n', token)
    }

    const getToken = () => {
        return localStorage.getItem('t0k3n')
    }

    const delToken = () => {
        // localStorage.removeItem('tok3n')
        localStorage.clear()
    }


    const value = useMemo(() => {
        return({
            user,
            setUser,
            login,
            add,
            register,
            update,
            destroy,
            logout,
            getuid,
            getUser,
            isLogedIn,
            getToken,
            getAll
        })
    }, [user, setUser])

    return (
        <UserContext.Provider value={value}>
            {props.children}
        </UserContext.Provider>
    )
}

export {UserContext, UserProvider}