import tw from "tailwind-styled-components"

export default function MypageFollow({name}) {
  const ItemStyle = tw.li`
  flex
  justify-between
  min-h-[150px]
  items-center
  `
  const ImgStyle = `w-24 h-24 bg-blue-600 rounded-full mr-5`
  const BtnStyle = `w-24 h-12 bg-blue-600 rounded-full`

  

  return (
    <ItemStyle>
      <div className="profile flex items-center">
        <div className={ImgStyle}></div>{name}
      </div>
        <button className={BtnStyle}>팔로잉</button>
    </ItemStyle>
  )
}