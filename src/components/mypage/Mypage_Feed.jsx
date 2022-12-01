import tw from "tailwind-styled-components"

export default function MypageFeed({feed = null}) {
  const itemStyle = 'basis-[30%] grow bg-red-800 min-h-[150px] rounded-[5px] flex-1'

  return (
  <li className={itemStyle}>{feed}</li>
  )
}