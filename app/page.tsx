"use client"

import React, {useState, useRef} from 'react';
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
    const [question, setQuestion] = useState<boolean | null>(null);
    const [answer, setAnswer] = useState<string | null>(null);

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

    const answers = {
        host:'Insert the name of the person who is hosting the event. It could be you, the owner of the RSVP #, or someone else whose name will appear as host of the event on the invite.',
        event_name:'Example: If you insert "Graduation Party" it will say "You are invited to my Graduation Party"; If you select "our" and insert "Aniversary" it will say "You are invited to our Aniversary". Uppercase is on you...',
        rsvp_phone:'Insert the phone number of the person in charge of the RSVP, he/she will receive all the confirmation messages',
        spots_available:'Insert the maximum number of guests you are inviting to this event'
    }

    const handleQuestionClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, ans: string)=>{
        e.preventDefault(); 
        setAnswer(ans); 
        setQuestion(true)
    }

    const handleButtonClick = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
        e.preventDefault();
        //@ts-ignore
        setAddress(inputRef.current?.firstElementChild?.firstElementChild?.value);
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
                {inviteDetails.map((det, i)=><li key={i} className="m-5">{det}</li>)}
            </ul>
            <button className='myBtn m-10' onClick={handleCreate}>Create</button>
            </>
        </MyModal>}

        { question && <MyModal onClose={()=>{setQuestion(null);setAnswer(null)}}>
            <>
                <div className='text-2xl'>
                    <p>{answer && answer}</p>
                </div>
            </>
        </MyModal>
        }
        <form className="w-full max-w-sm">
            <div id="name_div" className="form_div">
                <input type="text" onChange={(e)=>setName(e.target.value)} placeholder="Host"/>
                <button onClick={(e)=>handleQuestionClick(e, answers.host)}>?</button>
            </div>

            <div id="event_div" className="form_div">
                <input type="text" onChange={(e)=>setEvent(e.target.value)} placeholder="Event Name"/>
                <button onClick={(e)=>handleQuestionClick(e, answers.event_name)}>?</button>
            </div>

            <div className="grid grid-cols-2 text-md container">
                {/* Date */}
                <div id="date_div" className="form_div mr-1">
                    <input type="date" onChange={(e)=>setDate(e.target.value)} placeholder="Date"/>
                </div>

                {/* Time */}
                <div id="time_div" className="form_div ml-1">
                    <input type="time" onChange={(e)=>setTime(e.target.value)} placeholder="Time"/>
                </div>
            </div>

            <div id="event_address" className="form_div" ref={inputRef}>
                <GeoapifyContext apiKey={process.env.autocompleteKey}>
                    <GeoapifyGeocoderAutocomplete placeholder="Address"
                        type={'amenity'}
                        limit={5}
                        />
                </GeoapifyContext>
            </div>

            <div id="rsvp_phone_div" className="form_div">
                <input type="text" onChange={(e)=>setRsvpPhone(e.target.value)} placeholder="RSVP #"/>
                <button onClick={(e)=>handleQuestionClick(e, answers.rsvp_phone)}>?</button>
            </div>
            <div id="available_spots_div" className="form_div">
                <input type="text" onChange={(e)=>setAvailableSpots(e.target.value)} placeholder="Max. guests"/>
                <button onClick={(e)=>handleQuestionClick(e, answers.spots_available)}>?</button>
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