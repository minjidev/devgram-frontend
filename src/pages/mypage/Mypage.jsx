import { useState, useEffect } from 'react'
import { Link, Route, Routes, Router } from "react-router-dom";

import MypageProfile from '@components/mypage/MyPageProfile'
import MypageTitle from '@components/mypage/MyPageTitle'
import MypageGoods from '@components/mypage/MyPageGoods'
import MainReview from '@components/mypage/MyPageMainReview'
import MypageFeed from '@components/mypage/MyPageSubFeed'

import bird from '@image/bird.jpg'
import styles from '../../index.css'

export default function Mypage() {
  /* 리뷰 - 좋아요 상품 - 나의 피드 순번 */
  const [reviews, setreviews] = useState([])
  const [likes, setLikes] = useState([])
  const [feeds, setFeeds] = useState([])
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const [limitApi, setLimitApi] = useState()

  /* 나의 리뷰 */
  useEffect(() => {
		const fetchData = async() => {
          const res = await fetch(`http://localhost:3001/review?_limit=${limitApi}`);
          const result = res.json();
          return result;
        }	
        
        fetchData().then(res => setreviews(res));
    }, [limitApi]);

    /* 좋아요 상품 */
  useEffect(() => {
		const fetchData = async() => {
          const res = await fetch(`http://localhost:3001/product?_limit=${limitApi}`);
          const result = res.json();
          return result;
        }	
        
        fetchData().then(res => setLikes(res));
    }, [limitApi]);

    /* 나의 피드 */
  useEffect(() => {
		const fetchData = async() => {
          const res = await fetch(`http://localhost:3001/board?_limit=${limitApi}`);
          const result = res.json();
          return result;
        }	
        
        fetchData().then(res => setFeeds(res));
    }, [limitApi]);

    /* 크기바뀜 체크 */
    useEffect(() => {
      const resizeListener = () => {
        setInnerWidth(window.innerWidth);
      };
      window.addEventListener("resize", resizeListener);
    });

    /* 데스크탑 3 타블렛 2 모바일 3 */
    useEffect(() => {
      innerWidth < 1024 ? innerWidth < 768 ? setLimitApi(3) : setLimitApi(2) : setLimitApi(3)
    }, [innerWidth])

  return (
    <>
      <div className='md:flex sm:block justify-between w-10/12 m-auto mt-12 text-black'>
        <div className='md:w-3/12 sm:w-full mb-12'>
        <div className="md:fixed md:w-[21%]">
          <MypageProfile img={bird}/>
          </div>
        </div>
        <div className='md:w-8/12 sm:w-full'>
          <div className='reviews'>
            <MypageTitle title="나의 리뷰" btn={<Link to="/review">더보기</Link>}/>
            <ul className='flex justify-between flex-wrap gap-[1em] mt-3'>
            {reviews.map(review => (
              <MainReview
              name={review.name}
              title={review.title}  
              star={review.star}
              review={review.review}
              ></MainReview>
            ))}
            </ul>
          </div>
          
          <div className='likes mt-12'>
            <MypageTitle title="좋아요한 상품" btn={<Link to="/like">더보기</Link>}/>
            <ul className='flex justify-between flex-wrap gap-[1em] mt-6'>
            {likes.map(like => (
              <MypageGoods title={like.title}
              ></MypageGoods>
            ))}
            </ul>
          </div>
          
          <div className='feeds mt-12'>
            <MypageTitle title="나의 피드" btn={<Link to="/feed" state={{ name: "나의 피드" }}>더보기</Link>}/>
            <ul className='flex justify-between flex-wrap gap-[1em] mt-6'>
              {feeds.map(f => (
                <MypageFeed
                user={f.user}
                feed={f.feed}
                ></MypageFeed>
              ))}
            </ul>
          </div>

          <div className='나머지'>
            <button className='btn'><Link to="/userFeed">다른 유저피드</Link></button>
            <button className='btn'><Link to="/follow">팔로잉 페이지</Link></button>
          </div>
        </div>
      </div>
    </>
  )
}