import { ChevronRightIcon, ChevronLeftIcon, XMarkIcon, NoSymbolIcon, StarIcon } from '@heroicons/react/24/solid'
import { useState } from 'react'

export default function PhotoModal({length, Open, starLength, title, userid, day, review, count, num}) {
  const starLimit = Math.ceil(starLength) 

  const stars = [
    <StarIcon className="w-6 h-6 text-point-blue"></StarIcon>,
    <StarIcon className="w-6 h-6 text-point-blue"></StarIcon>,
    <StarIcon className="w-6 h-6 text-point-blue"></StarIcon>,
    <StarIcon className="w-6 h-6 text-point-blue"></StarIcon>,
    <StarIcon className="w-6 h-6 text-point-blue"></StarIcon>
  ]
  let tmp = num;
  
  /* 왼쪽 오른쪽 카운트 버튼 */
  function handlerBtnLeft() {
    tmp--
    count(tmp)
  }

  function handlerBtnRight() {
    tmp++
    count(tmp)
  }

  /* 별점 관리 */
  /* function  */

  return (
    <>
      <div>
        <div className="fixed z-50 w-4/5 h-3/5 border-gray-200 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md">
          <div className="top flex text-gray-100 justify-between ml-[10%] mr-[10%]">
            <h1 className='text-5xl mb-3'>포토 리스트 {tmp + 1}/{length}</h1>
            <XMarkIcon className='w-10 cursor-pointer' onClick={() => Open(false)}/>
          </div>
          <div className="w-5/5 h-full flex justify-between">
            <ChevronLeftIcon className='w-[10%] cursor-pointer text-white' onClick={() => num < 1 ? null : handlerBtnLeft()}/>
            <div className="content w-4/5 flex bg-white rounded-md overflow-hidden">
              <div className="img-box bg-keyboard-img w-1/2 box-border rounded-md  border-[1px] border-gray-100">
              </div>

              <div className="text-box w-1/2 pt-3 pr-6 pl-6">

                {/* 위 */}
                <div className="profile flex">
                  <div className="img bg-gray-200 w-12 h-12 rounded-md mr-3">
                    
                  </div>
                  <div className="profile-left">
                    <div className="photo-rating flex text-xs leading-6">
                      {stars.slice(0, starLimit)} <span className='text-gray-500 ml-1'>{day}</span> 
                    </div>
                    <div className="id flex">
                      {userid}
                      <NoSymbolIcon className='w-5 ml-0.5' onClick={() => null}/>
                    </div>
                  </div>
                </div>
                <hr className='mt-3'></hr>
                {/* 아래 */}
                <div className="review-box mt-4">
                  {review}
                </div>
              </div>
            </div>
          <ChevronRightIcon className='w-[10%] cursor-pointer text-white' onClick={() => num === length - 1 ? null : 
            handlerBtnRight()}/>
          </div>
        </div>
      </div>
    </>
  )
}