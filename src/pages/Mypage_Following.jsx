import { useState, useEffect } from 'react'
import MypageFollow from '@components/mypage/Mypage_Follow'
import MypageProfile from '@components/mypage/Mypage_profile'

export default function MypageFollowing() {
  const [follower, setFollower] = useState([])
  /* 나중에 삭제(이미지스타일) */
  const imgStyle = "w-24 h-24 bg-gray-200 text-center mr-6"

  useEffect(() => {
		const fetchData = async() => {
          const res = await fetch('https://c26c91e8-30c2-42b4-8da5-50c7f316bbc3.mock.pstmn.io/UserAPI');
          const result = res.json();
          return result;
        }	
        
        fetchData().then(res => setFollower(res));
    }, []);

    console.log(follower)

  return (
    <div className='flex justify-between w-10/12 m-auto'>
      <div className='w-3/12'> 
      <MypageProfile />
      </div>
      <div className='w-8/12 bg-white'>
        <ul>
        {follower.map(follow => (
          <MypageFollow
          name={follow.name} 
          ></MypageFollow>
        ))}
        </ul>
      </div>
    </div>
  )
}