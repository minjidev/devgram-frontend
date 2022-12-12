import { useState, useEffect } from 'react'
import MypageGoods from '@components/mypage/MyPageGoods'
import MypageProfile from '@components/mypage/MyPageProfile'
import MypageTitle from '@components/mypage/MyPageTitle'

import Load from '@image/Load.png'

export default function MypageLike() {
  const [likes, setLikes] = useState([])
  const [target, setTarget] = useState(null);

      // 데이터 페칭 함수
  // const page = 1;
  const fetchData = async () => {
    const response = await fetch(`http://localhost:3001/product?_limit=9`);
    const data = await response.json();
    setLikes((prev) => prev.concat(data));
    // page++;
  };

  useEffect(() => {
    fetchData();
  }, []);

  // 옵져버 생성
  useEffect(() => {
    let observer;
    if (target) {
      const onIntersect = async ([entry], observer) => {
        if (entry.isIntersecting) {
          observer.unobserve(entry.target);
          await fetchData();
          observer.observe(entry.target);
        }
      };
      observer = new IntersectionObserver(onIntersect, { threshold: 1 });
      observer.observe(target);
    }
    return () => observer && observer.disconnect();
  }, [target]);

  return (
    <div className='md:flex justify-between w-10/12 m-auto mb-6'>
      <div className='md:w-3/12'> 
      <div className="md:fixed md:w-[21%]">
      <MypageProfile />
      </div>
      </div>
      <div className='md:w-8/12 bg-white'>
        <MypageTitle title="좋아요한 상품"/>
        <ul className='flex justify-between flex-wrap gap-[1em] mt-6'>
        {likes.map(product => (
          <MypageGoods title={product.title}
          ></MypageGoods>
        ))}
        </ul>
        <img src={Load} ref={setTarget}/>
      </div>
    </div>
  )
}