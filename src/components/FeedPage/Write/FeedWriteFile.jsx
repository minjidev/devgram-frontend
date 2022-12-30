import { useState } from 'react'
import { ChevronDownIcon } from '@heroicons/react/24/solid'
import { PencilIcon } from '@heroicons/react/24/solid'
import { useEffect } from 'react';

export default function FeedWriteFile({title, mandatory = false, guide, name, value, explain, target, setfileImg}) {
  const [open, setOpen] = useState(false);
  const [preview, setPreview] = useState([])

  const [imgInput, setImgInput] = useState(false)
  const [textInput, setTextInput] = useState(false)

  function imgChange(file) {
    setfileImg(file)
  }

  useEffect(() => {
    if(imgInput && textInput === true) {
      target(true)
    } else {
      target(false)
    }
  }, [imgInput, textInput])

  return (
    <div className='border-2 rounded-md mt-6'>
    <div className="flex justify-between title h-16 leading-[64px]">
        <h2 className='ml-6'>
          <div className="flex">
            <PencilIcon className={`w-6 h-6 mt-5 mr-3
            ${mandatory === true ? "text-point-blue"
            : "text-orange-400"}
            `}/>
            <div className="text">
            {title}
            {mandatory === true ? <span className='text-gray-500 ml-3'>*필수질문</span>
            : null}
            </div>
          </div>
        </h2>
        <button type="button" className="btn btn-sm block bg-white hover:bg-white border-none mr-3 h-[62px] hover:opacity-50" onClick={() => setOpen(!open)}>
          <ChevronDownIcon className={`w-6 h-6 text-black
          ${open === true ? 'rotate-0' : 'rotate-180'}
        `}/>
        </button>
      </div>
      <div className={`
        content 
        transition-all
        duration-500 
        ease-in-out origin-top
        overflow-hidden
        ml-6
        text-sm
        ${open === true ? 'h-96' : 'h-0'}`}>
        <div className="img-box flex">
          <label htmlFor="file" className='absolute w-px h-px -m-px overflow-hidden'>
          이미지 파일 선택
          </label>
          <input type="file" className='img block' onChange={
            (e) => imgChange(e.target.files[0])
          } 
            id="file"
          accept="image/jpeg, image/png"
          multiple="multiple"
          />
        </div>
      <label htmlFor={name + "Input"} className='absolute w-px h-px -m-px overflow-hidden'>
        {explain} 적는 곳
      </label>
      <textarea 
      className={`
      bg-white w-full h-96 focus:outline-0 border-b-2 border-gray-200 mt-3
      `}
      type="text"
      placeholder={guide} 
      name={name}
      value={value}
      onChange={
        (e) => e.target.value 
        ? setTextInput(true)
        : setTextInput(false)
        } 
      />
      </div>
    </div>
  )  
}