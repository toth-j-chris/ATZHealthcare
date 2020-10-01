import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './card.css'
function AppointmentCard(props) {

  const [imgSrc, setImgSrc] = useState("")
  let date = new Date(props.appointment.date)
  date.setHours(date.getHours() + 4)
  // console.log(date.getHours())
  if (date.getHours() >= 13){
    date.setHours(date.getHours() - 12)
  }
    
  useEffect(()=>{
    axios.get('https://api.generated.photos/api/v1/faces?api_key=Pk4SsXViAn4aHsG2DDEN1g&order_by=random&gender=male')
    .then( response => { setImgSrc(response.data.faces[0].urls[4]["512"]); })
    .catch( error => console.log(error))
  },[])

  return (
    <div>
      <div className="rectangle card" >
        <div style={{ float: "left", width: "25%", padding: "15px" }}>
         {imgSrc === "" ?
           (<img
           src="/defaultProfile.png"
           alt= ""
           style={{ height: "50px", width: "50px" }}
         />)
         :
         <img
           src={imgSrc}
           alt= ""
           style={{ height: "50px", width: "50px" }}
         />
         }
        </div>
        <div style={{ float: "right"}}>
          <div style={{ position: "absolute", bottom: "-10px", right: "10px" }}>
            <b>{props.appointment.patientinfo[0].fName + ' ' + props.appointment.patientinfo[0].lName}</b>
            <p style={{ textAlign: "right" }}>
              {date.getHours()  + ':' + date.getMinutes() + '0'}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AppointmentCard