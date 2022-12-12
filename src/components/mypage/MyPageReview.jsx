import tw from "tailwind-styled-components"
import { StarIcon } from '@heroicons/react/24/solid'

export default function MypageReview({title, name, imgList = null, star, day, review}) {
  const Btn = tw.button`
  text-center
  btn
  rounded-3xl
  md:w-22 
  text-white
  md:btn-sm
  hover:bg-point-blue
  hover:border-point-blue
  `
  
  const stars = [
    <StarIcon className="w-6 h-6 text-point-blue"></StarIcon>,
    <StarIcon className="w-6 h-6 text-point-blue"></StarIcon>,
    <StarIcon className="w-6 h-6 text-point-blue"></StarIcon>,
    <StarIcon className="w-6 h-6 text-point-blue"></StarIcon>,
    <StarIcon className="w-6 h-6 text-point-blue"></StarIcon>
  ]

  const num2 = stars.length - star
  const num = stars.length - num2

  if (num > 0) {
    stars.splice(0, num2)
    for (let i = 0; i < num2; i++) {
      stars.push(<StarIcon className="iStar w-6 h-6 text-gray-200"/>)
    }
  }

  console.log(StarIcon)

  return (
    <>
      <div className="mt-6">
        <div className="flex justify-between">
            <div className="text-box">
              <h2 className="text-base font-medium leading-8">{title}</h2>
              <p className="text-gray-500">{name}</p>
            </div>
          <div>
            <Btn className="mr-3">수정</Btn>
            <Btn>삭제</Btn>
          </div>
        </div>
          <div>{imgList}</div>
          <div className="rating mt-6 mb-1.5 text-sm">
          {stars}
          <p className="ml-1.5 text-xs pt-[7px] text-gray-500">{day}</p>
      </div>
      </div>
      <p className="mb-3 mt-3 inline-block h-[50px] overflow-hidden">
        {review}
      </p>
      <hr></hr>
    </>
  )
}