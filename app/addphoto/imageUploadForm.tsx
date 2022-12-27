"use client"

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import axios from 'axios';

interface Props {
  serverProps: string[]
}

const ImageUploadForm = ({serverProps}:Props) => {
  const [uploading, setUploading] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedFile, setSelectedFile] = useState<File>();

  const handleUpload = async() => {
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
      console.log(data)
    } catch(error: any) {
      console.log(error.response?.data);
    }
    setUploading(false);
  }
  
  return (
    <div className='p-9 flex flex-col text-xl'>
      
      <Link className='text-whitesmoke decoration-1 border-b-whitesmoke border-b-2 opacity-75 border-opacity-50 mb-5' href={'/'}>Back</Link>
      
      <label>
        <input 
          type="file" 
          hidden 
          onChange={({target}) => {
            if(target.files){
              const file = target.files[0];
              setSelectedImage(URL.createObjectURL(file));
              setSelectedFile(file);
            }
          }}/>
        <div className='my-10 w-40 aspect-video rounded flex items-center justify-center border-2 border-dashed cursor-pointer'>
          {selectedImage 
            ? <Image src={selectedImage} alt="image selected" width={500} height={500}/>
            : <span>Select Image</span>}
        </div>
      </label>

      <button
        disabled={uploading}
        onClick={handleUpload}
        style={{ opacity: uploading ? ".5" : "1" }}
        className='text-center rounded'>
        {uploading ? "Uploading..." : "Upload"}
      </button>
      <div className='mt-20 flex flex-col space-y-3'>
        {serverProps && serverProps.map((item) => (
          <Link key={item} href={"/images/" + item}>
            {item}
          </Link>
        ))}
      </div>
    </div>
  )
}

export default ImageUploadForm