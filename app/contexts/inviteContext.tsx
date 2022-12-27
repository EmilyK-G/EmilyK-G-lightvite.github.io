"use client";

import { createContext, ReactNode, Dispatch, useState } from 'react';

interface InviteContextInterface {
    setName: Dispatch<React.SetStateAction<string | null>>,
    setPrefix: Dispatch<React.SetStateAction<string | null>>,
    setEvent: Dispatch<React.SetStateAction<string | null>>,
    setDate: Dispatch<React.SetStateAction<string | null>>,
    setTime: Dispatch<React.SetStateAction<string | null>>,
    setAddress: Dispatch<React.SetStateAction<string | null>>,
    setRsvpPhone: Dispatch<React.SetStateAction<string | null>>,
    setAvailableSpots: Dispatch<React.SetStateAction<string | null>>,
    setSocketIndex: Dispatch<React.SetStateAction<string | null>>,
    setPhoto: Dispatch<React.SetStateAction<string | null>>,
    setDetails: Dispatch<React.SetStateAction<string | null>>,
    setMyTheme: Dispatch<React.SetStateAction<string | null>>,
    inviteDetails: any,
    socketIndex: string | null,
    myTheme: string | null,
    photo: string | null,
    details: string | null
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
    
  return (
    <InviteCtx.Provider value={{
        setName,
        setPrefix,
        setEvent,
        setDate,
        setTime,
        setAddress,
        setRsvpPhone,
        setAvailableSpots,
        setSocketIndex,
        setPhoto,
        setDetails,
        setMyTheme, 
        inviteDetails,
        socketIndex,
        myTheme,
        photo,
        details}}>
      {children}
    </InviteCtx.Provider>
  );
}