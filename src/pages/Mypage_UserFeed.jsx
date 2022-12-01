import { useState, useEffect } from 'react'
import MypageFeed from '@components/mypage/Mypage_Feed'
import MypageProfile from '@components/mypage/mypage_profile'
import MypageTitle from '@components/mypage/mypage_title'

export default function MypageUserFeed() {
  const [feed, setFeed] = useState([]) 
  // 나중에 대체 (상대 닉네임)
  const userName = "이개발자"

  useEffect(() => {
		const fetchData = async() => {
          const res = await fetch('https://a861831a-3d4e-42e0-9c51-7ca470881e0a.mock.pstmn.io/boards');
          const result = res.json();
          return result;
        }	
        
        fetchData().then(res => setFeed(res));
    }, []);

  return (
    <div className='flex justify-between w-10/12 m-auto'>
      <div className='w-3/12'> 
      <MypageProfile />
      </div>
      <div className='w-8/12 bg-white'>
        <MypageTitle title={`${userName}의 피드`}></MypageTitle>
        <ul className='flex justify-between flex-wrap gap-[1em]'>
          {feed.map(f => (
            <MypageFeed
            feed={f.feed}
            ></MypageFeed>
          ))}
        </ul>
      </div>
    </div>
  )
}