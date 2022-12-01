import { useState, useEffect } from 'react';
import MypageReview from '@components/mypage/Mypage_review'
import MypageTitle from '@components/mypage/mypage_title'

export default function MypageMyReview() {
  const [reviews, setReviews] = useState([])
  /* 나중에 삭제(이미지스타일) */
  const imgStyle = "w-24 h-24 bg-gray-200 text-center mr-6"

  useEffect(() => {
		const fetchData = async() => {
          const res = await fetch('https://0849fc31-687e-4b04-8697-ba70b870976c.mock.pstmn.io/reviews');
          const result = res.json();
          return result;
        }	
        
        fetchData().then(res => setReviews(res));
    }, []);

    console.log(reviews)

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
    </div>
  )
}