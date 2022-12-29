import { useState } from 'react'

export default function Review({userid, title, name, star, day, review}) {
  const [open, setOpen] = useState(false)

  return (
  <div className="border-2 mb-6">
    <div className={`
    flex 
    justify-between
    overflow-hidden
    pb-6
    ${open ? "h-[165px]" : "bg-gray-100"}
    `} onClick={() => setOpen(!open)}>
      <div className="text-box w-7/12">
        <div className="profile flex h-10">
        <div className="bg-gray-500 w-10 image rounded-md"></div>
        <p className="text-gray-500 leading-10 ml-3">{name} ·<span className="ml-0.5">{userid}</span></p>
        </div>
        <h3 className="font-semibold">{title}</h3>
        <p className="text-sm">{review}</p>
      </div>

      <div className="img-box bg-feedImg-img w-4/12"></div>
    </div>
  </div>
  )
}