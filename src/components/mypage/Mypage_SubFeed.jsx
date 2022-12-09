import { useState } from 'react'
import feedImg from '@image/feedImg.jpg'

export default function MypageSubFeed({feed}) {
  const itemStyle = `
  basis-[30%] 
  grow bg-red-800 
  min-h-[150px] 
  rounded-[5px] flex-1 
  drop-shadow-md 
  shadow-black
  liFeed
  `

  return (
    <>
      <li className={itemStyle}>
        <img src={feedImg} alt='피드이미지' />
      </li>
  </>
  )
}