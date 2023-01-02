"use client"

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useInviteContext } from '../hooks/useInviteContext';
import MyModal from '../MyModal';
import Link from 'next/link';

interface Props {
    serverProps: string[],
    item: string,
  }

const Themes = ({item}:Props) => {

    const { setMyTheme, myTheme } = useInviteContext();
    const [themeSelected, setThemeSelected] = useState<string | null>(null);

    function handleThemeClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
      e.preventDefault();
      //@ts-ignore
      setMyTheme(e.target.innerText);
      setThemeSelected(item)
    }

  return (
    <>
        <div 
        key={item} 
        onClick={handleThemeClick}
        className="flex items-center justify-center h-16 w-full relative z-20">
            <Image 
                src={`/images/`+ item} 
                alt='image'
                fill={true}
                className='object-cover z-10 opacity-50 absolute'/>
                <div className="flex items-end justify-end self-end h-7 w-full bg-whitesmoke bg-opacity-5 relative z-10 hover:bg-opacity-0 ">
                    <p className='z-20'>{item}</p>
                </div>
        </div>
        {myTheme && <MyModal onClose={()=>setMyTheme(null)}>
            <p>You choose the {item} theme</p>
            <Link className='text-whitesmoke my-5 pl-5' href={'/'}>Okay</Link>
            <button onClick={()=>setMyTheme(null)} className='text-whitesmoke my-5 pl-5'>Change</button>
        </MyModal>}
    </>
    
  )
}

export default Themes