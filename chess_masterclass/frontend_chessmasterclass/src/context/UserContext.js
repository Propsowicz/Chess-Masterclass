import React, {createContext, useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import {alertMsg} from '../utils/utlis'

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
        // let btnToBlock = document.querySelector('#btn-login')  
        // btnToBlock.disabled = true 
        e.preventDefault()

        // call to API
        let response = await fetch('http://127.0.0.1:8000/member/api/token/', {
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
            alertMsg('login-form', 'Username or password is not correct. Try again.', 'btn-login')
        }else if(response.status === 400){
            alertMsg('login-form', 'Please fill all fields.', 'btn-login')
        }else{
            console.log('smth went wrong')
        }
        // btnToBlock.disabled = true 

    }

    // update refresh token every 4 mins
    let updateTokens = async () => {        
        // call to API
        let response = await fetch('http://127.0.0.1:8000/member/api/token/refresh/', {
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
        let btnToBlock = document.querySelector('#btn-submit-register')  
        btnToBlock.disabled = true 
        e.preventDefault()
        if(e.target.username.value && e.target.password.value && e.target.password2.value && e.target.email.value){
            if(e.target.password.value === e.target.password2.value){
                let response = await fetch('http://127.0.0.1:8000/member/api/register/', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({  'username': e.target.username.value,
                                                'password': e.target.password.value,
                                                'email':    e.target.email.value,        
                    })
                    })
                    let status = await response.json()                    
                    
                    if(response.status === 200 || response.status === 201){
                        alertMsg('submit-field', 'Account has been created. Check you email to complete registration process.', 'btn-submit-register')
                        setTimeout(() => {
                            navigate('/')
     
                        }, 3000)
                    }else if(status['username']){
                        alertMsg('username', status['username'][0], 'btn-submit-register')
                    }else if(status['email']){
                        alertMsg('email', status['email'][0], 'btn-submit-register')
                    }else if(status.password){
                        status.password[0].forEach(msg => {
                            alertMsg('password2', msg, 'btn-submit-register')                           
                        });                        
                    }else{
                        console.log('smth went wrong..')
                    }
            }else{
                alertMsg('password2', 'Passwords are not the same.', 'btn-submit-register')
            }                                                       
                
        }else{
            alertMsg('submit-field', 'Please fill all fields.', 'btn-submit-register')
        }
        btnToBlock.disabled = false 
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
