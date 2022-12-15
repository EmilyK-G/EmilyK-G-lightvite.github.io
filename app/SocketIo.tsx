import { ChangeEvent, useState, useEffect } from 'react';
import { io, Socket } from "socket.io-client";

interface ServerToClientEvents {
    noArg: () => void;
    basicEmit: (a: number, b: string, c: Buffer) => void;
    withAck: (d: string, callback: (e: number) => void) => void;
    update_input: (a: any) => void; 
}
interface ClientToServerEvents {
    input_change: (a: any) => void;
    connect: () => void;
}

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io();

const SocketIo = () => {
    const [input, setInput] = useState('')

    useEffect(() => {
        const socketInitializer:()=>void = async () => {
            await fetch('/api/socket');
    
            socket.on('connect', () => {
                console.log('connected')
            })
    
            socket.on('update_input', msg => {
                setInput(msg)
            })
        }

        socketInitializer()
        
    }, [])


    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value)
        socket.emit('input_change', e.target.value)
    }

    return (
    <input
        placeholder="Type something"
        value={input}
        onChange={onChangeHandler}
    />
    )
}

export default SocketIo