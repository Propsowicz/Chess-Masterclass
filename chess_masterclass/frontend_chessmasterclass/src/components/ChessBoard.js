import React, {useState} from 'react'
import { Chessboard } from "react-chessboard";

// https://www.npmjs.com/package/react-chessboard

const ChessBoard = () => {
    const [game, setGame] = useState('rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR')
    // lista game sie nadpisuje przy kazdym ruchu, trzeba by zrobic mozliwosc ustawiania figur dowolnie
    // trzeba by wrzucic game do bazy danych (zrobic jakas podbaze z akapitami i tablicami szachowymi do Course)
    console.log(game)
    
      


  return (
    <div>
        <Chessboard id="BasicBoard" arePiecesDraggable={true} boardWidth={500} 
         position={game} 
         getPositionObject={setGame}
        />
        
    </div>
  )
}

export default ChessBoard