import React from 'react'
import spinner from './spinner.gif'
export default function Spinner(props) {
    return (
        //pdLeft is used when there is any change in  catagory
        <div className='text-center' style={{ paddingLeft: props.pdleft, marginBottom: '200px' }} >
            <img style={{ width: '90px', height: '80px' }} src={spinner} alt='loading...' />
        </div>

    )
}