"use client"

import React, {useState, useRef, useEffect} from 'react';
import Address from './address.tsx';
import MyModal from '../components/MyModal';

import { GeoapifyGeocoderAutocomplete, GeoapifyContext } from '@geoapify/react-geocoder-autocomplete';
import '@geoapify/geocoder-autocomplete/styles/minimal.css';

const Home = () => {

    const [name, setName] = useState<string | null>(null);
    const [event, setEvent] = useState<string | null>(null);
    const [date, setDate] = useState<string | null>(null);
    const [time, setTime] = useState<string | null>(null);
    const [address, setAddress] = useState<string | null>(null);
    const [rsvpPhone, setRsvpPhone] = useState<string | null>(null);
    const [availableSpots, setAvailableSpots] = useState<string | null>(null);

    const [toBeCreated, setToBeCreated] = useState<boolean | null>(null);

    const inputRef: React.MutableRefObject<HTMLDivElement | HTMLInputElement
    | null> = useRef(null);

    const inviteDetails = [
        name, 
        event, 
        date, 
        time, 
        address, 
        rsvpPhone, 
        availableSpots
    ]

    const handleButtonClick = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
        e.preventDefault();
        setAddress(inputRef.current?.lastChild?.firstChild?.value);
        setToBeCreated(true);
    }

    const handleCreate = () => {
        console.log(inviteDetails);
    }

  return (
    <div className='text-whitesmoke p-9'>
        {toBeCreated && <MyModal onClose={()=>setToBeCreated(null)}>
            <>
            <p>Review your invite...</p>
            <ul>
                {inviteDetails.map((det, i)=><li key={i}>{det}</li>)}
            </ul>
            <button onClick={handleCreate}>Create</button>
            </>
        </MyModal>}
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

            <div id="event_address" className="form_div" ref={inputRef}>
                <GeoapifyContext apiKey={process.env.autocompleteKey}>
                    <GeoapifyGeocoderAutocomplete placeholder="Event Address"
                        type={'amenity'}
                        limit={5}
                        />
                </GeoapifyContext>
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
                    onClick={handleButtonClick}>
                        Create
                </button>
            </div>
        </form>
    </div>
  )
}

export default Home