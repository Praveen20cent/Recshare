'use client';
import {ChangeEvent, useState} from "react";
import FormField from '@/components/FormField'
import FormInput from '@/components/FormInput'

import { form } from "framer-motion/client";
import { desc } from "drizzle-orm";

const page = () => {
    const [formData, setFormData] = useState({
    title: '',
    description: '',
    visibility:'public',

    });


    const video ={};
  const [error,setError]=useState( null );  

  const handleInputChange=(e: ChangeEvent)=>{
    const {name,value}=e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  }

  return (
    <div className="wrapper-md upload-page">
        <h1>Upload a Video</h1>
        {error && <div className="error-field">{error}</div>}

        <form className="rounded-20 shadow-10 gap-6 w-full flex flex-col px-5 py-7.5">

        </form>

        <FormField id="title" label="Title" placeholder="Enter a clear and concise video title" value={formData.title} onChange={handleInputChange}/>

        <FormField id="description" label="Description" placeholder="Describe what this video is about" value={formData.description} as="textarea" onChange={handleInputChange}/>
        <FormInput id="video" label="Video" accept="video/*" file={video.file} previewUrl={video.previewUrl} inputRef={video.inputRef} onchange={video.handeFileChange} onReset={video.resetFile} type="video"/>
        <FormInput />

        <FormField id="visibility" label="Visibility" value={formData.visibility} as="select" options={[{value : 'public',label:'Public'},{value:'private',label:'Private'},]} onChange={handleInputChange}/>
        </div>
  )
}

export default page