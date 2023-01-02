"use client"

import React, {SetStateAction, useState} from 'react';
import { useInviteContext } from './hooks/useInviteContext';

const Details = ({setDetails}:SetStateAction<any>) => {

  const { details } = useInviteContext();
  
  const [eventDetails, setEventDetails] = useState<string|null>(null)

  const handleSubmitDetails = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) =>{
    e.preventDefault();
    setDetails(eventDetails)
  }

  return (
    <div className='p-9 my-5 flex flex-col text-xl bg-whitesmoke bg-opacity-20'>
      <div className="w-full mb-4 border border-whitesmoke bg-opacity-50 rounded-lg">
          <div className="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
              <label htmlFor="comment" className="sr-only">Insert Details here</label>
              <textarea 
                disabled = {details ? true : false}
                id="comment" 
                rows={4} 
                onChange={(e)=>setEventDetails(e.target.value)}
                className="w-full px-0 text-sm bg-transparent border-0 focus:ring-0 focus:outline-none outline-none decoration-transparent" placeholder="Write some stuff..." required></textarea>
          </div>
          <div className="flex items-center justify-between px-3 py-2 border-t-whitesmoke bg-opacity-50 text-lg">
              {!details 
                ? <button type="submit" onClick={handleSubmitDetails} className="inline-flex items-center py-2.5 px-4 text-center text-whitesmoke rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-blue-800">
                    Add to Invite
                  </button>
                : <button type="submit" onClick={(e)=>{e.preventDefault(); setDetails(null)}} className="inline-flex items-center py-2.5 px-4 text-center text-whitesmoke rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-blue-800">
                    Change Details
                  </button>}
          </div>
      </div>
    </div>
  )
}

export default Details