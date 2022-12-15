import { useState } from 'react'
import { ChevronDownIcon } from '@heroicons/react/24/solid'

export default function FeedWriteList({title, mandatory = false}) {
  const [open, setOpen] = useState(false);
  
  return (
    <div className='border-2 rounded-md'>
    <div className="flex justify-between title h-16 leading-[64px]">
        <h2 className='ml-6'>{title}
        {mandatory === true ? <span className='text-gray-500'>*필수질문</span> : null}
        </h2>
        <button type="button" className="btn btn-sm block h-[62px] bg-white border-none hover:bg-white hover:opacity-50 mr-3" onClick={() => setOpen(!open)}>
          <ChevronDownIcon className={`w-6 h-6 text-black
          ${open === true ? 'rotate-0' : 'rotate-180'}
        `}/>
        </button>
      </div>

      <ul className={`
        list-disc 
        list-inside 
        transition-all
        duration-500 
        ease-in-out origin-top
        overflow-hidden
        ml-6
        text-sm
        ${open === true ? 'h-52' : 'h-0'}`}>
        <li>게시물에 비속어 및 운영방침에 맞지 않는 글이 있을 경우 동의없이 삭제될 수 있습니다.</li>
        <li className='mt-0.5'>공지 2</li>
        <li className='mt-0.5'>공지 3</li>
        <li className='mt-0.5'>공지 4</li>
      </ul>
    </div>
  )  
}