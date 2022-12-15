import { ChevronDownIcon } from '@heroicons/react/24/solid'
import { useState } from 'react'

export default function FeedWriteQue({title, mandatory = false, guide, name, value, explain}) {
  const [open, setOpen] = useState(false);

  return (
    <>
        <div className="flex justify-between title">
            <h2>{title}
            {mandatory === true ? <span className='text-gray-500'>*필수질문</span>
            : null}
            </h2>
            <button type="button" className="btn btn-sm block" onClick={() => setOpen(!open)}>
                <ChevronDownIcon className={`w-6 h-6 text-white
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
          ${open === true ? 'h-96' : 'h-0'}`}>
            <label htmlFor={name + "Input"} className='absolute w-px h-px -m-px overflow-hidden'>
              {explain} 적는 곳
            </label>
            <textarea 
            className={`
            bg-white w-full h-96 focus:outline-0 border-b-2 border-gray-200 text-base
            `}
            type="text"
            placeholder={guide}
            name={name}
            value={value}
            id={name + "Input"}
            />
          </div>
        </>
  )
}