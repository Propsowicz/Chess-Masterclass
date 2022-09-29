import React, {createContext, useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import jwt_decode from 'jwt-decode'

// create user context
export const UserContext = createContext()

// create provider
export const UserContextProvider = ({children}) => {   

    // lists with user/auth data
    // check if there are tokens in local storage: if they are overwrite lists 
    let [authTokens, setAuthTokens] = useState(localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : [])
    let [userInfo, setUserInfo] = useState(localStorage.getItem('authTokens') ? jwt_decode(JSON.parse(localStorage.getItem('authTokens')).access) : [])

    // func to navigate (ie to homepage)
    const navigate = useNavigate()

    // func to login user: from form(onSubmit) in Login.js get username and pass and send it to API. In reverse get tokens (custom one have all needed data)
    let login = async (e) => {
        e.preventDefault()

        // call to API
        let response = await fetch('http://127.0.0.1:8000/api/token/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({'username': e.target.username.value, 'password': e.target.password.value}),
        })
        // get tokens in reponse
        let data = await response.json()

        // if status-200 then set Lists with data and save tokens in localstorage
        if(response.status === 200){
            setAuthTokens(data)
            setUserInfo(jwt_decode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data))   
            navigate('/')
        }else if(response.status === 401){
            console.log('wrong pass or username')
        }
        else{
            console.log('smth went wrong')
        }
    }

    // update refresh token every 4 mins
    let updateTokens = async () => {        
        // call to API
        let response = await fetch('http://127.0.0.1:8000/api/token/refresh/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({'refresh': authTokens?.refresh}),
        })
        // get tokens in reponse
        let data = await response.json()

        // if status-200 then set Lists with data and save tokens in localstorage
        if(response.status === 200){
            setAuthTokens(data)
            setUserInfo(jwt_decode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data))              
        }
        // else: smth is wrong and logout
        else{
            logout()
        }
    }

    // logout
    let logout = () => {
        setAuthTokens([])
        setUserInfo([])
        localStorage.clear() 
        navigate('/')
    }

    // register
    let register = async (e) => {   
        e.preventDefault()

        if(e.target.password.value.length > 7){
            if(e.target.password.value === e.target.password2.value){
                let response = await fetch('http://127.0.0.1:8000/member/api/register/', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({  'username': e.target.username.value,
                                                    'password': e.target.password.value,
                                                    'email': e.target.email.value,        
                        })
                        })
                        let status = await response.json()

                        if(status.status === 200 || status.status === 201){
                            navigate('/')
                        }else{
                            console.log(status.username[0])
                            navigate('/')
                        }                       
            }else{
                console.log('passwords are not the same')
            }
        }else{
            console.log('password is too short')
        }
    }


    useEffect(() => {
        let fourMinutes = 1000 * 4 * 60
        let interval = setInterval(() => {
            updateTokens()
        }, fourMinutes)
        return () => clearInterval(interval)
    }, [])

    // collection of data to hook between components
    let contextData = {
        // data
        userInfo: userInfo,

        // functions
        register: register,
        login: login,
        logout: logout,
    }

    // provider DOM
    return(
        <UserContext.Provider value={contextData}>
            {children}
        </UserContext.Provider>
    )

}
