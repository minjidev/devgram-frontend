import { useState } from 'react'

export default function MypageProfile() {
  const [followerNum, setFollowerNum] = useState(0);
  const [followNum, setFollowNum] = useState(0);
  const [likeNum, setLikeNum] = useState(0);
/* after:contents-[""] after:pb-[100%] after:block */
  return (
  <div className="w-full bg-blue-400 rounded-3xl h-80 text-center text-white">
    <div className="img-box rounded-full bg-blue-600 w-28 h-28 m-auto"></div>
    <h2 className='text-2xl mb-6 mt-3'>김개발자</h2>
    <ul className='flex justify-center'>
      <li>팔로워 {followerNum} |</li>
      <li>팔로잉 {followNum} |</li>
      <li>좋아요 {likeNum}</li>
    </ul>
  </div>
  )
}