import { StarIcon } from '@heroicons/react/24/solid'
import { HeartIcon } from '@heroicons/react/24/solid'
import tw from "tailwind-styled-components"

export default function ProductsDetailIntro() {
  const Btn = tw.button`
  text-center
  btn
  rounded-3xl
  md:w-22 
  text-white
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
  
  return (
    <div className="product-container flex">
      <div className="img-box bg-keyboard-img w-5/12 pt-[30%] bg-cover bg-no-repeat rounded-md shadow-md"></div>
      <div className="text-box w-5/12 m-auto">
        <p className='text-gray-500'>키보드</p>
        <h2 className='text-2xl'>VARMILO VA108MAC 밀키 화이트 PBT 염료
        승화 영문 저소음적축</h2>
        <div className="rating">
          {stars}
        </div>
        <p>150,500원</p>
        <Btn className='flex btn' type='button'>
          <HeartIcon className="w-6 h-6 text-white" /> 좋아요
        </Btn>
      </div>
    </div>
  )
}