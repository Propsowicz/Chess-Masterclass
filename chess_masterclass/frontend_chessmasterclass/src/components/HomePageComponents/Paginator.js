import React, { useState, useEffect } from 'react'
import { useLocation, useParams, Link  } from 'react-router-dom'


const Paginator = (props) => {
   
    function previusPageOnClick(e){props.previousPageHandler(e)}
    function nextPageOnClick(e){props.nextPageHandler(e)}
    function selectPageOnClick(e){props.selectPageHandler(e)}

    
  return (
    <div style={{paddingTop: '3rem'}}>
        <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-center">
                <li className="page-item">
                    {props.isFirst ? <button className="page-link disabled" to="#">Previous</button> : <button className="page-link" onClick={previusPageOnClick}>Previous</button> }
                </li>
                <li className="page-item"><button className="page-link" data-paginator onClick={selectPageOnClick} value={props.page_list[0]}>{props.page_list[0]}</button></li>
                <li className="page-item"><button className="page-link" data-paginator onClick={selectPageOnClick} value={props.page_list[1]}>{props.page_list[1]}</button></li>
                <li className="page-item"><button className="page-link" data-paginator onClick={selectPageOnClick} value={props.page_list[2]}>{props.page_list[2]}</button></li>
                <li className="page-item">
                    {props.isLast ? <button className="page-link disabled" to="#">Next</button> : <button className="page-link" onClick={nextPageOnClick}>Next</button> }                
                </li>
            </ul>
        </nav>
    </div>
  )
}

export default Paginator