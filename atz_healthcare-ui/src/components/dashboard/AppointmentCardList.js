import React, { useContext, useEffect } from 'react'
import AppointmentCard from './AppointmentCard'
import EmptyCard from './EmptyCard'
import { getAppointmentList } from '../Util/AxiosUtil'
import {ApptContext} from './AppointmentDash'

export function AppointmentCardList(props) {
    const {appointmentList, setAppointmentList, ...rest} = useContext(ApptContext);
    useEffect(() => { getAppointmentList(setAppointmentList)}, [])
    let cards = []
 
    for(let i =0; i < 24; i++){
        cards.push(<EmptyCard hour={i}  key={i} />)
    }
    for(let appt of appointmentList){
        let hour = new Date(appt.date).getHours() + 4
        cards[hour] = <AppointmentCard appointment={appt} key={hour}/>
    }
    
    return (
        cards.slice(9,17).map((card) => {
            return card
        })
    )
}

export default AppointmentCardList