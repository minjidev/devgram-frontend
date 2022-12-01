import tw from "tailwind-styled-components"

export default function MypageGoods({title = null}) {
  const Item = tw.li`
  min-h-[150px]
  items-center
  rounded-[5px]
  bg-red-800
  basis-[30%]
  grow
  `
  return (
    <Item></Item>
  )
}