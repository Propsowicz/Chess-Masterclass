import React, {createContext, useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import {alertMsg} from '../utils/utlis'
import {url} from '../constants/urlAPI'

// create user context
export const UserContext = createContext()

// create provider
export const UserContextProvider = ({children}) => {   

    // lists with user/auth data
    // check if there are tokens in local storage: if there are overwrite lists 
    let [authTokens, setAuthTokens] = useState(localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : [])
    let [userInfo, setUserInfo] = useState(localStorage.getItem('authTokens') ? jwt_decode(JSON.parse(localStorage.getItem('authTokens')).access) : [])

    // func to navigate (ie to homepage)
    const navigate = useNavigate()

    // LOGIN FUNCTION -- start
    // from form(onSubmit) in Login.js get username and pass and send it to API. In reverse get tokens (via custom token i get needed all data)
    let login = async (e) => {        
        e.preventDefault()
        let response = await fetch(`${url}/member/api/token/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({'username': e.target.username.value, 'password': e.target.password.value}),
        })
        let data = await response.json()        

        if(response.status === 200){
            setAuthTokens(data)
            setUserInfo(jwt_decode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data))                                    // set JWT token in local storage
            navigate('/')
        }else if(response.status === 401){                                                              // if 401 password doesnt match username
            alertMsg('login-form', 'Username or password is not correct. Try again.', 'btn-login')
        }else if(response.status === 400){                                                              // if 400 fill all fields
            alertMsg('login-form', 'Please fill all fields.', 'btn-login')
        }else{
            console.log('smth went wrong')
        }
    }
    // LOGIN FUNCTION -- end

    // UPDATE TOKEN FUNCTION -- start
    // update refresh token every 4 mins (django refresh it every 5 minutes so i want to overtake it here)
    let updateTokens = async () => {        
        let response = await fetch(`${url}/member/api/token/refresh/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({'refresh': authTokens?.refresh}),
        })
        let data = await response.json()

        if(response.status === 200){                                        // set JWT token in local storage
            setAuthTokens(data)
            setUserInfo(jwt_decode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data))              
        }
        else{
            logout()                                                        // if not 200 -> call logout()
        }
    }
    // UPDATE TOKEN FUNCTION -- end

    // LOGOUT -- start
    // basically clear every useState and local storage
    let logout = () => {
        setAuthTokens([])
        setUserInfo([])
        localStorage.clear() 
        navigate('/')
    }   
    // LOGOUT -- end

    // REGISTER -- end
    let register = async (e) => {
        let btnToBlock = document.querySelector('#btn-submit-register')  
        btnToBlock.disabled = true 
        e.preventDefault()
        if(e.target.username.value && e.target.password.value && e.target.password2.value && e.target.email.value){         // check if all fields are filled
            if(e.target.password.value === e.target.password2.value){                                                       // check if pass and repeated pass are the same
                let response = await fetch(`${url}/member/api/register/`, {
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
                    
                    if(response.status === 200 || response.status === 201){                                                 // if 200 -> account has been created successfully
                        alertMsg('submit-field', 'Account has been created. Check you email to complete registration process.', 'btn-submit-register')
                        setTimeout(() => {
                            navigate('/')
     
                        }, 3000)
                    }else if(status['username']){                                                                           // username already exists
                        alertMsg('username', status['username'][0], 'btn-submit-register')
                    }else if(status['email']){                                                                              // email already exists
                        alertMsg('email', status['email'][0], 'btn-submit-register')
                    }else if(status.password){                                                                              // get list of password valditaion (from django pass validator) errors
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

    let contextData = {
        // data
        userInfo: userInfo,

        // functions
        register: register,
        login: login,
        logout: logout,
    }

    // PROVIDER DOM
    return(
        <UserContext.Provider value={contextData}>
            {children}
        </UserContext.Provider>
    )

}
