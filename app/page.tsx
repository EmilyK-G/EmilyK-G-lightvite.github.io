"use client"

import React, {useState} from 'react';
import Address from './address.js';

const Home = () => {

    const [name, setName] = useState<string | null>(null);
    const [event, setEvent] = useState<string | null>(null);
    const [date, setDate] = useState<string | null>(null);
    const [time, setTime] = useState<string | null>(null);
    const [address, setAddress] = useState<string | null>(null);
    const [rsvpPhone, setRsvpPhone] = useState<string | null>(null);
    const [availableSpots, setAvailableSpots] = useState<string | null>(null);

    const handleCreate = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
        e.preventDefault();
        console.log(name, event, date, time, address, rsvpPhone, availableSpots)
    }

  return (
    <div className='text-whitesmoke p-9'>
        <form className="w-full max-w-sm">
            <div id="name_div" className="form_div">
                <input type="text" onChange={(e)=>setName(e.target.value)} placeholder="Jane Doe"/>
            </div>

            <div id="event_div" className="form_div">
                <input type="text" onChange={(e)=>setEvent(e.target.value)} placeholder="Aniversary"/>
            </div>

            <div className="flex">
                {/* Date */}
                <div id="date_div" className="form_div mr-1">
                    <input type="text" onChange={(e)=>setDate(e.target.value)} placeholder="Date"/>
                </div>

                {/* Time */}
                <div id="time_div" className="form_div ml-1">
                    <input type="text" onChange={(e)=>setTime(e.target.value)} placeholder="Time"/>
                </div>
            </div>

            <div id="event_address" className="form_div">
                <Address setAddress={setAddress}/>
            </div>

            <div id="rsvp_phone_div" className="form_div">
                <input type="text" onChange={(e)=>setRsvpPhone(e.target.value)} placeholder="+12345678910"/>
            </div>
            <div id="available_spots_div" className="form_div">
                <input type="text" onChange={(e)=>setAvailableSpots(e.target.value)} placeholder="20"/>
            </div>
            <div id="create_btn_div" className="p-10 m-10 flex items-center justify-center">
                <button 
                    className="flex-shrink-0 border-transparent border-4 hover:opacity-75 text-sm py-1 px-2 rounded text-center" 
                    type="button"
                    onClick={handleCreate}>
                        Create
                </button>
            </div>
        </form>
    </div>
  )
}

export default Home