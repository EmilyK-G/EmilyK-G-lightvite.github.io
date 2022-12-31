"use client"

import React, {useState, useRef, LegacyRef} from 'react';
import MyModal from './MyModal';
import Link from 'next/link';

import { GeoapifyGeocoderAutocomplete, GeoapifyContext } from '@geoapify/react-geocoder-autocomplete';
import '@geoapify/geocoder-autocomplete/styles/minimal.css';
import SocketIo from './SocketIo';
import Details from './DetailsPage';
import { useInviteContext } from './hooks/useInviteContext';

const Home = () => {
    const [photoClick, setPhotoClick] = useState<boolean | null>(null);
    const [detailsClick, setDetailsClick] = useState<boolean | null>(null);
    const [myThemeClick, setMyThemeClick] = useState<boolean | null>(null);

    const [toBeCreated, setToBeCreated] = useState<boolean | null>(null);
    const [question, setQuestion] = useState<boolean | null>(null);
    const [answer, setAnswer] = useState<string | null>(null);

    const addressRef: LegacyRef<HTMLDivElement> | undefined = useRef(null);
    const timeInputRef = useRef(null);

    const {
        setName,
        setPrefix,
        prefix,
        setEvent,
        event,
        setDate,
        setTime,
        time,
        setAddress,
        address,
        setRsvpPhone,
        setAvailableSpots,
        setSocketIndex,
        setDetails,
        setMyTheme, 
        inviteDetails,
        socketIndex,
        myTheme,
        photo,
        details,
        date
    } = useInviteContext()

    // for the event name, I deleted the pefix selection part because the plan is to separate it with a gramarly-like code, nothing crazy, less mental work for the user.
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

    const handleDate = ()=>{
        const array = date?.split("-");
        if(array){
          const formatedDate = new Date(Number(array[0]),Number(array[1]),Number(array[2]));
          const result = formatedDate.toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          });
          console.log(result);
          return setDate(result);
        }
        return
    }

    const handleTime = ()=>{
        if(!time) return
        var timeSplit = time.split(':'),
            hours,
            minutes,
            meridian;
        hours = Number(timeSplit[0]);
        minutes = timeSplit[1];
        if (hours > 12) {
            meridian = 'PM';
            hours -= 12;
        } else if (hours < 12) {
            meridian = 'AM';
            if (hours == 0) {
            hours = 12;
            }
        } else {
            meridian = 'PM';
        }
        setTime(hours + ':' + minutes + ' ' + meridian);
    }

    const handleAddress = ()=> {
        //@ts-ignore
        const myAddress = addressRef.current?.firstElementChild?.firstElementChild?.value;
        if(!myAddress) return

        const splitted = myAddress.split(",");
        splitted.pop();
        setAddress(splitted.join());
    }

    const handleEventName = () => {
        if(!event) return
        const pronouns = ["my", "our", "your", "his", "her", "its", "their", "the"];
  
        const splitted = event.split(" ");
        splitted.forEach( wor => {
          pronouns.forEach((pro) => {
            if (wor === pro) setPrefix(wor)
          });
        });

        return setEvent(splitted.filter(w=>w!==prefix).join(' '));
    }

    const handleButtonClick = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
        e.preventDefault();
        handleDate();
        handleTime();
        handleAddress();
        handleEventName();
        setToBeCreated(true);
    }

    const handleCreate = () => {
        console.log(inviteDetails);
    }

  return (
    <div className='text-whitesmoke p-5'>
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
                {myTheme && <li className="m-5">Style: {inviteDetails.myTheme}</li>}
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
                    <input type="time" ref={timeInputRef} onChange={(e)=>{setTime(e.target.value)}} pattern="^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$" placeholder="Time"/>
                </div>
            </div>

            <div id="event_address" className="form_div" ref={addressRef}>
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
                <div className='flex flex-col opacity-50  pt-1'>
                    <section className='flex justify-center'>
                        <button className='flex-1 border-b border-whitesmoke border-opacity-50 text-md self-center' onClick={(e)=>{e.preventDefault();setDetailsClick(!detailsClick)}}>
                            Add Details
                        </button>
                        <button className='ml-1 text-sm text-center' onClick={(e)=>handleQuestionClick(e, answers.add_details)}>?</button>
                    </section>
                    {detailsClick && <Details setDetails={setDetails}/>}
                </div>
                <div className='flex opacity-50  pt-1'>       
                    <Link className='flex-1 border-b border-whitesmoke border-opacity-50 text-md self-center' href={`/choosetheme`}>
                        Choose Theme
                    </Link>
                    <button className='ml-1 text-sm text-center' onClick={(e)=>{handleQuestionClick(e, answers.choose_theme); setMyThemeClick(!myThemeClick)}}>?</button>
                </div>
                <div className='flex opacity-50 pt-1'>
                    <Link className='flex-1 border-b border-whitesmoke border-opacity-50 text-md self-center' href={`/addphoto`}>
                        Add Photo
                    </Link>
                    <button className='ml-1 text-sm text-center' onClick={(e)=>{handleQuestionClick(e, answers.add_photo); setPhotoClick(!photoClick)}}>?</button>
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