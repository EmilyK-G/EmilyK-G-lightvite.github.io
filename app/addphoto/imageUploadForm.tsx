"use client"

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import axios from 'axios';
import {useInviteContext} from '../hooks/useInviteContext'
import MyModal from '../MyModal';

interface Props {
  serverProps: string[]
}

const ImageUploadForm = ({serverProps}:Props) => {
  const [uploading, setUploading] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedFile, setSelectedFile] = useState<File>();
  const [error, setError] = useState<null|string>(null)

  const {setPhoto, photo} = useInviteContext();

  const handleUpload = async() => {
    setError(null);
    setUploading(true);
    console.log(serverProps)
    try {
      if (!selectedFile) {
        setUploading(false);
        return
      };
      const formData = new FormData();
      formData.append("myImage", selectedFile);
      const { data } = await axios.post("/api/image", formData);
      
      setPhoto('/images/' + `${data.filename}`)
      
    } catch(error: any) {
      setError(error.response?.data);
    }
    setUploading(false);
  }
  
  return (
    <div className='p-9 flex flex-col text-xl'>

      {photo && <MyModal onClose={()=>setPhoto(null)}>
          <Image src={photo} alt="image selected" width={500} height={500}/>
          <p>You have selected this image ^^</p>
          <section className='flex items-center justify-between'>
            <button onClick={()=>setPhoto(null)} className='text-center rounded text-whitesmoke text-2xl'>Change</button>
            <Link className='text-whitesmoke my-5' href={'/'}>Okay</Link>
          </section>
          
        </MyModal>}
      
      <Link className='text-whitesmoke decoration-1 border-b-whitesmoke border-b-2 opacity-75 border-opacity-50 mb-5' href={'/'}>Back</Link>
      
      <label className='flex items-center justify-center'>
        <input 
          type="file" 
          hidden 
          onChange={({target}) => {
            if(target.files){
              const file = target.files[0];
              setSelectedImage(URL.createObjectURL(file));
              setSelectedFile(file);
              console.log(file, selectedImage)
            }
          }}/>
        <div className='mt-1 mb-5 w-full h-96 aspect-video rounded flex items-center justify-center border-2 border-dashed cursor-pointer border-whitesmoke border-opacity-60'>
          {selectedImage 
            ? <><Image src={selectedImage} alt="image selected" width={500} height={500} className=''/>
                <span className='z-10 absolute bg-whitesmoke bg-opacity-40'>Click to change image</span></>
            : <span>Select Image</span>}
        </div>
      </label>
      {error && <p className='text-error'></p>}
      <button
        disabled={uploading}
        onClick={handleUpload}
        style={{ opacity: uploading ? ".5" : "1" }}
        className='text-center rounded text-whitesmoke text-2xl'>
        {uploading ? "Uploading..." : "Upload"}
      </button>
    </div>
  )
}

export default ImageUploadForm