import { useState, useEffect } from 'react'

export default function ProductsDetailPhoto(reviews) {
  return (
    <div className="photo-container md:block hidden">
      <p>포토 55건</p>
      {reviews.length > 0 ? <ul className='flex gap-2'>
          {reviews.map(review => (
            <li className='w-full h-32 bg-keyboard-img rounded shadow-md'>
            </li>
          ))}
        </ul> : null}
        
    </div>
  )
}