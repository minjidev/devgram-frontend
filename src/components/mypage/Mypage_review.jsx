import tw from "tailwind-styled-components"

export default function MypageReview({title, name, imgList = null, star, day, review}) {
  const Btn = tw.button`
  w-24
  h-12
  text-center
  bg-blue-600
  rounded-3xl
  `

  const stars = "*****"

  return (
    <>
      <div>
        <hr></hr>
        <div className="flex justify-between">
          <h2>{title}</h2>
          <div>
            <Btn className="mr-12">수정</Btn>
            <Btn>삭제</Btn>
          </div>
        </div>
          <p>{name}</p>
          <div>{imgList}</div>
          <div>{stars.substring(0, star)}{day}</div>
      </div>
      <p>
        {review}
      </p>
    </>
  )
}