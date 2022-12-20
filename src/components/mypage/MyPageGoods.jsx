import tw from "tailwind-styled-components"
import image from "../../image/keyboard.jpg"

export default function MypageGoods({title = null}) {
  const Item = tw.li`
  min-h-[150px]
  items-center
  rounded-[5px]
  bg-red-800
  basis-[30%]
  grow
  overflow-hidden
  drop-shadow-md
  shadow-black
  `

  /*   
  bg-feed-img
  bg-cover 
  */

  return (
    <Item><img src={image}></img></Item>
  )
}