import Link from 'next/link';
import { useState, useEffect } from 'react';
import { io, Socket } from "socket.io-client";

interface ServerToClientEvents {
    noArg: () => void;
    basicEmit: (a: number, b: string, c: Buffer) => void;
    withAck: (d: string, callback: (e: number) => void) => void;
    receive_input: (a: any) => void; 
}
interface ClientToServerEvents {
    input_change: (a: any) => void;
    connect: () => void;
    join_room: (a: any) => void;
}

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io();

const SocketIo = () => {
    const [input, setInput] = useState('');
    const [room, setRoom] = useState('');
    const [conected, setConected] = useState<boolean | null>(null);
    const [message, setMessage] = useState<string | null>(null);


    useEffect(() => {
        const messagingHandler = async()=>{
            await fetch('/api/socket');
            setConected(true);

            socket.on('receive_input', msg => {
                setMessage(msg)
                console.log('you received a message:',msg)
            })
            
        } 
        messagingHandler()
    }, [])

    const joinRoomHandler = async() => {
        socket.emit('join_room', room);
        console.log('you joined a room: ', room)
    }

    const onSendMessageHandler = () => {
        socket.emit('input_change', input, room);
        console.log('you sent a message : ', input)
    }

    

    return (
    <>
        {conected 
        && <p>You are conected!</p>}
        <div className='flex'>
            <input
                placeholder="Type something"
                
                onChange={(e)=>{setInput(e.target.value)}}
            />
            <button onClick={onSendMessageHandler}>Send</button>
        </div>
        {message 
        && <>
            <p>{message}</p>
            <Link href={`/${socket.id}`}>This message route</Link>
            </>}
        <div className='flex'>
            <input type="text" 
                    placeholder="Type something"
                    onChange={(e)=>{setRoom(e.target.value)}} />
            <button onClick={joinRoomHandler}>Join Room</button>
        </div>
    </>
    )
}

export default SocketIo