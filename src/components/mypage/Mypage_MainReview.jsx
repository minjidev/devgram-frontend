import tw from "tailwind-styled-components"

export default function MainReview({key, title, star, review, name}) {
  const Item = tw.li`
  min-h-[150px]
  items-center
  rounded-[5px]
  basis-[30%]
  grow
  `
  // 폰트어썸 으로 할 것
  const stars = "*****"

  return (
    <Item key={key}>
      {title}
      {name}
      <div>{stars.substring(0, star)}</div>
      {review.substring(0, 200)}
    </Item>
  )
}