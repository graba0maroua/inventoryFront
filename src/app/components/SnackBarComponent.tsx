import React from 'react'
import { useAppDispatch, useAppSelector } from '../hooks'
import {  SnackBarState, hideSnackBar } from '../../features/snack_bar/snack_bar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { BsXLg } from 'react-icons/bs';

function SnackBarComponent() {
    const snackBar =  useAppSelector((state:{snackBar:SnackBarState})=> state.snackBar)
    const dispatch  = useAppDispatch();
  return (
    <div>

  { snackBar.shown && (<div className={`snack_bar_custom align-items-center snack-bar text-white ${snackBar.bgColor} d-flex flex-row justify-content-between rounded s`}>
       <div className='d-flex flex-row align-items-center justify-content-start'>

        <snackBar.icon  className='mx-2' />
      <span className='border-start px-2 py-2'>
      {snackBar.message}
        </span>  
       </div>
       <div className='m-2 btn text-white border-0' onClick={()=>{
        dispatch(hideSnackBar());
       }}>
        <BsXLg />
        </div>
    </div>)}
    </div>
  )
}

export default SnackBarComponent