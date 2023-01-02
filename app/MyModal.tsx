"use client"

import React, { useEffect, useState } from 'react';

interface ChildProps {
    onClose: any;
    children: React.ReactNode
  }

const MyModal = ({onClose, children}:ChildProps) => {

    const [transitionWrapper, setTransitionWrapper] = useState<string>('opacity-0');
    
    useEffect(()=>{
      setTimeout(() => {
        setTransitionWrapper('opacity-1');
      }, 100);
    }, [])

    const handleWrapperClose = (e: React.MouseEvent<HTMLDivElement, MouseEvent>)=>{
        e.preventDefault();
        e.stopPropagation();
        if((e.target as Element).id === 'wrapper') {
          setTransitionWrapper('opacity-0');
          setTimeout(() => {
            onClose();
          }, 500);
        }
    }

    const handleClose = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
        e.preventDefault();
        e.stopPropagation();
        setTransitionWrapper('opacity-0');
        setTimeout(() => {
          onClose();
        }, 500);
    }

  return (
    <div 
        className={`z-40 fixed inset-0 bg-darkchocolate ${transitionWrapper} bg-opacity-75 backdrop-blur-sm
        flex justify-center items-center bg-fixed transition-opacity duration-300 ease-in-out text-whitesmoke text-center`}
        id='wrapper'
        onClick={handleWrapperClose}>
            <div className="flex flex-col modal fade fixed top-0 left-0 w-full h-full outline-none overflow-x-hidden overflow-y-auto p-10">
              <div className="modal-header flex flex-shrink-0 items-end justify-end p-4 border-b border-gray-200 rounded-t-md">
                <button
                    className='text-whitesmoke text-xl'
                    onClick={handleClose}>
                    X
                </button>
              </div>
                <>
                    {children}
                </>
            </div>
    </div>
  )
}

export default MyModal