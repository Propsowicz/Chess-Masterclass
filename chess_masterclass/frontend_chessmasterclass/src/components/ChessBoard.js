import React, {useState} from 'react'
import { Chessboard } from "react-chessboard";
import {chessCoordsParser} from '../utils/utlis'

// https://www.npmjs.com/package/react-chessboard

const ChessBoard = (props) => {
    


    // const [game, setGame] = useState('rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR')
    const [game, setGame] = useState(chessCoordsParser(props))
    // lista game sie nadpisuje przy kazdym ruchu, trzeba by zrobic mozliwosc ustawiania figur dowolnie
    // trzeba by wrzucic game do bazy danych (zrobic jakas podbaze z akapitami i tablicami szachowymi do Course)
   

  return (
    <div className='container'>
        <div className="card mb-3">
        <div className="row g-0">
          <div className="col-md-4">
            <Chessboard id="BasicBoard" arePiecesDraggable={false} boardWidth={400} 
              position={game} 
              getPositionObject={setGame}
              />
          </div>
          <div className="col-md-8">
            <div className="card-body">              
              <p className="card-text" style={{marginLeft: '0%', textAlign: 'left'}}>{props.text}</p>              
            </div>
          </div>
        </div>
      </div>       
    </div>
  )
}

export default ChessBoard