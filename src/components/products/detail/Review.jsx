import { useState } from 'react'

export default function Review({userid, title, name, star, day, review}) {

  return (
  <div className="border-2 mb-6">
    <div className="flex justify-between h-[165px] content">
      <div className="text-box w-7/12 overflow-hidden">
        <div className="profile flex">
        <div className="bg-gray-500 w-10 h-10 image rounded-md"></div>
        <p className="text-gray-500">{name} ·<span className="ml-0.5">{userid}</span></p>
        </div>
        <h3 className="font-semibold">{title}</h3>
        <p className="text-sm">{review}</p>
      </div>

      <div className="img-box bg-feedImg-img w-4/12"></div>
    </div>

    <button type="button">더보기</button>
  </div>
  )
}