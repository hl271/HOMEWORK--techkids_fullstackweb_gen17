import React from 'react'

export default (props) => {
  return <input  onChange={props.handleChange} name={props.playerth} className="form-control d-block my-2 rounded border-pink" placeholder="Username" required={props.required}/>
}
