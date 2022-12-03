import React from 'react';
import Address from './address.js';

const Home = () => {
  return (
    <div className='text-whitesmoke p-9'>
        <form className="w-full max-w-sm">
            <div id="name_div" className="flex items-center border-b border-teal-500 py-2">
                <input type="text" placeholder="Jane Doe"/>
            </div>
            <div id="event_div" className="flex items-center border-b border-teal-500 py-2">
                <input type="text" placeholder="Aniversary"/>
            </div>

            {/* Date, Time */}
            <div id="event_address" className='flex items-center border-b border-teal-500 py-2'>
                <Address/>
            </div>

            <div id="rsvp_phone_div" className=" flex items-center border-b border-teal-500 py-2">
                <input type="text" placeholder="+12345678910"/>
            </div>
            <div id="available_spots_div" className="flex items-center border-b border-teal-500 py-2">
                <input type="text" placeholder="20"/>
            </div>
            <div id="create_btn_div">
                <button className="flex-shrink-0 border-transparent border-4 text-teal-500 hover:text-teal-800 text-sm py-1 px-2 rounded" type="button">
                Create
                </button>
            </div>
        </form>
    </div>
  )
}

export default Home