import tw from "tailwind-styled-components"

export default function MypageFollow({name}) {
  const ItemStyle = tw.li`
  flex
  justify-between
  min-h-[150px]
  items-center
  `

  const ImgStyle = `w-24 h-24 bg-blue-600 rounded-full mr-5`
  const BtnStyle = `btn w-24 h-12 rounded-full hover:bg-point-blue hover:border-point-blue hover:text-white`

  return (
    <ItemStyle>
      <div className="profile flex items-center">
        <div className={ImgStyle}></div><p className="text-base font-se">{name}</p>
      </div>
        <button className={BtnStyle}>팔로잉</button>
    </ItemStyle>
  )
}