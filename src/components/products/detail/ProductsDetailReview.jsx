import { StarIcon } from '@heroicons/react/24/solid'
import { HeartIcon } from '@heroicons/react/24/solid'
import tw from "tailwind-styled-components"
import { useEffect, useState } from 'react'

import Review from '@components/products/detail/Review'
/* import Pagination from '@components/products/detail/ui/Pagination' */

export default function ProductsDetailReview() {
  const [reviews, setreviews] = useState([])
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;

  const Btn = tw.button`
  text-center
  btn
  rounded-3xl
  md:w-22 
  text-white
  hover:bg-point-blue
  hover:border-point-blue
  `

  useEffect(() => {
		const fetchData = async() => {
        const res = await fetch(`http://localhost:3001/review`);
        const result = res.json();
        return result;
      }	
        
      fetchData().then(res => setreviews(res));
    }, []);

  const stars = [
    <StarIcon className="w-6 h-6 text-point-blue"></StarIcon>,
    <StarIcon className="w-6 h-6 text-point-blue"></StarIcon>,
    <StarIcon className="w-6 h-6 text-point-blue"></StarIcon>,
    <StarIcon className="w-6 h-6 text-point-blue"></StarIcon>,
    <StarIcon className="w-6 h-6 text-point-blue"></StarIcon>
  ]

  const box = document.getElementsByClassName('content')
  console.log(box)
  return (
    <>
    <hr className='mt-3 mb-3 border-black'/>
    <div className="product-container">
      <div className="btn-box">
        <Btn>최신순</Btn>
        <Btn>공감순</Btn>
        <Btn>과거순</Btn>
      </div>

      <div className="review-box mt-6">
        {reviews.slice(offset, offset + limit).map(review => (
        <Review
        userid={review.userid}
        title={review.title}
        name={review.name}
        star={review.star}
        day={review.day}
        review={review.review}
        >
          아
        </Review>
        ))}
      </div>

          {/* <button className='btn' onClick={onCl}>클릭</button> */}
      <div className="pages">
{/*       <Pagination
          total={posts.length}
          limit={limit}
          page={page}
          setPage={setPage}
        /> */}
      </div>
    </div>
    </>
  )
}