import axios from 'axios';
import React, { useContext, useState } from 'react'
import UserContext from './UserContext';

//props takes... title, description,newsid(url),author,image, time, savedon, bookmark(true/false)
export default function HistoryItems(props) {
  //global variable
  const mode = useContext(UserContext);
  //to set the check box checked and uncheck.... in case of Bookmarked.js
  const [checked, setChecked] = useState(true);
  //on hover: OnMouseEnter... apply shadow
  const [shadow, setShadow] = useState("0px 0px");
  //card style
  const styles = {
    width: "100%",
    boxShadow: shadow,
    backgroundColor: mode === 'light' ? '#fff870' : 'white'
  }


  //to update the savedon in history db... if clicked on detail button
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
  //to remove from bookmark db....... before refreshing the page can be added in bookmark again
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

  return (
    <div className="card" style={styles} onMouseEnter={() => setShadow('5px 10px 5px '.concat(mode === 'light' ? '#347069' : '#3d0909'))} onMouseLeave={() => setShadow("0px 0px")}>
      <img src={props.image} className="card-img-top" alt="..." />
      <div className="card-body">
        <h5 className="card-title">{props.title}...</h5>
        <p className="card-text">{props.description}...</p>
      </div>
      <ul className="list-group list-group-flush" >
        <li className="list-group-item" style={{ backgroundColor: mode !== 'light' ? '#fff870' : 'white' }}>By {props.author ? props.author : "Unknown"}</li>
        <li className="list-group-item" style={{ backgroundColor: mode !== 'light' ? '#fff870' : 'white' }}>Published at {new Date(props.time).toGMTString()}</li>
        <li className="list-group-item" style={{ backgroundColor: mode !== 'light' ? '#fff870' : 'white' }}>{props.bookmark ? 'Added on' : 'Last open on'} {new Date(props.savedon).toGMTString()}</li>
      </ul>
      <div className="card-body">
        {/* Detail button as url */}
        <a href={props.url} target='_blank' className="btn btn-sm btn-warning" onClick={() => history(localStorage.getItem("email"), props.url, props.title, props.description, props.author, props.time, props.image)}>Details</a>
        {/*If this page comes from Bookmarked.js.... than show a check box*/}
        {props.bookmark && <div className={`form-check form-switch text-dark`}>
          <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" onChange={() => { checked === true ? setChecked(false) : setChecked(true) }} onClick={() => addtoBookmark(localStorage.getItem("email"), props.url, props.title, props.description, props.author, props.time, checked, props.image)} defaultChecked={true} />
          <label className="form-check-label" htmlFor="flexSwitchCheckDefault"><small>Bookmarked</small></label>
        </div>}
      </div>
    </div>
  )
}
