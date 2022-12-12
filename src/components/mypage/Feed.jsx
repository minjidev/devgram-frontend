import { handler } from "daisyui"
import tw from "tailwind-styled-components"

export default function MypageFeed({id, feed}) {
  const itemStyle = 'basis-[30%] grow bg-red-800 min-h-[150px] rounded-[5px] flex-1 drop-shadow-md shadow-black'

  return (
  <li className={itemStyle}>{feed}</li>
  )
}