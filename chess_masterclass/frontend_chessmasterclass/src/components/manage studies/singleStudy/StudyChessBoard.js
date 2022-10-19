import React, {useState, useEffect} from 'react'
import { Chessboard } from "react-chessboard";


const StudyChessBoard = (props) => {
    const [game, setGame] = useState()
    const [currentPosition, setCurrentPosition] = useState()

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
        console.log('czy działam?')
        console.log(e)
        let response = await fetch(`http://127.0.0.1:8000/api/study/detail/${props.author}/${props.id}/table/${props.tableId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    // 'coord': currentPosition
                    'coord': e
                }
            )
        })
    }

    
useEffect(() => {
  chessCoordsParser()
  
}, [])


  return (
    <div>
        {props.isLogged
        ?
            <>
                <Chessboard id="BasicBoard" arePiecesDraggable={true} boardWidth={props.size} 
                position={game} 
                getPositionObject={upgradePosition}            
                />
            </>
        :
            <Chessboard id="BasicBoard" arePiecesDraggable={false} boardWidth={props.size} 
            position={game} 
            />
        }
        

    </div>
  )
}

export default StudyChessBoard