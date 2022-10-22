import React from 'react'
import ChessBoard from './ChessBoard';

// https://www.npmjs.com/package/react-chessboard

const ChessDiv = (props) => {

  return (
    <div className='container'>
        <div className="card mb-3">
        <div className="row g-0">
          <div className="col-md-4">
            <ChessBoard coord={props.coord} size={400}/>            
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

export default ChessDiv