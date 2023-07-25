import React from 'react'
import { Link } from 'react-router-dom'

export default function Topbar(props) {
  //logout functionality
  function logout() {
    //confirm logout box
    if (window.confirm("Do you want to logout?") === true) {
      //clear the local storage
      localStorage.clear()
      //take to the home page without log in 
      window.location.href='/'
    }
  }
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary bg-dark" data-bs-theme={`${props.mode}`} style={{ position: 'fixed', width: '100%', top: '0', height: "60px", borderBottomStyle: props.mode === 'light' ? 'solid' : 'none' }}>
      <div className="container-fluid">
        <div className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation" style={{ marginLeft: '70%', marginRight: '20%', backgroundColor: 'white' }}>
          <span className="navbar-toggler-icon"></span>
        </div>
        <div className="collapse navbar-collapse" id="navbarScroll">
          {/*Login signup  or  Logout*/}

          <div className="col-sm-5">
             {/*if loggedin than logout show...... else login and signup*/}
            {props.loggedin === false ? <>
              <Link to='/login' style={{ color: props.mode === 'light' ? 'black' : 'white', width: '10%' }}>Login</Link>
              <p style={{ fontSize: 'small', marginBottom: '0px', color: props.mode === 'light' ? 'black' : 'white', width: '10%' }}>&nbsp; OR &nbsp;</p>
              <Link to='/signup' style={{ color: props.mode === 'light' ? 'black' : 'white', width: '10%' }}>Signup</Link></>
              : <><h4 style={{ color: props.mode === 'light' ? 'black' : 'white' }}>{props.loggedin}</h4>
                <Link onClick={() => logout()}>LogOut</Link>
              </>}
          </div>

          {/* Heading */}
          <div className="col">
            <h2 style={{ color: props.mode === 'light' ? 'black' : 'white', marginLeft: '-80px' }}>{props.heading}</h2>
          </div>
        </div>
      </div>
    </nav>

  )
}
