import React, {useContext} from 'react'
import './card.css'
import {ApptContext} from './AppointmentDash'

function EmptyCard(props) {
  const {setModalOpen, setTime, ...rest} = useContext(ApptContext);
  return (
    <div onClick={e => {setModalOpen(true); setTime(props.hour)}}>
      <div className="rectangle card" >
        <div style={{ float: "left", width: "25%", padding: "15px" }}>
         
        </div>
        <div style={{ float: "right"}}>
          
        </div>
      </div>
  
    </div>
  )
}

export default EmptyCard