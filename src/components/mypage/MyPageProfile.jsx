import { useState } from 'react'
import bird from "@image/bird.jpg"

export default function MypageProfile() {
  const [followerNum, setFollowerNum] = useState(0);
  const [followNum, setFollowNum] = useState(0);
  const [likeNum, setLikeNum] = useState(0);
/* after:contents-[""] after:pb-[100%] after:block */
  return (
  <div className="w-full bg-zinc-100 rounded-3xl h-80 text-center text-white drop-shadow mb-6">
    <div className='pt-8 text-black'>
      <img src={bird} className="drop-shadow img-box rounded-full bg-gray-500 w-40 h-40 m-auto mb-6"></img>
        <h2 className='lg:text-2xl text-xl mb-3 mt-3 font-semibold'>김개발자</h2>
        <ul className='flex justify-center'>
          <li className='before:content-["|"] before:float-right before:block before:ml-1.5'>팔로워 <br />{followerNum}&nbsp;</li>
          <li className='before:content-["|"] before:float-right before:block before:ml-1.5'>&nbsp;팔로잉 <br />{followNum}&nbsp;</li>
          <li>&nbsp;좋아요 <br />{likeNum}</li>
        </ul>
      </div>
  </div>
  )
}