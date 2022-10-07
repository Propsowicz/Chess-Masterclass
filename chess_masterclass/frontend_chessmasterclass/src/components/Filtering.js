import React, {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'

const Filtering = () => {

    let navigate = useNavigate()
    // let [freeFilter, setFreeFilter] = useState(sessionStorage.getItem('freeFilter') ? sessionStorage.getItem('freeFilter') : false )
    let [freeFilter, setFreeFilter] = useState(false)


    


    let filterNavigate = () => {
        let link = ''
        if(freeFilter){
            link = link + `&free`
        }
        console.log(link)
        if(link === ''){
            navigate(`/`)
        }else{
            navigate(`/filter/${link}`)
        }
        
    }

    let freeFilterHandler = () => {        
        setFreeFilter(!freeFilter)  
        // sessionStorage.setItem('freeFilter', freeFilter)
        
    }

    let manageSessionStorage = () => {
        
        sessionStorage.setItem('freeFilter', freeFilter)
        
    }

    // useEffect(() => {
    //     filterNavigate()
    // },[freeFilter])
    
  return (
    <div>
           <div className="form-check form-check-inline">
                <input className="form-check-input" type="checkbox" id="free" value="free" onChange={freeFilterHandler} checked={freeFilter}  />
                <label className="form-check-label" htmlFor="inlineCheckbox1">Free</label>
            </div>
            <div className="form-check form-check-inline">
                <input className="form-check-input" type="checkbox" id="master" value="master" onChange={freeFilterHandler} defaultChecked={false}/>
                <label className="form-check-label" htmlFor="inlineCheckbox2">Master</label>
            </div> 
            <button type='submit' onClick={filterNavigate}>dasdasdads</button>
        
        
    </div>
  )
}

export default Filtering