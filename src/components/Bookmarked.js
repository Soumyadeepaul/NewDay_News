import React from 'react'
import HistoryItems from './HistoryItems'
import { useLocation } from 'react-router-dom';

export default function Bookmarked() {
  //to get data from dp...app_backend/bookmarkededfetch
  const location=useLocation();
  return (
    
    <div className="container-fluid">
      {/* For not showing error */}
      {location.state!==null?
        <div className="row overflow-auto px-4" style={{height:"680px", width:'100%'}}>
        {/* Iteration through Object...pass to HistoryItems..cards */}
        {location.state.id.map((element)=>{
            return <div className="col-md-4 py-3">
            <HistoryItems  key={element.url} url={element.url} title={element.title?element.title.slice(0,50):''} description={element.description?element.description.slice(0,90):""} image={element.imageurl} newsid={element.url} author={element.author} time={element.time} savedon={element.savedon} bookmark={true}/>
            </div>
      })}
    </div>:''}
    </div>
  )
}

