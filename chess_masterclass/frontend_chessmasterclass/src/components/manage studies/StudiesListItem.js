import React, {useEffect} from 'react'
import ChessBoard from '../ChessBoard'
import GoToStudy from './GoToStudy'
import { AiOutlineHeart } from 'react-icons/ai'
import StudyLikeHeart from './StudyLikeHeart'


const StudiesListItem = (props) => {

    // get body string - if it's too long => slice it!
    let getBody = (props) => {
        let body = props.body

        if(body.length > 55){
            return body = body.slice(0, 55) + '...'
        }else{
            return body
        }    
    }

    
  return (
    <div>
        <div className="col-sm-6" style={{paddingTop:'3rem'}}>
            <div className="card" style={{width: '18rem', height:'28rem',}}>
                <div className="card-body">
                    <h5 className="card-title" style={{height:'3rem'}}>{props.name}  <StudyLikeHeart text={props.likes} /></h5>
                    <h6 className="card-title" style={{height:'2.2rem'}}>by {props.author}</h6>
                    <div className='chessboard'><ChessBoard coord={props.representationChessBoard} size={200} /></div>
                    <p className="card-text" style={{paddingTop:'0.5rem'}}>{getBody(props)}</p>
                    <GoToStudy id={props.id} author={props.author} />
                            
                </div>
            </div>
        </div>
    </div>
  )
}

export default StudiesListItem