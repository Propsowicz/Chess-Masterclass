import React, {useEffect, useState} from 'react'
import { Chessboard } from "react-chessboard";


const ChessDivEditable = (props) => {

    const [game, setGame] = useState()

  let chessCoordsParser = () => {
    try{
      let parsedCoord = {}
      let rootProcessing = props.coord.substring(1, props.coord.length - 1)
      let firstLevelSplit = rootProcessing.split(',')
      for(let i = 0; i < firstLevelSplit.length; i++){
          let scdLevelSplit = firstLevelSplit[i].split(':')
          let key = scdLevelSplit[0].replace(/ /g, '').replace(/"/g, '').replace(/'/g, '').replace('/', '')       
          let value = scdLevelSplit[1].replace(/ /g, '').replace(/'/g, '').replace(/"/g, '').replace('/', '')            
          parsedCoord[key] = value
      }
      setGame(parsedCoord)
    }catch (error){
      setGame('')
      console.log('error with chessboard')
    }
    
    
    }

    let upgradePosition = async (e) => {
        let response = await fetch(`http://127.0.0.1:8000/api/course/creator-mode/edit/${props.courseId}/${props.id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    'method': 'COORD',
                    'coord': e,
                }
            )
        })
    }

    let upgradeBody = async (e) => {
        let response = await fetch(`http://127.0.0.1:8000/api/course/creator-mode/edit/${props.courseId}/${props.id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    'method': 'BODY',
                    'text': e.target.value,
                }
            )
        })
    }
    
    useEffect(() => {
    chessCoordsParser()
    }, [])
    


  return (
    <div>
        <div className='container'>
        <div className="card mb-3">
        <div className="row g-0">
          <div className="col-md-4">
          <Chessboard id="BasicBoard" arePiecesDraggable={true} boardWidth={400} 
                    position={game} 
                    getPositionObject={upgradePosition} 
                    />
          </div>
          <div className="col-md-8">
            <div className="card-body">              
              <p className="card-text" style={{marginLeft: '0%', textAlign: 'left'}}><textarea className='study-body-textarea' onKeyUp={upgradeBody} defaultValue={props.text}></textarea></p>              
            </div>
          </div>
        </div>
      </div>       
    </div>

    </div>
  )
}

export default ChessDivEditable