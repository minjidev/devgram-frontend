import { useState, useEffect } from 'react';
import MypageReview from '@components/mypage/MyPageReview'
import MypageTitle from '@components/mypage/MyPageTitle'

import Load from '@image/Load.png'

export default function MypageMyReview() {
  const [reviews, setReviews] = useState([])
  const [target, setTarget] = useState(null);
  /* 나중에 삭제(이미지스타일) */
  const imgStyle = "w-24 h-24 bg-gray-200 text-center mr-6"

  // 데이터 페칭 함수
  // const page = 1;
  const fetchData = async () => {
    const response = await fetch(`http://localhost:3001/review?_limit=9`);
    const data = await response.json();
    setReviews((prev) => prev.concat(data));
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
    <div className='w-10/12 m-auto'>
        <MypageTitle title="나의 리뷰"></MypageTitle>
      <div>
        {reviews.map(review => (
          <MypageReview
          key={review.userid}
          title={review.title} 
          name={review.name} 
          star={review.star}
          day={review.day}
          review={review.review}
          ></MypageReview>
        ))}
      </div>
      <img src={Load} ref={setTarget}/>
    </div>
  )
}