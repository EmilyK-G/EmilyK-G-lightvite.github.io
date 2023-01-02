"use client";

import { createContext, ReactNode, Dispatch, useState, useEffect } from 'react';

interface InviteContextInterface {
    setName: Dispatch<React.SetStateAction<string | null>>,
    name: string | null,
    setPrefix: Dispatch<React.SetStateAction<string | null>>,
    prefix: string | null,
    setEvent: Dispatch<React.SetStateAction<string | null>>,
    event: string | null,
    setDate: Dispatch<React.SetStateAction<string | null>>,
    setTime: Dispatch<React.SetStateAction<string | null>>,
    setAddress: Dispatch<React.SetStateAction<string | null>>,
    address: string | null,
    setRsvpPhone: Dispatch<React.SetStateAction<string | null>>,
    rsvpPhone: string|null,
    setAvailableSpots: Dispatch<React.SetStateAction<string | null>>,
    availableSpots: string|null,
    setSocketIndex: Dispatch<React.SetStateAction<string | null>>,
    setPhoto: Dispatch<React.SetStateAction<string | null>>,
    setDetails: Dispatch<React.SetStateAction<string | null>>,
    setMyTheme: Dispatch<React.SetStateAction<string | null>>,
    inviteDetails: any,
    socketIndex: string | null,
    myTheme: string | null,
    photo: string | null,
    details: string | null,
    date: string | null,
    time: string | null
  }

type Props = {
    children: ReactNode;
};

export const InviteCtx = createContext<InviteContextInterface | null>(null);

export default function InviteProvider({ children }: Props) {

    const [name, setName] = useState<string | null>(null);
    const [prefix, setPrefix] = useState<string | null>(null);
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
    const [myTheme, setMyTheme] = useState<string | null>(null);

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
        socketIndex,
        myTheme
    }

    // useEffect(()=>{
    //   const mySavedName = sessionStorage.getItem("savedName");
    //   if(!mySavedName && name){
    //       sessionStorage.setItem("mySavedName", name);
    //       console.log('NAME SAVED')
    //   }
    //   if(mySavedName){
    //     setName(JSON.parse(mySavedName))
    //     console.log(mySavedName)
    //   }
    // }, [name])
    
  return (
    <InviteCtx.Provider value={{
        setName,
        name,
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
        rsvpPhone,
        setAvailableSpots,
        availableSpots,
        setSocketIndex,
        setPhoto,
        setDetails,
        setMyTheme, 
        inviteDetails,
        socketIndex,
        myTheme,
        photo,
        details,
        date}}>
      {children}
    </InviteCtx.Provider>
  );
}