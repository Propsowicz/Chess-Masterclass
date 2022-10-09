import React, {useContext, useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
// import { Link } from 'react-router-dom'
import {UserContext} from '../context/UserContext'
import {checkCurrentPremiumPlan} from '../utils/utlis'
import ChessBoard from './ChessBoard'
import { Chessboard } from "react-chessboard";


const CourseListItem = (props) => {
    let {userInfo} = useContext(UserContext)

    // get body string - if it's too long => slice it!
    let getBody = (props) => {
        let body = props.body

        if(body.length > 55){
            return body = body.slice(0, 55) + '...'
        }else{
            return body
        }    
    }

    // get course price- if it's 0,00 => it's free!
    let getPrice = (props) => {
        let price = props.price

        if(props.price === '0.00'){
            return price = 'FREE'
        }else{
            return price + '$'
        }
    }


    let [premiumPlanName, setPremiumPlanName] = useState('')
    let getPremiumPlan = (props) => {
        let premiumPlansNames = {
            'free': 'Free',
            'master': 'Master',
            'international master': 'International Master',
            'grandmaster': 'Grandmaster'
          }


        // setPremiumPlanName(premiumPlansNames[props.premiumPlan])        
        return premiumPlansNames[props.premiumPlan]
    }

    // // chess table
    // let [chessTables, setChessTables] = useState([])
    // // function which call for api port with chess tables
    // let tablesGET = async () => {
    //     let response = await fetch(`http://127.0.0.1:8000/api/courses/${props.slug}/table`)
    //     let data = await response.json()
    //     setChessTables(data[0])
    // }
    let [chessPos, setChessPos] = useState('')
    
    let getChessPos = () => {        
        setChessPos(props.representChessTable)
    }

    
    let courseCartBtn = (props, userInfo) => {
        if(userInfo.user_acc_actv === 'True'){
            if(checkCurrentPremiumPlan(props, userInfo)){
                return <Link to={`/course/${props.slug}`} className="btn btn-success">Check it out</Link>

            }else{
                return <Link to={`/premium-plans`} className="btn btn-secondary">Buy access</Link>
            }          
        }else{
            return <Link to={`/register`} className="btn btn-primary">Register</Link>
        }
    }

    let chessCoordsParser = () => {
        let x = "{a8: 'bR', a7: 'bP', a1:'wR', a2: 'wP'}" // example
        let parsedCoord = {}
        let rootProcessing = props.coord.substring(1, x.length - 1)
        let firstLevelSplit = rootProcessing.split(',')
        for(let i = 0; i < firstLevelSplit.length; i++){
            let scdLevelSplit = firstLevelSplit[i].split(':')
            let key = scdLevelSplit[0].replace(/ /g, '').replace(/"/g, '')     
            let value = scdLevelSplit[1].replace(/ /g, '').replace(/'/g, '')       
            parsedCoord[key] = value
        }
        setChessPos(parsedCoord)
    }


    useEffect(() => {
        // getPremiumPlan()
        // console.log('what is type?: ' + typeof(props.representChessTable))
    },[chessPos])


  return (

    <div>                   
        <div className="col-sm-6" style={{paddingTop:'3rem'}}>
            <div className="card" style={{width: '18rem', height:'28rem',}}>
                <div className="card-body">
                    <h5 className="card-title" style={{height:'3rem'}}>{props.name}</h5>
                    <h6 className="card-title" style={{height:'2.2rem'}}>Premium Plan: {getPremiumPlan(props)}</h6>
                    <div className='chessboard'><ChessBoard coord={props.representChessTable} size={200} /></div>
                    <p className="card-text" style={{paddingTop:'0.5rem'}}>{getBody(props)}</p>
                    {courseCartBtn(props, userInfo)}                     
                            
                </div>
            </div>
        </div>         
    </div>
  )
}

export default CourseListItem