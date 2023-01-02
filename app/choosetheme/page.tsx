import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import fs from 'fs/promises';
import path from 'path';
import Themes from './Themes';
import MyModal from '../MyModal';

const Theme = async() => {

  const serverProps: string[] = [];

  const getServerProps = async() => {
    const props = { dirs: [] };
    try {
      const dirs = await fs.readdir(path.join(process.cwd(), "/public/images"));
      props.dirs = dirs as any;
      serverProps.push(...props.dirs);
      return 
    } catch (error) {
      return { props };
    }
  };

  await getServerProps();

  return (
    <div className='flex flex-col text-xl p-5'>
        <Link className='text-whitesmoke decoration-1 border-b-whitesmoke border-b-2 opacity-75 border-opacity-50 my-5 pl-5' href={'/'}>Back</Link>
      
        {serverProps && serverProps.map((item) => (
          <Themes serverProps={serverProps} item={item} key={item}/>
        ))}
      </div>
  )
}

export default Theme