import { useState, useEffect } from 'react'
import MypageProfile from '@components/mypage/mypage_profile'
import MypageTitle from '@components/mypage/mypage_title'
import MypageGoods from '@components/mypage/mypage_goods'
import MainReview from '@components/mypage/mypage_MainReview'
import MypageFeed from '@components/mypage/Mypage_Feed'
import MypageLink from '@components/mypage/Mypage_Link'
import MypageReview from '@components/page/Mypage_review'
import { Link, Route, Routes } from "react-router-dom";
import styles from '../index.css'

export default function Mypage() {
  /* 리뷰 - 좋아요 상품 - 나의 피드 순번 */
  const [reviews, setreviews] = useState([])
  const [likes, setLikes] = useState([])
  const [feeds, setFeeds] = useState([])

  /* 나의 리뷰 */
  useEffect(() => {
		const fetchData = async() => {
          const res = await fetch('https://0849fc31-687e-4b04-8697-ba70b870976c.mock.pstmn.io/reviews');
          const result = res.json();
          return result;
        }	
        
        fetchData().then(res => setreviews(res));
    }, []);

    /* 좋아요 상품 */
  useEffect(() => {
		const fetchData = async() => {
          const res = await fetch('https://fc0dd02c-41c7-4117-a17c-53569011aee5.mock.pstmn.io/product');
          const result = res.json();
          return result;
        }	
        
        fetchData().then(res => setLikes(res));
    }, []);

    /* 나의 피드 */
  useEffect(() => {
		const fetchData = async() => {
          const res = await fetch('https://a861831a-3d4e-42e0-9c51-7ca470881e0a.mock.pstmn.io/boards');
          const result = res.json();
          return result;
        }	
        
        fetchData().then(res => setFeeds(res));
    }, []);

  return (
    <div className='flex justify-between w-10/12 m-auto mt-12'>
      <div className='w-3/12'>
        <MypageProfile />
      </div>
      <div className='w-8/12'>

        <div className='reviews'>
          <MypageTitle title="나의 리뷰" btn={<MypageLink/>}/>
          <hr className='text-white'/>
          <ul className='flex justify-between flex-wrap gap-[1em] mt-3'>
          {reviews.map(review => (
            <MainReview
            userid={review.userid}
            title={review.title}  
            star={review.star}
            review={review.review}
            ></MainReview>
          ))}
          </ul>
        </div>
        
        <div className='likes mt-12'>
          <MypageTitle title="좋아요한 상품" btn="더보기 >"/>
          <ul className='flex justify-between flex-wrap gap-[1em] mt-3'>
          {likes.map(like => (
            <MypageGoods title={like.title}
            ></MypageGoods>
          ))}
          </ul>
        </div>
        
        <div className='feeds mt-12'>
          <MypageTitle title="나의 피드" btn="더보기 >"/>
          <ul className='flex justify-between flex-wrap gap-[1em]'>
            {feeds.map(f => (
              <MypageFeed
              feed={f.feed}
              ></MypageFeed>
            ))}
          </ul>
        </div>

        <Routes>
          <Route path="/review" element={<MypageReview />} />
      </Routes>
      </div>
    </div>
  )
}



