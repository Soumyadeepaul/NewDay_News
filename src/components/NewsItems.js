import React, { useState, useContext } from 'react'
import UserContext from './UserContext';
import axios from 'axios';

export default function NewsItems(props) {
  //to use global value..mode
  const mode = useContext(UserContext);
  //
  const [checked, setChecked] = useState(false);

  {/* card shadowing  */ }
  const [shadow, setShadow] = useState("0px 0px");
  const styles = {
    width: "100%",
    boxShadow: shadow,
    backgroundColor: mode === 'light' ? '#fff870' : 'white'
  }

  {/*Add to book mark */ }
  async function addtoBookmark(email, url, title, description, author, time, checked, imageurl) {
    try {
      console.log(checked);
      await axios.post('http://localhost:8000/bookmarked', {
        email, url, title, description, author, time, checked, imageurl
      })
    }
    catch (error) {
      console.log(error);
    }
  }


  {/* history */ }
  async function history(email, url, title, description, author, time, imageurl) {

    try {
      console.log(url);
      await axios.post('http://localhost:8000/history', {
        email, url, title, description, author, time, imageurl
      })
    }
    catch (error) {
      console.log(error);
    }
  }


  return (

    <div className="card" style={styles} onMouseEnter={() => setShadow('5px 10px 5px '.concat(mode === 'light' ? '#347069' : '#3d0909'))} onMouseLeave={() => setShadow("0px 0px")}>
      <div className="row g-0">
        <div className="col-md-4">
          <a href={props.url} target='_blank' onClick={() => history(props.loggedin, props.url, props.title, props.description, props.author, props.time, props.image)}><img src={props.image} className="img-fluid rounded-start" alt="..." /></a>
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <div className='row align-items-start'>
              <div className='col'>
                <h5 className="card-title">Title</h5>
                <a href={props.url} target='_blank' onClick={() => history(props.loggedin, props.url, props.title, props.description, props.author, props.time, props.image)}><p style={{ color: 'black', textDecoration: "underline", textDecorationThickness: '2px' }}><strong>{props.title}...</strong></p></a>
                <p className="card-text"><small className="text-body-secondary">Published at {new Date(props.time).toGMTString()}, by {props.author ? props.author : "Unknown"} </small></p>

              </div>
              <div className="col">
                <h5 className='card-title'>Description</h5>
                <p className="card-text" style={{ fontSize: '15px' }}>{props.description}...</p>
                {/* bookmark */}
                <div className={`form-check form-switch text-dark`}>
                  <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" onChange={() => { checked === false ? setChecked(true) : setChecked(false) }} onClick={() => addtoBookmark(props.loggedin, props.url, props.title, props.description, props.author, props.time, checked, props.image)} />
                  <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Save for after</label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
