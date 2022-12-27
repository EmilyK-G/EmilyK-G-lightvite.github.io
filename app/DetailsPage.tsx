"use client"

import React, {SetStateAction, useState} from 'react';
import Link from 'next/link';
const Details = ({setDetails}:SetStateAction<any>) => {

  const [eventDetails, setEventDetails] = useState<string|null>(null)

  const handleSubmitDetails = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) =>{
    e.preventDefault();
    setDetails(eventDetails)
  }

  return (
    <div className='p-9 my-5 flex flex-col text-xl bg-whitesmoke bg-opacity-20'>
      <p>Insert Details here</p> 
        <div className="w-full mb-4 border border-whitesmoke bg-opacity-50 rounded-lg">
            <div className="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
                <label htmlFor="comment" className="sr-only">Your comment</label>
                <textarea 
                  id="comment" 
                  rows={4} 
                  onChange={(e)=>setEventDetails(e.target.value)}
                  className="w-full px-0 text-sm bg-transparent border-0 focus:ring-0 focus:outline-none outline-none decoration-transparent" placeholder="Write a comment..." required></textarea>
            </div>
            <div className="flex items-center justify-between px-3 py-2 border-t-whitesmoke bg-opacity-50">
                <button type="submit" onClick={handleSubmitDetails} className="inline-flex items-center py-2.5 px-4 text-xl text-center text-whitesmoke rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-blue-800">
                    Post comment
                </button>
            </div>
        </div>
    </div>
  )
}

export default Details