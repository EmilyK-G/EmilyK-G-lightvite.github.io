import React from 'react';
import Link from 'next/link';

const Photo = () => {
  return (
    <div className='p-9 flex flex-col text-xl'>
      <Link className='text-whitesmoke decoration-1 border-b-whitesmoke border-b-2 opacity-75 border-opacity-50 mb-5' href={'/'}>Back</Link>
      <p>Upload your Photo here</p> 
    </div>
  )
}

export default Photo