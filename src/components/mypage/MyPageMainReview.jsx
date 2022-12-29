import tw from "tailwind-styled-components"
import { StarIcon } from '@heroicons/react/24/solid'

export default function MainReview({title, star, review, name}) {
  const Item = tw.li`
  min-h-[150px]
  items-center
  rounded-[5px]
  basis-[30%]
  grow
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

  return (
    <>
    <Item key={name}>
      <h2 className="text-base font-medium">
        {title}
      </h2>
      <p className="text-gray-500 after:content-[' '] after:block after:w-6 after:border-b-[1px] after:mt-6">{name}</p>
      <div className="rating mt-3 mb-1.5 text-sm">
          {stars}
      </div>
      <p>{review && review.length > 200 ? `${review.substring(0, 200)}···` : review}</p>
    </Item>
    </>
  )
}