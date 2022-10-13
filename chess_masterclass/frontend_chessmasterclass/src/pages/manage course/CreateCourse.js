import React from 'react'

const CreateCourse = () => {
  return (
    <div className='container' style={{width: '30rem',paddingTop:'3rem',}}>
        <form>
            <div className="form-outline" id='username'>
                <input id='1' type="text" className="form-control" name="username" placeholder="Enter username"/>
                <label className="form-label" htmlFor="1">Course name</label>
            </div>

            <div className="form-outline" id='username'>
                <textarea id='1' type="text" className="form-control" name="username" placeholder="Description"/>
                <label className="form-label" htmlFor="1">Description</label>
            </div>

            <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault"/>
                <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Private</label>
            </div>

            <select className="form-select form-select-sm" aria-label=".form-select-sm example" disabled>
                <option selected>Price</option>
                <option value="1">0.0</option>
                <option value="2">9.99</option>
                <option value="3">19.99</option>
                <option value="3">34.99</option>
            </select>



        </form>





    </div>
  )
}

export default CreateCourse