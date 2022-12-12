import { useState, useEffect } from 'react'
import { Link } from "react-router-dom";

import MypageSubFeed from '@components/mypage/MyPageSubFeed'
import MypageProfile from '@components/mypage/MyPageProfile'
import MypageTitle from '@components/mypage/MyPageTitle'

export default function MypageUserFeed() {
  const [feeds, setFeeds] = useState([]) 
  // 나중에 대체 (상대 닉네임)
  const userName = "이개발자"

  useEffect(() => {
		const fetchData = async() => {
          const res = await fetch('http://localhost:3001/board');
          const result = res.json();
          return result;
        }	
        
        fetchData().then(res => setFeeds(res));
    }, []);

  return (
    <div className='md:flex justify-between w-10/12 m-auto'>
      <div className='md:w-3/12'> 
      <MypageProfile />
      </div>
      <div className='md:w-8/12 bg-white'>
        <MypageTitle title={`${userName}의 피드`} btn={<Link to="/feed" state={{ name: userName }} >더보기</Link>}></MypageTitle>
        <ul className='mt-6 flex justify-between flex-wrap gap-[1em]'>
          {feeds.map(f => (
            <MypageSubFeed
            feed={f.feed}
            ></MypageSubFeed>
          ))}
        </ul>
      </div>
    </div>
  )
}