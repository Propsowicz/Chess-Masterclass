import React, {useState, useEffect} from 'react'
import { Chessboard } from "react-chessboard";

// https://www.npmjs.com/package/react-chessboard

const ChessBoard = (props) => {
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
  
useEffect(() => {
  chessCoordsParser()
}, [props.coord])
   

  return (
    <div>
      <Chessboard id="BasicBoard" arePiecesDraggable={false} boardWidth={props.size} 
                    position={game} 
                    // getPositionObject={setGame}
                    />

    </div>
    
  )
}

export default ChessBoard