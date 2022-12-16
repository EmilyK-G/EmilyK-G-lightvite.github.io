"use client"

import React, {useState, useRef} from 'react';
import MyModal from '../components/MyModal';
import Link from 'next/link';

import { GeoapifyGeocoderAutocomplete, GeoapifyContext } from '@geoapify/react-geocoder-autocomplete';
import '@geoapify/geocoder-autocomplete/styles/minimal.css';
import SocketIo from './SocketIo';

const Home = () => {

    const [name, setName] = useState<string | null>(null);
    const [prefix, setPrefix] = useState<string>("");
    const [event, setEvent] = useState<string | null>(null);
    const [date, setDate] = useState<string | null>(null);
    const [time, setTime] = useState<string | null>(null);
    const [address, setAddress] = useState<string | null>(null);
    const [rsvpPhone, setRsvpPhone] = useState<string | null>(null);
    const [availableSpots, setAvailableSpots] = useState<string | null>(null);
    // getting states from down the tree...
    const [socketIndex, setSocketIndex] = useState<string | null>(null);
    const [photo, setPhoto] = useState<string | null>(null);
    const [details, setDetails] = useState<string | null>(null);

    const [toBeCreated, setToBeCreated] = useState<boolean | null>(null);
    const [question, setQuestion] = useState<boolean | null>(null);
    const [answer, setAnswer] = useState<string | null>(null);

    const inputRef: React.MutableRefObject<HTMLDivElement | HTMLInputElement
    | null> = useRef(null);

    const inviteDetails = {
        name, 
        prefix,
        event, 
        date, 
        time, 
        address, 
        rsvpPhone, 
        availableSpots,
        details,
        photo,
        socketIndex
    }

    const answers = {
        host:'Insert the name of the person who is hosting the event. It could be you, the owner of the RSVP #, or someone else whose name will appear as host of the event on the invite.',
        event_name:`Write the event this invite is for. Examples: "Andrea's Graduation Party"; "my Pajama Party"; "our Aniversary". Uppercase is on you...`,
        rsvp_phone:'Insert the phone number of the person in charge of the RSVP, he/she will receive all the confirmation messages',
        spots_available:'Insert the maximum number of guests you are inviting to this event',
        choose_theme:'Choose your invitation theme or colors',
        add_details:'Let your guests know about anything relevant to the event. Is it formal?, is it a surprise?, etc...',
        add_photo:'Add a custom picture'
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
                <li className="m-5"><span>You are invited to </span>{inviteDetails.prefix} {inviteDetails.event}</li>
                <li className="m-5">Hosted by: {inviteDetails.name}</li>
                <li className="m-5">Event Date: {inviteDetails.date}</li>
                <li className="m-5">Event time: {inviteDetails.time}</li>
                <li className="m-5">Event Location: {inviteDetails.address}</li>
                <li className="m-5">RSVP to: {inviteDetails.rsvpPhone}</li>
                <li className="m-5">Spots available: {inviteDetails.availableSpots}</li>
                {details && <li className="m-5">Details: {inviteDetails.details}</li>}
                {photo && <li className="m-5">Picture: {inviteDetails.photo}</li>}
                {/* For testing purposes ONLY */}
                {socketIndex && <li className="m-5">Socket room: {inviteDetails.socketIndex}</li>}
            </ul>
            <button className='myBtn m-10' onClick={handleCreate}>Create</button>
            </>
        </MyModal>}

        { question && <MyModal onClose={()=>{setQuestion(null);setAnswer(null)}}>
            <>
                <div className='text-xl font-mono'>
                    <p>{answer && answer}</p>
                </div>
            </>
        </MyModal>
        }
        <SocketIo/>
        <form className="w-full max-w-sm">
            <div id="name_div" className="form_div">
                <input type="text" onChange={(e)=>setName(e.target.value)} placeholder="Host"/>
                <button className='opacity-75' onClick={(e)=>handleQuestionClick(e, answers.host)}>?</button>
            </div>

            <div id="event_div" className="form_div">
                {/* <select 
                    className=' bg-transparent border-none text-xl' 
                    onChange={(e)=>setPrefix(e.target.value)}>
                    <option className=' text-midnight' value="">...</option>
                    <option className=' text-midnight' value="our">our</option>
                    <option className=' text-midnight' value="my">my</option>
                </select> */}
                <input type="text" className='flex-1' onChange={(e)=>setEvent(e.target.value)} placeholder="Event Name"/>
                <button className='opacity-75' onClick={(e)=>handleQuestionClick(e, answers.event_name)}>?</button>
            </div>

            <div className="grid grid-cols-2 text-md container">
                {/* Date */}
                <div id="date_div" className="form_div mr-1 appearance-none">
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
                <input type="text" minLength={10} maxLength={20} onChange={(e)=>setRsvpPhone(e.target.value)} placeholder="RSVP #"/>
                <button className='opacity-75' onClick={(e)=>handleQuestionClick(e, answers.rsvp_phone)}>?</button>
            </div>
            <div id="available_spots_div" className="form_div">
                <input type="text" maxLength={4} onChange={(e)=>setAvailableSpots(e.target.value)} placeholder="Max. guests"/>
                <button className='opacity-75' onClick={(e)=>handleQuestionClick(e, answers.spots_available)}>?</button>
            </div>

            <div className='flex flex-col justify-center items-center font-mono pt-5'>
                <div className='flex opacity-50  pt-1'>       
                    <Link className='flex-1 border-b border-whitesmoke border-opacity-50 text-md self-center' href={`/theme`}>
                        Choose Theme
                    </Link>
                    <button className='ml-1 text-sm text-center' onClick={(e)=>handleQuestionClick(e, answers.choose_theme)}>?</button>
                </div>
                <div className='flex opacity-50  pt-1'>
                    <Link className='flex-1 border-b border-whitesmoke border-opacity-50 text-md self-center' href={`/details`}>
                        Add Details
                    </Link>
                    <button className='ml-1 text-sm text-center' onClick={(e)=>handleQuestionClick(e, answers.add_details)}>?</button>
                </div>
                <div className='flex opacity-50  pt-1'>
                    <Link className='flex-1 border-b border-whitesmoke border-opacity-50 text-md self-center' href={`/photo`}>
                        Add Photo
                    </Link>
                    <button className='ml-1 text-sm text-center' onClick={(e)=>handleQuestionClick(e, answers.add_photo)}>?</button>
                </div>
            </div>

            <div id="create_btn_div" className="m-10 flex items-center justify-center">
                <button 
                    className="flex-shrink-0 myBtn text-center opacity-90" 
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